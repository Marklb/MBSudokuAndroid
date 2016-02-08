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
(function (global){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Debug = require('./debug');
// let MainMenu = require('./main-menu');
// let Game = require('./game');
var Game = require('./views/game/game');
// var attachFastClick = require('./libs/fastclick');

var DEBUG = new Debug('App');

// TODO: History
// TODO: Undo
// TODO: Hint
// TODO: Stats collector
// TODO: Difficulty selector
// TODO: New game conformation
// TODO: Win screen
// IDEA: Victory picture
// TODO: Error notification

global.VIEW_ID = {
  MAIN_MENU: 'MAIN_MENU_VIEW',
  GAME: 'GAME_VIEW'
};

global.TOUCH_START_EVENT = 'mousedown';
// global.TOUCH_START_EVENT = 'touchstart';

global.VERSION = '0';

var App = function () {
  function App() {
    _classCallCheck(this, App);

    DEBUG.log('Starting MB Sudoku');

    this.containerElem = document.getElementById('app-container');

    // this.mainMenu = new MainMenu();
    // this.addView(this.mainMenu);
    //
    // this.game = new Game();
    // this.addView(this.game);
    //
    //
    //
    // this.showView(this.mainMenu.getViewName());

    this.gameView = new Game();
    this.addView(this.gameView.getView());

    this.showView(VIEW_ID.GAME);
  }

  _createClass(App, [{
    key: 'getElement',
    value: function getElement() {
      return this.containerElem;
    }
  }, {
    key: 'addView',
    value: function addView(view) {
      if (this.views === undefined) {
        this.views = [];
      }
      this.views.push(view);
      this.getElement().appendChild(view.getElement());
    }
  }, {
    key: 'showView',
    value: function showView(viewId) {
      for (var i = 0; i < this.views.length; i++) {
        if (this.views[i].getViewId() === viewId) {
          this.hideActiveView();
          this.views[i].show();
          this.activeView = this.views[i];
        }
      }
    }
  }, {
    key: 'hideActiveView',
    value: function hideActiveView() {
      if (this.activeView !== undefined) {
        this.activeView.hide();
      }
    }
  }]);

  return App;
}();

global.app = new App();

// module.exports = new App();
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./debug":3,"./views/game/game":14}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function Debug(debugId) {
    _classCallCheck(this, Debug);

    this.debugId = debugId;
  }

  _createClass(Debug, [{
    key: 'getMessagePrefix',
    value: function getMessagePrefix() {
      return '[' + this.debugId + ']: ';
    }
  }, {
    key: 'log',
    value: function log(msg) {
      console.log(this.getMessagePrefix() + msg);
    }
  }, {
    key: 'error',
    value: function error(msg) {
      console.error(this.getMessagePrefix() + msg);
    }
  }]);

  return Debug;
}();
},{}],4:[function(require,module,exports){
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
},{"_process":1}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Debug = require('../debug');

var DEBUG = new Debug('CustomElement');

//------------------------------------------------------------------------------
// CSS Classes used by class View.
//------------------------------------------------------------------------------
var CSS_CLASSES = {
  CUSTOM_ELEMENT: 'custom-element'
};

//------------------------------------------------------------------------------
// CustomElement is a class to standardize this apps div elements.
// The way dom elements are being handled currently in this app there is a lot
// of repetition of code for dom elements, because it currently just uses div's
// for all the dom elements.
//------------------------------------------------------------------------------
module.exports = function () {
  function CustomElement(cssClass) {
    _classCallCheck(this, CustomElement);

    this.element = document.createElement('div');
    if (cssClass !== undefined) {
      this.getElement().classList.add(cssClass);
    }
  }

  /*
   * Return the dom element.
   */

  _createClass(CustomElement, [{
    key: 'getElement',
    value: function getElement() {
      return this.element;
    }

    /*
     * Updates the manually set element styles
     */

  }, {
    key: 'updateElementStyle',
    value: function updateElementStyle() {
      var style = 'position:absolute;' + 'left:' + this.getX() + 'px;' + 'top:' + this.getY() + 'px;' + 'width:' + this.getWidth() + 'px;' + 'height:' + this.getHeight() + 'px;';
      this.getElement().setAttribute('style', style);
    }

    /*
     *
     */

  }, {
    key: 'addClass',
    value: function addClass(className) {
      this.getElement().classList.add(className);
    }

    /*
     *
     */

  }, {
    key: 'removeClass',
    value: function removeClass(className) {
      this.getElement().classList.remove(className);
    }

    /*
     * Sets the X and Y coordinates.
     */

  }, {
    key: 'setPosition',
    value: function setPosition(x, y) {
      this.setX(x);
      this.setY(y);
    }

    /*
     * Set position from the left.
     */

  }, {
    key: 'setX',
    value: function setX(x) {
      this.x = x;
      this.updateElementStyle();
    }

    /*
     * Get the position from the left.
     */

  }, {
    key: 'getX',
    value: function getX() {
      return this.x;
    }

    /*
     * Set the position from the top.
     */

  }, {
    key: 'setY',
    value: function setY(y) {
      this.y = y;
      this.updateElementStyle();
    }

    /*
     * Get the position from the top.
     */

  }, {
    key: 'getY',
    value: function getY() {
      return this.y;
    }

    /*
     * Set the width and height.
     */

  }, {
    key: 'setSize',
    value: function setSize(w, h) {
      this.setWidth(w);
      this.setHeight(h);
    }

    /*
     * Set the width.
     */

  }, {
    key: 'setWidth',
    value: function setWidth(w) {
      this.w = w;
      this.updateElementStyle();
    }

    /*
     * Get the width.
     */

  }, {
    key: 'getWidth',
    value: function getWidth() {
      return this.w;
    }

    /*
     * Set the height.
     */

  }, {
    key: 'setHeight',
    value: function setHeight(h) {
      this.h = h;
      this.updateElementStyle();
    }

    /*
     * Get the height.
     */

  }, {
    key: 'getHeight',
    value: function getHeight() {
      return this.h;
    }
  }]);

  return CustomElement;
}();
},{"../debug":3}],6:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Debug = require('../../../debug');
var CustomElement = require('../../custom-element');

