let GameTopBox = require('./game-top-box');
let GameStatsBox = require('./game-stats-box');
let GameBoard = require('./game-board');
let SelectionsBox = require('./selections-box');
let View = require('./view');

module.exports =
class Game extends View {
  constructor() {
    super(VIEW_ID.GAME);

    console.log("Starting Game");
    // this.containerElem = document.getElementById('app-container');
    this.containerElem = document.createElement('div');
    this.containerElem.classList.add('game-container');
    this.addElement(this.getElement());


    this.gameBoard = new GameBoard();
    this.gameTopBox = new GameTopBox(this.gameBoard);
    this.gameStatsBox = new GameStatsBox(this.gameBoard);
    this.selectionsBox = new SelectionsBox(this.gameBoard);
    this.gameBoard.setSelectionsBox(this.selectionsBox);

    this.containerElem.appendChild(this.gameTopBox.getElement());
    this.containerElem.appendChild(this.gameStatsBox.getElement());
    this.containerElem.appendChild(this.gameBoard.getElement());
    this.containerElem.appendChild(this.selectionsBox.getElement());

  }

  getElement(){
    return this.containerElem;
  }


}
