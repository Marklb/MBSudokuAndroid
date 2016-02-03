(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
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
    // this.containerElem.addEventListener('touchstart', () => {
    //   this.gameBoard.setSelectedTile(this.row, this.column);
    // });
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
},{}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QQWING = require('./libs/qqwing-1.3.4/qqwing-1.3.4.js');
var GameBoardTile = require('./game-board-tile.js');

module.exports = function () {
  function GameBoard() {
    var _this = this;

    _classCallCheck(this, GameBoard);

    console.log("Creating GameBoard");

    this.qqwing = new QQWING();
    // this.qqwing.generatePuzzle();
    // this.qqwing.setPrintStyle(QQWING.PrintStyle.ONE_LINE);
    // this.qqwing.printSolution();
    // let t = this.qqwing.getSolutionString();
    // console.log(t);

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
    var timerIntervalFunc = function timerIntervalFunc() {
      var endTime1 = Date.now();
      var elapsed1 = endTime1 - _this.startTime1;
      _this.startTime1 = endTime1;

      var tmpTimeElapsed = JSON.parse(window.localStorage.getItem("timeElapsed"));
      if (tmpTimeElapsed) {
        elapsed1 = elapsed1 + tmpTimeElapsed;
      }
      window.localStorage.setItem("timeElapsed", JSON.stringify(elapsed1));
    };
    this.timerInterval = setInterval(timerIntervalFunc, 1000);

    document.addEventListener("pause", function (e) {
      clearInterval(_this.timerInterval);
    }, false);

    document.addEventListener("resume", function (e) {
      _this.startTime1 = Date.now();
      _this.timerInterval = setInterval(timerIntervalFunc, 1000);
    }, false);
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
          // console.log("Setting:");
          // console.log(storedGameBoard[i]);
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

      // let N = -1;
      // let layout0 = [
      //   //0   1   2   3   4   5   6   7   8
      //   [N, N, N, 7, N, N, 8, 4, N], // 0
      //   [N, N, N, N, N, N, N, N, N], // 1
      //   [N, N, 8, N, 5, N, N, N, N], // 2
      //   [N, 2, 6, N, 4, N, N, N, 8], // 3
      //   [N, 3, 5, N, N, N, N, 1, N], // 4
      //   [N, 4, N, N, 3, 1, 6, N, N], // 5
      //   [N, N, 4, N, N, N, N, N, N], // 6
      //   [N, N, N, 6, N, 2, 4, N, N], // 7
      //   [N, 7, N, 8, N, N, 9, 2, 6]  // 8
      // ];
      //
      // let layout1 = [
      //   //0   1   2   3   4   5   6   7   8
      //   [N, N, 3, 1, N, N, 2, N, N], // 0
      //   [N, N, N, 3, N, 4, 9, N, N], // 1
      //   [N, N, N, N, N, N, N, N, N], // 2
      //   [N, N, 9, N, N, 8, 6, 2, 4], // 3
      //   [N, N, N, N, 3, N, 5, N, N], // 4
      //   [N, 1, N, N, N, 6, N, N, 8], // 5
      //   [9, N, N, 7, 4, N, N, 1, N], // 6
      //   [7, 5, N, N, N, N, N, N, N], // 7
      //   [1, 2, N, N, N, N, 4, N, 5]  // 8
      // ];
      //
      // let layout2 = [
      //   //0  1  2  3  4  5  6  7  8
      //    [N, N, N, 2, N, N, 5, N, N], // 0
      //    [N, 6, N, N, 5, N, 4, 9, N], // 1
      //    [N, 4, 5, N, N, 1, N, N, 7], // 2
      //    [N, N, 7, N, N, N, N, 6, N], // 3
      //    [N, 3, N, N, N, 4, N, N, 9], // 4
      //    [1, N, N, N, N, N, 2, N, N], // 5
      //    [N, N, N, 9, N, 5, 8, N, N], // 6
      //    [N, N, N, 7, N, N, 6, 2, N], // 7
      //    [7, N, N, N, N, N, N, N, N]  // 8
      // ];
      //
      // let layout3 = [
      //   // 0  1  2  3  4  5  6  7  8
      //     [N, N, N, N, N, 5, 1, N, N], // 0
      //     [N, 8, N, N, N, N, N, N, 4], // 1
      //     [6, N, 2, 8, N, N, N, N, N], // 2
      //     [N, N, N, N, N, N, N, N, 6], // 3
      //     [3, N, N, 6, N, N, N, N, 9], // 4
      //     [5, N, N, N, 3, 7, N, 4, N], // 5
      //     [N, 3, N, 2, 6, N, 8, N, 5], // 6
      //     [N, N, N, N, 7, N, N, N, N], // 7
      //     [1, 7, N, 5, N, N, N, N, N]  // 8
      // ];
      //
      // let layouts = [layout0, layout1, layout2, layout3];

      // let ind = Math.floor((Math.random() * 4));
      // console.log("Ind: " + ind);
      // let layout = layouts[ind];
      // for(let i = 0; i < 9; i++){
      //   for(let j = 0; j < 9; j++){
      //     if(layout[i][j] == -1){
      //       this.tiles[i][j].setValue(layout[i][j], false);
      //     }else{
      //       this.tiles[i][j].setValue(layout[i][j], true);
      //     }
      //   }
      // }

      this.qqwing.generatePuzzle();
      this.qqwing.setPrintStyle(QQWING.PrintStyle.ONE_LINE);
      var t = this.qqwing.getSolutionString();
      console.log(t);
      var count = 0;
      for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
          // console.log(t[count]);
          if (t[count] == '.') {
            this.tiles[i][j].setValue(-1, false);
          } else {
            this.tiles[i][j].setValue(parseInt(t[count]), true);
          }
          count++;
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
      var count = 0;
      for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
          var v = this.tiles[i][j].getValue();
          if (v == val) {
            count++;
          }
        }
      }
      if (count == 9) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: 'getCompletedValues',
    value: function getCompletedValues() {
      var vals = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
          var v = this.tiles[i][j].getValue();
          if (v != -1) {
            vals[v - 1]++;
          }
        }
      }
      console.log(vals);
      var doneValues = [];
      for (var i = 0; i < 9; i++) {
        if (vals[i] == 9) {
          doneValues.push(i + 1);
        }
      }
      return doneValues;
    }
  }]);

  return GameBoard;
}();
},{"./game-board-tile.js":2,"./libs/qqwing-1.3.4/qqwing-1.3.4.js":6}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
(function (process){
/*!
 * qqwing - Sudoku solver and generator
 * Copyright (C) 2014 Stephen Ostermiller
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */
var qqwing = function(){

/**
 * Given the index of a cell (0-80) calculate
 * the column (0-8) in which that cell resides.
 */
var cellToColumn = function(cell){
	return cell%qqwing.ROW_COL_SEC_SIZE;
};

/**
 * Given the index of a cell (0-80) calculate
 * the row (0-8) in which it resides.
 */
var cellToRow = function(cell){
	return Math.floor(cell/qqwing.ROW_COL_SEC_SIZE);
};

/**
 * Given the index of a cell (0-80) calculate
 * the cell (0-80) that is the upper left start
 * cell of that section.
 */
var cellToSectionStartCell = function(cell){
	return Math.floor(cell/qqwing.SEC_GROUP_SIZE)*qqwing.SEC_GROUP_SIZE
			+ Math.floor(cellToColumn(cell)/qqwing.GRID_SIZE)*qqwing.GRID_SIZE;
};

/**
 * Given the index of a cell (0-80) calculate
 * the section (0-8) in which it resides.
 */
var cellToSection = function(cell){
	return Math.floor(cell/qqwing.SEC_GROUP_SIZE)*qqwing.GRID_SIZE
			+ Math.floor(cellToColumn(cell)/qqwing.GRID_SIZE);
};

/**
 * Given a row (0-8) calculate the first cell (0-80)
 * of that row.
 */
var rowToFirstCell = function(row){
	return qqwing.ROW_COL_SEC_SIZE*row;
};

/**
 * Given a column (0-8) calculate the first cell (0-80)
 * of that column.
 */
var columnToFirstCell = function(column){
	return column;
};

/**
 * Given a section (0-8) calculate the first cell (0-80)
 * of that section.
 */
var sectionToFirstCell = function(section){
	return (section%qqwing.GRID_SIZE*qqwing.GRID_SIZE) + Math.floor(section/qqwing.GRID_SIZE)*qqwing.SEC_GROUP_SIZE;
};

/**
 * Given a value for a cell (0-8) and a cell (0-80)
 * calculate the offset into the possibility array (0-728).
 */
var getPossibilityIndex = function(valueIndex, cell){
	return valueIndex+(qqwing.ROW_COL_SEC_SIZE*cell);
};

/**
 * Given a row (0-8) and a column (0-8) calculate the
 * cell (0-80).
 */
var rowColumnToCell = function(row, column){
	return (row*qqwing.ROW_COL_SEC_SIZE)+column;
};

/**
 * Given a section (0-8) and an offset into that section (0-8)
 * calculate the cell (0-80)
 */
var sectionToCell = function(section, offset){
	return sectionToFirstCell(section)
			+ Math.floor(offset/qqwing.GRID_SIZE)*qqwing.ROW_COL_SEC_SIZE
			+ (offset%qqwing.GRID_SIZE);
};

var println = function(s){
	if ((typeof console != 'undefined') && console.log) console.log(s);
};

var printnoln = function(s){
	if ((typeof process != 'undefined') && process.stdout && process.stdout.write) process.stdout.write(s);
	else println(s);
};

/**
 * The 81 integers that make up a sudoku puzzle.
 * Givens are 1-9, unknowns are 0.
 * Once initialized, this puzzle remains as is.
 * The answer is worked out in "solution".
 */
var puzzle = new Array(qqwing.BOARD_SIZE);

/**
 * The 81 integers that make up a sudoku puzzle.
 * The solution is built here, after completion
 * all will be 1-9.
 */
var solution = new Array(qqwing.BOARD_SIZE);

/**
 * Recursion depth at which each of the numbers
 * in the solution were placed.  Useful for backing
 * out solve branches that don't lead to a solution.
 */
var solutionRound = new Array(qqwing.BOARD_SIZE);

/**
 * The 729 integers that make up a the possible
 * values for a Sudoku puzzle. (9 possibilities
 * for each of 81 squares).  If possibilities[i]
 * is zero, then the possibility could still be
 * filled in according to the Sudoku rules.  When
 * a possibility is eliminated, possibilities[i]
 * is assigned the round (level) at
 * which it was determined that it could not be
 * a possibility.
 */
var possibilities = new Array(qqwing.POSSIBILITY_SIZE);

/**
 * An array the size of the board (81) containing each
 * of the numbers 0-n exactly once.  This array may
 * be shuffled so that operations that need to
 * look at each cell can do so in a random order.
 */
var randomBoardArray = new Array(qqwing.BOARD_SIZE);

for (var i=0; i<qqwing.BOARD_SIZE; i++){
	randomBoardArray[i] = i;
}

/**
 * An array with one element for each position (9), in
 * some random order to be used when trying each
 * position in turn during guesses.
 */
var randomPossibilityArray = new Array(qqwing.ROW_COL_SEC_SIZE);

for (var i=0; i<qqwing.ROW_COL_SEC_SIZE; i++){
	randomPossibilityArray[i] = i;
}

/**
 * Whether or not to record history
 */
var recordHistory = false;

/**
 * Whether or not to print history as it happens
 */
var logHistory = false;

/**
 * A list of moves used to solve the puzzle.
 * This list contains all moves, on solve
 * branches that did not lead to a solution.
 */
var solveHistory = [];

/**
 * A list of moves used to solve the puzzle.
 * This list contains only the moves needed
 * to solve the puzzle, doesn't contain
 * information about bad guesses.
 */
var solveInstructions = [];

/**
 * The style with which to print puzzles and solutions
 */
var printStyle = qqwing.PrintStyle.READABLE;

/**
 * The last round of solving
 */
var lastSolveRound = 0;

/**
 * Reset the board to its initial state with
 * only the givens.
 * This method clears any solution, resets statistics,
 * and clears any history messages.
 */
var reset = function(){
	for (var i=0; i<qqwing.BOARD_SIZE; i++){
		solution[i] = 0;
	}
	for (var i=0; i<qqwing.BOARD_SIZE; i++){
		solutionRound[i] = 0;
	}
	for (var i=0; i<qqwing.POSSIBILITY_SIZE; i++){
		possibilities[i] = 0;
	}
	solveHistory = [];
	solveInstructions = [];

	var round = 1;
	for (var position=0; position<qqwing.BOARD_SIZE; position++){
		if (puzzle[position] > 0){
			var valIndex = puzzle[position]-1;
			var valPos = getPossibilityIndex(valIndex,position);
			var value = puzzle[position];
			if (possibilities[valPos] != 0) return false;
			mark.call(this,position,round,value);
			if (logHistory || recordHistory) addHistoryItem.call(this, new this.LogItem(round, qqwing.LogType.GIVEN, value, position));
		}
	}
	return true;
};

var singleSolveMove = function(round){
	if (onlyPossibilityForCell.call(this, round)) return true;
	if (onlyValueInSection.call(this, round)) return true;
	if (onlyValueInRow.call(this, round)) return true;
	if (onlyValueInColumn.call(this, round)) return true;
	if (handleNakedPairs.call(this, round)) return true;
	if (pointingRowReduction.call(this, round)) return true;
	if (pointingColumnReduction.call(this, round)) return true;
	if (rowBoxReduction.call(this, round)) return true;
	if (colBoxReduction.call(this, round)) return true;
	if (hiddenPairInRow.call(this, round)) return true;
	if (hiddenPairInColumn.call(this, round)) return true;
	if (hiddenPairInSection.call(this, round)) return true;
	return false;
};

/**
 * Mark exactly one cell that has a single possibility, if such a cell exists.
 * This method will look for a cell that has only one possibility.  This type
 * of cell is often called a "single"
 */
var onlyPossibilityForCell = function(round){
	for (var position=0; position<qqwing.BOARD_SIZE; position++){
		if (solution[position] == 0){
			var count = 0;
			var lastValue = 0;
			for (var valIndex=0; valIndex<qqwing.ROW_COL_SEC_SIZE; valIndex++){
				var valPos = getPossibilityIndex(valIndex,position);
				if (possibilities[valPos] == 0){
					count++;
					lastValue=valIndex+1;
				}
			}
			if (count == 1){
				mark.call(this, position, round, lastValue);
				if (logHistory || recordHistory) addHistoryItem.call(this, new this.LogItem(round, qqwing.LogType.SINGLE, lastValue, position));
				return true;
			}
		}
	}
	return false;
};

/**
 * Mark exactly one cell which is the only possible value for some row, if
 * such a cell exists.
 * This method will look in a row for a possibility that is only listed
 * for one cell.  This type of cell is often called a "hidden single"
 */
var onlyValueInRow = function(round){
	for (var row=0; row<qqwing.ROW_COL_SEC_SIZE; row++){
		for (var valIndex=0; valIndex<qqwing.ROW_COL_SEC_SIZE; valIndex++){
			var count = 0;
			var lastPosition = 0;
			for (var col=0; col<qqwing.ROW_COL_SEC_SIZE; col++){
				var position = (row*qqwing.ROW_COL_SEC_SIZE)+col;
				var valPos = getPossibilityIndex(valIndex,position);
				if (possibilities[valPos] == 0){
					count++;
					lastPosition = position;
				}
			}
			if (count == 1){
				var value = valIndex+1;
				if (logHistory || recordHistory) addHistoryItem.call(this, new this.LogItem(round, qqwing.LogType.HIDDEN_SINGLE_ROW, value, lastPosition));
				mark.call(this, lastPosition, round, value);
				return true;
			}
		}
	}
	return false;
}

/**
 * Mark exactly one cell which is the only possible value for some column, if
 * such a cell exists.
 * This method will look in a column for a possibility that is only listed
 * for one cell.  This type of cell is often called a "hidden single"
 */
var onlyValueInColumn = function(round){
	for (var col=0; col<qqwing.ROW_COL_SEC_SIZE; col++){
		for (var valIndex=0; valIndex<qqwing.ROW_COL_SEC_SIZE; valIndex++){
			var count = 0;
			var lastPosition = 0;
			for (var row=0; row<qqwing.ROW_COL_SEC_SIZE; row++){
				var position = rowColumnToCell(row,col);
				var valPos = getPossibilityIndex(valIndex,position);
				if (possibilities[valPos] == 0){
					count++;
					lastPosition = position;
				}
			}
			if (count == 1){
				var value = valIndex+1;
				if (logHistory || recordHistory) addHistoryItem.call(this, new this.LogItem(round, qqwing.LogType.HIDDEN_SINGLE_COLUMN, value, lastPosition));
				mark.call(this, lastPosition, round, value);
				return true;
			}
		}
	}
	return false;
}


/**
 * Mark exactly one cell which is the only possible value for some section, if
 * such a cell exists.
 * This method will look in a section for a possibility that is only listed
 * for one cell.  This type of cell is often called a "hidden single"
 */
var onlyValueInSection = function(round){
	for (var sec=0; sec<qqwing.ROW_COL_SEC_SIZE; sec++){
		var secPos = sectionToFirstCell(sec);
		for (var valIndex=0; valIndex<qqwing.ROW_COL_SEC_SIZE; valIndex++){
			var count = 0;
			var lastPosition = 0;
			for (var i=0; i<qqwing.GRID_SIZE; i++){
				for (var j=0; j<qqwing.GRID_SIZE; j++){
					var position = secPos + i + qqwing.ROW_COL_SEC_SIZE*j;
					var valPos = getPossibilityIndex(valIndex,position);
					if (possibilities[valPos] == 0){
						count++;
						lastPosition = position;
					}
				}
			}
			if (count == 1){
				var value = valIndex+1;
				if (logHistory || recordHistory) addHistoryItem.call(this, new this.LogItem(round, qqwing.LogType.HIDDEN_SINGLE_SECTION, value, lastPosition));
				mark.call(this, lastPosition, round, value);
				return true;
			}
		}
	}
	return false;
}

var guess = function(round, guessNumber){
	var localGuessCount = 0;
	var position = findPositionWithFewestPossibilities.call(this);
	for (var i=0; i<qqwing.ROW_COL_SEC_SIZE; i++){
		var valIndex = randomPossibilityArray[i];
		var valPos = getPossibilityIndex(valIndex,position);
		if (possibilities[valPos] == 0){
			if (localGuessCount == guessNumber){
				var value = valIndex+1;
				if (logHistory || recordHistory) addHistoryItem.call(this, new this.LogItem(round, qqwing.LogType.GUESS, value, position));
				mark.call(this, position, round, value);
				return true;
			}
			localGuessCount++;
		}
	}
	return false;
};

var isImpossible = function(){
	for (var position=0; position<qqwing.BOARD_SIZE; position++){
		if (solution[position] == 0){
			var count = 0;
			for (var valIndex=0; valIndex<qqwing.ROW_COL_SEC_SIZE; valIndex++){
				var valPos = getPossibilityIndex(valIndex,position);
				if (possibilities[valPos] == 0) count++;
			}
			if (count == 0) {
				return true;
			}
		}
	}
	return false;
};

var rollbackRound = function(round){
	if (logHistory || recordHistory) addHistoryItem.call(this, new this.LogItem(round, qqwing.LogType.ROLLBACK));
	for (var i=0; i<qqwing.BOARD_SIZE; i++){
		if (solutionRound[i] == round){
			solutionRound[i] = 0;
			solution[i] = 0;
		}
	}
	{for (var i=0; i<qqwing.POSSIBILITY_SIZE; i++){
		if (possibilities[i] == round){
			possibilities[i] = 0;
		}
	}}

	while(solveInstructions.length > 0 && solveInstructions[solveInstructions.length-1] == round){
		solveInstructions.pop();
	}
};

var pointingRowReduction = function(round){
	for (var valIndex=0; valIndex<qqwing.ROW_COL_SEC_SIZE; valIndex++){
		for (var section=0; section<qqwing.ROW_COL_SEC_SIZE; section++){
			var secStart = sectionToFirstCell(section);
			var inOneRow = true;
			var boxRow = -1;
			for (var j=0; j<qqwing.GRID_SIZE; j++){
				for (var i=0; i<qqwing.GRID_SIZE; i++){
					var secVal=secStart+i+(qqwing.ROW_COL_SEC_SIZE*j);
					var valPos = getPossibilityIndex(valIndex,secVal);
					if(possibilities[valPos] == 0){
						if (boxRow == -1 || boxRow == j){
							boxRow = j;
						} else {
							inOneRow = false;
						}
					}
				}
			}
			if (inOneRow && boxRow != -1){
				var doneSomething = false;
				var row = cellToRow(secStart) + boxRow;
				var rowStart = rowToFirstCell(row);

				for (var i=0; i<qqwing.ROW_COL_SEC_SIZE; i++){
					var position = rowStart+i;
					var section2 = cellToSection(position);
					var valPos = getPossibilityIndex(valIndex,position);
					if (section != section2 && possibilities[valPos] == 0){
						possibilities[valPos] = round;
						doneSomething = true;
					}
				}
				if (doneSomething){
					if (logHistory || recordHistory) addHistoryItem.call(this, new this.LogItem(round, qqwing.LogType.POINTING_PAIR_TRIPLE_ROW, valIndex+1, rowStart));
					return true;
				}
			}
		}
	}
	return false;
};

var rowBoxReduction = function(round){
	for (var valIndex=0; valIndex<qqwing.ROW_COL_SEC_SIZE; valIndex++){
		for (var row=0; row<qqwing.ROW_COL_SEC_SIZE; row++){
			var rowStart = rowToFirstCell(row);
			var inOneBox = true;
			var rowBox = -1;
			for (var i=0; i<qqwing.GRID_SIZE; i++){
				for (var j=0; j<qqwing.GRID_SIZE; j++){
					var column = i*qqwing.GRID_SIZE+j;
					var position = rowColumnToCell(row, column);
					var valPos = getPossibilityIndex(valIndex,position);
					if(possibilities[valPos] == 0){
						if (rowBox == -1 || rowBox == i){
							rowBox = i;
						} else {
							inOneBox = false;
						}
					}
				}
			}
			if (inOneBox && rowBox != -1){
				var doneSomething = false;
				var column = qqwing.GRID_SIZE*rowBox;
				var secStart = cellToSectionStartCell(rowColumnToCell(row, column));
				var secStartRow = cellToRow(secStart);
				var secStartCol = cellToColumn(secStart);
				for (var i=0; i<qqwing.GRID_SIZE; i++){
					for (var j=0; j<qqwing.GRID_SIZE; j++){
						var row2 = secStartRow+i;
						var col2 = secStartCol+j;
						var position = rowColumnToCell(row2, col2);
						var valPos = getPossibilityIndex(valIndex,position);
						if (row != row2 && possibilities[valPos] == 0){
							possibilities[valPos] = round;
							doneSomething = true;
						}
					}
				}
				if (doneSomething){
					if (logHistory || recordHistory) addHistoryItem.call(this, new this.LogItem(round, qqwing.LogType.ROW_BOX, valIndex+1, rowStart));
					return true;
				}
			}
		}
	}
	return false;
};

var colBoxReduction = function(round){
	for (var valIndex=0; valIndex<qqwing.ROW_COL_SEC_SIZE; valIndex++){
		for (var row=0; row<qqwing.ROW_COL_SEC_SIZE; row++){
			var rowStart = rowToFirstCell(row);
			var inOneBox = true;
			var rowBox = -1;
			for (var i=0; i<qqwing.GRID_SIZE; i++){
				for (var j=0; j<qqwing.GRID_SIZE; j++){
					var column = i*qqwing.GRID_SIZE+j;
					var position = rowColumnToCell(row, column);
					var valPos = getPossibilityIndex(valIndex,position);
					if(possibilities[valPos] == 0){
						if (rowBox == -1 || rowBox == i){
							rowBox = i;
						} else {
							inOneBox = false;
						}
					}
				}
			}
			if (inOneBox && rowBox != -1){
				var doneSomething = false;
				var column = qqwing.GRID_SIZE*rowBox;
				var secStart = cellToSectionStartCell(rowColumnToCell(row, column));
				var secStartRow = cellToRow(secStart);
				var secStartCol = cellToColumn(secStart);
				for (var i=0; i<qqwing.GRID_SIZE; i++){
					for (var j=0; j<qqwing.GRID_SIZE; j++){
						var row2 = secStartRow+i;
						var col2 = secStartCol+j;
						var position = rowColumnToCell(row2, col2);
						var valPos = getPossibilityIndex(valIndex,position);
						if (row != row2 && possibilities[valPos] == 0){
							possibilities[valPos] = round;
							doneSomething = true;
						}
					}
				}
				if (doneSomething){
					if (logHistory || recordHistory) addHistoryItem.call(this, new this.LogItem(round, qqwing.LogType.ROW_BOX, valIndex+1, rowStart));
					return true;
				}
			}
		}
	}
	return false;
};

var pointingColumnReduction = function(round){
	for (var valIndex=0; valIndex<qqwing.ROW_COL_SEC_SIZE; valIndex++){
		for (var section=0; section<qqwing.ROW_COL_SEC_SIZE; section++){
			var secStart = sectionToFirstCell(section);
			var inOneCol = true;
			var boxCol = -1;
			for (var i=0; i<qqwing.GRID_SIZE; i++){
				for (var j=0; j<qqwing.GRID_SIZE; j++){
					var secVal=secStart+i+(qqwing.ROW_COL_SEC_SIZE*j);
					var valPos = getPossibilityIndex(valIndex,secVal);
					if(possibilities[valPos] == 0){
						if (boxCol == -1 || boxCol == i){
							boxCol = i;
						} else {
							inOneCol = false;
						}
					}
				}
			}
			if (inOneCol && boxCol != -1){
				var doneSomething = false;
				var col = cellToColumn(secStart) + boxCol;
				var colStart = columnToFirstCell(col);

				for (var i=0; i<qqwing.ROW_COL_SEC_SIZE; i++){
					var position = colStart+(qqwing.ROW_COL_SEC_SIZE*i);
					var section2 = cellToSection(position);
					var valPos = getPossibilityIndex(valIndex,position);
					if (section != section2 && possibilities[valPos] == 0){
						possibilities[valPos] = round;
						doneSomething = true;
					}
				}
				if (doneSomething){
					if (logHistory || recordHistory) addHistoryItem.call(this, new this.LogItem(round, qqwing.LogType.POINTING_PAIR_TRIPLE_COLUMN, valIndex+1, colStart));
					return true;
				}
			}
		}
	}
	return false;
}

var hiddenPairInRow = function(round){
	for (var row=0; row<qqwing.ROW_COL_SEC_SIZE; row++){
		for (var valIndex=0; valIndex<qqwing.ROW_COL_SEC_SIZE; valIndex++){
			var c1 = -1;
			var c2 = -1;
			var valCount = 0;
			for (var column=0; column<qqwing.ROW_COL_SEC_SIZE; column++){
				var position = rowColumnToCell(row,column);
				var valPos = getPossibilityIndex(valIndex,position);
				if (possibilities[valPos] == 0){
					if (c1 == -1 || c1 == column){
						c1 = column;
					} else if (c2 == -1 || c2 == column){
						c2 = column;
					}
					valCount++;
				}
			}
			if (valCount==2){
				for (var valIndex2=valIndex+1; valIndex2<qqwing.ROW_COL_SEC_SIZE; valIndex2++){
					var c3 = -1;
					var c4 = -1;
					var valCount2 = 0;
					for (var column=0; column<qqwing.ROW_COL_SEC_SIZE; column++){
						var position = rowColumnToCell(row,column);
						var valPos = getPossibilityIndex(valIndex2,position);
						if (possibilities[valPos] == 0){
							if (c3 == -1 || c3 == column){
								c3 = column;
							} else if (c4 == -1 || c4 == column){
								c4 = column;
							}
							valCount2++;
						}
					}
					if (valCount2==2 && c1==c3 && c2==c4){
						var doneSomething = false;
						for (var valIndex3=0; valIndex3<qqwing.ROW_COL_SEC_SIZE; valIndex3++){
							if (valIndex3 != valIndex && valIndex3 != valIndex2){
								var position1 = rowColumnToCell(row,c1);
								var position2 = rowColumnToCell(row,c2);
								var valPos1 = getPossibilityIndex(valIndex3,position1);
								var valPos2 = getPossibilityIndex(valIndex3,position2);
								if (possibilities[valPos1] == 0){
									possibilities[valPos1] = round;
									doneSomething = true;
								}
								if (possibilities[valPos2] == 0){
									possibilities[valPos2] = round;
									doneSomething = true;
								}
							}
						}
						if (doneSomething){
							if (logHistory || recordHistory) addHistoryItem.call(this, new this.LogItem(round, qqwing.LogType.HIDDEN_PAIR_ROW, valIndex+1, rowColumnToCell(row,c1)));
							return true;
						}
					}
				}
			}
		}
	}
	return false;
};

var hiddenPairInColumn = function(round){
	for (var column=0; column<qqwing.ROW_COL_SEC_SIZE; column++){
		for (var valIndex=0; valIndex<qqwing.ROW_COL_SEC_SIZE; valIndex++){
			var r1 = -1;
			var r2 = -1;
			var valCount = 0;
			for (var row=0; row<qqwing.ROW_COL_SEC_SIZE; row++){
				var position = rowColumnToCell(row,column);
				var valPos = getPossibilityIndex(valIndex,position);
				if (possibilities[valPos] == 0){
					if (r1 == -1 || r1 == row){
						r1 = row;
					} else if (r2 == -1 || r2 == row){
						r2 = row;
					}
					valCount++;
				}
			}
			if (valCount==2){
				for (var valIndex2=valIndex+1; valIndex2<qqwing.ROW_COL_SEC_SIZE; valIndex2++){
					var r3 = -1;
					var r4 = -1;
					var valCount2 = 0;
					for (var row=0; row<qqwing.ROW_COL_SEC_SIZE; row++){
						var position = rowColumnToCell(row,column);
						var valPos = getPossibilityIndex(valIndex2,position);
						if (possibilities[valPos] == 0){
							if (r3 == -1 || r3 == row){
								r3 = row;
							} else if (r4 == -1 || r4 == row){
								r4 = row;
							}
							valCount2++;
						}
					}
					if (valCount2==2 && r1==r3 && r2==r4){
						var doneSomething = false;
						for (var valIndex3=0; valIndex3<qqwing.ROW_COL_SEC_SIZE; valIndex3++){
							if (valIndex3 != valIndex && valIndex3 != valIndex2){
								var position1 = rowColumnToCell(r1,column);
								var position2 = rowColumnToCell(r2,column);
								var valPos1 = getPossibilityIndex(valIndex3,position1);
								var valPos2 = getPossibilityIndex(valIndex3,position2);
								if (possibilities[valPos1] == 0){
									possibilities[valPos1] = round;
									doneSomething = true;
								}
								if (possibilities[valPos2] == 0){
									possibilities[valPos2] = round;
									doneSomething = true;
								}
							}
						}
						if (doneSomething){
							if (logHistory || recordHistory) addHistoryItem.call(this, new this.LogItem(round, qqwing.LogType.HIDDEN_PAIR_COLUMN, valIndex+1, rowColumnToCell(r1,column)));
							return true;
						}
					}
				}
			}
		}
	}
	return false;
};

var hiddenPairInSection = function(round){
	for (var section=0; section<qqwing.ROW_COL_SEC_SIZE; section++){
		for (var valIndex=0; valIndex<qqwing.ROW_COL_SEC_SIZE; valIndex++){
			var si1 = -1;
			var si2 = -1;
			var valCount = 0;
			for (var secInd=0; secInd<qqwing.ROW_COL_SEC_SIZE; secInd++){
				var position = sectionToCell(section,secInd);
				var valPos = getPossibilityIndex(valIndex,position);
				if (possibilities[valPos] == 0){
					if (si1 == -1 || si1 == secInd){
						si1 = secInd;
					} else if (si2 == -1 || si2 == secInd){
						si2 = secInd;
					}
					valCount++;
				}
			}
			if (valCount==2){
				for (var valIndex2=valIndex+1; valIndex2<qqwing.ROW_COL_SEC_SIZE; valIndex2++){
					var si3 = -1;
					var si4 = -1;
					var valCount2 = 0;
					for (var secInd=0; secInd<qqwing.ROW_COL_SEC_SIZE; secInd++){
						var position = sectionToCell(section,secInd);
						var valPos = getPossibilityIndex(valIndex2,position);
						if (possibilities[valPos] == 0){
							if (si3 == -1 || si3 == secInd){
								si3 = secInd;
							} else if (si4 == -1 || si4 == secInd){
								si4 = secInd;
							}
							valCount2++;
						}
					}
					if (valCount2==2 && si1==si3 && si2==si4){
						var doneSomething = false;
						for (var valIndex3=0; valIndex3<qqwing.ROW_COL_SEC_SIZE; valIndex3++){
							if (valIndex3 != valIndex && valIndex3 != valIndex2){
								var position1 = sectionToCell(section,si1);
								var position2 = sectionToCell(section,si2);
								var valPos1 = getPossibilityIndex(valIndex3,position1);
								var valPos2 = getPossibilityIndex(valIndex3,position2);
								if (possibilities[valPos1] == 0){
									possibilities[valPos1] = round;
									doneSomething = true;
								}
								if (possibilities[valPos2] == 0){
									possibilities[valPos2] = round;
									doneSomething = true;
								}
							}
						}
						if (doneSomething){
							if (logHistory || recordHistory) addHistoryItem.call(this, new this.LogItem(round, qqwing.LogType.HIDDEN_PAIR_SECTION, valIndex+1, sectionToCell(section,si1)));
							return true;
						}
					}
				}
			}
		}
	}
	return false;
};

/**
 * Mark the given value at the given position.  Go through
 * the row, column, and section for the position and remove
 * the value from the possibilities.
 *
 * @param position Position into the board (0-80)
 * @param round Round to mark for rollback purposes
 * @param value The value to go in the square at the given position
 */
var mark = function(position, round, value){
	if (solution[position] != 0) throw ("Marking position that already has been marked.");
	if (solutionRound[position] !=0) throw ("Marking position that was marked another round.");
	var valIndex = value-1;
	solution[position] = value;

	var possInd = getPossibilityIndex(valIndex,position);
	if (possibilities[possInd] != 0) throw ("Marking impossible position.");

	// Take this value out of the possibilities for everything in the row
	solutionRound[position] = round;
	var rowStart = cellToRow(position)*qqwing.ROW_COL_SEC_SIZE;
	for (var col=0; col<qqwing.ROW_COL_SEC_SIZE; col++){
		var rowVal=rowStart+col;
		var valPos = getPossibilityIndex(valIndex,rowVal);
		if (possibilities[valPos] == 0){
			possibilities[valPos] = round;
		}
	}

	// Take this value out of the possibilities for everything in the column
	var colStart = cellToColumn(position);
	for (var i=0; i<qqwing.ROW_COL_SEC_SIZE; i++){
		var colVal=colStart+(qqwing.ROW_COL_SEC_SIZE*i);
		var valPos = getPossibilityIndex(valIndex,colVal);
		if (possibilities[valPos] == 0){
			possibilities[valPos] = round;
		}
	}

	// Take this value out of the possibilities for everything in section
	var secStart = cellToSectionStartCell(position);
	for (var i=0; i<qqwing.GRID_SIZE; i++){
		for (var j=0; j<qqwing.GRID_SIZE; j++){
			var secVal=secStart+i+(qqwing.ROW_COL_SEC_SIZE*j);
			var valPos = getPossibilityIndex(valIndex,secVal);
			if (possibilities[valPos] == 0){
				possibilities[valPos] = round;
			}
		}
	}

	//This position itself is determined, it should have possibilities.
	for (var valIndex=0; valIndex<qqwing.ROW_COL_SEC_SIZE; valIndex++){
		var valPos = getPossibilityIndex(valIndex,position);
		if (possibilities[valPos] == 0){
			possibilities[valPos] = round;
		}
	}
};

var findPositionWithFewestPossibilities = function(){
	var minPossibilities = 10;
	var bestPosition = 0;
	for (var i=0; i<qqwing.BOARD_SIZE; i++){
		var position = randomBoardArray[i];
		if (solution[position] == 0){
			var count = 0;
			for (var valIndex=0; valIndex<qqwing.ROW_COL_SEC_SIZE; valIndex++){
				var valPos = getPossibilityIndex(valIndex,position);
				if (possibilities[valPos] == 0) count++;
			}
			if (count < minPossibilities){
				minPossibilities = count;
				bestPosition = position;
			}
		}
	}
	return bestPosition;
};

var handleNakedPairs = function(round){
	for (var position=0; position<qqwing.BOARD_SIZE; position++){
		var possibilities = countPossibilities(position);
		if (possibilities == 2){
			var row = cellToRow(position);
			var column = cellToColumn(position);
			var section = cellToSectionStartCell(position);
			for (var position2=position; position2<qqwing.BOARD_SIZE; position2++){
				if (position != position2){
					var possibilities2 = countPossibilities(position2);
					if (possibilities2 == 2 && arePossibilitiesSame(position, position2)){
						if (row == cellToRow(position2)){
							var doneSomething = false;
							for (var column2=0; column2<qqwing.ROW_COL_SEC_SIZE; column2++){
								var position3 = rowColumnToCell(row,column2);
								if (position3 != position && position3 != position2 && removePossibilitiesInOneFromTwo(position, position3, round)){
									doneSomething = true;
								}
							}
							if (doneSomething){
								if (logHistory || recordHistory) addHistoryItem.call(this, new this.LogItem(round, qqwing.LogType.NAKED_PAIR_ROW, 0, position));
								return true;
							}
						}
						if (column == cellToColumn(position2)){
							var doneSomething = false;
							for (var row2=0; row2<qqwing.ROW_COL_SEC_SIZE; row2++){
								var position3 = rowColumnToCell(row2,column);
								if (position3 != position && position3 != position2 && removePossibilitiesInOneFromTwo(position, position3, round)){
									doneSomething = true;
								}
							}
							if (doneSomething){
								if (logHistory || recordHistory) addHistoryItem.call(this, new this.LogItem(round, qqwing.LogType.NAKED_PAIR_COLUMN, 0, position));
								return true;
							}
						}
						if (section == cellToSectionStartCell(position2)){
							var doneSomething = false;
							var secStart = cellToSectionStartCell(position);
							for (var i=0; i<qqwing.GRID_SIZE; i++){
								for (var j=0; j<qqwing.GRID_SIZE; j++){
									var position3=secStart+i+(qqwing.ROW_COL_SEC_SIZE*j);
									if (position3 != position && position3 != position2 && removePossibilitiesInOneFromTwo(position, position3, round)){
										doneSomething = true;
									}
								}
							}
							if (doneSomething){
								if (logHistory || recordHistory) addHistoryItem.call(this, new this.LogItem(round, qqwing.LogType.NAKED_PAIR_SECTION, 0, position));
								return true;
							}
						}
					}
				}
			}
		}
	}
	return false;
};

var countPossibilities = function(position){
	var count = 0;
	for (var valIndex=0; valIndex<qqwing.ROW_COL_SEC_SIZE; valIndex++){
		var valPos = getPossibilityIndex(valIndex,position);
		if (possibilities[valPos] == 0) count++;
	}
	return count;
};

var arePossibilitiesSame = function(position1, position2){
	for (var valIndex=0; valIndex<qqwing.ROW_COL_SEC_SIZE; valIndex++){
		var valPos1 = getPossibilityIndex(valIndex,position1);
		var valPos2 = getPossibilityIndex(valIndex,position2);
		if ((possibilities[valPos1] == 0 || possibilities[valPos2] == 0) && (possibilities[valPos1] != 0 || possibilities[valPos2] != 0)){
				return false;
		}
	}
	return true;
};

var addHistoryItem = function(l){
	if (logHistory) l.print();
	if (recordHistory){
		solveHistory.push(l);
		solveInstructions.push(l);
	}
};

var shuffleRandomArrays = function(){
	shuffleArray(randomBoardArray, qqwing.BOARD_SIZE);
	shuffleArray(randomPossibilityArray, qqwing.ROW_COL_SEC_SIZE);
};

/**
 * print the given BOARD_SIZEd array of ints
 * as a sudoku puzzle.  Use print options from
 * member variables.
 */
var print = function(puz){
	printnoln(sudokuToString.call(this, puz));
};

var sudokuToString = function(puz){
	var s = "";
	for(var i=0; i<qqwing.BOARD_SIZE; i++){
		if (printStyle == qqwing.PrintStyle.READABLE){
			s += " ";
		}
		if (puz[i]==0){
			s += '.';
		} else {
			s += puz[i];
		}
		if (i == qqwing.BOARD_SIZE-1){
			if (printStyle == qqwing.PrintStyle.CSV){
				s += ",";
			} else {
				s += "\n";
			}
			if (printStyle == qqwing.PrintStyle.READABLE || printStyle == qqwing.PrintStyle.COMPACT){
				s += "\n";
			}
		} else if (i%qqwing.ROW_COL_SEC_SIZE==qqwing.ROW_COL_SEC_SIZE-1){
			if (printStyle == qqwing.PrintStyle.READABLE || printStyle == qqwing.PrintStyle.COMPACT){
				s += "\n";
			}
			if (i%qqwing.SEC_GROUP_SIZE==qqwing.SEC_GROUP_SIZE-1){
				if (printStyle == qqwing.PrintStyle.READABLE){
					s += "-------|-------|-------\n";
				}
			}
		} else if (i%qqwing.GRID_SIZE==qqwing.GRID_SIZE-1){
			if (printStyle == qqwing.PrintStyle.READABLE){
				s += " |";
			}
		}
	}
	return s;
};

var rollbackNonGuesses = function(){
	// Guesses are odd rounds
	// Non-guesses are even rounds
	for (var i=2; i<=lastSolveRound; i+=2){
		rollbackRound.call(this, i);
	}
};

var clearPuzzle = function(){
	// Clear any existing puzzle
	for (var i=0; i<qqwing.BOARD_SIZE; i++){
		puzzle[i] = 0;
	}
	reset.call(this);
};

var printHistory = function(v){
	printnoln(getHistoryString(v));
};

var getHistoryString = function(v){
	var s = "";
	if (!recordHistory){
		s += "History was not recorded.";
		if (printStyle == qqwing.PrintStyle.CSV){
			s += " -- ";
		} else {
			s += "\n";
		}
	}
	for (var i=0;i<v.length;i++){
		s += i+1 + ". " + v[i].toString();
		if (printStyle == qqwing.PrintStyle.CSV){
			s += " -- ";
		} else {
			s += "\n";
		}
	}
	if (printStyle == qqwing.PrintStyle.CSV){
		s += ",";
	} else {
		s += "\n";
	}
	return s;
};

var removePossibilitiesInOneFromTwo = function(position1, position2, round){
	var doneSomething = false;
	for (var valIndex=0; valIndex<qqwing.ROW_COL_SEC_SIZE; valIndex++){
		var valPos1 = getPossibilityIndex(valIndex,position1);
		var valPos2 = getPossibilityIndex(valIndex,position2);
		if (possibilities[valPos1] == 0 && possibilities[valPos2] == 0){
			possibilities[valPos2] = round;
			doneSomething = true;
		}
	}
	return doneSomething;
};

/**
 * Shuffle the values in an array of integers.
 */
var shuffleArray = function(array, size){
	for (var i=0; i<size; i++){
		var tailSize = size-i;
		var randTailPos = Math.floor(Math.random() * tailSize) + i;
		var temp = array[i];
		array[i] = array[randTailPos];
		array[randTailPos] = temp;
	}
};

var getRandomSymmetry = function(){
	var rand = Math.floor(Math.random() * 4)
	switch (rand){
		case 0: return qqwing.Symmetry.ROTATE90;
		case 1: return qqwing.Symmetry.ROTATE180;
		case 2: return qqwing.Symmetry.MIRROR;
		case 3: return qqwing.Symmetry.FLIP;
	}
	throw ("Unexpected random value: " + rand);
};

var getLogCount = function(v, type){
	var count = 0;
	for (var i=0; i<v.length; i++){
		if((v[i]).getType() == type) count++;
	}
	return count;
};
this.LogItem = function(r, t, v, p){
	/**
	 * The recursion level at which this item was gathered.
	 * Used for backing out log items solve branches that
	 * don't lead to a solution.
	 */
	var round = r;

	/**
	 * The type of log message that will determine the
	 * message printed.
	 */
	var type = t;

	/**
	 * Value that was set by the operation (or zero for no value)
	 */
	var value = v;

	/**
	 * position on the board at which the value (if any) was set.
	 */
	var position = p;

	this.getRound = function (){
		return round;
	};

	this.print = function(){
		println(this.toString());
	};

	this.getType = function(){
		return type;
	};

	this.getColumn = function(){
		if (position == -1) return -1;
		return cellToColumn(position);
	};

	this.getRow = function(){
		if (position == -1) return -1;
		return cellToRow(position);
	}

	this.getPosition = function(){
		return position;
	}

	this.getValue = function(){
		return value;
	}

	this.getDescription = function(){
		switch(this.getType()){
			case qqwing.LogType.GIVEN: return "Mark given";
			case qqwing.LogType.ROLLBACK: return "Roll back round";
			case qqwing.LogType.GUESS: return "Mark guess (start round)";
			case qqwing.LogType.HIDDEN_SINGLE_ROW: return "Mark single possibility for value in row";
			case qqwing.LogType.HIDDEN_SINGLE_COLUMN: return "Mark single possibility for value in column";
			case qqwing.LogType.HIDDEN_SINGLE_SECTION: return "Mark single possibility for value in section";
			case qqwing.LogType.SINGLE: return "Mark only possibility for cell";
			case qqwing.LogType.NAKED_PAIR_ROW: return "Remove possibilities for naked pair in row";
			case qqwing.LogType.NAKED_PAIR_COLUMN: return "Remove possibilities for naked pair in column";
			case qqwing.LogType.NAKED_PAIR_SECTION: return "Remove possibilities for naked pair in section";
			case qqwing.LogType.POINTING_PAIR_TRIPLE_ROW: return "Remove possibilities for row because all values are in one section";
			case qqwing.LogType.POINTING_PAIR_TRIPLE_COLUMN: return "Remove possibilities for column because all values are in one section";
			case qqwing.LogType.ROW_BOX: return "Remove possibilities for section because all values are in one row";
			case qqwing.LogType.COLUMN_BOX: return "Remove possibilities for section because all values are in one column";
			case qqwing.LogType.HIDDEN_PAIR_ROW: return "Remove possibilities from hidden pair in row";
			case qqwing.LogType.HIDDEN_PAIR_COLUMN: return "Remove possibilities from hidden pair in column";
			case qqwing.LogType.HIDDEN_PAIR_SECTION: return "Remove possibilities from hidden pair in section";
			default: return "!!! Performed unknown optimization !!!";
		}
	}

	this.toString = function(){
		var s = "Round: " + this.getRound() + " - ";
		s += this.getDescription();
		if (value > 0 || position > -1){
			s += " (";
			var printed = false;
			if (position > -1){
				if (printed) s += " - ";
				s += "Row: " + (cellToRow(position)+1) + " - Column: " + (cellToColumn(position)+1);
				printed = true;
			}
			if (value > 0){
				if (printed) s += " - ";
				s += "Value: " + value;
				printed = true;
			}
			s += ")";
		}
		return s;
	}
};

/**
 * Set the board to the given puzzle.
 * The given puzzle must be an array of 81 integers.
 */
this.setPuzzle = function(initPuzzle){
	for (var i=0; i<qqwing.BOARD_SIZE; i++){
		puzzle[i] = initPuzzle[i];
	}
	return reset.call(this);
}

/**
 * Print the sudoku puzzle.
 */
this.printPuzzle = function(){
	return print.call(this, puzzle);
}

/**
 * Get the sudoku puzzle as a String.
 */
this.getPuzzleString = function(){
	return sudokuToString.call(this, puzzle);
}

/**
 * Print the sudoku solution.
 */
this.printSolution = function(){
	return print.call(this, solution);
}

/**
 * Get the sudoku puzzle as a String.
 */
this.getSolutionString = function(){
	return sudokuToString.call(this, solution);
}

this.solve = function(round){
	if (!round || round <= 1){
		reset.call(this);
		shuffleRandomArrays();
		return this.solve(2);
	}

	lastSolveRound = round;

	while (singleSolveMove.call(this, round)){
		if (this.isSolved()) return true;
		if (isImpossible.call(this)) return false;
	}

	var nextGuessRound = round+1;
	var nextRound = round+2;
	for (var guessNumber=0; guess.call(this, nextGuessRound, guessNumber); guessNumber++){
		if (isImpossible.call(this) || !this.solve(nextRound)){
			rollbackRound.call(this, nextRound);
			rollbackRound.call(this, nextGuessRound);
		} else {
			return true;
		}
	}
	return false;
};


this.countSolutions = function(round, limitToTwo){
	if (!round || round <= 1){
		// Don't record history while generating.
		var recHistory = recordHistory;
		this.setRecordHistory(false);
		var lHistory = logHistory;
		this.setLogHistory(false);

		reset.call(this);
		var solutionCount = this.countSolutions(2, false);

		// Restore recording history.
		this.setRecordHistory(recHistory);
		this.setLogHistory(lHistory);

		return solutionCount;
	} else {
		while (singleSolveMove.call(this, round)){
			if (this.isSolved()){
				rollbackRound.call(this, round);
				return 1;
			}
			if (isImpossible.call(this)){
				rollbackRound.call(this, round);
				return 0;
			}
		}

		var solutions = 0;
		var nextRound = round+1;
		for (var guessNumber=0; guess.call(this, nextRound, guessNumber); guessNumber++){
			solutions += this.countSolutions(nextRound, limitToTwo);
			if (limitToTwo && solutions >=2){
				rollbackRound.call(this, round);
				return solutions;
			}
		}
		rollbackRound.call(this, round);
		return solutions;
	}
};

this.isSolved = function(){
	for (var i=0; i<qqwing.BOARD_SIZE; i++){
		if (solution[i] == 0){
			return false;
		}
	}
	return true;
};

this.getSolveHistory = function(){
	if (this.isSolved()){
		return solveHistory;
	} else {
		return "No solve history - Puzzle is not possible to solve.";
	}
};

this.getSolveHistoryString = function(){
	if (this.isSolved()){
		return getHistoryString.call(this, solveHistory);
	} else {
		return "No solve history - Puzzle is not possible to solve.";
	}
};

this.printSolveHistory = function(){
	if (this.isSolved()){
		printHistory(solveHistory);
	} else {
		println("No solve history - Puzzle is not possible to solve.");
	}
};

this.setRecordHistory = function(recHistory){
	recordHistory = recHistory;
};

this.setLogHistory = function(logHist){
	logHistory = logHist;
};

this.setPrintStyle = function(ps){
	printStyle = ps;
};

this.generatePuzzle = function(){
	return this.generatePuzzleSymmetry(qqwing.Symmetry.NONE);
};

this.generatePuzzleSymmetry = function(symmetry){
		if (symmetry == qqwing.Symmetry.RANDOM) symmetry = getRandomSymmetry.call(this);

		// Don't record history while generating.
		var recHistory = recordHistory;
		this.setRecordHistory(false);
		var lHistory = logHistory;
		this.setLogHistory(false);

		clearPuzzle.call(this);

		// Start by getting the randomness in order so that
		// each puzzle will be different from the last.
		shuffleRandomArrays.call(this);

		// Now solve the puzzle the whole way.  The solve
		// uses random algorithms, so we should have a
		// really randomly totally filled sudoku
		// Even when starting from an empty grid
		this.solve();

		if (symmetry == qqwing.Symmetry.NONE){
			// Rollback any square for which it is obvious that
			// the square doesn't contribute to a unique solution
			// (ie, squares that were filled by logic rather
			// than by guess)
			rollbackNonGuesses.call(this);
		}

		// Record all marked squares as the puzzle so
		// that we can call countSolutions without losing it.
		for (var i=0; i<qqwing.BOARD_SIZE; i++){
			puzzle[i] = solution[i];
		}

		// Rerandomize everything so that we test squares
		// in a different order than they were added.
		shuffleRandomArrays.call(this);

		// Remove one value at a time and see if
		// the puzzle still has only one solution.
		// If it does, leave it out the point because
		// it is not needed.
		for (var i=0; i<qqwing.BOARD_SIZE; i++){
			// check all the positions, but in shuffled order
			var position = randomBoardArray[i];
			if (puzzle[position] > 0){
				var positionsym1 = -1;
				var positionsym2 = -1;
				var positionsym3 = -1;
				switch (symmetry){
					case qqwing.Symmetry.ROTATE90:
						positionsym2 = rowColumnToCell(qqwing.ROW_COL_SEC_SIZE-1-cellToColumn(position),cellToRow(position));
						positionsym3 = rowColumnToCell(cellToColumn(position),qqwing.ROW_COL_SEC_SIZE-1-cellToRow(position));
					case qqwing.Symmetry.ROTATE180:
						positionsym1 = rowColumnToCell(qqwing.ROW_COL_SEC_SIZE-1-cellToRow(position),qqwing.ROW_COL_SEC_SIZE-1-cellToColumn(position));
					break;
					case qqwing.Symmetry.MIRROR:
						positionsym1 = rowColumnToCell(cellToRow(position),qqwing.ROW_COL_SEC_SIZE-1-cellToColumn(position));
					break;
					case qqwing.Symmetry.FLIP:
						positionsym1 = rowColumnToCell(qqwing.ROW_COL_SEC_SIZE-1-cellToRow(position),cellToColumn(position));
					break;
				}
				// try backing out the value and
				// counting solutions to the puzzle
				var savedValue = puzzle[position];
				puzzle[position] = 0;
				var savedSym1 = 0;
				if (positionsym1 >= 0){
					savedSym1 = puzzle[positionsym1];
					puzzle[positionsym1] = 0;
				}
				var savedSym2 = 0;
				if (positionsym2 >= 0){
					savedSym2 = puzzle[positionsym2];
					puzzle[positionsym2] = 0;
				}
				var savedSym3 = 0;
				if (positionsym3 >= 0){
					savedSym3 = puzzle[positionsym3];
					puzzle[positionsym3] = 0;
				}
				reset.call(this);
				if (this.countSolutions(2, true) > 1){
					// Put it back in, it is needed
					puzzle[position] = savedValue;
					if (positionsym1 >= 0 && savedSym1 != 0) puzzle[positionsym1] = savedSym1;
					if (positionsym2 >= 0 && savedSym2 != 0) puzzle[positionsym2] = savedSym2;
					if (positionsym3 >= 0 && savedSym3 != 0) puzzle[positionsym3] = savedSym3;
				}
			}
		}

		// Clear all solution info, leaving just the puzzle.
		reset.call(this);

		// Restore recording history.
		this.setRecordHistory(recHistory);
		this.setLogHistory(lHistory);

		return true;
};

/**
 * Get the number of cells that are
 * set in the puzzle (as opposed to
 * figured out in the solution
 */
this.getGivenCount = function(){
	var count = 0;
	for (var i=0; i<qqwing.BOARD_SIZE; i++){
		if (puzzle[i] != 0) count++;
	}
	return count;
};

/**
 * Get the number of cells for which the solution was determined
 * because there was only one possible value for that cell.
 */
this.getSingleCount = function(){
	return getLogCount.call(this, solveInstructions, qqwing.LogType.SINGLE);
}

/**
 * Get the number of cells for which the solution was determined
 * because that cell had the only possibility for some value in
 * the row, column, or section.
 */
this.getHiddenSingleCount = function(){
	return (
		getLogCount.call(this, solveInstructions, qqwing.LogType.HIDDEN_SINGLE_ROW) +
		getLogCount.call(this, solveInstructions, qqwing.LogType.HIDDEN_SINGLE_COLUMN) +
		getLogCount.call(this, solveInstructions, qqwing.LogType.HIDDEN_SINGLE_SECTION)
	);
};

/**
 * Get the number of naked pair reductions that were performed
 * in solving this puzzle.
 */

this.getNakedPairCount = function(){
	return (
		getLogCount.call(this, solveInstructions, qqwing.LogType.NAKED_PAIR_ROW) +
		getLogCount.call(this, solveInstructions, qqwing.LogType.NAKED_PAIR_COLUMN) +
		getLogCount.call(this, solveInstructions, qqwing.LogType.NAKED_PAIR_SECTION)
	);
};

/**
 * Get the number of hidden pair reductions that were performed
 * in solving this puzzle.
 */
this.getHiddenPairCount = function(){
	return (
		getLogCount.call(this, solveInstructions, qqwing.LogType.HIDDEN_PAIR_ROW) +
		getLogCount.call(this, solveInstructions, qqwing.LogType.HIDDEN_PAIR_COLUMN) +
		getLogCount.call(this, solveInstructions, qqwing.LogType.HIDDEN_PAIR_SECTION)
	);
};

/**
 * Get the number of box/line reductions that were performed
 * in solving this puzzle.
 */
this.getBoxLineReductionCount = function(){
	return (
		getLogCount.call(this, solveInstructions, qqwing.LogType.ROW_BOX)+
		getLogCount.call(this, solveInstructions, qqwing.LogType.COLUMN_BOX)
	);
};

/**
 * Get the number of pointing pair/triple reductions that were performed
 * in solving this puzzle.
 */

this.getPointingPairTripleCount = function(){
	return (
		getLogCount.call(this, solveInstructions, qqwing.LogType.POINTING_PAIR_TRIPLE_ROW)+
		getLogCount.call(this, solveInstructions, qqwing.LogType.POINTING_PAIR_TRIPLE_COLUMN)
	);
};

/**
 * Get the number lucky guesses in solving this puzzle.
 */
this.getGuessCount = function(){
	return getLogCount.call(this, solveInstructions, qqwing.LogType.GUESS);
};

/**
 * Get the number of backtracks (unlucky guesses) required
 * when solving this puzzle.
 */
this.getBacktrackCount = function(){
	return getLogCount.call(this, solveHistory, qqwing.LogType.ROLLBACK);
};

this.getSolveInstructions = function(){
	if (this.isSolved()){
		return solveInstructions;
	} else {
		return "No solve instructions - Puzzle is not possible to solve.";
	}
};

this.getSolveInstructionsString = function(){
	if (this.isSolved()){
		return getHistoryString.call(this, solveInstructions);
	} else {
		return "No solve instructions - Puzzle is not possible to solve.";
	}
};

this.printSolveInstructions = function(){
	if (this.isSolved()){
		printHistory(solveInstructions);
	} else {
		println("No solve instructions - Puzzle is not possible to solve.");
	}
};

this.getDifficulty = function(){
	if (this.getGuessCount() > 0) return qqwing.Difficulty.EXPERT;
	if (this.getBoxLineReductionCount() > 0) return qqwing.Difficulty.INTERMEDIATE;
	if (this.getPointingPairTripleCount() > 0) return qqwing.Difficulty.INTERMEDIATE;
	if (this.getHiddenPairCount() > 0) return qqwing.Difficulty.INTERMEDIATE;
	if (this.getNakedPairCount() > 0) return qqwing.Difficulty.INTERMEDIATE;
	if (this.getHiddenSingleCount() > 0) return qqwing.Difficulty.EASY;
	if (this.getSingleCount() > 0) return qqwing.Difficulty.SIMPLE;
	return qqwing.Difficulty.UNKNOWN;
};

this.getDifficultyAsString = function(){
	var difficulty = this.getDifficulty();
	switch (difficulty){
		case qqwing.Difficulty.EXPERT: return "Expert";
		case qqwing.Difficulty.INTERMEDIATE: return "Intermediate";
		case qqwing.Difficulty.EASY: return "Easy";
		case qqwing.Difficulty.SIMPLE: return "Simple";
		default: return "Unknown";
	}
};
};
qqwing.PrintStyle = {
	ONE_LINE: 0,
	COMPACT: 1,
	READABLE: 2,
	CSV: 3
};

qqwing.Difficulty = {
	UNKNOWN: 0,
	SIMPLE: 1,
	EASY: 2,
	INTERMEDIATE: 3,
	EXPERT: 4
};

qqwing.Symmetry = {
	NONE: 0,
	ROTATE90: 1,
	ROTATE180: 2,
	MIRROR: 3,
	FLIP: 4,
	RANDOM: 5
};

qqwing.LogType = {
	GIVEN: 0,
	SINGLE: 1,
	HIDDEN_SINGLE_ROW: 2,
	HIDDEN_SINGLE_COLUMN: 3,
	HIDDEN_SINGLE_SECTION: 4,
	GUESS: 5,
	ROLLBACK: 6,
	NAKED_PAIR_ROW: 7,
	NAKED_PAIR_COLUMN: 8,
	NAKED_PAIR_SECTION: 9,
	POINTING_PAIR_TRIPLE_ROW: 10,
	POINTING_PAIR_TRIPLE_COLUMN: 11,
	ROW_BOX: 12,
	COLUMN_BOX: 13,
	HIDDEN_PAIR_ROW: 14,
	HIDDEN_PAIR_COLUMN: 15,
	HIDDEN_PAIR_SECTION: 16
};

qqwing.GRID_SIZE = 3;
qqwing.ROW_COL_SEC_SIZE = qqwing.GRID_SIZE*qqwing.GRID_SIZE;
qqwing.SEC_GROUP_SIZE = qqwing.ROW_COL_SEC_SIZE*qqwing.GRID_SIZE;
qqwing.BOARD_SIZE = qqwing.ROW_COL_SEC_SIZE*qqwing.ROW_COL_SEC_SIZE;
qqwing.POSSIBILITY_SIZE = qqwing.BOARD_SIZE*qqwing.ROW_COL_SEC_SIZE;



module.exports = qqwing;

}).call(this,require('_process'))
},{"_process":1}],7:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameTopBox = require('./game-top-box.js');
var GameStatsBox = require('./game-stats-box.js');
var GameBoard = require('./game-board.js');
var SelectionsBox = require('./selections-box.js');