var DEBUG = new Debug('Clock');

var CSS_CLASSES = {
  CLOCK: 'clock'
};

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------
module.exports = function (_CustomElement) {
  _inherits(CLOCK, _CustomElement);

  function CLOCK() {
    _classCallCheck(this, CLOCK);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CLOCK).call(this, CSS_CLASSES.CLOCK));

    DEBUG.log('Loading');

    return _this;
  }

  /*
   *
   */

  _createClass(CLOCK, [{
    key: 'update',
    value: function update() {
      this.updateStyles();
    }

    /*
     *
     */

  }, {
    key: 'updateStyles',
    value: function updateStyles() {
      this.getElement().style.fontSize = this.getHeight() * 0.8 + 'px';
    }

    /*
     *
     */

  }, {
    key: 'setValue',
    value: function setValue(v) {
      this.value = v;
      this.getElement().setAttribute('value', this.getValue());
      this.getElement().innerHTML = '' + this.getValue();
    }

    /*
     *
     */

  }, {
    key: 'getValue',
    value: function getValue() {
      return this.value;
    }

    /*
     *
     */

  }, {
    key: 'setTime',
    value: function setTime(t) {
      var SECONDS = 1000;
      var MINUTES = SECONDS * 60;
      var HOURS = MINUTES * 60;
      var DAYS = HOURS * 24;
      var YEARS = DAYS * 365;

      //  t = t/SECONDS;
      //  let seconds = Math.round(t % 60);
      //  let minutes = Math.round((t / 60) % 60);
      //  let hours = Math.round((t / (60 * 60)) % 24);
      var d = new Date(t);
      var seconds = d.getSeconds();
      var minutes = d.getMinutes();
      // let hours = d.getHours();

      var secStr = "" + seconds;
      if (seconds < 10) {
        secStr = "0" + seconds;
      }
      var minStr = "" + minutes;
      if (minutes < 10) {
        minStr = "0" + minutes;
      }
      //  let hourStr = ""+hours;
      //  if(hours<10){hourStr = "0"+hours;}

      //  this.setValue(hourStr+":"+minStr+":"+secStr);
      this.setValue(minStr + ":" + secStr);
    }
  }]);

  return CLOCK;
}(CustomElement);
},{"../../../debug":3,"../../custom-element":5}],7:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Debug = require('../../../debug');
var CustomElement = require('../../custom-element');

