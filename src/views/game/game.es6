let Debug = require('../../debug');
let ViewController = require('../view-controller');
let GameView = require('./game-view');
let QQWING = require('../../libs/qqwing-1.3.4/qqwing-1.3.4');

let DEBUG = new Debug('Game');

module.exports =
class Game extends ViewController {
  constructor() {
    super(new GameView());
    DEBUG.log('Loading.');

    this.qqwing = new QQWING();

    // Selected tile will be highlighted. When a selection tile is pressed it
    // will attempt to place that value on the selected tile.
    this.selectedTile = null;
    this.randomlySetSelectedTile();

    //
    this.initGamboardTileEvents();

    //
    this.initSelectionTileEvents();

    //
    this.initEraseTileButtonEvents();

    //
    this.initNewGameButtonEvents();


    //
    this.loadGame();
    this.startTimer();
    document.addEventListener("pause", (e) => {
      this.stopTimer();
    }, false);

    document.addEventListener("resume", (e) => {
      this.startTimer();
    }, false);
  }

  /*
   *
   */
  initGamboardTileEvents(){
    let tmpTiles = this.getView().getGameboard().getTiles();
    for(let i = 0; i < tmpTiles.length; i++){
      //
      tmpTiles[i].getElement().addEventListener(TOUCH_START_EVENT, () => {
        this.setSelectedTile(i);
      });
      //
      tmpTiles[i].setOnValueChangeEvent(() => {
        if(tmpTiles[i].getTileId() === this.getSelectedTile().getTileId()){
          this.checkTilesForSameAsSelectedValue();
          this.checkTilesForConflicts();
          this.getView().getGameboard().updateTileStyles();
        }
        this.saveGame();
      });
    }
  }

  /*
   *
   */
  initSelectionTileEvents(){
    let tmpSelectionTiles = this.getView().getSelectionTiles();
    for(let i = 0; i < tmpSelectionTiles.length; i++){
      tmpSelectionTiles[i].getElement().addEventListener(TOUCH_START_EVENT, () => {
        this.setSelectedTileValue(tmpSelectionTiles[i].getValue());
        // Check if this value is done
        this.checkIfSelectionTileIsDone(tmpSelectionTiles[i]);
        this.saveGame();
      });
    }
  }

  /*
   *
   */
  initEraseTileButtonEvents(){
    this.getView().getEraseTileButton().getElement().addEventListener(
      TOUCH_START_EVENT, () => {
        if(this.getSelectedTile().isOriginal() === false){
          let valueBefore = this.getSelectedTile().getValue();
          this.getSelectedTile().setValue('0');
          this.checkTilesForSameAsSelectedValue();
          this.checkTilesForConflicts();
          this.getView().getGameboard().updateTileStyles();
          // Check of the selection tiles are done.
          // By unsetting a tile it could make a tile available again
          let tmpSelectionTiles = this.getView().getSelectionTiles();
          for(let i = 0; i < tmpSelectionTiles.length; i++){
            if(tmpSelectionTiles[i].getValue() === valueBefore){
              this.checkIfSelectionTileIsDone(tmpSelectionTiles[i]);
              i = tmpSelectionTiles.length+1;
            }
          }
        }
        this.saveGame();
      });
  }

  /*
   *
   */
  initNewGameButtonEvents(){
    this.getView().getNewGameButton().getElement().addEventListener(
      TOUCH_START_EVENT, () => {
        this.resetGame();
      }
    );
  }

  /*
   *
   */
  checkIfSelectionTileIsDone(selectionTile){
    let tmpGameboardTiles = this.getView().getGameboard().getTiles();
    let count = 0;
    for(let i = 0; i < tmpGameboardTiles.length; i++){
      if(tmpGameboardTiles[i].getValue() === selectionTile.getValue()){
        count++;
      }
    }
    DEBUG.log(count);
    if(count >= 9){
      selectionTile.setDone(true);
      selectionTile.update();
    }else{
      selectionTile.setDone(false);
      selectionTile.update();
    }
  }

  /*
   *
   */
  getSelectedTile(){
    return this.selectedTile;
  }

  /*
   *
   */
  setSelectedTile(tile_i){
    // If a tile is already selected unselect it
    if(this.getSelectedTile() !== undefined && this.getSelectedTile() !== null){
      // Check if the tile is already selected
      if(this.getView().getGameboard().getTiles()[tile_i].getTileId()
         === this.getSelectedTile().getTileId()){
        // If the tile being selected is already selected then do nothing.
        return;
      }
      this.getSelectedTile().setSelected(false);

    }

    // Set the tile to selected
    this.selectedTile = this.getView().getGameboard().getTiles()[tile_i];
    this.getSelectedTile().setSelected(true);

    // Update the gameboard tiles based on the newly selected tile
    this.checkTilesForSameAsSelectedValue();
    this.getView().getGameboard().updateTileStyles();
  }

  /*
   *
   */
  setSelectedTileValue(v){
    //
    if(this.getSelectedTile().isOriginal() === false
        && this.getSelectedTile().isEmpty() === true){
      //
      this.getSelectedTile().setValue(v);
      this.saveGame();
    }
  }

