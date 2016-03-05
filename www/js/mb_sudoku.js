'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var easySeeds = require('./seeds/easy-seeds-1');
var simpleSeeds = require('./seeds/simple-seeds-1');
var intermediateSeeds = require('./seeds/intermediate-seeds-1');
var expertSeeds = require('./seeds/expert-seeds-1');

var DIFFICULIES = {
  EASY: 0,
  SIMPLE: 1,
  INTERMEDIATE: 2,
  EXPERT: 3
};

var DIFFICULIES_NAMES = {};
DIFFICULIES_NAMES[DIFFICULIES.EASY] = 'easy';
DIFFICULIES_NAMES[DIFFICULIES.SIMPLE] = 'simple';
DIFFICULIES_NAMES[DIFFICULIES.INTERMEDIATE] = 'intermediate';
DIFFICULIES_NAMES[DIFFICULIES.EXPERT] = 'expert';

var SEEDS = {};
SEEDS[DIFFICULIES.EASY] = easySeeds;
SEEDS[DIFFICULIES.SIMPLE] = simpleSeeds;
SEEDS[DIFFICULIES.INTERMEDIATE] = intermediateSeeds;
SEEDS[DIFFICULIES.EXPERT] = expertSeeds;

var chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
function shiftCharacters(str, startIndex) {
  var i = startIndex;
  for (var j = 0; j < 9; j++) {
    str = str.split(chars[i]).join('' + (i + 1));
    i++;
    if (i >= 9) {
      i = 0;
    }
  }
  return str;
}

function boardToString(str) {
  var s = '';
  var count = 0;
  for (var i = 0; i < 9; i++) {
    var t = '';
    for (var j = 0; j < 9; j++) {
      t = t + str[count] + ' ';
      if (j == 2 || j == 5) {
        t = t + '| ';
      }
      count++;
    }
    s = s + t + '\n';
    if (i == 2 || i == 5) {
      for (var k = 0; k < 21; k++) {
        s = s + '-';
      }
      s = s + '\n';
    }
  }
  return s;
}

function rotateMatrix90(grid) {
  var newGrid = [];
  var rowLength = Math.sqrt(grid.length);
  newGrid.length = grid.length;

  for (var i = 0; i < grid.length; i++) {
    //convert to x/y
    var x = i % rowLength;
    var y = Math.floor(i / rowLength);

    //find new x/y
    var newX = rowLength - y - 1;
    var newY = x;

    //convert back to index
    var newPosition = newY * rowLength + newX;
    newGrid[newPosition] = grid[i];
  }

  return newGrid;
}

function t_rotate90(str) {
  var grid = [];
  for (var i = 0; i < 81; i++) {
    grid.push(str[i]);
  }

  var newGrid = rotateMatrix90(grid);

  var s = '';
  for (var i = 0; i < 81; i++) {
    s = s + newGrid[i];
  }
  return s;
}

function t_rotate180(str) {
  var grid = [];
  for (var i = 0; i < 81; i++) {
    grid.push(str[i]);
  }

  var newGrid = rotateMatrix90(grid);
  newGrid = rotateMatrix90(newGrid);

  var s = '';
  for (var i = 0; i < 81; i++) {
    s = s + newGrid[i];
  }
  return s;
}

function t_rotate270(str) {
  var grid = [];
  for (var i = 0; i < 81; i++) {
    grid.push(str[i]);
  }

  var newGrid = rotateMatrix90(grid);
  newGrid = rotateMatrix90(newGrid);
  newGrid = rotateMatrix90(newGrid);

  var s = '';
  for (var i = 0; i < 81; i++) {
    s = s + newGrid[i];
  }
  return s;
}

function t_flipHorizontal(str) {
  var grid = [];
  var count = 0;
  for (var i = 0; i < 9; i++) {
    var row = [];
    for (var j = 0; j < 9; j++) {
      row.push(str[count]);
      count++;
    }
    grid.push(row);
  }

  var newGrid = [];
  for (var i = 8; i >= 0; i--) {
    newGrid.push(grid[i]);
  }

  var s = '';
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      s = s + newGrid[i][j];
    }
  }
  return s;
}

function t_flipVertical(str) {
  var grid = [];
  var count = 0;
  for (var i = 0; i < 9; i++) {
    var row = [];
    for (var j = 0; j < 9; j++) {
      row.push(str[count]);
      count++;
    }
    grid.push(row);
  }

  var newGrid = [];
  for (var i = 0; i < 9; i++) {
    var tmp = [];
    for (var j = 8; j >= 0; j--) {
      tmp.push(grid[i][j]);
    }
    newGrid.push(tmp);
  }

  var s = '';
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      s = s + newGrid[i][j];
    }
  }
  return s;
}