var DEBUG = new Debug('EraseTileButton');

var CSS_CLASSES = {
  ERASE_TILE_BUTTON: 'erase-tile-button'
};

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------
module.exports = function (_CustomElement) {
  _inherits(EraseTileButton, _CustomElement);

  function EraseTileButton(x, y) {
    _classCallCheck(this, EraseTileButton);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(EraseTileButton).call(this, CSS_CLASSES.ERASE_TILE_BUTTON));

    DEBUG.log('Loading');

    return _this;
  }

  /*
   *
   */

  _createClass(EraseTileButton, [{
    key: 'update',
    value: function update() {
      this.updateStyles();
    }

    /*
     *
     */

  }, {
    key: 'updateStyles',
    value: function updateStyles() {
      this.getElement().style.fontSize = this.getHeight() * 0.8 + 'px';
    }

    /*
     *
     */

  }, {
    key: 'setValue',
    value: function setValue(v) {
      this.value = v;
      this.getElement().setAttribute('value', this.getValue());
      this.getElement().innerHTML = '' + this.getValue();
    }

    /*
     *
     */

  }, {
    key: 'getValue',
    value: function getValue() {
      return this.value;
    }
  }]);

  return EraseTileButton;
}(CustomElement);
},{"../../../debug":3,"../../custom-element":5}],8:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Debug = require('../../../debug');
var CustomElement = require('../../custom-element');

var DEBUG = new Debug('GameboardTile');

var CSS_CLASSES = {
  GAMEBOARD_TILE: 'gameboard-tile',
  SELECTED: 'selected'
};

