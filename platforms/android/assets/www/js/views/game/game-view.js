'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Debug = require('../../debug');
var View = require('../view');

var Gameboard = require('./elements/gameboard');
var GameboardTile = require('./elements/gameboard-tile');
var SelectionTile = require('./elements/selection-tile');
var EraseTileButton = require('./elements/erase-tile-button');
var NewGameButton = require('./elements/new-game-button');
var TopTitle = require('./elements/top-title');
var Clock = require('./elements/clock');

var DEBUG = new Debug('GameView');

var CSS_CLASSES = {
  GAME_VIEW: 'game-view'
};

module.exports = function (_View) {
  _inherits(GameView, _View);

  function GameView() {
    _classCallCheck(this, GameView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GameView).call(this, VIEW_ID.GAME));

    DEBUG.log('Loading');
    _this.addClass(CSS_CLASSES.GAME_VIEW);

    _this.initGameboard();
    _this.initSelectionTiles();
    _this.initEraseTileButton();
    _this.initNewGameButton();
    _this.initTopTitle();
    _this.initClock();

    return _this;
  }

  /*
   *
   */

  _createClass(GameView, [{
    key: 'initGameboard',
    value: function initGameboard() {
      // Initialize gameboard element
      this.gameboard = new Gameboard();
      // Add gameboard to the view
      this.addElement(this.getGameboard().getElement());

      // Set gameboard location
      this.getGameboard().setPosition(5, // x
      50);
      // Set gameboard size
      // y
      var tmp = 0;
      if (this.getWidth() > this.getHeight()) {
        tmp = this.getHeight();
      } else {
        tmp = this.getWidth();
      }
      this.getGameboard().setSize(tmp - 10, // width
      tmp - 10);

      // height
      this.initGameboardTiles();

      // Update the gameboard to set the gameboard element positions
      this.getGameboard().update();
    }

    /*
     *
     */

  }, {
    key: 'initGameboardTiles',
    value: function initGameboardTiles() {
      for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
          var tmpTile = new GameboardTile(j, i);
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

  }, {
    key: 'initSelectionTiles',
    value: function initSelectionTiles() {
      this.selectionTiles = [];
      for (var i = 0; i < 9; i++) {
        //
        var tmpTile = new SelectionTile();
        this.addElement(tmpTile.getElement());
        //
        var sPadding = 5;
        var w = this.getWidth() - sPadding * 2;
        var tileSize = (w - sPadding * 8) / 9;
        //
        tmpTile.setPosition(sPadding + i * sPadding + i * tileSize, this.getGameboard().getY() + this.getGameboard().getHeight() + tileSize + 10);
        tmpTile.setSize(tileSize, tileSize);
        //
        tmpTile.setValue(i + 1);
        //
        tmpTile.update();
        //
        this.getSelectionTiles().push(tmpTile);
      }
    }

    /*
     *
     */

  }, {
    key: 'initEraseTileButton',
    value: function initEraseTileButton() {
      this.eraseTileButton = new EraseTileButton();
      //
      this.addElement(this.getEraseTileButton().getElement());
      //
      this.eraseTileButton.setPosition(this.getSelectionTiles()[8].getX(), this.getGameboard().getY() + this.getGameboard().getWidth() + 5);
      //
      this.eraseTileButton.setSize(this.getSelectionTiles()[0].getWidth(), this.getSelectionTiles()[0].getHeight());
      // TODO: Remove placeholder value
      this.getEraseTileButton().setValue('X');
      //
      this.getEraseTileButton().update();
    }

    /*
     *
     */

  }, {
    key: 'initNewGameButton',
    value: function initNewGameButton() {
      this.newGameButton = new NewGameButton();
      this.addElement(this.getNewGameButton().getElement());
      this.getNewGameButton().setValue('Reset');
      this.getNewGameButton().setSize(90, 30);
      this.getNewGameButton().setPosition(this.getWidth() - this.getNewGameButton().getWidth() - 5, 5);
      this.getNewGameButton().update();
    }

    /*
     *
     */

  }, {
    key: 'initTopTitle',
    value: function initTopTitle() {
      this.topTitle = new TopTitle();
      this.addElement(this.getTopTitle().getElement());
      this.getTopTitle().setValue('MB Sudoku');
      this.getTopTitle().setSize(130, 30);
      this.getTopTitle().setPosition(5, 5);
      this.getTopTitle().update();
    }

    /*
     *
     */

  }, {
    key: 'getTopTitle',
    value: function getTopTitle() {
      return this.topTitle;
    }

    /*
     *
     */

  }, {
    key: 'initClock',
    value: function initClock() {
      this.clock = new Clock();
      this.addElement(this.getClock().getElement());
      this.getClock().setValue('00:00:00');
      this.getClock().setSize(130, 30);
      this.getClock().setPosition(this.getTopTitle().getX() + this.getTopTitle().getWidth() + 5, 5);
      this.getClock().update();
    }

    /*
     *
     */

  }, {
    key: 'getClock',
    value: function getClock() {
      return this.clock;
    }

    /*
     *
     */

  }, {
    key: 'getNewGameButton',
    value: function getNewGameButton() {
      return this.newGameButton;
    }

    /*
     *
     */

  }, {
    key: 'getEraseTileButton',
    value: function getEraseTileButton() {
      return this.eraseTileButton;
    }

    /*
     *
     */

  }, {
    key: 'getSelectionTiles',
    value: function getSelectionTiles() {
      return this.selectionTiles;
    }

    /*
     *
     */

  }, {
    key: 'getGameboard',
    value: function getGameboard() {
      return this.gameboard;
    }
  }]);

  return GameView;
}(View);