  /*
   *
   */
  randomlySetSelectedTile(){
    this.setSelectedTile(
      Math.floor(
        (Math.random() * this.getView().getGameboard().getTiles().length)));
  }

  /*
   *
   */
  resetGame(){
    this.qqwing.generatePuzzle();
    this.qqwing.setPrintStyle(QQWING.PrintStyle.ONE_LINE);
    let t = this.qqwing.getSolutionString();
    for(let i = 0; i < this.getView().getGameboard().getTiles().length; i++){
      if(t[i] === '.'){
        this.getView().getGameboard().getTiles()[i].setValue('0');
        this.getView().getGameboard().getTiles()[i].setIsOriginal(false);
      }else{
        this.getView().getGameboard().getTiles()[i].setValue(t[i]);
        this.getView().getGameboard().getTiles()[i].setIsOriginal(true);
      }
    }
    this.checkTilesForSameAsSelectedValue();
    this.checkTilesForConflicts();
    this.getView().getGameboard().update();
    window.localStorage.setItem("timeElapsed", JSON.stringify(0));
    this.saveGame();
  }

  /*
   *
   */
  checkTilesForSameAsSelectedValue(){
    let tmpTiles = this.getView().getGameboard().getTiles();
    for(let i = 0; i < tmpTiles.length; i++){
      if(this.getSelectedTile().getTileId() !== tmpTiles[i].getTileId()
         && tmpTiles[i].getValue() === this.getSelectedTile().getValue()){
        //
        tmpTiles[i].setIsSameValue(true);
      }else{
        //
        tmpTiles[i].setIsSameValue(false);
      }
    }
  }

  /*
   *
   */
  checkTilesForConflicts(){
    // TODO: Fix this horrible performance mess of a method
    let tmpTiles = this.getView().getGameboard().getTiles();
    // Clear the conflicts
    for(let i = 0; i < tmpTiles.length; i++){
      tmpTiles[i].setHasConflict(false);
    }
    // Check the tiles in the same block
    let blockTilesByValue = {
      'A': [[],[],[],[],[],[],[],[],[]], // Top Left block
      'B': [[],[],[],[],[],[],[],[],[]], // Top middle block
      'C': [[],[],[],[],[],[],[],[],[]], // Top might Block
      'D': [[],[],[],[],[],[],[],[],[]], // Middle left block
      'E': [[],[],[],[],[],[],[],[],[]], // Middle middle block
      'F': [[],[],[],[],[],[],[],[],[]], // Middle right block
      'G': [[],[],[],[],[],[],[],[],[]], // Bottom left block
      'H': [[],[],[],[],[],[],[],[],[]], // Bottom middle block
      'I': [[],[],[],[],[],[],[],[],[]]  // Bottom right block
    };
    let blockChar = null;
    let blockNum = null;
    let tileValue = null;
    for(let i = 0; i < tmpTiles.length; i++){
      if(tmpTiles[i].isEmpty() === false){
        blockChar = tmpTiles[i].getTileId().charAt(0);
        tileValue = parseInt(tmpTiles[i].getValue());
        blockTilesByValue[blockChar][tileValue-1].push(tmpTiles[i]);
      }
    }
    //
    let blockChars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    for(let i = 0; i < blockChars.length; i++){
      for(let j = 0; j < blockTilesByValue[blockChars[i]].length; j++){
        if(blockTilesByValue[blockChars[i]][j].length > 1){
          for(let k = 0; k < blockTilesByValue[blockChars[i]][j].length; k++){
            blockTilesByValue[blockChars[i]][j][k].setHasConflict(true);
          }
        }
      }
    }
    // Check for row conflicts
    for(let i = 0; i < tmpTiles.length; i++){
      if(tmpTiles[i].isEmpty() === false){
        blockChar = tmpTiles[i].getTileId().charAt(0);
        blockNum = parseInt(tmpTiles[i].getTileId().charAt(1));
        // Row 1
        this.checkLineForConflict(tmpTiles, i, 'A', 'B', 'C', 1, 2, 3);
        // Row 2
        this.checkLineForConflict(tmpTiles, i, 'A', 'B', 'C', 4, 5, 6);
        // Row 3
        this.checkLineForConflict(tmpTiles, i, 'A', 'B', 'C', 7, 8, 9);
        // Row 4
        this.checkLineForConflict(tmpTiles, i, 'D', 'E', 'F', 1, 2, 3);
        // Row 5
        this.checkLineForConflict(tmpTiles, i, 'D', 'E', 'F', 4, 5, 6);
        // Row 6
        this.checkLineForConflict(tmpTiles, i, 'D', 'E', 'F', 7, 8, 9);
        // Row 7
        this.checkLineForConflict(tmpTiles, i, 'G', 'H', 'I', 1, 2, 3);
        // Row 8
        this.checkLineForConflict(tmpTiles, i, 'G', 'H', 'I', 4, 5, 6);
        // Row 9
        this.checkLineForConflict(tmpTiles, i, 'G', 'H', 'I', 7, 8, 9);
      }
    }
    // Check for column conflicts
    for(let i = 0; i < tmpTiles.length; i++){
      if(tmpTiles[i].isEmpty() === false){
        blockChar = tmpTiles[i].getTileId().charAt(0);
        blockNum = parseInt(tmpTiles[i].getTileId().charAt(1));
        // Row 1
        this.checkLineForConflict(tmpTiles, i, 'A', 'D', 'G', 1, 4, 7);
        // Row 2
        this.checkLineForConflict(tmpTiles, i, 'A', 'D', 'G', 2, 5, 8);
        // Row 3
        this.checkLineForConflict(tmpTiles, i, 'A', 'D', 'G', 3, 6, 9);
        // Row 4
        this.checkLineForConflict(tmpTiles, i, 'B', 'E', 'H', 1, 4, 7);
        // Row 5
        this.checkLineForConflict(tmpTiles, i, 'B', 'E', 'H', 2, 5, 8);
        // Row 6
        this.checkLineForConflict(tmpTiles, i, 'B', 'E', 'H', 3, 6, 9);
        // Row 7
        this.checkLineForConflict(tmpTiles, i, 'C', 'F', 'I', 1, 4, 7);
        // Row 8
        this.checkLineForConflict(tmpTiles, i, 'C', 'F', 'I', 2, 5, 8);
        // Row 9
        this.checkLineForConflict(tmpTiles, i, 'C', 'F', 'I', 3, 6, 9);
      }
    }

  }