var TILE_IDS = [['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'], // row 1
['A4', 'A5', 'A6', 'B4', 'B5', 'B6', 'C4', 'C5', 'C6'], // row 2
['A7', 'A8', 'A9', 'B7', 'B8', 'B9', 'C7', 'C8', 'C9'], // row 3
['D1', 'D2', 'D3', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3'], // row 4
['D4', 'D5', 'D6', 'E4', 'E5', 'E6', 'F4', 'F5', 'F6'], // row 5
['D7', 'D8', 'D9', 'E7', 'E8', 'E9', 'F7', 'F8', 'F9'], // row 6
['G1', 'G2', 'G3', 'H1', 'H2', 'H3', 'I1', 'I2', 'I3'], // row 7
['G4', 'G5', 'G6', 'H4', 'H5', 'H6', 'I4', 'I5', 'I6'], // row 8
['G7', 'G8', 'G9', 'H7', 'H8', 'H9', 'I7', 'I8', 'I9']];

//------------------------------------------------------------------------------
// GameBoardTile is one of the tiles on the 9x9 gameboard grid.
//------------------------------------------------------------------------------
// row 9
module.exports = function (_CustomElement) {
  _inherits(GameboardTile, _CustomElement);

  function GameboardTile(x, y) {
    _classCallCheck(this, GameboardTile);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GameboardTile).call(this, CSS_CLASSES.GAMEBOARD_TILE));

    DEBUG.log('Loading');

    //
    _this.tileId = TILE_IDS[x][y];

    //
    _this.isSelectedBool = false;

    //
    _this.setValue(0);

    //
    _this.setIsOriginal(false);

    //
    _this.setIsSameValue(false);

    //
    _this.setHasConflict(false);

    return _this;
  }

  /*
   *
   */

  _createClass(GameboardTile, [{
    key: 'update',
    value: function update() {
      this.updateStyles();
    }

    /*
     *
     */

  }, {
    key: 'updateStyles',
    value: function updateStyles() {
      if (this.isSelected() === true) {
        this.addClass(CSS_CLASSES.SELECTED);
      } else {
        this.removeClass(CSS_CLASSES.SELECTED);
      }
      this.getElement().style.fontSize = this.getHeight() * 0.8 + 'px';

      //
      // TODO: Organize this logic
      if (this.isEmpty()) {
        this.getElement().style.color = 'rgba(0,0,0,0)';
        if (this.isSelected()) {
          this.getElement().style.borderColor = 'rgba(0,200,100,1)';
        } else {
          this.getElement().style.borderColor = 'rgba(0,150,190,1)';
        }
      } else {
        if (this.isOriginal()) {
          this.getElement().style.color = 'rgba(0,120,190,1)';
          if (this.isSelected()) {
            if (this.hasConflict()) {
              this.getElement().style.borderColor = 'rgba(200,50,50,1)';
            } else {
              this.getElement().style.borderColor = 'rgba(0,200,100,1)';
            }
          } else {
            if (this.hasConflict()) {
              this.getElement().style.borderColor = 'rgba(200,100,100,1)';
            } else {
              if (this.isSameValue()) {
                this.getElement().style.borderColor = 'rgba(0,200,140,1)';
              } else {
                this.getElement().style.borderColor = 'rgba(0,150,190,1)';
              }
            }
          }
        } else {
          this.getElement().style.color = 'rgba(0,150,190,1)';
          if (this.isSelected()) {
            if (this.hasConflict()) {
              this.getElement().style.borderColor = 'rgba(200,50,50,1)';
            } else {
              this.getElement().style.borderColor = 'rgba(0,200,100,1)';
            }
          } else {
            if (this.hasConflict()) {
              this.getElement().style.borderColor = 'rgba(200,100,100,1)';
            } else {
              if (this.isSameValue()) {
                this.getElement().style.borderColor = 'rgba(0,200,140,1)';
              } else {
                this.getElement().style.borderColor = 'rgba(0,150,190,1)';
              }
            }
          }
        }
      }
    }

    /*
     * Returns a unique identifier for the tile based on its position in the grid.
     */

  }, {
    key: 'getTileId',
    value: function getTileId() {
      return this.tileId;
    }

    /*
     *
     */

  }, {
    key: 'setSelected',
    value: function setSelected(b) {
      this.isSelectedBool = b;
    }

    /*
     *
     */

  }, {
    key: 'isSelected',
    value: function isSelected() {
      return this.isSelectedBool;
    }

    /*
     *
     */

  }, {
    key: 'setValue',
    value: function setValue(v) {
      this.value = v + '';
      this.getElement().setAttribute('value', this.getValue());
      this.getElement().innerHTML = '' + this.getValue();
      if (this._onValueChange !== undefined) {
        this._onValueChange();
      }
    }

    /*
     *
     */

  }, {
    key: 'getValue',
    value: function getValue() {
      return this.value;
    }

    /*
     *
     */

  }, {
    key: 'setIsOriginal',
    value: function setIsOriginal(b) {
      this.isOriginalBool = b;
      this.getElement().setAttribute('original', b);
    }

    /*
     * Returns true if this tile contains a value from the gameboard generation.
     * Original values can't be changed.
     */

  }, {
    key: 'isOriginal',
    value: function isOriginal() {
      return this.isOriginalBool;
    }

    /*
     * Returns whether the tile has a value set.
     * A value of 0 is used to represent an unset tile.
     */

  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      return this.value + '' === 0 + '';
    }

    /*
     * Called when this tiles value is changed
     * Note: This is not an actual event right now.
     *       Its purpose currently is just a way to add a function to the
     *       setValue function outside this class.
     */

  }, {
    key: 'setOnValueChangeEvent',
    value: function setOnValueChangeEvent(func) {
      this._onValueChange = func;
    }

    /*
     *
     */

  }, {
    key: 'setIsSameValue',
    value: function setIsSameValue(b) {
      this.isSameValueBool = b;
      this.getElement().setAttribute('samevalue', this.isSameValue());
    }

    /*
     *
     */

  }, {
    key: 'isSameValue',
    value: function isSameValue() {
      return this.isSameValueBool;
    }

    /*
     *
     */

  }, {
    key: 'setHasConflict',
    value: function setHasConflict(b) {
      this.hasConflictBool = b;
    }

    /*
     *
     */

  }, {
    key: 'hasConflict',
    value: function hasConflict() {
      return this.hasConflictBool;
    }
  }]);

  return GameboardTile;
}(CustomElement);
},{"../../../debug":3,"../../custom-element":5}],9:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Debug = require('../../../debug');
var CustomElement = require('../../custom-element');
var GameboardTile = require('./gameboard-tile');

