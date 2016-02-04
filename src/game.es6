let GameTopBox = require('./game-top-box.js');
let GameStatsBox = require('./game-stats-box.js');
let GameBoard = require('./game-board.js');
let SelectionsBox = require('./selections-box.js');
let View = require('./view.js');

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
