let Debug = require('../../debug');
let View = require('../view');

let GameBoard = require('./elements/gameboard');

let DEBUG = new Debug('GameView');

module.exports =
class GameView extends View {
  constructor() {
    super(VIEW_ID.GAME);
    DEBUG.log('Loading');

    this.initBoard();

  }

  initBoard(){
    this.gameBoard = new GameBoard();
    this.addElement(this.gameBoard.getElement());
  }


}