var DEBUG = new Debug('Gameboard');

var CSS_CLASSES = {
  GAMEBOARD: 'gameboard'
};

var PADDING = {
  LEFT: 4,
  RIGHT: 4,
  TOP: 4,
  BOTTOM: 4,
  INNER: 4
};

var BLOCK_BORDER_SIZE = 4;

//------------------------------------------------------------------------------
// GameBoard is the grid containing the played tiles.
//------------------------------------------------------------------------------
module.exports = function (_CustomElement) {
  _inherits(Gameboard, _CustomElement);

  function Gameboard(game) {
    _classCallCheck(this, Gameboard);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Gameboard).call(this, CSS_CLASSES.GAMEBOARD));

    DEBUG.log('Loading.');

    // Array containing the tiles on the 9x9 grid
    _this.tiles = [];

    return _this;
  }

  /*
   * Update anything dynamically handled by the gameboard.
   */

  _createClass(Gameboard, [{
    key: 'update',
    value: function update() {
      this.updateTilePositions();
      this.updateTileStyles();
    }

    /*
     *
     */

  }, {
    key: 'updateTilePositions',
    value: function updateTilePositions() {
      var tileSize = (this.getWidth() - BLOCK_BORDER_SIZE * 2 - PADDING.LEFT - PADDING.RIGHT - 8 * PADDING.INNER - BLOCK_BORDER_SIZE * 2) / 9;

      var i = 0;
      for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
          //
          var rowBlockOffset = 0;
          if (row === 3 || row === 4 || row === 5) {
            rowBlockOffset = BLOCK_BORDER_SIZE;
          }
          if (row === 6 || row === 7 || row === 8) {
            rowBlockOffset = BLOCK_BORDER_SIZE * 2;
          }
          //
          var colBlockOffset = 0;
          if (col === 3 || col === 4 || col === 5) {
            colBlockOffset = BLOCK_BORDER_SIZE;
          }
          if (col === 6 || col === 7 || col === 8) {
            colBlockOffset = BLOCK_BORDER_SIZE * 2;
          }
          //
          this.tiles[i].setPosition(this.getX() + BLOCK_BORDER_SIZE + PADDING.LEFT + row * tileSize + row * PADDING.INNER + rowBlockOffset, // X
          this.getY() + BLOCK_BORDER_SIZE + PADDING.TOP + col * tileSize + col * PADDING.INNER + colBlockOffset // Y
          );
          //
          this.tiles[i].setSize(tileSize, tileSize);
          //
          i++;
        }
      }
    }

    /*
     *
     */

  }, {
    key: 'updateTileStyles',
    value: function updateTileStyles() {
      for (var i = 0; i < this.getTiles().length; i++) {
        this.getTiles()[i].updateStyles();
      }
    }

    /*
     * Add a tile to the gameboard.
     * A tile is one of the squares on the 9x9 gameboard.
     */

  }, {
    key: 'addTile',
    value: function addTile(tile) {
      if (tile instanceof GameboardTile) {
        // Check if the tile being added already exists
        for (var i = 0; i < this.tiles.length; i++) {
          if (this.tiles[i].getTileId() === tile.getTileId()) {
            DEBUG.error('Tile: ' + tile.getTileId() + ' is already added.');
            return;
          }
        }
        // Add the tile to the tiles array.
        this.tiles.push(tile);
      } else {
        DEBUG.error('tile is not of type GameboardTile.');
      }
    }

    /*
     *
     */

  }, {
    key: 'getTiles',
    value: function getTiles() {
      return this.tiles;
    }
  }]);

  return Gameboard;
}(CustomElement);
},{"../../../debug":3,"../../custom-element":5,"./gameboard-tile":8}],10:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Debug = require('../../../debug');
var CustomElement = require('../../custom-element');

