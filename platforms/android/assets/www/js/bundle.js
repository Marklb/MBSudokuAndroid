(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function GameBoardTile(gameBoard, row, column) {
    var _this = this;

    _classCallCheck(this, GameBoardTile);

    this.gameBoard = gameBoard;
    this.containerElem = document.createElement('div');
    this.containerElem.classList.add('tile');

    this.row = row;
    this.column = column;

    this.VALUE_STATES = {};
    this.VALUE_STATES.EMPTY = 0;
    this.VALUE_STATES.ORIGINAL = 1;
    this.VALUE_STATES.REGULAR = 2;

    this.VALUE_STATES_CLASSES = [];
    this.VALUE_STATES_CLASSES[this.VALUE_STATES.EMPTY] = 'empty-value';
    this.VALUE_STATES_CLASSES[this.VALUE_STATES.ORIGINAL] = 'original-value';
    this.VALUE_STATES_CLASSES[this.VALUE_STATES.REGULAR] = 'regular-value';
    this.currValState = this.VALUE_STATES.EMPTY;
    this.containerElem.classList.add(this.VALUE_STATES_CLASSES[this.currValState]);
    // If value is -1 then it is blank
    this.setValue(-1);

    this.STYLE_STATES = {};
    this.STYLE_STATES.BASIC = 0;
    this.STYLE_STATES.SAME_VALUE = 1;
    this.STYLE_STATES.CONFLICTING_VALUE = 2;

    this.STYLE_STATES_CLASSES = {};
    this.STYLE_STATES_CLASSES[this.STYLE_STATES.BASIC] = 'style-state-basic';
    this.STYLE_STATES_CLASSES[this.STYLE_STATES.SAME_VALUE] = 'style-state-same-value';
    this.STYLE_STATES_CLASSES[this.STYLE_STATES.CONFLICTING_VALUE] = 'style-state-conflicting-value';

    this.containerElem.addEventListener('mousedown', function () {
      _this.gameBoard.setSelectedTile(_this.row, _this.column);
    });
  }

  _createClass(GameBoardTile, [{
    key: 'getElement',
    value: function getElement() {
      return this.containerElem;
    }
  }, {
    key: 'getRowIndex',
    value: function getRowIndex() {
      return this.row;
    }
  }, {
    key: 'getColumnIndex',
    value: function getColumnIndex() {
      return this.column;
    }
  }, {
    key: 'setSelected',
    value: function setSelected(b) {
      if (b) {
        this.containerElem.classList.add('selected');
      } else {
        this.containerElem.classList.remove('selected');
      }
    }
  }, {
    key: 'setValue',
    value: function setValue(val) {
      var isOriginal = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      // console.log("Setting: "+val);
      var tmpValState = this.currValState;
      this.value = val;
      this.containerElem.textContent = '' + this.value;

      if (this.value == -1) {
        this.currValState = this.VALUE_STATES.EMPTY;
      } else {
        if (isOriginal) {
          this.currValState = this.VALUE_STATES.ORIGINAL;
        } else {
          this.currValState = this.VALUE_STATES.REGULAR;
        }
      }

      if (this.currValState != tmpValState) {
        this.containerElem.classList.remove(this.VALUE_STATES_CLASSES[tmpValState]);
      }
      if (!this.containerElem.classList.contains(this.VALUE_STATES_CLASSES[this.currValState])) {
        this.containerElem.classList.add(this.VALUE_STATES_CLASSES[this.currValState]);
      }
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.value;
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      return this.value == -1;
    }
  }, {
    key: 'isOriginal',
    value: function isOriginal() {
      return this.currValState == this.VALUE_STATES.ORIGINAL;
    }
  }, {
    key: 'setStyleState',
    value: function setStyleState(state) {
      if (!this.currStyleState) {
        this.currStyleState = this.STYLE_STATES.BASIC;
        this.containerElem.classList.add(this.STYLE_STATES_CLASSES[this.currStyleState]);
      }
      if (this.currStyleState != state) {
        this.containerElem.classList.remove(this.STYLE_STATES_CLASSES[this.currStyleState]);
        this.currStyleState = state;
        this.containerElem.classList.add(this.STYLE_STATES_CLASSES[this.currStyleState]);
      }
    }
  }, {
    key: 'setTilesInBlock',
    value: function setTilesInBlock(tiles) {
      this.tilesInBlock = tiles;
    }
  }, {
    key: 'getTilesInBlock',
    value: function getTilesInBlock() {
      return this.tilesInBlock;
    }
  }]);

  return GameBoardTile;
}();
},{}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameBoardTile = require('./game-board-tile.js');

