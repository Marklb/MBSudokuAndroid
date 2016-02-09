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

    //
    this.initTimer();

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
  initTimer(){
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
  checkIfSelectionTilesAreDone(){
    let tmpSelectionTiles = this.getView().getSelectionTiles();
    for(let i = 0; i < tmpSelectionTiles.length; i++){
      this.checkIfSelectionTileIsDone(tmpSelectionTiles[i]);
    }
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
    this.checkIfSelectionTilesAreDone();
    window.localStorage.setItem("timeElapsed", JSON.stringify(0));
    this.saveGame();
  }

  /*
   * Compares the currently selected tile against each other tile on the
   * gameboard. Each tile that has the same value as the selected tile will
   * have its same value state set.
   * Used to highlight the other tiles with the same value as the selected tile.
   */
  checkTilesForSameAsSelectedValue(){
    // Get each tile on the gameboard.
    let tmpTiles = this.getView().getGameboard().getTiles();
    // Loop through each tile on the gameboard.
    for(let i = 0; i < tmpTiles.length; i++){
      // If the tile is not itself and it has the same value, then its same
      // value state will be set.
      if(this.getSelectedTile().getTileId() !== tmpTiles[i].getTileId()
         && tmpTiles[i].getValue() === this.getSelectedTile().getValue()){
        // The tile is not the selected tile and it has the same value.
        tmpTiles[i].setIsSameValue(true);
      }else{
        // The tile is either the selected tile or it doesn't have the same
        // value as the selected tile.
        tmpTiles[i].setIsSameValue(false);
      }
    }
  }

  /*
   * Checks each block for multiple tiles of the same value.
   * Checks each row for multiple tiles of the same value on the row.
   * Checks each column for multiple tiles of the same value on the column.
   */
  checkTilesForConflicts(){
    // TODO: Fix this horrible mess of a method
    // Get all the tiles on the gameboard.
    let tmpTiles = this.getView().getGameboard().getTiles();
    // Clear the conflicts. This method will set all conflicts, but not remove
    // previous conflicts, so for now it is easiest to just rest them all to
    // have no conflicts.
    for(let i = 0; i < tmpTiles.length; i++){
      tmpTiles[i].setHasConflict(false);
    }

    // Check the tiles in the same block.
    // An empty array for each possible value 1-9 is initialized for each block.
    // Each tile in the blocks will be added to its value array for its block.
    // The index of the array that the tile will be added to is its value-1.
    // If an array ends up having more than 1 tile, then that means there is
    // more than one of the same value in the block. Each tile in that array
    // will have its conflict state set.
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
      // If the tile has no value set, then there is no point in checking it
      // for a conflict
      if(tmpTiles[i].isEmpty() === false){
        blockChar = tmpTiles[i].getTileId().charAt(0);
        tileValue = parseInt(tmpTiles[i].getValue());
        blockTilesByValue[blockChar][tileValue-1].push(tmpTiles[i]);
      }
    }
    // Since there are not many blocks I just used this array to access the
    // the array for each block instead of iterating all the values for testing
    // simplicity. I may remove this and just iterate them if I decide to keep
    // this algorithm for testing the blocks.
    let blockChars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    for(let i = 0; i < blockChars.length; i++){
      // Loop through each value array in the block value arrays.
      for(let j = 0; j < blockTilesByValue[blockChars[i]].length; j++){
        // Check if there is more than one of the same value tile
        if(blockTilesByValue[blockChars[i]][j].length > 1){
          // There is more than one tile of the same value, so loop through
          // each of these tiles and set their conflict state.
          for(let k = 0; k < blockTilesByValue[blockChars[i]][j].length; k++){
            blockTilesByValue[blockChars[i]][j][k].setHasConflict(true);
          }
        }
      }
    }

    // Check for row conflicts
    for(let i = 0; i < tmpTiles.length; i++){
      // Loop through each tile in the gameboard and check the row of each tile
      // that has a value.
      if(tmpTiles[i].isEmpty() === false){
        // Call the method to check for each row. The method to check the row
        // will do the check for if the tile is on its row and just return if
        // the tile is not on its row.

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
      // Loop through each tile in the gameboard and check the column of each
      // tile that has a value.
      if(tmpTiles[i].isEmpty() === false){
        // Call the method to check for each column. The method to check the
        // column will do the check for if the tile is on its column and just
        // return if the tile is not on its column.

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
   * Checks to see if there is a tile conflict in a row or column.
   *
   * tmpTiles: List of tiles on the gameboard.
   * i: Index of the tile to check for a conflict.
   * char1-3: Characters representing the blocks to check.
   * num1-3: Numbers of the tiles in the blocks to check
   *
   * Note: To check a tile in the 2nd row of the gameboard.
   *       The first row contains the block ids:
   *         A4,A5,A6,B4,B5,B6,C4,C5,C6
   *       So, to check a tile in this row the char and num args would be:
   *         char1: 'A', char2: 'B', char3: 'C',
   *         num1: 4, num2: 5, num3: 6
   */
  checkLineForConflict(tmpTiles, i, char1, char2, char3, num1, num2, num3){
    // Get character and number of the tileId, which represent which tile is
    // being checked on the gameboard.
    let blockChar = tmpTiles[i].getTileId().charAt(0);
    let blockNum = parseInt(tmpTiles[i].getTileId().charAt(1));
    // Check if this tile is on the row/column
    if(blockChar === char1 || blockChar === char2 || blockChar === char3){
      if(blockNum === num1 || blockNum === num2 || blockNum === num3){
        // Loop through all the tiles to find another tile in this row/column
        for(let j = 0; j < tmpTiles.length; j++){
          // Get the character and number of the tileId
          let blockChar2 = tmpTiles[j].getTileId().charAt(0);
          let blockNum2 = parseInt(tmpTiles[j].getTileId().charAt(1));
          // Check of this tile is on the row/column
          if(blockChar2 === char1 || blockChar2 === char2 || blockChar2 === char3){
            if(blockNum2 === num1 || blockNum2 === num2 || blockNum2 === num3){
              // Get the value of the tile
              let tileValue2 = parseInt(tmpTiles[j].getValue());
              // Make sure that the tile we are checking for conflicts for
              // doesn't try to conflict with itself and if it isn't itself,
              // check if the value of the other tile in the row/column has
              // the same value which would cause a conflict
              if(tmpTiles[i].getTileId() !== tmpTiles[j].getTileId()
                 && tmpTiles[i].getValue() === tmpTiles[j].getValue()){
                // There is a conflict, so set the conflict state to true for
                // both of the tiles that are conflicting with each other.
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
   * Returns a string that contains enough information about the gamebaord to
   * rebuild it when the game is reloaded.
   */
  gameboardToJSONString(){
    let json = []; // This is the object that will get JSON stringified
    // Get all the tiles on the gameboard
    let tmpTiles = this.getView().getGameboard().getTiles();
    // For each tile on the gameboard, store the value and whether it is an
    // original tile, since everything else currently stored on the tiles can
    // be recalculated once the gameboard has this information.
    for(let i = 0; i < tmpTiles.length; i++){
      let item = {
        value: tmpTiles[i].getValue(),
        original: tmpTiles[i].isOriginal()
      };
      // Push this item into the tile list that will be stored
      json.push(item);
    }
    return JSON.stringify(json);
  }

  /*
   * Loads the game stored in the localstorage or starts a new game.
   */
  loadGame(){
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
      // There is not a gameboard saved, so just initialize a new game
      this.resetGame();
      return;
    }else{
      // There was a stored game
      // Fill the gameboard with the contents of the saved gameboard
      for(let i = 0; i < this.getView().getGameboard().getTiles().length; i++){
        this.getView().getGameboard().getTiles()[i].setValue(
          storedGameboard[i].value);
        this.getView().getGameboard().getTiles()[i].setIsOriginal(
          storedGameboard[i].original);
      }
      // Instead of having every thing stored in the localstorage just call all
      // of the checks that could cause something the in the game to be changed
      // based on the gameboard.
      this.checkTilesForSameAsSelectedValue();
      this.checkTilesForConflicts();
      this.getView().getGameboard().update();
      this.checkIfSelectionTilesAreDone();
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
    // DEBUG.log(elapsed);
    window.localStorage.setItem("timeElapsed", JSON.stringify(elapsed));
    this.getView().getClock().setTime(elapsed);
  };



}