var DEBUG = new Debug('NewGameButton');

var CSS_CLASSES = {
  NEW_GAME_BUTTON: 'new-game-button'
};

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------
module.exports = function (_CustomElement) {
  _inherits(NewGameButton, _CustomElement);

  function NewGameButton(x, y) {
    _classCallCheck(this, NewGameButton);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NewGameButton).call(this, CSS_CLASSES.NEW_GAME_BUTTON));

    DEBUG.log('Loading');

    return _this;
  }

  /*
   *
   */

  _createClass(NewGameButton, [{
    key: 'update',
    value: function update() {
      this.updateStyles();
    }

    /*
     *
     */

  }, {
    key: 'updateStyles',
    value: function updateStyles() {
      this.getElement().style.fontSize = this.getHeight() * 0.8 + 'px';
    }

    /*
     *
     */

  }, {
    key: 'setValue',
    value: function setValue(v) {
      this.value = v;
      this.getElement().setAttribute('value', this.getValue());
      this.getElement().innerHTML = '' + this.getValue();
    }

    /*
     *
     */

  }, {
    key: 'getValue',
    value: function getValue() {
      return this.value;
    }
  }]);

  return NewGameButton;
}(CustomElement);
},{"../../../debug":3,"../../custom-element":5}],11:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Debug = require('../../../debug');
var CustomElement = require('../../custom-element');

var DEBUG = new Debug('SelectionTile');

var CSS_CLASSES = {
  SELECTION_TILE: 'selection-tile'
};

//------------------------------------------------------------------------------
// SelectionTile is one of the 9 tiles under the gameboard to add a tile to
// the gameboard.
//------------------------------------------------------------------------------
module.exports = function (_CustomElement) {
  _inherits(SelectionTile, _CustomElement);

  function SelectionTile(x, y) {
    _classCallCheck(this, SelectionTile);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SelectionTile).call(this, CSS_CLASSES.SELECTION_TILE));

    DEBUG.log('Loading');

    _this.setDone(false);

    return _this;
  }

  /*
   *
   */

  _createClass(SelectionTile, [{
    key: 'update',
    value: function update() {
      this.updateStyles();
    }

    /*
     *
     */

  }, {
    key: 'updateStyles',
    value: function updateStyles() {
      this.getElement().style.fontSize = this.getHeight() * 0.8 + 'px';
      if (this.isDone()) {
        this.getElement().style.opacity = '0';
      } else {
        this.getElement().style.opacity = '1';
      }
    }

    /*
     *
     */

  }, {
    key: 'setValue',
    value: function setValue(v) {
      this.value = v + '';
      this.getElement().setAttribute('value', this.getValue());
      this.getElement().innerHTML = '' + this.getValue();
    }

    /*
     *
     */

  }, {
    key: 'getValue',
    value: function getValue() {
      return this.value;
    }

    /*
     *
     */

  }, {
    key: 'setDone',
    value: function setDone(b) {
      this.isDoneBool = b;
    }

    /*
     *
     */

  }, {
    key: 'isDone',
    value: function isDone() {
      return this.isDoneBool;
    }
  }]);

  return SelectionTile;
}(CustomElement);
},{"../../../debug":3,"../../custom-element":5}],12:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Debug = require('../../../debug');
var CustomElement = require('../../custom-element');

var DEBUG = new Debug('TopTitle');

