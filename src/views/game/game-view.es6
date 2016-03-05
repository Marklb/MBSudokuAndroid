let Debug = require('../../debug');
let View = require('../view');

let Gameboard = require('./elements/gameboard');
let GameboardTile = require('./elements/gameboard-tile');
let SelectionTile = require('./elements/selection-tile');
let EraseTileButton = require('./elements/erase-tile-button');
let NewGameButton = require('./elements/new-game-button');
let TopTitle = require('./elements/top-title');
let Clock = require('./elements/clock');
let HintButton = require('./elements/hint-button');
let HistoryNextButton = require('./elements/history-next-button');
let HistoryPrevButton = require('./elements/history-prev-button');

let DEBUG = new Debug('GameView');

const CSS_CLASSES = {
  GAME_VIEW: 'game-view'
};


module.exports =
class GameView extends View {
  constructor() {
    super(VIEW_ID.GAME);
    // DEBUG.log('Loading');
    this.addClass(CSS_CLASSES.GAME_VIEW);

    this.initGameboard();
    this.initSelectionTiles();
    this.initEraseTileButton();
    this.initNewGameButton();
    this.initTopTitle();
    this.initClock();
    this.initHintButton();
    this.initHistoryPrevButton();
    this.initHistoryNextButton();

  }

  /*
   *
   */
  initGameboard(){
    // Initialize gameboard element
    this.gameboard = new Gameboard();
    // Add gameboard to the view
    this.addElement(this.getGameboard().getElement());

    // Set gameboard location
    this.getGameboard().setPosition(
      (5), // x
      (50) // y
    );
    // Set gameboard size
    let tmp = 0;
    if(this.getWidth() > this.getHeight()){
      tmp = this.getHeight();
    }else{
      tmp = this.getWidth();
    }
    this.getGameboard().setSize(
      (tmp-10), // width
      (tmp-10) // height
    );

    this.initGameboardTiles();

    // Update the gameboard to set the gameboard element positions
    this.getGameboard().update();

  }

  /*
   *
   */
  initGameboardTiles(){
    for(let i = 0; i < 9; i++){
      for(let j = 0; j < 9; j++){
        let tmpTile = new GameboardTile(j, i);
        // Add tile to the view
        this.addElement(tmpTile.getElement());
        // Add tile to the gameboard, so the gameboard can handle its position
        this.getGameboard().addTile(tmpTile);
      }
    }
  }

  /*
   *
   */
  initSelectionTiles(){
    this.selectionTiles = [];
    for(let i = 0; i < 9; i++){
      //
      let tmpTile = new SelectionTile();
      this.addElement(tmpTile.getElement());
      //
      let sPadding = 5;
      let w = this.getWidth()-(sPadding*2);
      let tileSize = ((w-(sPadding*8))/9);
      //
      tmpTile.setPosition(
        sPadding+(i*sPadding)+(i*tileSize),
        this.getGameboard().getY()+this.getGameboard().getHeight()+tileSize+10
      );
      tmpTile.setSize(tileSize,tileSize);
      //
      tmpTile.setValue(i+1);
      //
      tmpTile.update();
      //
      this.getSelectionTiles().push(tmpTile);
    }
  }

  /*
   *
   */
  initEraseTileButton(){
    this.eraseTileButton = new EraseTileButton();
    //
    this.addElement(this.getEraseTileButton().getElement());
    //
    this.eraseTileButton.setPosition(
      this.getSelectionTiles()[8].getX(),
      this.getGameboard().getY()+this.getGameboard().getWidth()+5
    );
    //
    this.eraseTileButton.setSize(
      this.getSelectionTiles()[0].getWidth(),
      this.getSelectionTiles()[0].getHeight()
    );
    // TODO: Remove placeholder value
    this.getEraseTileButton().setValue('X');
    //
    this.getEraseTileButton().update();
  }