module.exports = function () {
  _createClass(MbSudoku, null, [{
    key: 'DIFFICULIES',
    get: function get() {
      return DIFFICULIES;
    }
  }, {
    key: 'DIFFICULIES_NAMES',
    get: function get() {
      return DIFFICULIES_NAMES;
    }
  }, {
    key: 'SEEDS',
    get: function get() {
      return SEEDS;
    }
  }]);

  function MbSudoku() {
    var dif = arguments.length <= 0 || arguments[0] === undefined ? MbSudoku.DIFFICULIES.EXPERT : arguments[0];

    _classCallCheck(this, MbSudoku);

    this.difficulty = dif;

    this.puzzle = null;

    this.solution = null;

    this.reset();
  }

  _createClass(MbSudoku, [{
    key: 'setDifficulty',
    value: function setDifficulty(diff) {
      this.difficulty = diff;
    }
  }, {
    key: 'getDifficulty',
    value: function getDifficulty() {
      return this.difficulty;
    }
  }, {
    key: 'reset',
    value: function reset() {
      var puzzleIndex = Math.floor(Math.random() * MbSudoku.SEEDS[this.difficulty].length);
      var seed = MbSudoku.SEEDS[this.difficulty][puzzleIndex];
      this.puzzle = seed[0];
      var shiftCharStart_i = Math.floor(Math.random() * 9);
      this.puzzle = shiftCharacters(this.puzzle, shiftCharStart_i);
      this.solution = seed[1];
      this.solution = shiftCharacters(this.solution, shiftCharStart_i);
      //
      var k = Math.floor(Math.random() * 10);
      for (var i = 0; i < k; i++) {
        this.scramble();
      }
    }
  }, {
    key: 'scramble',
    value: function scramble() {
      var rl_i = Math.floor(Math.random() * 3);
      if (rl_i == 0) {
        this.rotate90();
      } else if (rl_i == 1) {
        this.rotate180();
      } else if (rl_i == 2) {
        this.rotate270();
      }

      var fl_i = Math.floor(Math.random() * 2);
      if (fl_i == 0) {
        this.flipHorizontal();
      } else if (rl_i == 1) {
        this.flipVertical();
      }
    }
  }, {
    key: 'rotate90',
    value: function rotate90() {
      this.puzzle = t_rotate90(this.puzzle);
      this.solution = t_rotate90(this.solution);
    }
  }, {
    key: 'rotate180',
    value: function rotate180() {
      this.puzzle = t_rotate180(this.puzzle);
      this.solution = t_rotate180(this.solution);
    }
  }, {
    key: 'rotate270',
    value: function rotate270() {
      this.puzzle = t_rotate270(this.puzzle);
      this.solution = t_rotate270(this.solution);
    }
  }, {
    key: 'flipHorizontal',
    value: function flipHorizontal() {
      this.puzzle = t_flipHorizontal(this.puzzle);
      this.solution = t_flipHorizontal(this.solution);
    }
  }, {
    key: 'flipVertical',
    value: function flipVertical() {
      this.puzzle = t_flipVertical(this.puzzle);
      this.solution = t_flipVertical(this.solution);
    }
  }, {
    key: 'getPuzzle',
    value: function getPuzzle() {
      return this.puzzle;
    }
  }, {
    key: 'getSolution',
    value: function getSolution() {
      return this.solution;
    }
  }, {
    key: 'getPuzzlePrintString',
    value: function getPuzzlePrintString() {
      return boardToString(this.puzzle);
    }
  }, {
    key: 'getSolutionPrintString',
    value: function getSolutionPrintString() {
      return boardToString(this.solution);
    }
  }]);

  return MbSudoku;
}();

// let game = new MbSudoku();

// let QQWING = require('./qqwing-1.3.4/qqwing-1.3.4');
//
// let qqwing = new QQWING();
// // qqwing.generatePuzzle();
// // qqwing.setPrintStyle(QQWING.PrintStyle.ONE_LINE);
// // let board_str = qqwing.getSolutionString();
// // console.log(board_str);
//
// for(let i = 0; i < 100; i++){
//   qqwing.generatePuzzle();
//   // qqwing.generatePuzzleSymmetry(QQWING.Symmetry.NONE);
//   let numSolutions = qqwing.countSolutions();
//   let difficultyStr = qqwing.getDifficultyAsString();
//   let difficulty = qqwing.getDifficulty();
//   if(difficulty == QQWING.Difficulty.EXPERT)console.log(numSolutions+'  Difficulty: '+ difficultyStr);
//   qqwing.solve();
//   if(difficulty == QQWING.Difficulty.EXPERT)console.log(numSolutions+'  Difficulty: '+ difficultyStr);
// }