var CSS_CLASSES = {
  TOP_TITLE: 'top-title'
};

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------
module.exports = function (_CustomElement) {
  _inherits(TopTitle, _CustomElement);

  function TopTitle() {
    _classCallCheck(this, TopTitle);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TopTitle).call(this, CSS_CLASSES.TOP_TITLE));

    DEBUG.log('Loading');

    return _this;
  }

  /*
   *
   */

  _createClass(TopTitle, [{
    key: 'update',
    value: function update() {
      this.updateStyles();
    }

    /*
     *
     */

  }, {
    key: 'updateStyles',
    value: function updateStyles() {
      this.getElement().style.fontSize = this.getHeight() * 0.8 + 'px';
    }

    /*
     *
     */

  }, {
    key: 'setValue',
    value: function setValue(v) {
      this.value = v;
      this.getElement().setAttribute('value', this.getValue());
      this.getElement().innerHTML = '' + this.getValue();
    }

    /*
     *
     */

  }, {
    key: 'getValue',
    value: function getValue() {
      return this.value;
    }
  }]);

  return TopTitle;
}(CustomElement);
},{"../../../debug":3,"../../custom-element":5}],13:[function(require,module,exports){
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
},{"../../debug":3,"../view":16,"./elements/clock":6,"./elements/erase-tile-button":7,"./elements/gameboard":9,"./elements/gameboard-tile":8,"./elements/new-game-button":10,"./elements/selection-tile":11,"./elements/top-title":12}],14:[function(require,module,exports){
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
},{"../../debug":3,"../../libs/qqwing-1.3.4/qqwing-1.3.4":4,"../view-controller":15,"./game-view":13}],15:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Debug = require('../debug');

var DEBUG = new Debug('ViewController');

//------------------------------------------------------------------------------
// Handles the actions of a view.
//------------------------------------------------------------------------------
module.exports = function () {
  function ViewController(view) {
    _classCallCheck(this, ViewController);

    this.view = view;
  }

  _createClass(ViewController, [{
    key: 'getView',
    value: function getView() {
      return this.view;
    }
  }]);

  return ViewController;
}();
},{"../debug":3}],16:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Debug = require('../debug');

var DEBUG = new Debug('View');

//------------------------------------------------------------------------------
// CSS Classes used by class View.
//------------------------------------------------------------------------------
var CSS_CLASSES = {
  VIEW: 'view',
  HIDDEN: 'hidden'
};

//------------------------------------------------------------------------------
// A View takes up the entire screen.
// Only one view is visible at a time.
// Anything seen has to be added to a View.
//------------------------------------------------------------------------------
module.exports = function () {
  function View(viewId) {
    _classCallCheck(this, View);

    DEBUG.log('Loading: ' + viewId);
    this.setViewId(viewId);

    this.initElement();
    this.initBounds();

    this.updateElement();
  }

  _createClass(View, [{
    key: 'initBounds',
    value: function initBounds() {
      this.bounds = {
        x: 0,
        y: 0,
        w: window.innerWidth,
        h: window.innerHeight
      };
    }
  }, {
    key: 'getBounds',
    value: function getBounds() {
      return this.bounds;
    }
  }, {
    key: 'getX',
    value: function getX() {
      return this.getBounds().x;
    }
  }, {
    key: 'getY',
    value: function getY() {
      return this.getBounds().y;
    }
  }, {
    key: 'getWidth',
    value: function getWidth() {
      return this.getBounds().w;
    }
  }, {
    key: 'getHeight',
    value: function getHeight() {
      return this.getBounds().h;
    }
  }, {
    key: 'setViewId',
    value: function setViewId(id) {
      this.viewId = id;
    }
  }, {
    key: 'getViewId',
    value: function getViewId() {
      return this.viewId;
    }
  }, {
    key: 'initElement',
    value: function initElement() {
      this.element = document.createElement('div');
      this.getElement().classList.add(CSS_CLASSES.VIEW);
      this.getElement().classList.add(CSS_CLASSES.HIDDEN);
    }
  }, {
    key: 'getElement',
    value: function getElement() {
      return this.element;
    }
  }, {
    key: 'updateElement',
    value: function updateElement() {
      var style = 'left:' + this.getX() + 'px;' + 'top:' + this.getY() + 'px;' + 'width:' + this.getWidth() + 'px;' + 'height:' + this.getHeight() + 'px;';
      this.getElement().setAttribute('style', style);
    }
  }, {
    key: 'addElement',
    value: function addElement(elem) {
      this.getElement().appendChild(elem);
    }
  }, {
    key: 'addClass',
    value: function addClass(className) {
      this.getElement().classList.add(className);
    }
  }, {
    key: 'show',
    value: function show() {
      this.getElement().classList.remove(CSS_CLASSES.HIDDEN);
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.getElement().classList.add(CSS_CLASSES.HIDDEN);
    }
  }]);

  return View;
}();
},{"../debug":3}]},{},[2]);
