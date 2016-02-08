'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Debug = require('../../debug');
var ViewController = require('../view-controller');
var GameView = require('./game-view');
var QQWING = require('../../libs/qqwing-1.3.4/qqwing-1.3.4');

var DEBUG = new Debug('Game');

module.exports = function (_ViewController) {
  _inherits(Game, _ViewController);

  function Game() {
    _classCallCheck(this, Game);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Game).call(this, new GameView()));

    DEBUG.log('Loading.');

    _this.qqwing = new QQWING();

    // Selected tile will be highlighted. When a selection tile is pressed it
    // will attempt to place that value on the selected tile.
    _this.selectedTile = null;
    _this.randomlySetSelectedTile();

    //
    _this.initGamboardTileEvents();

    //
    _this.initSelectionTileEvents();

    //
    _this.initEraseTileButtonEvents();

    //
    _this.initNewGameButtonEvents();

    //
    _this.loadGame();
    _this.startTimer();
    document.addEventListener("pause", function (e) {
      _this.stopTimer();
    }, false);

    document.addEventListener("resume", function (e) {
      _this.startTimer();
    }, false);
    return _this;
  }

  /*
   *
   */

  _createClass(Game, [{
    key: 'initGamboardTileEvents',
    value: function initGamboardTileEvents() {
      var _this2 = this;

      var tmpTiles = this.getView().getGameboard().getTiles();

      var _loop = function _loop(i) {
        //
        tmpTiles[i].getElement().addEventListener(TOUCH_START_EVENT, function () {
          _this2.setSelectedTile(i);
        });
        //
        tmpTiles[i].setOnValueChangeEvent(function () {
          if (tmpTiles[i].getTileId() === _this2.getSelectedTile().getTileId()) {
            _this2.checkTilesForSameAsSelectedValue();
            _this2.checkTilesForConflicts();
            _this2.getView().getGameboard().updateTileStyles();
          }
          _this2.saveGame();
        });
      };

      for (var i = 0; i < tmpTiles.length; i++) {
        _loop(i);
      }
    }

    /*
     *
     */

  }, {
    key: 'initSelectionTileEvents',
    value: function initSelectionTileEvents() {
      var _this3 = this;

      var tmpSelectionTiles = this.getView().getSelectionTiles();

      var _loop2 = function _loop2(i) {
        tmpSelectionTiles[i].getElement().addEventListener(TOUCH_START_EVENT, function () {
          _this3.setSelectedTileValue(tmpSelectionTiles[i].getValue());
          // Check if this value is done
          _this3.checkIfSelectionTileIsDone(tmpSelectionTiles[i]);
          _this3.saveGame();
        });
      };

      for (var i = 0; i < tmpSelectionTiles.length; i++) {
        _loop2(i);
      }
    }

    /*
     *
     */

  }, {
    key: 'initEraseTileButtonEvents',
    value: function initEraseTileButtonEvents() {
      var _this4 = this;

      this.getView().getEraseTileButton().getElement().addEventListener(TOUCH_START_EVENT, function () {
        if (_this4.getSelectedTile().isOriginal() === false) {
          var valueBefore = _this4.getSelectedTile().getValue();
          _this4.getSelectedTile().setValue('0');
          _this4.checkTilesForSameAsSelectedValue();
          _this4.checkTilesForConflicts();
          _this4.getView().getGameboard().updateTileStyles();
          // Check of the selection tiles are done.
          // By unsetting a tile it could make a tile available again
          var tmpSelectionTiles = _this4.getView().getSelectionTiles();
          for (var i = 0; i < tmpSelectionTiles.length; i++) {
            if (tmpSelectionTiles[i].getValue() === valueBefore) {
              _this4.checkIfSelectionTileIsDone(tmpSelectionTiles[i]);
              i = tmpSelectionTiles.length + 1;
            }
          }
        }
        _this4.saveGame();
      });
    }

    /*
     *
     */

  }, {
    key: 'initNewGameButtonEvents',
    value: function initNewGameButtonEvents() {
      var _this5 = this;

      this.getView().getNewGameButton().getElement().addEventListener(TOUCH_START_EVENT, function () {
        _this5.resetGame();
      });
    }

    /*
     *
     */

  }, {
    key: 'checkIfSelectionTileIsDone',
    value: function checkIfSelectionTileIsDone(selectionTile) {
      var tmpGameboardTiles = this.getView().getGameboard().getTiles();
      var count = 0;
      for (var i = 0; i < tmpGameboardTiles.length; i++) {
        if (tmpGameboardTiles[i].getValue() === selectionTile.getValue()) {
          count++;
        }
      }
      DEBUG.log(count);
      if (count >= 9) {
        selectionTile.setDone(true);
        selectionTile.update();
      } else {
        selectionTile.setDone(false);
        selectionTile.update();
      }
    }

    /*
     *
     */

  }, {
    key: 'getSelectedTile',
    value: function getSelectedTile() {
      return this.selectedTile;
    }

    /*
     *
     */

  }, {
    key: 'setSelectedTile',
    value: function setSelectedTile(tile_i) {
      // If a tile is already selected unselect it
      if (this.getSelectedTile() !== undefined && this.getSelectedTile() !== null) {
        // Check if the tile is already selected
        if (this.getView().getGameboard().getTiles()[tile_i].getTileId() === this.getSelectedTile().getTileId()) {
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

  }, {
    key: 'setSelectedTileValue',
    value: function setSelectedTileValue(v) {
      //
      if (this.getSelectedTile().isOriginal() === false && this.getSelectedTile().isEmpty() === true) {
        //
        this.getSelectedTile().setValue(v);
        this.saveGame();
      }
    }

    /*
     *
     */

  }, {
    key: 'randomlySetSelectedTile',
    value: function randomlySetSelectedTile() {
      this.setSelectedTile(Math.floor(Math.random() * this.getView().getGameboard().getTiles().length));
    }

    /*
     *
     */

  }, {
    key: 'resetGame',
    value: function resetGame() {
      this.qqwing.generatePuzzle();
      this.qqwing.setPrintStyle(QQWING.PrintStyle.ONE_LINE);
      var t = this.qqwing.getSolutionString();
      for (var i = 0; i < this.getView().getGameboard().getTiles().length; i++) {
        if (t[i] === '.') {
          this.getView().getGameboard().getTiles()[i].setValue('0');
          this.getView().getGameboard().getTiles()[i].setIsOriginal(false);
        } else {
          this.getView().getGameboard().getTiles()[i].setValue(t[i]);
          this.getView().getGameboard().getTiles()[i].setIsOriginal(true);
        }
      }
      this.checkTilesForSameAsSelectedValue();
      this.checkTilesForConflicts();
      this.getView().getGameboard().update();
      window.localStorage.setItem("timeElapsed", JSON.stringify(0));
      this.saveGame();
    }

    /*
     *
     */

  }, {
    key: 'checkTilesForSameAsSelectedValue',
    value: function checkTilesForSameAsSelectedValue() {
      var tmpTiles = this.getView().getGameboard().getTiles();
      for (var i = 0; i < tmpTiles.length; i++) {
        if (this.getSelectedTile().getTileId() !== tmpTiles[i].getTileId() && tmpTiles[i].getValue() === this.getSelectedTile().getValue()) {
          //
          tmpTiles[i].setIsSameValue(true);
        } else {
          //
          tmpTiles[i].setIsSameValue(false);
        }
      }
    }

    /*
     *
     */

  }, {
    key: 'checkTilesForConflicts',
    value: function checkTilesForConflicts() {
      // TODO: Fix this horrible performance mess of a method
      var tmpTiles = this.getView().getGameboard().getTiles();
      // Clear the conflicts
      for (var i = 0; i < tmpTiles.length; i++) {
        tmpTiles[i].setHasConflict(false);
      }
      // Check the tiles in the same block
      var blockTilesByValue = {
        'A': [[], [], [], [], [], [], [], [], []], // Top Left block
        'B': [[], [], [], [], [], [], [], [], []], // Top middle block
        'C': [[], [], [], [], [], [], [], [], []], // Top might Block
        'D': [[], [], [], [], [], [], [], [], []], // Middle left block
        'E': [[], [], [], [], [], [], [], [], []], // Middle middle block
        'F': [[], [], [], [], [], [], [], [], []], // Middle right block
        'G': [[], [], [], [], [], [], [], [], []], // Bottom left block
        'H': [[], [], [], [], [], [], [], [], []], // Bottom middle block
        'I': [[], [], [], [], [], [], [], [], []] // Bottom right block
      };
      var blockChar = null;
      var blockNum = null;
      var tileValue = null;
      for (var i = 0; i < tmpTiles.length; i++) {
        if (tmpTiles[i].isEmpty() === false) {
          blockChar = tmpTiles[i].getTileId().charAt(0);
          tileValue = parseInt(tmpTiles[i].getValue());
          blockTilesByValue[blockChar][tileValue - 1].push(tmpTiles[i]);
        }
      }
      //
      var blockChars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
      for (var i = 0; i < blockChars.length; i++) {
        for (var j = 0; j < blockTilesByValue[blockChars[i]].length; j++) {
          if (blockTilesByValue[blockChars[i]][j].length > 1) {
            for (var k = 0; k < blockTilesByValue[blockChars[i]][j].length; k++) {
              blockTilesByValue[blockChars[i]][j][k].setHasConflict(true);
            }
          }
        }
      }
      // Check for row conflicts
      for (var i = 0; i < tmpTiles.length; i++) {
        if (tmpTiles[i].isEmpty() === false) {
          blockChar = tmpTiles[i].getTileId().charAt(0);
          blockNum = parseInt(tmpTiles[i].getTileId().charAt(1));
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
      for (var i = 0; i < tmpTiles.length; i++) {
        if (tmpTiles[i].isEmpty() === false) {
          blockChar = tmpTiles[i].getTileId().charAt(0);
          blockNum = parseInt(tmpTiles[i].getTileId().charAt(1));
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
     *
     */

  }, {
    key: 'checkLineForConflict',
    value: function checkLineForConflict(tmpTiles, i, char1, char2, char3, num1, num2, num3) {
      var blockChar = tmpTiles[i].getTileId().charAt(0);
      var blockNum = parseInt(tmpTiles[i].getTileId().charAt(1));
      if (blockChar === char1 || blockChar === char2 || blockChar === char3) {
        if (blockNum === num1 || blockNum === num2 || blockNum === num3) {
          for (var j = 0; j < tmpTiles.length; j++) {
            var blockChar2 = tmpTiles[j].getTileId().charAt(0);
            var blockNum2 = parseInt(tmpTiles[j].getTileId().charAt(1));
            var tileValue2 = parseInt(tmpTiles[j].getValue());
            if (blockChar2 === char1 || blockChar2 === char2 || blockChar2 === char3) {
              if (blockNum2 === num1 || blockNum2 === num2 || blockNum2 === num3) {
                if (tmpTiles[i].getTileId() !== tmpTiles[j].getTileId() && tmpTiles[i].getValue() === tmpTiles[j].getValue()) {
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
     *
     */

  }, {
    key: 'gameboardToJSONString',
    value: function gameboardToJSONString() {
      var json = [];
      var tmpTiles = this.getView().getGameboard().getTiles();
      for (var i = 0; i < tmpTiles.length; i++) {
        var item = {
          value: tmpTiles[i].getValue(),
          original: tmpTiles[i].isOriginal()
        };
        json.push(item);
      }
      return JSON.stringify(json);
    }

    /*
     *
     */

  }, {
    key: 'loadGame',
    value: function loadGame() {
      // this.resetGame();
      // Check if version changed
      var storedVersion = JSON.parse(window.localStorage.getItem('version'));
      if (storedVersion) {
        if (storedVersion !== VERSION) {
          this.resetGame();
          return;
        }
      } else {
        window.localStorage.setItem("version", VERSION);
      }
      // Check if there is a stored gameboard
      var storedGameboard = JSON.parse(window.localStorage.getItem('gameboard'));
      if (!storedGameboard) {
        this.resetGame();
        return;
      } else {
        // console.log(storedGameboard);
        for (var i = 0; i < this.getView().getGameboard().getTiles().length; i++) {
          this.getView().getGameboard().getTiles()[i].setValue(storedGameboard[i].value);
          this.getView().getGameboard().getTiles()[i].setIsOriginal(storedGameboard[i].original);
        }
        this.checkTilesForSameAsSelectedValue();
        this.checkTilesForConflicts();
        this.getView().getGameboard().update();
        var tmpSelectionTiles = this.getView().getSelectionTiles();
        for (var i = 0; i < tmpSelectionTiles.length; i++) {
          this.checkIfSelectionTileIsDone(tmpSelectionTiles[i]);
        }
      }
    }

    /*
     *
     */

  }, {
    key: 'saveGame',
    value: function saveGame() {
      window.localStorage.setItem("gameboard", this.gameboardToJSONString());
    }

    /*
     *
     */

  }, {
    key: 'startTimer',
    value: function startTimer() {
      var _this6 = this;

      this.startTime = Date.now();
      this.timerInterval = setInterval(function () {
        _this6.timerIntervalFunc();
      }, 1000);
    }

    /*
     *
     */

  }, {
    key: 'stopTimer',
    value: function stopTimer() {
      clearInterval(this.timerInterval);
    }

    /*
     *
     */

  }, {
    key: 'timerIntervalFunc',
    value: function timerIntervalFunc() {
      var endTime = Date.now();
      var elapsed = endTime - this.startTime;
      this.startTime = endTime;

      var tmpTimeElapsed = JSON.parse(window.localStorage.getItem("timeElapsed"));
      if (tmpTimeElapsed) {
        elapsed = elapsed + tmpTimeElapsed;
      }
      DEBUG.log(elapsed);
      window.localStorage.setItem("timeElapsed", JSON.stringify(elapsed));
      this.getView().getClock().setTime(elapsed);
    }
  }]);

  return Game;
}(ViewController);