module.exports = function () {
  function GameBoard() {
    var _this = this;

    _classCallCheck(this, GameBoard);

    console.log("Creating GameBoard");

    this.containerElem = document.createElement('div');
    this.containerElem.classList.add('game-board');
    // if(window.innerWidth < window.innerHeight){
    //   this.containerWidth = window.innerWidth;
    //   this.containerHeight = window.innerWidth;
    // }else{
    //   this.containerWidth = window.innerHeight;
    //   this.containerHeight = window.innerHeight;
    // }
    // this.containerElem.setAttribute('style', 'width:'+this.containerWidth+'px;');
    // this.containerElem.setAttribute('style', 'height:'+this.containerHeight+'px;');

    //--------------------------------------------------------------------------
    // Create the board rows
    //--------------------------------------------------------------------------
    this.boardRow1 = document.createElement('div');
    this.boardRow1.classList.add('board-row');
    this.containerElem.appendChild(this.boardRow1);

    this.boardRow2 = document.createElement('div');
    this.boardRow2.classList.add('board-row');
    this.containerElem.appendChild(this.boardRow2);

    this.boardRow3 = document.createElement('div');
    this.boardRow3.classList.add('board-row');
    this.containerElem.appendChild(this.boardRow3);

    //--------------------------------------------------------------------------
    // Create blocks
    //--------------------------------------------------------------------------
    // top left
    this.block1 = document.createElement('div');
    this.block1.classList.add('block');
    this.boardRow1.appendChild(this.block1);
    // top middle
    this.block2 = document.createElement('div');
    this.block2.classList.add('block');
    this.boardRow1.appendChild(this.block2);
    // top right
    this.block3 = document.createElement('div');
    this.block3.classList.add('block');
    this.boardRow1.appendChild(this.block3);
    // middle left
    this.block4 = document.createElement('div');
    this.block4.classList.add('block');
    this.boardRow2.appendChild(this.block4);
    // middle middle
    this.block5 = document.createElement('div');
    this.block5.classList.add('block');
    this.boardRow2.appendChild(this.block5);
    // middle right
    this.block6 = document.createElement('div');
    this.block6.classList.add('block');
    this.boardRow2.appendChild(this.block6);
    // bottom left
    this.block7 = document.createElement('div');
    this.block7.classList.add('block');
    this.boardRow3.appendChild(this.block7);
    // bottom middle
    this.block8 = document.createElement('div');
    this.block8.classList.add('block');
    this.boardRow3.appendChild(this.block8);
    // bottom right
    this.block9 = document.createElement('div');
    this.block9.classList.add('block');
    this.boardRow3.appendChild(this.block9);

    //--------------------------------------------------------------------------
    // Create blocks rows
    //--------------------------------------------------------------------------
    // block1
    this.block1row1 = document.createElement('div');
    this.block1row1.classList.add('block-row');
    this.block1.appendChild(this.block1row1);
    this.block1row2 = document.createElement('div');
    this.block1row2.classList.add('block-row');
    this.block1.appendChild(this.block1row2);
    this.block1row3 = document.createElement('div');
    this.block1row3.classList.add('block-row');
    this.block1.appendChild(this.block1row3);
    // block2
    this.block2row1 = document.createElement('div');
    this.block2row1.classList.add('block-row');
    this.block2.appendChild(this.block2row1);
    this.block2row2 = document.createElement('div');
    this.block2row2.classList.add('block-row');
    this.block2.appendChild(this.block2row2);
    this.block2row3 = document.createElement('div');
    this.block2row3.classList.add('block-row');
    this.block2.appendChild(this.block2row3);
    // block3
    this.block3row1 = document.createElement('div');
    this.block3row1.classList.add('block-row');
    this.block3.appendChild(this.block3row1);
    this.block3row2 = document.createElement('div');
    this.block3row2.classList.add('block-row');
    this.block3.appendChild(this.block3row2);
    this.block3row3 = document.createElement('div');
    this.block3row3.classList.add('block-row');
    this.block3.appendChild(this.block3row3);
    // block4
    this.block4row1 = document.createElement('div');
    this.block4row1.classList.add('block-row');
    this.block4.appendChild(this.block4row1);
    this.block4row2 = document.createElement('div');
    this.block4row2.classList.add('block-row');
    this.block4.appendChild(this.block4row2);
    this.block4row3 = document.createElement('div');
    this.block4row3.classList.add('block-row');
    this.block4.appendChild(this.block4row3);
    // block5
    this.block5row1 = document.createElement('div');
    this.block5row1.classList.add('block-row');
    this.block5.appendChild(this.block5row1);
    this.block5row2 = document.createElement('div');
    this.block5row2.classList.add('block-row');
    this.block5.appendChild(this.block5row2);
    this.block5row3 = document.createElement('div');
    this.block5row3.classList.add('block-row');
    this.block5.appendChild(this.block5row3);
    // block6
    this.block6row1 = document.createElement('div');
    this.block6row1.classList.add('block-row');
    this.block6.appendChild(this.block6row1);
    this.block6row2 = document.createElement('div');
    this.block6row2.classList.add('block-row');
    this.block6.appendChild(this.block6row2);
    this.block6row3 = document.createElement('div');
    this.block6row3.classList.add('block-row');
    this.block6.appendChild(this.block6row3);
    // block7
    this.block7row1 = document.createElement('div');
    this.block7row1.classList.add('block-row');
    this.block7.appendChild(this.block7row1);
    this.block7row2 = document.createElement('div');
    this.block7row2.classList.add('block-row');
    this.block7.appendChild(this.block7row2);
    this.block7row3 = document.createElement('div');
    this.block7row3.classList.add('block-row');
    this.block7.appendChild(this.block7row3);
    // block8
    this.block8row1 = document.createElement('div');
    this.block8row1.classList.add('block-row');
    this.block8.appendChild(this.block8row1);
    this.block8row2 = document.createElement('div');
    this.block8row2.classList.add('block-row');
    this.block8.appendChild(this.block8row2);
    this.block8row3 = document.createElement('div');
    this.block8row3.classList.add('block-row');
    this.block8.appendChild(this.block8row3);
    // block9
    this.block9row1 = document.createElement('div');
    this.block9row1.classList.add('block-row');
    this.block9.appendChild(this.block9row1);
    this.block9row2 = document.createElement('div');
    this.block9row2.classList.add('block-row');
    this.block9.appendChild(this.block9row2);
    this.block9row3 = document.createElement('div');
    this.block9row3.classList.add('block-row');
    this.block9.appendChild(this.block9row3);

    //--------------------------------------------------------------------------
    // Create tiles
    //--------------------------------------------------------------------------
    this.tiles = [];
    for (var i = 0; i < 9; i++) {
      var tmp = [];
      for (var j = 0; j < 9; j++) {
        tmp.push(new GameBoardTile(this, i, j));
      }
      this.tiles.push(tmp);
    }
    // block1 tiles
    this.block1Tiles = [this.tiles[0][0], this.tiles[0][1], this.tiles[0][2], this.tiles[1][0], this.tiles[1][1], this.tiles[1][2], this.tiles[2][0], this.tiles[2][1], this.tiles[2][2]];
    for (var i = 0; i < 9; i++) {
      this.block1Tiles[i].setTilesInBlock(this.block1Tiles);
    }
    this.block1row1.appendChild(this.tiles[0][0].getElement());
    this.block1row1.appendChild(this.tiles[0][1].getElement());
    this.block1row1.appendChild(this.tiles[0][2].getElement());
    this.block1row2.appendChild(this.tiles[1][0].getElement());
    this.block1row2.appendChild(this.tiles[1][1].getElement());
    this.block1row2.appendChild(this.tiles[1][2].getElement());
    this.block1row3.appendChild(this.tiles[2][0].getElement());
    this.block1row3.appendChild(this.tiles[2][1].getElement());
    this.block1row3.appendChild(this.tiles[2][2].getElement());
    // block2 tiles
    this.block2Tiles = [this.tiles[0][3], this.tiles[0][4], this.tiles[0][5], this.tiles[1][3], this.tiles[1][4], this.tiles[1][5], this.tiles[2][3], this.tiles[2][4], this.tiles[2][5]];
    for (var i = 0; i < 9; i++) {
      this.block2Tiles[i].setTilesInBlock(this.block2Tiles);
    }
    this.block2row1.appendChild(this.tiles[0][3].getElement());
    this.block2row1.appendChild(this.tiles[0][4].getElement());
    this.block2row1.appendChild(this.tiles[0][5].getElement());
    this.block2row2.appendChild(this.tiles[1][3].getElement());
    this.block2row2.appendChild(this.tiles[1][4].getElement());
    this.block2row2.appendChild(this.tiles[1][5].getElement());
    this.block2row3.appendChild(this.tiles[2][3].getElement());
    this.block2row3.appendChild(this.tiles[2][4].getElement());
    this.block2row3.appendChild(this.tiles[2][5].getElement());
    // block3 tiles
    this.block3Tiles = [this.tiles[0][6], this.tiles[0][7], this.tiles[0][8], this.tiles[1][6], this.tiles[1][7], this.tiles[1][8], this.tiles[2][6], this.tiles[2][7], this.tiles[2][8]];
    for (var i = 0; i < 9; i++) {
      this.block3Tiles[i].setTilesInBlock(this.block3Tiles);
    }
    this.block3row1.appendChild(this.tiles[0][6].getElement());
    this.block3row1.appendChild(this.tiles[0][7].getElement());
    this.block3row1.appendChild(this.tiles[0][8].getElement());
    this.block3row2.appendChild(this.tiles[1][6].getElement());
    this.block3row2.appendChild(this.tiles[1][7].getElement());
    this.block3row2.appendChild(this.tiles[1][8].getElement());
    this.block3row3.appendChild(this.tiles[2][6].getElement());
    this.block3row3.appendChild(this.tiles[2][7].getElement());
    this.block3row3.appendChild(this.tiles[2][8].getElement());
    // block4 tiles
    this.block4Tiles = [this.tiles[3][0], this.tiles[3][1], this.tiles[3][2], this.tiles[4][0], this.tiles[4][1], this.tiles[4][2], this.tiles[5][0], this.tiles[5][1], this.tiles[5][2]];
    for (var i = 0; i < 9; i++) {
      this.block4Tiles[i].setTilesInBlock(this.block4Tiles);
    }
    this.block4row1.appendChild(this.tiles[3][0].getElement());
    this.block4row1.appendChild(this.tiles[3][1].getElement());
    this.block4row1.appendChild(this.tiles[3][2].getElement());
    this.block4row2.appendChild(this.tiles[4][0].getElement());
    this.block4row2.appendChild(this.tiles[4][1].getElement());
    this.block4row2.appendChild(this.tiles[4][2].getElement());
    this.block4row3.appendChild(this.tiles[5][0].getElement());
    this.block4row3.appendChild(this.tiles[5][1].getElement());
    this.block4row3.appendChild(this.tiles[5][2].getElement());
    // block5 tiles
    this.block5Tiles = [this.tiles[3][3], this.tiles[3][4], this.tiles[3][5], this.tiles[4][3], this.tiles[4][4], this.tiles[4][5], this.tiles[5][3], this.tiles[5][4], this.tiles[5][5]];
    for (var i = 0; i < 9; i++) {
      this.block5Tiles[i].setTilesInBlock(this.block5Tiles);
    }
    this.block5row1.appendChild(this.tiles[3][3].getElement());
    this.block5row1.appendChild(this.tiles[3][4].getElement());
    this.block5row1.appendChild(this.tiles[3][5].getElement());
    this.block5row2.appendChild(this.tiles[4][3].getElement());
    this.block5row2.appendChild(this.tiles[4][4].getElement());
    this.block5row2.appendChild(this.tiles[4][5].getElement());
    this.block5row3.appendChild(this.tiles[5][3].getElement());
    this.block5row3.appendChild(this.tiles[5][4].getElement());
    this.block5row3.appendChild(this.tiles[5][5].getElement());
    // block6 tiles
    this.block6Tiles = [this.tiles[3][6], this.tiles[3][7], this.tiles[3][8], this.tiles[4][6], this.tiles[4][7], this.tiles[4][8], this.tiles[5][6], this.tiles[5][7], this.tiles[5][8]];
    for (var i = 0; i < 9; i++) {
      this.block6Tiles[i].setTilesInBlock(this.block6Tiles);
    }
    this.block6row1.appendChild(this.tiles[3][6].getElement());
    this.block6row1.appendChild(this.tiles[3][7].getElement());
    this.block6row1.appendChild(this.tiles[3][8].getElement());
    this.block6row2.appendChild(this.tiles[4][6].getElement());
    this.block6row2.appendChild(this.tiles[4][7].getElement());
    this.block6row2.appendChild(this.tiles[4][8].getElement());
    this.block6row3.appendChild(this.tiles[5][6].getElement());
    this.block6row3.appendChild(this.tiles[5][7].getElement());
    this.block6row3.appendChild(this.tiles[5][8].getElement());
    // block7 tiles
    this.block7Tiles = [this.tiles[6][0], this.tiles[6][1], this.tiles[6][2], this.tiles[7][0], this.tiles[7][1], this.tiles[7][2], this.tiles[8][0], this.tiles[8][1], this.tiles[8][2]];
    for (var i = 0; i < 9; i++) {
      this.block7Tiles[i].setTilesInBlock(this.block7Tiles);
    }
    this.block7row1.appendChild(this.tiles[6][0].getElement());
    this.block7row1.appendChild(this.tiles[6][1].getElement());
    this.block7row1.appendChild(this.tiles[6][2].getElement());
    this.block7row2.appendChild(this.tiles[7][0].getElement());
    this.block7row2.appendChild(this.tiles[7][1].getElement());
    this.block7row2.appendChild(this.tiles[7][2].getElement());
    this.block7row3.appendChild(this.tiles[8][0].getElement());
    this.block7row3.appendChild(this.tiles[8][1].getElement());
    this.block7row3.appendChild(this.tiles[8][2].getElement());
    // block8 tiles
    this.block8Tiles = [this.tiles[6][3], this.tiles[6][4], this.tiles[6][5], this.tiles[7][3], this.tiles[7][4], this.tiles[7][5], this.tiles[8][3], this.tiles[8][4], this.tiles[8][5]];
    for (var i = 0; i < 9; i++) {
      this.block8Tiles[i].setTilesInBlock(this.block8Tiles);
    }
    this.block8row1.appendChild(this.tiles[6][3].getElement());
    this.block8row1.appendChild(this.tiles[6][4].getElement());
    this.block8row1.appendChild(this.tiles[6][5].getElement());
    this.block8row2.appendChild(this.tiles[7][3].getElement());
    this.block8row2.appendChild(this.tiles[7][4].getElement());
    this.block8row2.appendChild(this.tiles[7][5].getElement());
    this.block8row3.appendChild(this.tiles[8][3].getElement());
    this.block8row3.appendChild(this.tiles[8][4].getElement());
    this.block8row3.appendChild(this.tiles[8][5].getElement());
    // block9 tiles
    this.block9Tiles = [this.tiles[6][6], this.tiles[6][7], this.tiles[6][8], this.tiles[7][6], this.tiles[7][7], this.tiles[7][8], this.tiles[8][6], this.tiles[8][7], this.tiles[8][8]];
    for (var i = 0; i < 9; i++) {
      this.block9Tiles[i].setTilesInBlock(this.block9Tiles);
    }
    this.block9row1.appendChild(this.tiles[6][6].getElement());
    this.block9row1.appendChild(this.tiles[6][7].getElement());
    this.block9row1.appendChild(this.tiles[6][8].getElement());
    this.block9row2.appendChild(this.tiles[7][6].getElement());
    this.block9row2.appendChild(this.tiles[7][7].getElement());
    this.block9row2.appendChild(this.tiles[7][8].getElement());
    this.block9row3.appendChild(this.tiles[8][6].getElement());
    this.block9row3.appendChild(this.tiles[8][7].getElement());
    this.block9row3.appendChild(this.tiles[8][8].getElement());

    this.blocksTiles = [this.block1Tiles, this.block2Tiles, this.block3Tiles, this.block4Tiles, this.block5Tiles, this.block6Tiles, this.block7Tiles, this.block8Tiles, this.block9Tiles];

    this.initGameTiles();

    this.startTime1 = Date.now();
    setInterval(function () {
      var endTime1 = Date.now();
      var elapsed1 = endTime1 - _this.startTime1;
      _this.startTime1 = endTime1;

      var tmpTimeElapsed = JSON.parse(window.localStorage.getItem("timeElapsed"));
      if (tmpTimeElapsed) {
        elapsed1 = elapsed1 + tmpTimeElapsed;
      }
      window.localStorage.setItem("timeElapsed", JSON.stringify(elapsed1));
    }, 1000);
  }

  _createClass(GameBoard, [{
    key: 'getElement',
    value: function getElement() {
      return this.containerElem;
    }
  }, {
    key: 'setSelectedTile',
    value: function setSelectedTile(row, column) {
      if (!this.selectedTile) {
        this.selectedTile = this.tiles[0][0];
        this.tiles[0][0].setSelected(true);
      }
      this.selectedTile.setSelected(false);
      this.selectedTile = this.tiles[row][column];
      this.selectedTile.setSelected(true);

      this.updateTileStyleStates();
    }
  }, {
    key: 'newGame',
    value: function newGame() {
      this.resetGameTiles();
      this.updateTileStyleStates();
    }
  }, {
    key: 'initGameTiles',
    value: function initGameTiles() {
      var storedGameBoard = JSON.parse(window.localStorage.getItem("gameboard"));
      if (storedGameBoard) {
        for (var i = 0; i < storedGameBoard.length; i++) {
          console.log("Setting:");
          console.log(storedGameBoard[i]);
          this.tiles[storedGameBoard[i].x][storedGameBoard[i].y].setValue(storedGameBoard[i].value, storedGameBoard[i].isOriginal);
        }
      } else {
        this.resetGameTiles();
      }

      var selectedTileItem = JSON.parse(window.localStorage.getItem("selectedTile"));
      if (selectedTileItem) {
        this.setSelectedTile(selectedTileItem.x, selectedTileItem.y);
      } else {
        this.setSelectedTile(0, 0);
      }
    }
  }, {
    key: 'resetGameTiles',
    value: function resetGameTiles() {
      // this.tiles[0][3].setValue(7, true);
      // this.tiles[0][6].setValue(8, true);
      // this.tiles[0][7].setValue(4, true);
      // this.tiles[2][2].setValue(8, true);
      // this.tiles[2][4].setValue(5, true);
      // this.tiles[3][1].setValue(2, true);
      // this.tiles[3][2].setValue(6, true);
      // this.tiles[3][4].setValue(4, true);
      // this.tiles[3][8].setValue(8, true);
      // this.tiles[4][1].setValue(3, true);
      // this.tiles[4][2].setValue(5, true);
      // this.tiles[4][7].setValue(1, true);
      // this.tiles[5][1].setValue(4, true);
      // this.tiles[5][4].setValue(3, true);
      // this.tiles[5][5].setValue(1, true);
      // this.tiles[5][6].setValue(6, true);
      // this.tiles[6][2].setValue(4, true);
      // this.tiles[7][3].setValue(6, true);
      // this.tiles[7][5].setValue(2, true);
      // this.tiles[7][6].setValue(4, true);
      // this.tiles[8][1].setValue(7, true);
      // this.tiles[8][3].setValue(8, true);
      // this.tiles[8][6].setValue(9, true);
      // this.tiles[8][7].setValue(2, true);
      // this.tiles[8][8].setValue(6, true);

      // let layout = [
      //   //0   1   2   3   4   5   6   7   8
      //   [N, N, N, N, N, N, N, N, N], // 0
      //   [N, N, N, N, N, N, N, N, N], // 1
      //   [N, N, N, N, N, N, N, N, N], // 2
      //   [N, N, N, N, N, N, N, N, N], // 3
      //   [N, N, N, N, N, N, N, N, N], // 4
      //   [N, N, N, N, N, N, N, N, N], // 5
      //   [N, N, N, N, N, N, N, N, N], // 6
      //   [N, N, N, N, N, N, N, N, N], // 7
      //   [N, N, N, N, N, N, N, N, N]  // 8
      // ];

      var N = -1;
      var layout0 = [
      //0   1   2   3   4   5   6   7   8
      [N, N, N, 7, N, N, 8, 4, N], // 0
      [N, N, N, N, N, N, N, N, N], // 1
      [N, N, 8, N, 5, N, N, N, N], // 2
      [N, 2, 6, N, 4, N, N, N, 8], // 3
      [N, 3, 5, N, N, N, N, 1, N], // 4
      [N, 4, N, N, 3, 1, 6, N, N], // 5
      [N, N, 4, N, N, N, N, N, N], // 6
      [N, N, N, 6, N, 2, 4, N, N], // 7
      [N, 7, N, 8, N, N, 9, 2, 6] // 8
      ];

      var layout1 = [
      //0   1   2   3   4   5   6   7   8
      [N, N, 3, 1, N, N, 2, N, N], // 0
      [N, N, N, 3, N, 4, 9, N, N], // 1
      [N, N, N, N, N, N, N, N, N], // 2
      [N, N, 9, N, N, 8, 6, 2, 4], // 3
      [N, N, N, N, 3, N, 5, N, N], // 4
      [N, 1, N, N, N, 6, N, N, 8], // 5
      [9, N, N, 7, 4, N, N, 1, N], // 6
      [7, 5, N, N, N, N, N, N, N], // 7
      [1, 2, N, N, N, N, 4, N, 5] // 8
      ];

      var layout2 = [
      //0  1  2  3  4  5  6  7  8
      [N, N, N, 2, N, N, 5, N, N], // 0
      [N, 6, N, N, 5, N, 4, 9, N], // 1
      [N, 4, 5, N, N, 1, N, N, 7], // 2
      [N, N, 7, N, N, N, N, 6, N], // 3
      [N, 3, N, N, N, 4, N, N, 9], // 4
      [1, N, N, N, N, N, 2, N, N], // 5
      [N, N, N, 9, N, 5, 8, N, N], // 6
      [N, N, N, 7, N, N, 6, 2, N], // 7
      [7, N, N, N, N, N, N, N, N] // 8
      ];

      var layout3 = [
      // 0  1  2  3  4  5  6  7  8
      [N, N, N, N, N, 5, 1, N, N], // 0
      [N, 8, N, N, N, N, N, N, 4], // 1
      [6, N, 2, 8, N, N, N, N, N], // 2
      [N, N, N, N, N, N, N, N, 6], // 3
      [3, N, N, 6, N, N, N, N, 9], // 4
      [5, N, N, N, 3, 7, N, 4, N], // 5
      [N, 3, N, 2, 6, N, 8, N, 5], // 6
      [N, N, N, N, 7, N, N, N, N], // 7
      [1, 7, N, 5, N, N, N, N, N] // 8
      ];

      var layouts = [layout0, layout1, layout2, layout3];

      var ind = Math.floor(Math.random() * 4);
      console.log("Ind: " + ind);
      var layout = layouts[ind];
      for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
          if (layout[i][j] == -1) {
            this.tiles[i][j].setValue(layout[i][j], false);
          } else {
            this.tiles[i][j].setValue(layout[i][j], true);
          }
        }
      }

      window.localStorage.setItem("timeElapsed", JSON.stringify(0));
    }
  }, {
    key: 'updateTileStyleStates',
    value: function updateTileStyleStates() {
      for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
          if (this.selectedTile.isEmpty()) {
            this.tiles[i][j].setStyleState(this.tiles[i][j].STYLE_STATES.BASIC);
          } else {
            if (this.selectedTile.getValue() == this.tiles[i][j].getValue() && this.selectedTile.getRowIndex() != i && this.selectedTile.getColumnIndex() != j) {
              this.tiles[i][j].setStyleState(this.tiles[i][j].STYLE_STATES.SAME_VALUE);
            } else {
              this.tiles[i][j].setStyleState(this.tiles[i][j].STYLE_STATES.BASIC);
            }
          }
        }
      }
      this.checkForConflicts();
      this.saveBoard();
    }
  }, {
    key: 'saveBoard',
    value: function saveBoard() {
      var tmpBoard = [];
      for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
          tmpBoard.push({
            "x": i,
            "y": j,
            "value": this.tiles[i][j].getValue(),
            "isOriginal": this.tiles[i][j].isOriginal()
          });
        }
      }
      window.localStorage.setItem("gameboard", JSON.stringify(tmpBoard));

      window.localStorage.setItem("selectedTile", JSON.stringify({
        "x": this.selectedTile.getRowIndex(),
        "y": this.selectedTile.getColumnIndex()
      }));
    }
  }, {
    key: 'checkForConflicts',
    value: function checkForConflicts() {
      // Block Conflicts
      for (var i = 0; i < this.blocksTiles.length; i++) {
        this.checkTilesForConflict(this.blocksTiles[i]);
      }
      // Row Conflicts
      for (var i = 0; i < 9; i++) {
        var tmp = [];
        for (var j = 0; j < 9; j++) {
          tmp.push(this.tiles[i][j]);
        }
        this.checkTilesForConflict(tmp);
      }
      // Column Conflicts
      for (var i = 0; i < 9; i++) {
        var tmp = [];
        for (var j = 0; j < 9; j++) {
          tmp.push(this.tiles[j][i]);
        }
        this.checkTilesForConflict(tmp);
      }
    }
  }, {
    key: 'checkTilesForConflict',
    value: function checkTilesForConflict(blockTiles) {
      var counts = [[], [], [], [], [], [], [], [], []];
      for (var i = 0; i < 9; i++) {
        if (!blockTiles[i].isEmpty()) {
          counts[blockTiles[i].getValue() - 1].push(blockTiles[i]);
        }
      }
      for (var i = 0; i < 9; i++) {
        if (counts[i].length > 1) {
          for (var j = 0; j < counts[i].length; j++) {
            counts[i][j].setStyleState(counts[i][j].STYLE_STATES.CONFLICTING_VALUE);
          }
        }
      }
    }
  }, {
    key: 'setSelectedTileValue',
    value: function setSelectedTileValue(val) {
      if (this.selectedTile.isOriginal()) return false;
      if (!this.selectedTile.isEmpty() && val != -1) return false;
      this.selectedTile.setValue(val);
      this.updateTileStyleStates();
    }
  }]);

  return GameBoard;
}();
},{"./game-board-tile.js":1}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function GameStatsBox(gameBoard) {
    var _this = this;

    _classCallCheck(this, GameStatsBox);

    this.gameBoard = gameBoard;
    console.log('Creating Game Stats Box');
    this.containerElem = document.createElement('div');
    this.containerElem.classList.add('game-stats-box');

    this.menuButtonElem = document.createElement('div');
    this.menuButtonElem.classList.add('left');
    this.menuButtonElem.textContent = "X";
    this.containerElem.appendChild(this.menuButtonElem);

    this.titleElem = document.createElement('div');
    this.titleElem.classList.add('timer');
    this.titleElem.textContent = "00:00:00";
    this.containerElem.appendChild(this.titleElem);

    this.resetBtnElem = document.createElement('div');
    this.resetBtnElem.classList.add('right');
    this.resetBtnElem.textContent = "X";
    this.containerElem.appendChild(this.resetBtnElem);

    setInterval(function () {
      var timeElapsed = JSON.parse(window.localStorage.getItem("timeElapsed"));
      if (timeElapsed) {
        _this.setTime(timeElapsed);
      } else {
        _this.setTime(0);
      }
    }, 1000);
  }

  _createClass(GameStatsBox, [{
    key: 'getElement',
    value: function getElement() {
      return this.containerElem;
    }
  }, {
    key: 'setTime',
    value: function setTime(t) {
      var SECONDS = 1000;
      var MINUTES = SECONDS * 60;
      var HOURS = MINUTES * 60;
      var DAYS = HOURS * 24;
      var YEARS = DAYS * 365;

      t = t / SECONDS;
      var seconds = Math.round(t % 60);
      var minutes = Math.round(t / 60 % 60);
      var hours = Math.round(t / (60 * 60) % 24);

      var secStr = "" + seconds;
      if (seconds < 10) {
        secStr = "0" + seconds;
      }
      var minStr = "" + minutes;
      if (minutes < 10) {
        minStr = "0" + minutes;
      }
      var hourStr = "" + hours;
      if (hours < 10) {
        hourStr = "0" + hours;
      }

      this.titleElem.textContent = hourStr + ":" + minStr + ":" + secStr;
    }
  }]);

  return GameStatsBox;
}();
},{}],4:[function(require,module,exports){
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

    this.titleElem = document.createElement('div');
    this.titleElem.classList.add('title');
    this.titleElem.textContent = "MB Sudoku";
    this.containerElem.appendChild(this.titleElem);

    this.resetBtnElem = document.createElement('div');
    this.resetBtnElem.classList.add('reset-btn');
    this.resetBtnElem.textContent = "X";
    this.containerElem.appendChild(this.resetBtnElem);
    this.resetBtnElem.addEventListener('mousedown', function (e) {
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
},{}],5:[function(require,module,exports){
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
},{"./game-board.js":2,"./game-stats-box.js":3,"./game-top-box.js":4,"./selections-box.js":6}],6:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function SelectionsBox(gameBoard) {
    var _this = this;

    _classCallCheck(this, SelectionsBox);

    this.gameBoard = gameBoard;
    console.log('Creating Selections Box');
    this.containerElem = document.createElement('div');
    this.containerElem.classList.add('selections-box');

    //--------------------------------------------------------------------------
    // Create the option buttons
    //--------------------------------------------------------------------------
    this.optionsContainerElem = document.createElement('div');
    this.optionsContainerElem.classList.add('options-container');
    this.containerElem.appendChild(this.optionsContainerElem);

    this.spacerElem = document.createElement('div');
    this.spacerElem.classList.add('spacer');
    this.spacerElem.textContent = 'X';
    this.optionsContainerElem.appendChild(this.spacerElem);

    this.removeBtnElem = document.createElement('div');
    this.removeBtnElem.classList.add('remove-btn');
    this.removeBtnElem.textContent = 'X';
    this.optionsContainerElem.appendChild(this.removeBtnElem);
    this.removeBtnElem.addEventListener('mousedown', function (e) {
      console.log("Pressed");
      _this.gameBoard.setSelectedTileValue(-1);
    });
    //--------------------------------------------------------------------------
    // Create the selection tiles
    //--------------------------------------------------------------------------
    this.tilesContainerElem = document.createElement('div');
    this.tilesContainerElem.classList.add('tiles-container');
    this.containerElem.appendChild(this.tilesContainerElem);
    // Tile 1
    this.tile1 = document.createElement('div');
    this.tile1.classList.add('tile');
    this.tile1.classList.add('odd');
    this.tile1.numValue = 1;
    this.tile1.textContent = '1';
    this.tilesContainerElem.appendChild(this.tile1);
    this.tile1.addEventListener('mousedown', function (e) {
      _this.gameBoard.setSelectedTileValue(1);
    });
    // Tile 2
    this.tile2 = document.createElement('div');
    this.tile2.classList.add('tile');
    this.tile2.classList.add('even');
    this.tile2.numValue = 2;
    this.tile2.textContent = '2';
    this.tilesContainerElem.appendChild(this.tile2);
    this.tile2.addEventListener('mousedown', function (e) {
      _this.gameBoard.setSelectedTileValue(2);
    });
    // Tile 3
    this.tile3 = document.createElement('div');
    this.tile3.classList.add('tile');
    this.tile3.classList.add('odd');
    this.tile3.numValue = 3;
    this.tile3.textContent = '3';
    this.tilesContainerElem.appendChild(this.tile3);
    this.tile3.addEventListener('mousedown', function (e) {
      _this.gameBoard.setSelectedTileValue(3);
    });
    // Tile 4
    this.tile4 = document.createElement('div');
    this.tile4.classList.add('tile');
    this.tile4.classList.add('even');
    this.tile4.numValue = 4;
    this.tile4.textContent = '4';
    this.tilesContainerElem.appendChild(this.tile4);
    this.tile4.addEventListener('mousedown', function (e) {
      _this.gameBoard.setSelectedTileValue(4);
    });
    // Tile 5
    this.tile5 = document.createElement('div');
    this.tile5.classList.add('tile');
    this.tile5.classList.add('odd');
    this.tile5.numValue = 5;
    this.tile5.textContent = '5';
    this.tilesContainerElem.appendChild(this.tile5);
    this.tile5.addEventListener('mousedown', function (e) {
      _this.gameBoard.setSelectedTileValue(5);
    });
    // Tile 6
    this.tile6 = document.createElement('div');
    this.tile6.classList.add('tile');
    this.tile6.classList.add('even');
    this.tile6.numValue = 6;
    this.tile6.textContent = '6';
    this.tilesContainerElem.appendChild(this.tile6);
    this.tile6.addEventListener('mousedown', function (e) {
      _this.gameBoard.setSelectedTileValue(6);
    });
    // Tile 7
    this.tile7 = document.createElement('div');
    this.tile7.classList.add('tile');
    this.tile7.classList.add('odd');
    this.tile7.numValue = 7;
    this.tile7.textContent = '7';
    this.tilesContainerElem.appendChild(this.tile7);
    this.tile7.addEventListener('mousedown', function (e) {
      _this.gameBoard.setSelectedTileValue(7);
    });
    // Tile 8
    this.tile8 = document.createElement('div');
    this.tile8.classList.add('tile');
    this.tile8.classList.add('even');
    this.tile8.numValue = 8;
    this.tile8.textContent = '8';
    this.tilesContainerElem.appendChild(this.tile8);
    this.tile8.addEventListener('mousedown', function (e) {
      _this.gameBoard.setSelectedTileValue(8);
    });
    // Tile 9
    this.tile9 = document.createElement('div');
    this.tile9.classList.add('tile');
    this.tile9.classList.add('odd');
    this.tile9.numValue = 9;
    this.tile9.textContent = '9';
    this.tilesContainerElem.appendChild(this.tile9);
    this.tile9.addEventListener('mousedown', function (e) {
      _this.gameBoard.setSelectedTileValue(9);
    });
  }

  _createClass(SelectionsBox, [{
    key: 'getElement',
    value: function getElement() {
      return this.containerElem;
    }
  }]);

  return SelectionsBox;
}();
},{}]},{},[5]);