// TODO: History
// TODO: Undo
// TODO: Hint
// TODO: Stats collector
// TODO: Difficulty selector
// TODO: New game conformation
// TODO: Win screen
// IDEA: Victory picture

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
},{"./game-board.js":3,"./game-stats-box.js":4,"./game-top-box.js":5,"./selections-box.js":8}],8:[function(require,module,exports){
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
      _this.gameBoard.setSelectedTileValue(-1);
      _this.updateTileStyleStates();
    });

    this.STATE = {};
    this.STATE.ENABLED = 0;
    this.STATE.DISABLED = 1;

    //--------------------------------------------------------------------------
    // Create the selection tiles
    //--------------------------------------------------------------------------
    this.tilesContainerElem = document.createElement('div');
    this.tilesContainerElem.classList.add('tiles-container');
    this.containerElem.appendChild(this.tilesContainerElem);

    this.selectionTiles = [];

    var _loop = function _loop(i) {
      var tmpTile = document.createElement('div');
      tmpTile.classList.add('tile');
      if ((i + 1) % 2 == 0) {
        tmpTile.classList.add('even');
      } else {
        tmpTile.classList.add('odd');
      }
      tmpTile.numValue = i + 1;
      tmpTile.textContent = '' + tmpTile.numValue;
      _this.tilesContainerElem.appendChild(tmpTile);
      tmpTile.addEventListener('mousedown', function (e) {
        if (!tmpTile.classList.contains('done')) {
          var isDone = _this.gameBoard.setSelectedTileValue(tmpTile.numValue);
          if (isDone) {
            tmpTile.classList.add('done');
          }
        }
      });
      _this.selectionTiles.push(tmpTile);
    };

    for (var i = 0; i < 9; i++) {
      _loop(i);
    }

    this.updateTileStyleStates();
  }

  _createClass(SelectionsBox, [{
    key: 'getElement',
    value: function getElement() {
      return this.containerElem;
    }
  }, {
    key: 'updateTileStyleStates',
    value: function updateTileStyleStates() {
      var doneVals = this.gameBoard.getCompletedValues();
      for (var i = 0; i < 9; i++) {
        var _tmpTile = this.selectionTiles[i];
        var found = false;
        for (var j = 0; j < doneVals.length; j++) {
          if (doneVals[j] == _tmpTile.numValue) {
            found = true;
          }
        }
        if (found) {
          this.setTileActiveState(_tmpTile.numValue, this.STATE.DISABLED);
        } else {
          this.setTileActiveState(_tmpTile.numValue, this.STATE.ENABLED);
        }
      }
    }
  }, {
    key: 'setTileActiveState',
    value: function setTileActiveState(tileValue, state) {
      if (state == this.STATE.ENABLED) {
        if (this.selectionTiles[tileValue - 1].classList.contains('done')) {
          this.selectionTiles[tileValue - 1].classList.remove('done');
        }
      } else if (state == this.STATE.DISABLED) {
        if (!this.selectionTiles[tileValue - 1].classList.contains('done')) {
          this.selectionTiles[tileValue - 1].classList.add('done');
        }
      }
    }
  }]);

  return SelectionsBox;
}();
},{}]},{},[7]);
