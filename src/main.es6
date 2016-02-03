let GameTopBox = require('./game-top-box.js');
let GameStatsBox = require('./game-stats-box.js');
let GameBoard = require('./game-board.js');
let SelectionsBox = require('./selections-box.js');

class App {
  constructor() {
    console.log("Starting MB Sudoku");
    this.containerElem = document.getElementById('app-container');



    this.gameBoard = new GameBoard();
    this.gameTopBox = new GameTopBox(this.gameBoard);
    this.gameStatsBox = new GameStatsBox(this.gameBoard);
    this.selectionsBox = new SelectionsBox(this.gameBoard);

    this.containerElem.appendChild(this.gameTopBox.getElement());
    this.containerElem.appendChild(this.gameStatsBox.getElement());
    this.containerElem.appendChild(this.gameBoard.getElement());
    this.containerElem.appendChild(this.selectionsBox.getElement());

  }
}

let app = new App();