  /*
   *
   */
  checkLineForConflict(tmpTiles, i, char1, char2, char3, num1, num2, num3){
    let blockChar = tmpTiles[i].getTileId().charAt(0);
    let blockNum = parseInt(tmpTiles[i].getTileId().charAt(1));
    if(blockChar === char1 || blockChar === char2 || blockChar === char3){
      if(blockNum === num1 || blockNum === num2 || blockNum === num3){
        for(let j = 0; j < tmpTiles.length; j++){
          let blockChar2 = tmpTiles[j].getTileId().charAt(0);
          let blockNum2 = parseInt(tmpTiles[j].getTileId().charAt(1));
          let tileValue2 = parseInt(tmpTiles[j].getValue());
          if(blockChar2 === char1 || blockChar2 === char2 || blockChar2 === char3){
            if(blockNum2 === num1 || blockNum2 === num2 || blockNum2 === num3){
              if(tmpTiles[i].getTileId() !== tmpTiles[j].getTileId()
                 && tmpTiles[i].getValue() === tmpTiles[j].getValue()){
                tmpTiles[i].setHasConflict(true);
                tmpTiles[j].setHasConflict(true);
              }
            }
          }
        }
      }
    }
  }

  /*
   *
   */
  gameboardToJSONString(){
    let json = [];
    let tmpTiles = this.getView().getGameboard().getTiles();
    for(let i = 0; i < tmpTiles.length; i++){
      let item = {
        value: tmpTiles[i].getValue(),
        original: tmpTiles[i].isOriginal()
      };
      json.push(item);
    }
    return JSON.stringify(json);
  }

  /*
   *
   */
  loadGame(){
    // this.resetGame();
    // Check if version changed
    let storedVersion = JSON.parse(window.localStorage.getItem('version'));
    if(storedVersion){
      if(storedVersion !== VERSION){
        this.resetGame();
        return;
      }
    }else{
      window.localStorage.setItem("version", VERSION);
    }
    // Check if there is a stored gameboard
    let storedGameboard = JSON.parse(window.localStorage.getItem('gameboard'));
    if(!storedGameboard){
      this.resetGame();
      return;
    }else{
      // console.log(storedGameboard);
      for(let i = 0; i < this.getView().getGameboard().getTiles().length; i++){
        this.getView().getGameboard().getTiles()[i].setValue(
          storedGameboard[i].value);
        this.getView().getGameboard().getTiles()[i].setIsOriginal(
          storedGameboard[i].original);
      }
      this.checkTilesForSameAsSelectedValue();
      this.checkTilesForConflicts();
      this.getView().getGameboard().update();
      let tmpSelectionTiles = this.getView().getSelectionTiles();
      for(let i = 0; i < tmpSelectionTiles.length; i++){
        this.checkIfSelectionTileIsDone(tmpSelectionTiles[i]);
      }
    }

  }

  /*
   *
   */
  saveGame(){
    window.localStorage.setItem("gameboard", this.gameboardToJSONString());
  }

  /*
   *
   */
  startTimer(){
    this.startTime = Date.now();
    this.timerInterval = setInterval(() => {
      this.timerIntervalFunc();
    },1000);
  }

  /*
   *
   */
  stopTimer(){
    clearInterval(this.timerInterval);
  }

  /*
   *
   */
  timerIntervalFunc(){
    let endTime = Date.now();
    let elapsed = (endTime - this.startTime);
    this.startTime = endTime;

    let tmpTimeElapsed = JSON.parse(window.localStorage.getItem("timeElapsed"));
    if(tmpTimeElapsed){
      elapsed = elapsed + tmpTimeElapsed;
    }
    DEBUG.log(elapsed);
    window.localStorage.setItem("timeElapsed", JSON.stringify(elapsed));
    this.getView().getClock().setTime(elapsed);
  };



}
