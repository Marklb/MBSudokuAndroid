let easySeeds = require('./seeds/easy-seeds-1');
let simpleSeeds = require('./seeds/simple-seeds-1');
let intermediateSeeds = require('./seeds/intermediate-seeds-1');
let expertSeeds = require('./seeds/expert-seeds-1');

let DIFFICULIES = {
  EASY: 0,
  SIMPLE: 1,
  INTERMEDIATE: 2,
  EXPERT: 3
};

let DIFFICULIES_NAMES = {}
DIFFICULIES_NAMES[DIFFICULIES.EASY] = 'easy';
DIFFICULIES_NAMES[DIFFICULIES.SIMPLE] = 'simple';
DIFFICULIES_NAMES[DIFFICULIES.INTERMEDIATE] = 'intermediate';
DIFFICULIES_NAMES[DIFFICULIES.EXPERT] = 'expert';

let SEEDS = {}
SEEDS[DIFFICULIES.EASY] = easySeeds;
SEEDS[DIFFICULIES.SIMPLE] = simpleSeeds;
SEEDS[DIFFICULIES.INTERMEDIATE] = intermediateSeeds;
SEEDS[DIFFICULIES.EXPERT] = expertSeeds;

let chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
function shiftCharacters(str, startIndex){
  let i = startIndex;
  for(let j = 0; j < 9; j++){
    str = str.split(chars[i]).join(''+(i+1));
    i++;
    if(i >= 9){
      i = 0;
    }
  }
  return str;
}

function boardToString(str){
  let s = '';
  let count = 0;
  for(let i = 0; i < 9; i++){
    let t = '';
    for(let j = 0; j < 9; j++){
      t = t+str[count]+' ';
      if(j == 2 || j == 5){
        t = t+'| ';
      }
      count++;
    }
    s = s+t+'\n'
    if(i == 2 || i == 5){
      for(let k = 0; k < 21; k++){s=s+'-';}
      s = s+'\n';
    }
  }
  return s;
}


function rotateMatrix90(grid){
  var newGrid = [];
  var rowLength = Math.sqrt(grid.length);
  newGrid.length = grid.length

  for (var i = 0; i < grid.length; i++)
  {
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

function t_rotate90(str){
  let grid = [];
  for(let i = 0; i < 81; i++){grid.push(str[i]);}

  let newGrid = rotateMatrix90(grid);

  let s = '';
  for(let i = 0; i < 81; i++){s = s + newGrid[i];}
  return s;
}

function t_rotate180(str){
  let grid = [];
  for(let i = 0; i < 81; i++){grid.push(str[i]);}

  let newGrid = rotateMatrix90(grid);
  newGrid = rotateMatrix90(newGrid);

  let s = '';
  for(let i = 0; i < 81; i++){s = s + newGrid[i];}
  return s;
}

function t_rotate270(str){
  let grid = [];
  for(let i = 0; i < 81; i++){grid.push(str[i]);}

  let newGrid = rotateMatrix90(grid);
  newGrid = rotateMatrix90(newGrid);
  newGrid = rotateMatrix90(newGrid);

  let s = '';
  for(let i = 0; i < 81; i++){s = s + newGrid[i];}
  return s;
}

function t_flipHorizontal(str){
  let grid = [];
  let count = 0;
  for(let i = 0; i < 9; i++){
    let row = [];
    for(let j = 0; j < 9; j++){
      row.push(str[count]);
      count++;
    }
    grid.push(row);
  }

  let newGrid = [];
  for(let i = 8; i >= 0; i--){
    newGrid.push(grid[i]);
  }

  let s = '';
  for(let i = 0; i < 9; i++){
    for(let j = 0; j < 9; j++){
      s = s + newGrid[i][j];
    }
  }
  return s;
}

function t_flipVertical(str){
  let grid = [];
  let count = 0;
  for(let i = 0; i < 9; i++){
    let row = [];
    for(let j = 0; j < 9; j++){
      row.push(str[count]);
      count++;
    }
    grid.push(row);
  }

  let newGrid = [];
  for(let i = 0; i < 9; i++){
    let tmp = [];
    for(let j = 8; j >= 0; j--){
      tmp.push(grid[i][j]);
    }
    newGrid.push(tmp);
  }

  let s = '';
  for(let i = 0; i < 9; i++){
    for(let j = 0; j < 9; j++){
      s = s + newGrid[i][j];
    }
  }
  return s;
}

module.exports =
class MbSudoku {
  static get DIFFICULIES(){return DIFFICULIES;}
  static get DIFFICULIES_NAMES(){return DIFFICULIES_NAMES;}
  static get SEEDS(){return SEEDS;}

  constructor(dif = MbSudoku.DIFFICULIES.EXPERT){
    this.difficulty = dif;

    this.puzzle = null;

    this.solution = null;

    this.reset();
  }

  setDifficulty(diff){
    this.difficulty = diff;
  }

  getDifficulty(){
    return this.difficulty;
  }

  reset(){
    let puzzleIndex = Math.floor(Math.random()*MbSudoku.SEEDS[this.difficulty].length);
    let seed = MbSudoku.SEEDS[this.difficulty][puzzleIndex];
    this.puzzle = seed[0];
    let shiftCharStart_i = Math.floor(Math.random()*9);
    this.puzzle = shiftCharacters(this.puzzle,shiftCharStart_i);
    this.solution = seed[1];
    this.solution = shiftCharacters(this.solution,shiftCharStart_i);
    //
    let k = Math.floor(Math.random()*10);
    for(let i = 0; i < k; i++){
      this.scramble();
    }
  }

  scramble(){
    let rl_i = Math.floor(Math.random()*3);
    if(rl_i == 0){
      this.rotate90();
    }else if(rl_i == 1){
      this.rotate180();
    }else if(rl_i == 2){
      this.rotate270();
    }

    let fl_i = Math.floor(Math.random()*2);
    if(fl_i == 0){
      this.flipHorizontal();
    }else if(rl_i == 1){
      this.flipVertical();
    }
  }

  rotate90(){
    this.puzzle = t_rotate90(this.puzzle);
    this.solution = t_rotate90(this.solution);
  }

  rotate180(){
    this.puzzle = t_rotate180(this.puzzle);
    this.solution = t_rotate180(this.solution);
  }

  rotate270(){
    this.puzzle = t_rotate270(this.puzzle);
    this.solution = t_rotate270(this.solution);
  }

  flipHorizontal(){
    this.puzzle = t_flipHorizontal(this.puzzle);
    this.solution = t_flipHorizontal(this.solution);
  }

  flipVertical(){
    this.puzzle = t_flipVertical(this.puzzle);
    this.solution = t_flipVertical(this.solution);
  }

  getPuzzle(){
    return this.puzzle;
  }

  getSolution(){
    return this.solution;
  }

  getPuzzlePrintString(){
    return boardToString(this.puzzle);
  }

  getSolutionPrintString(){
    return boardToString(this.solution);
  }


}


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
