'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameTopBox = require('./game-top-box');
var GameStatsBox = require('./game-stats-box');
var GameBoard = require('./game-board');
var SelectionsBox = require('./selections-box');
var View = require('./view');

module.exports = function (_View) {
  _inherits(Game, _View);

  function Game() {
    _classCallCheck(this, Game);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Game).call(this, VIEW_ID.GAME));

    console.log("Starting Game");
    // this.containerElem = document.getElementById('app-container');
    _this.containerElem = document.createElement('div');
    _this.containerElem.classList.add('game-container');
    _this.addElement(_this.getElement());

    _this.gameBoard = new GameBoard();
    _this.gameTopBox = new GameTopBox(_this.gameBoard);
    _this.gameStatsBox = new GameStatsBox(_this.gameBoard);
    _this.selectionsBox = new SelectionsBox(_this.gameBoard);
    _this.gameBoard.setSelectionsBox(_this.selectionsBox);

    _this.containerElem.appendChild(_this.gameTopBox.getElement());
    _this.containerElem.appendChild(_this.gameStatsBox.getElement());
    _this.containerElem.appendChild(_this.gameBoard.getElement());
    _this.containerElem.appendChild(_this.selectionsBox.getElement());

    return _this;
  }

  _createClass(Game, [{
    key: 'getElement',
    value: function getElement() {
      return this.containerElem;
    }
  }]);

  return Game;
}(View);