  /*
   *
   */
  initNewGameButton(){
    this.newGameButton = new NewGameButton();
    this.addElement(this.getNewGameButton().getElement());
    this.getNewGameButton().setValue('Reset');
    this.getNewGameButton().setSize(90, 30);
    this.getNewGameButton().setPosition(
      this.getWidth()-this.getNewGameButton().getWidth()-5,
      5
    );
    this.getNewGameButton().update();
  }

  /*
   *
   */
  initTopTitle(){
    this.topTitle = new TopTitle();
    this.addElement(this.getTopTitle().getElement());
    this.getTopTitle().setValue('MB Sudoku');
    this.getTopTitle().setSize(130, 30);
    this.getTopTitle().setPosition(
      5,
      5
    );
    this.getTopTitle().update();
  }

  /*
   *
   */
  getTopTitle(){
    return this.topTitle;
  }

  /*
   *
   */
  initClock(){
    this.clock = new Clock();
    this.addElement(this.getClock().getElement());
    this.getClock().setValue('00:00:00');
    this.getClock().setSize(130, 30);
    this.getClock().setPosition(
      this.getTopTitle().getX()+this.getTopTitle().getWidth()+5,
      5
    );
    this.getClock().update();
  }

  /*
   *
   */
  initHintButton(){
    this.hintButton = new HintButton();
    //
    this.addElement(this.getHintButton().getElement());
    //
    this.hintButton.setPosition(
      this.getSelectionTiles()[0].getX()+10,
      this.getGameboard().getY()+this.getGameboard().getWidth()+15
    );
    //
    this.hintButton.setSize(
      this.getSelectionTiles()[0].getWidth()
        +(this.getSelectionTiles()[0].getWidth()/2)-40,
      this.getSelectionTiles()[0].getHeight()-20
    );
    // TODO: Remove placeholder value
    this.getHintButton().setValue('H');
    //
    this.getHintButton().update();
  }

  /*
   *
   */
  getHintButton(){
    return this.hintButton;
  }

  /*
   *
   */
  initHistoryPrevButton(){
    this.historyPrevButton = new HistoryPrevButton();
    //
    this.addElement(this.getHistoryPrevButton().getElement());
    //
    this.historyPrevButton.setPosition(
      // this.getHistoryNextButton().getX()
      //   +this.getHistoryNextButton().getWidth()+5,
      this.getHintButton().getX()+this.getHintButton().getWidth()+15,
      this.getGameboard().getY()+this.getGameboard().getWidth()+15
    );
    //
    this.historyPrevButton.setSize(
      this.getSelectionTiles()[0].getWidth(),
      this.getSelectionTiles()[0].getHeight()-20
    );
    // TODO: Remove placeholder value
    this.getHistoryPrevButton().setValue('<-');
    //
    this.getHistoryPrevButton().update();
  }

  /*
   *
   */
  getHistoryPrevButton(){
    return this.historyPrevButton;
  }

  /*
   *
   */
  initHistoryNextButton(){
    this.historyNextButton = new HistoryNextButton();
    //
    this.addElement(this.getHistoryNextButton().getElement());
    //
    this.historyNextButton.setPosition(
      // this.getHintButton().getX()+this.getHintButton().getWidth()+5,
      this.getHistoryPrevButton().getX()
        +this.getHistoryPrevButton().getWidth()+5,
      this.getGameboard().getY()+this.getGameboard().getWidth()+15
    );
    //
    this.historyNextButton.setSize(
      this.getSelectionTiles()[0].getWidth(),
      this.getSelectionTiles()[0].getHeight()-20
    );
    // TODO: Remove placeholder value
    this.getHistoryNextButton().setValue('->');
    //
    this.getHistoryNextButton().update();
  }

  /*
   *
   */
  getHistoryNextButton(){
    return this.historyNextButton;
  }

  /*
   *
   */
  getClock(){
    return this.clock;
  }

  /*
   *
   */
  getNewGameButton(){
    return this.newGameButton;
  }

  /*
   *
   */
  getEraseTileButton(){
    return this.eraseTileButton;
  }


  /*
   *
   */
  getSelectionTiles(){
    return this.selectionTiles;
  }

  /*
   *
   */
  getGameboard(){
    return this.gameboard;
  }



}
