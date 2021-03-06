'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Debug = require('../../debug');
var ViewController = require('../view-controller');
var GameView = require('./game-view');
var MbSudoku = require('../../mb_sudoku');

var DEBUG = new Debug('Game');

var LOCAL_STORAGE_KEYS = {
  GAME_DIFFICULTY: 'game-difficulty',
  ORIGINAL_GAMEBOARD: 'game-original-gameboard',
  SOLUTION: 'game-solution',
  GAMEBOARD: 'game-gameboard',
  TIME_ELAPSED: 'game-time-elapsed'
};

module.exports = function (_ViewController) {
  _inherits(Game, _ViewController);

  function Game() {
    _classCallCheck(this, Game);

    // DEBUG.log('Loading.');

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Game).call(this, new GameView()));

    _this.mbSudoku = new MbSudoku();
    _this.difficulty = MbSudoku.DIFFICULIES.EXPERT; // Default to expert

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
    _this.initHintButtonEvents();

    //
    _this.initTimer();

    return _this;
  }

  /*
   *
   */

  _createClass(Game, [{
    key: 'onShowView',
    value: function onShowView() {
      _get(Object.getPrototypeOf(Game.prototype), 'onShowView', this).call(this);
      DEBUG.log('OnShowView');
      //
      this.loadGame();
    }

    /*
     *
     */

  }, {
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
          // Add this selection to the history
          // TODO: Add history entry
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
        _this5.newGame();
      });
    }

    /*
     *
     */

  }, {
    key: 'initHintButtonEvents',
    value: function initHintButtonEvents() {
      var _this6 = this;

      this.getView().getHintButton().getElement().addEventListener(TOUCH_START_EVENT, function () {
        DEBUG.log('Clicked Hint');
        // Create tiles string
        var hint = _this6.getPuzzleHint();
        // DEBUG.log(hint);
      });
    }

    /*
     *
     */

  }, {
    key: 'getPuzzleHint',
    value: function getPuzzleHint() {
      // Get the current puzzle as a string
      var puzzle = this.getPuzzleString();
      DEBUG.log(puzzle);
      // Get the empty indexes
      var emptyIndexes = [];
      for (var i = 0; i < puzzle.length; i++) {
        if (puzzle[i] === '.') {
          emptyIndexes.push(i);
        }
      }
      DEBUG.log('Empty indexes');
      console.log(emptyIndexes);
      // Get a random empty tile index
      var randInd = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
      console.log(randInd);
      console.log(this.getSolution());
      console.log(this.getSolution()[randInd]);
    }

    /*
     *
     */

  }, {
    key: 'getPuzzleString',
    value: function getPuzzleString() {
      var s = '';
      var tiles = this.getView().getGameboard().getTiles();
      for (var i = 0; i < tiles.length; i++) {
        var val = tiles[i].getValue();
        if (val === '0') {
          s += '.';
        } else {
          s += val.toString();
        }
      }
      return s;
    }

    /*
     *
     */

  }, {
    key: 'checkIfSelectionTilesAreDone',
    value: function checkIfSelectionTilesAreDone() {
      var tmpSelectionTiles = this.getView().getSelectionTiles();
      for (var i = 0; i < tmpSelectionTiles.length; i++) {
        this.checkIfSelectionTileIsDone(tmpSelectionTiles[i]);
      }
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
      var _this7 = this;

      //
      if (this.getSelectedTile().isOriginal() === false && this.getSelectedTile().isEmpty() === true) {
        (function () {
          //
          _this7.getSelectedTile().setValue(v);
          // Temporary way to handle spin on set
          _this7.getSelectedTile().addClass('rotate');
          var t = setInterval(function () {
            _this7.getSelectedTile().removeClass('rotate');
            _this7.getSelectedTile().addClass('unrotate');
            _this7.getSelectedTile().removeClass('unrotate');
            clearInterval(t);
          }, 2000);
          _this7.saveGame();
        })();
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
    key: 'setDifficulty',
    value: function setDifficulty(diff) {
      this.difficulty = diff;
    }

    /*
     *
     */

  }, {
    key: 'getDifficulty',
    value: function getDifficulty() {
      return this.difficulty;
    }

    /*
     *
     */

  }, {
    key: 'setOriginalGameboard',
    value: function setOriginalGameboard(s) {
      this.originalGameboard = s;
    }

    /*
     *
     */

  }, {
    key: 'getOriginalGameboard',
    value: function getOriginalGameboard() {
      return this.originalGameboard;
    }

    /*
     *
     */

  }, {
    key: 'setSolution',
    value: function setSolution(s) {
      this.solution = s;
    }

    /*
     *
     */

  }, {
    key: 'getSolution',
    value: function getSolution() {
      return this.solution;
    }

    /*
     * Compares the currently selected tile against each other tile on the
     * gameboard. Each tile that has the same value as the selected tile will
     * have its same value state set.
     * Used to highlight the other tiles with the same value as the selected tile.
     */

  }, {
    key: 'checkTilesForSameAsSelectedValue',
    value: function checkTilesForSameAsSelectedValue() {
      // Get each tile on the gameboard.
      var tmpTiles = this.getView().getGameboard().getTiles();
      // Loop through each tile on the gameboard.
      for (var i = 0; i < tmpTiles.length; i++) {
        // If the tile is not itself and it has the same value, then its same
        // value state will be set.
        if (this.getSelectedTile().getTileId() !== tmpTiles[i].getTileId() && tmpTiles[i].getValue() === this.getSelectedTile().getValue()) {
          // The tile is not the selected tile and it has the same value.
          tmpTiles[i].setIsSameValue(true);
        } else {
          // The tile is either the selected tile or it doesn't have the same
          // value as the selected tile.
          tmpTiles[i].setIsSameValue(false);
        }
      }
    }

    /*
     * Checks each block for multiple tiles of the same value.
     * Checks each row for multiple tiles of the same value on the row.
     * Checks each column for multiple tiles of the same value on the column.
     */

  }, {
    key: 'checkTilesForConflicts',
    value: function checkTilesForConflicts() {
      // TODO: Fix this horrible mess of a method
      // Get all the tiles on the gameboard.
      var tmpTiles = this.getView().getGameboard().getTiles();
      // Clear the conflicts. This method will set all conflicts, but not remove
      // previous conflicts, so for now it is easiest to just rest them all to
      // have no conflicts.
      for (var i = 0; i < tmpTiles.length; i++) {
        tmpTiles[i].setHasConflict(false);
      }

      // Check the tiles in the same block.
      // An empty array for each possible value 1-9 is initialized for each block.
      // Each tile in the blocks will be added to its value array for its block.
      // The index of the array that the tile will be added to is its value-1.
      // If an array ends up having more than 1 tile, then that means there is
      // more than one of the same value in the block. Each tile in that array
      // will have its conflict state set.
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
        // If the tile has no value set, then there is no point in checking it
        // for a conflict
        if (tmpTiles[i].isEmpty() === false) {
          blockChar = tmpTiles[i].getTileId().charAt(0);
          tileValue = parseInt(tmpTiles[i].getValue());
          blockTilesByValue[blockChar][tileValue - 1].push(tmpTiles[i]);
        }
      }
      // Since there are not many blocks I just used this array to access the
      // the array for each block instead of iterating all the values for testing
      // simplicity. I may remove this and just iterate them if I decide to keep
      // this algorithm for testing the blocks.
      var blockChars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
      for (var i = 0; i < blockChars.length; i++) {
        // Loop through each value array in the block value arrays.
        for (var j = 0; j < blockTilesByValue[blockChars[i]].length; j++) {
          // Check if there is more than one of the same value tile
          if (blockTilesByValue[blockChars[i]][j].length > 1) {
            // There is more than one tile of the same value, so loop through
            // each of these tiles and set their conflict state.
            for (var k = 0; k < blockTilesByValue[blockChars[i]][j].length; k++) {
              blockTilesByValue[blockChars[i]][j][k].setHasConflict(true);
            }
          }
        }
      }

      // Check for row conflicts
      for (var i = 0; i < tmpTiles.length; i++) {
        // Loop through each tile in the gameboard and check the row of each tile
        // that has a value.
        if (tmpTiles[i].isEmpty() === false) {
          // Call the method to check for each row. The method to check the row
          // will do the check for if the tile is on its row and just return if
          // the tile is not on its row.

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
        // Loop through each tile in the gameboard and check the column of each
        // tile that has a value.
        if (tmpTiles[i].isEmpty() === false) {
          // Call the method to check for each column. The method to check the
          // column will do the check for if the tile is on its column and just
          // return if the tile is not on its column.

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
     * Checks to see if there is a tile conflict in a row or column.
     *
     * tmpTiles: List of tiles on the gameboard.
     * i: Index of the tile to check for a conflict.
     * char1-3: Characters representing the blocks to check.
     * num1-3: Numbers of the tiles in the blocks to check
     *
     * Note: To check a tile in the 2nd row of the gameboard.
     *       The first row contains the block ids:
     *         A4,A5,A6,B4,B5,B6,C4,C5,C6
     *       So, to check a tile in this row the char and num args would be:
     *         char1: 'A', char2: 'B', char3: 'C',
     *         num1: 4, num2: 5, num3: 6
     */

  }, {
    key: 'checkLineForConflict',
    value: function checkLineForConflict(tmpTiles, i, char1, char2, char3, num1, num2, num3) {
      // Get character and number of the tileId, which represent which tile is
      // being checked on the gameboard.
      var blockChar = tmpTiles[i].getTileId().charAt(0);
      var blockNum = parseInt(tmpTiles[i].getTileId().charAt(1));
      // Check if this tile is on the row/column
      if (blockChar === char1 || blockChar === char2 || blockChar === char3) {
        if (blockNum === num1 || blockNum === num2 || blockNum === num3) {
          // Loop through all the tiles to find another tile in this row/column
          for (var j = 0; j < tmpTiles.length; j++) {
            // Get the character and number of the tileId
            var blockChar2 = tmpTiles[j].getTileId().charAt(0);
            var blockNum2 = parseInt(tmpTiles[j].getTileId().charAt(1));
            // Check of this tile is on the row/column
            if (blockChar2 === char1 || blockChar2 === char2 || blockChar2 === char3) {
              if (blockNum2 === num1 || blockNum2 === num2 || blockNum2 === num3) {
                // Get the value of the tile
                var tileValue2 = parseInt(tmpTiles[j].getValue());
                // Make sure that the tile we are checking for conflicts for
                // doesn't try to conflict with itself and if it isn't itself,
                // check if the value of the other tile in the row/column has
                // the same value which would cause a conflict
                if (tmpTiles[i].getTileId() !== tmpTiles[j].getTileId() && tmpTiles[i].getValue() === tmpTiles[j].getValue()) {
                  // There is a conflict, so set the conflict state to true for
                  // both of the tiles that are conflicting with each other.
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
     * Returns a string that contains enough information about the gamebaord to
     * rebuild it when the game is reloaded.
     */

  }, {
    key: 'gameboardToJSONString',
    value: function gameboardToJSONString() {
      var json = []; // This is the object that will get JSON stringified
      // Get all the tiles on the gameboard
      var tmpTiles = this.getView().getGameboard().getTiles();
      // For each tile on the gameboard, store the value and whether it is an
      // original tile, since everything else currently stored on the tiles can
      // be recalculated once the gameboard has this information.
      for (var i = 0; i < tmpTiles.length; i++) {
        var item = {
          value: tmpTiles[i].getValue(),
          original: tmpTiles[i].isOriginal()
        };
        // Push this item into the tile list that will be stored
        json.push(item);
      }
      return JSON.stringify(json);
    }

    /*
     *
     */

  }, {
    key: 'setTileStates',
    value: function setTileStates() {}
    // TODO: Implement this

    //===========================================================================
    //
    // History
    //
    //===========================================================================

    /*
     *
     */

  }, {
    key: 'clearHistory',
    value: function clearHistory() {
      this.historyList = [];
    }

    /*
     *
     */

  }, {
    key: 'addToHistory',
    value: function addToHistory(v) {
      this.historyList.push(v);
    }

    /*
     *
     */

  }, {
    key: 'getHistory',
    value: function getHistory() {
      return this.historyList;
    }

    /*
     *
     */

  }, {
    key: 'popLastHistory',
    value: function popLastHistory() {
      var hist = this.getHistory();
      var v = hist[hist.length - 1];
      hist.splice(hist.length - 1, 1);
    }

    //===========================================================================
    //
    // Storage Helpers
    //
    //===========================================================================

    /*
     * Returns the stored gameboard.
     */

  }, {
    key: 'getStoredGameboard',
    value: function getStoredGameboard() {
      // Get the stored gameboard
      return JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEYS.GAMEBOARD));
    }

    /*
     * Returns the stored solution.
     */

  }, {
    key: 'getStoredSolution',
    value: function getStoredSolution() {
      // Get the stored solution
      return JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEYS.SOLUTION));
    }

    //===========================================================================
    //
    // Saving/Loading
    //
    //===========================================================================

    /*
     * Loads the game stored in the localstorage or starts a new game.
     */

  }, {
    key: 'loadGame',
    value: function loadGame() {
      // Check if version changed
      if (app.isNewVersion()) {
        this.newGame();
        return;
      }
      // Check if there is a stored gameboard
      var storedGameboard = this.getStoredGameboard();
      if (!storedGameboard) {
        // There is not a gameboard saved, so just initialize a new game
        this.newGame();
        return;
      } else {
        // this.clearHistory();
        // Get the stored solution
        this.setSolution(this.getStoredSolution());
        // this.saveGame();
        // There was a stored game
        // Fill the gameboard with the contents of the saved gameboard
        // for(let i = 0; i < this.getView().getGameboard().getTiles().length; i++){
        //   this.getView().getGameboard().getTiles()[i].setValue(
        //     storedGameboard[i].value);
        //   this.getView().getGameboard().getTiles()[i].setIsOriginal(
        //     storedGameboard[i].original);
        // }
        // Instead of having every thing stored in the localstorage just call all
        // of the checks that could cause something the in the game to be changed
        // based on the gameboard.
        // this.checkTilesForSameAsSelectedValue();
        // this.checkTilesForConflicts();
        // this.getView().getGameboard().update();
        // this.checkIfSelectionTilesAreDone();
        // this.saveGame();
      }
    }

    /*
     *
     */

  }, {
    key: 'saveGame',
    value: function saveGame() {
      // Store the original gameboard
      window.localStorage.setItem(LOCAL_STORAGE_KEYS.ORIGINAL_GAMEBOARD, JSON.stringify(this.getOriginalGameboard()));

      // Store the solution
      window.localStorage.setItem(LOCAL_STORAGE_KEYS.SOLUTION, JSON.stringify(this.getSolution()));

      // Store the game difficulty
      window.localStorage.setItem(LOCAL_STORAGE_KEYS.GAME_DIFFICULTY, JSON.stringify(this.getDifficulty()));

      // Store the gameboard
      window.localStorage.setItem(LOCAL_STORAGE_KEYS.GAMEBOARD, this.gameboardToJSONString());
    }

    /*
     *
     */

  }, {
    key: 'newGame',
    value: function newGame() {
      DEBUG.log('newGame');
      // Get a new puzzle
      this.mbSudoku.setDifficulty(this.getDifficulty());
      this.mbSudoku.reset();
      // Initialize the new game values
      this.setOriginalGameboard(this.mbSudoku.getPuzzle());
      this.setSolution(this.mbSudoku.getSolution());

      // let puzzle = this.getOriginalGameboard();
      // let tiles = this.getView().getGameboard().getTiles();
      // let ch = null;
      // let tile = null;
      // for(let i = 0; i < tiles.length; i++){
      //   ch = puzzle[i];
      //   tile = tiles[i];
      //   tile.setValue((ch === '.')? '0' : ch);
      //   tile.setIsOriginal((ch === '.')? false : true);
      // }
      //
      // this.checkTilesForSameAsSelectedValue();
      // this.checkTilesForConflicts();
      // this.getView().getGameboard().update();
      // this.checkIfSelectionTilesAreDone();
      window.localStorage.setItem(LOCAL_STORAGE_KEYS.TIME_ELAPSED, JSON.stringify(0));
      this.saveGame();
    }

    //===========================================================================
    //
    // Timer
    //
    //===========================================================================

    /*
     *
     */

  }, {
    key: 'initTimer',
    value: function initTimer() {
      var _this8 = this;

      this.startTimer();

      document.addEventListener("pause", function (e) {
        _this8.stopTimer();
      }, false);

      document.addEventListener("resume", function (e) {
        _this8.startTimer();
      }, false);
    }

    /*
     *
     */

  }, {
    key: 'startTimer',
    value: function startTimer() {
      var _this9 = this;

      this.startTime = Date.now();
      this.timerInterval = setInterval(function () {
        _this9.timerIntervalFunc();
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

      var tmpTimeElapsed = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEYS.TIME_ELAPSED));
      if (tmpTimeElapsed) {
        elapsed = elapsed + tmpTimeElapsed;
      }

      window.localStorage.setItem(LOCAL_STORAGE_KEYS.TIME_ELAPSED, JSON.stringify(elapsed));
      this.getView().getClock().setTime(elapsed);
    }
  }]);

  return Game;
}(ViewController);