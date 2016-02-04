'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function GameTopBox(gameBoard) {
    var _this = this;

    _classCallCheck(this, GameTopBox);

    this.gameBoard = gameBoard;
    console.log('Creating Game Top Box');
    this.containerElem = document.createElement('div');
    this.containerElem.classList.add('game-top-box');

    this.menuButtonElem = document.createElement('div');
    this.menuButtonElem.classList.add('menu-btn');
    this.menuButtonElem.textContent = "X";
    this.containerElem.appendChild(this.menuButtonElem);
    // this.menuButtonElem.addEventListener('mousedown', (e) => {
    this.menuButtonElem.addEventListener('touchstart', function (e) {
      // this.gameBoard.newGame();
      // let solution = this.gameBoard.getSolution();
      // console.log(solution);
      app.showView(VIEW_ID.MAIN_MENU);
    });

    this.titleElem = document.createElement('div');
    this.titleElem.classList.add('title');
    this.titleElem.textContent = "MB Sudoku";
    this.containerElem.appendChild(this.titleElem);

    this.resetBtnElem = document.createElement('div');
    this.resetBtnElem.classList.add('reset-btn');
    this.resetBtnElem.textContent = "X";
    this.containerElem.appendChild(this.resetBtnElem);
    // this.resetBtnElem.addEventListener('mousedown', (e) => {
    this.resetBtnElem.addEventListener('touchstart', function (e) {
      _this.gameBoard.newGame();
    });
  }

  _createClass(GameTopBox, [{
    key: 'getElement',
    value: function getElement() {
      return this.containerElem;
    }
  }]);

  return GameTopBox;
}();