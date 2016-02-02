'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameTopBox = require('./game-top-box.js');
var GameStatsBox = require('./game-stats-box.js');
var GameBoard = require('./game-board.js');
var SelectionsBox = require('./selections-box.js');

var App = function App() {
    _classCallCheck(this, App);

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
};

var app = new App();