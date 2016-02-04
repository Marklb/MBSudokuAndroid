let QQWING = require('./libs/qqwing-1.3.4/qqwing-1.3.4');
let GameBoardTile = require('./game-board-tile');

module.exports =
class GameBoard {
  constructor() {
    console.log("Creating GameBoard");

    this.EMPTY_VALUE = 0;

    this.qqwing = new QQWING();

    this.containerElem = document.createElement('div');
    this.containerElem.classList.add('game-board');
    if(window.innerWidth < window.innerHeight){
      this.containerWidth = window.innerWidth;
      this.containerHeight = window.innerWidth;
    }else{
      this.containerWidth = window.innerHeight;
      this.containerHeight = window.innerHeight;
    }
    this.containerElem.setAttribute('style', 'width:'+this.containerWidth+'px;');
    this.containerElem.setAttribute('style', 'height:'+this.containerHeight+'px;');

    //--------------------------------------------------------------------------
    // Create the board rows
    //--------------------------------------------------------------------------
    this.initBoardRows();

    //--------------------------------------------------------------------------
    // Create blocks rows
    //--------------------------------------------------------------------------
    // block1
    this.block1row1 = document.createElement('div');
    this.block1row1.classList.add('block-row');
    this.blocks[0].appendChild(this.block1row1);
    this.block1row2 = document.createElement('div');
    this.block1row2.classList.add('block-row');
    this.blocks[0].appendChild(this.block1row2);
    this.block1row3 = document.createElement('div');
    this.block1row3.classList.add('block-row');
    this.blocks[0].appendChild(this.block1row3);
    // block2
    this.block2row1 = document.createElement('div');
    this.block2row1.classList.add('block-row');
    this.blocks[1].appendChild(this.block2row1);
    this.block2row2 = document.createElement('div');
    this.block2row2.classList.add('block-row');
    this.blocks[1].appendChild(this.block2row2);
    this.block2row3 = document.createElement('div');
    this.block2row3.classList.add('block-row');
    this.blocks[1].appendChild(this.block2row3);
    // block3
    this.block3row1 = document.createElement('div');
    this.block3row1.classList.add('block-row');
    this.blocks[2].appendChild(this.block3row1);
    this.block3row2 = document.createElement('div');
    this.block3row2.classList.add('block-row');
    this.blocks[2].appendChild(this.block3row2);
    this.block3row3 = document.createElement('div');
    this.block3row3.classList.add('block-row');
    this.blocks[2].appendChild(this.block3row3);
    // block4
    this.block4row1 = document.createElement('div');
    this.block4row1.classList.add('block-row');
    this.blocks[3].appendChild(this.block4row1);
    this.block4row2 = document.createElement('div');
    this.block4row2.classList.add('block-row');
    this.blocks[3].appendChild(this.block4row2);
    this.block4row3 = document.createElement('div');
    this.block4row3.classList.add('block-row');
    this.blocks[3].appendChild(this.block4row3);
    // block5
    this.block5row1 = document.createElement('div');
    this.block5row1.classList.add('block-row');
    this.blocks[4].appendChild(this.block5row1);
    this.block5row2 = document.createElement('div');
    this.block5row2.classList.add('block-row');
    this.blocks[4].appendChild(this.block5row2);
    this.block5row3 = document.createElement('div');
    this.block5row3.classList.add('block-row');
    this.blocks[4].appendChild(this.block5row3);
    // block6
    this.block6row1 = document.createElement('div');
    this.block6row1.classList.add('block-row');
    this.blocks[5].appendChild(this.block6row1);
    this.block6row2 = document.createElement('div');
    this.block6row2.classList.add('block-row');
    this.blocks[5].appendChild(this.block6row2);
    this.block6row3 = document.createElement('div');
    this.block6row3.classList.add('block-row');
    this.blocks[5].appendChild(this.block6row3);
    // block7
    this.block7row1 = document.createElement('div');
    this.block7row1.classList.add('block-row');
    this.blocks[6].appendChild(this.block7row1);
    this.block7row2 = document.createElement('div');
    this.block7row2.classList.add('block-row');
    this.blocks[6].appendChild(this.block7row2);
    this.block7row3 = document.createElement('div');
    this.block7row3.classList.add('block-row');
    this.blocks[6].appendChild(this.block7row3);
    // block8
    this.block8row1 = document.createElement('div');
    this.block8row1.classList.add('block-row');
    this.blocks[7].appendChild(this.block8row1);
    this.block8row2 = document.createElement('div');
    this.block8row2.classList.add('block-row');
    this.blocks[7].appendChild(this.block8row2);
    this.block8row3 = document.createElement('div');
    this.block8row3.classList.add('block-row');
    this.blocks[7].appendChild(this.block8row3);
    // block9
    this.block9row1 = document.createElement('div');
    this.block9row1.classList.add('block-row');
    this.blocks[8].appendChild(this.block9row1);
    this.block9row2 = document.createElement('div');
    this.block9row2.classList.add('block-row');
    this.blocks[8].appendChild(this.block9row2);
    this.block9row3 = document.createElement('div');
    this.block9row3.classList.add('block-row');
    this.blocks[8].appendChild(this.block9row3);

    //--------------------------------------------------------------------------
    // Create tiles
    //--------------------------------------------------------------------------
    this.tiles = [];
    for(let i = 0; i < 9; i++){
      let tmp = [];
      for(let j = 0; j < 9; j++){
        tmp.push(new GameBoardTile(this, i, j));
      }
      this.tiles.push(tmp);
    }
    // block1 tiles
    this.block1Tiles = [
      this.tiles[0][0],
      this.tiles[0][1],
      this.tiles[0][2],
      this.tiles[1][0],
      this.tiles[1][1],
      this.tiles[1][2],
      this.tiles[2][0],
      this.tiles[2][1],
      this.tiles[2][2]
    ];
    for(let i = 0; i < 9; i++){this.block1Tiles[i].setTilesInBlock(this.block1Tiles);}
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
    this.block2Tiles = [
      this.tiles[0][3],
      this.tiles[0][4],
      this.tiles[0][5],
      this.tiles[1][3],
      this.tiles[1][4],
      this.tiles[1][5],
      this.tiles[2][3],
      this.tiles[2][4],
      this.tiles[2][5]
    ];
    for(let i = 0; i < 9; i++){this.block2Tiles[i].setTilesInBlock(this.block2Tiles);}
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
    this.block3Tiles = [
      this.tiles[0][6],
      this.tiles[0][7],
      this.tiles[0][8],
      this.tiles[1][6],
      this.tiles[1][7],
      this.tiles[1][8],
      this.tiles[2][6],
      this.tiles[2][7],
      this.tiles[2][8]
    ];
    for(let i = 0; i < 9; i++){this.block3Tiles[i].setTilesInBlock(this.block3Tiles);}
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
    this.block4Tiles = [
      this.tiles[3][0],
      this.tiles[3][1],
      this.tiles[3][2],
      this.tiles[4][0],
      this.tiles[4][1],
      this.tiles[4][2],
      this.tiles[5][0],
      this.tiles[5][1],
      this.tiles[5][2]
    ];
    for(let i = 0; i < 9; i++){this.block4Tiles[i].setTilesInBlock(this.block4Tiles);}
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
    this.block5Tiles = [
      this.tiles[3][3],
      this.tiles[3][4],
      this.tiles[3][5],
      this.tiles[4][3],
      this.tiles[4][4],
      this.tiles[4][5],
      this.tiles[5][3],
      this.tiles[5][4],
      this.tiles[5][5]
    ];
    for(let i = 0; i < 9; i++){this.block5Tiles[i].setTilesInBlock(this.block5Tiles);}
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
    this.block6Tiles = [
      this.tiles[3][6],
      this.tiles[3][7],
      this.tiles[3][8],
      this.tiles[4][6],
      this.tiles[4][7],
      this.tiles[4][8],
      this.tiles[5][6],
      this.tiles[5][7],
      this.tiles[5][8]
    ];
    for(let i = 0; i < 9; i++){this.block6Tiles[i].setTilesInBlock(this.block6Tiles);}
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
    this.block7Tiles = [
      this.tiles[6][0],
      this.tiles[6][1],
      this.tiles[6][2],
      this.tiles[7][0],
      this.tiles[7][1],
      this.tiles[7][2],
      this.tiles[8][0],
      this.tiles[8][1],
      this.tiles[8][2]
    ];
    for(let i = 0; i < 9; i++){this.block7Tiles[i].setTilesInBlock(this.block7Tiles);}
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
    this.block8Tiles = [
      this.tiles[6][3],
      this.tiles[6][4],
      this.tiles[6][5],
      this.tiles[7][3],
      this.tiles[7][4],
      this.tiles[7][5],
      this.tiles[8][3],
      this.tiles[8][4],
      this.tiles[8][5]
    ];
    for(let i = 0; i < 9; i++){this.block8Tiles[i].setTilesInBlock(this.block8Tiles);}
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
    this.block9Tiles = [
      this.tiles[6][6],
      this.tiles[6][7],
      this.tiles[6][8],
      this.tiles[7][6],
      this.tiles[7][7],
      this.tiles[7][8],
      this.tiles[8][6],
      this.tiles[8][7],
      this.tiles[8][8]
    ];
    for(let i = 0; i < 9; i++){this.block9Tiles[i].setTilesInBlock(this.block9Tiles);}
    this.block9row1.appendChild(this.tiles[6][6].getElement());
    this.block9row1.appendChild(this.tiles[6][7].getElement());
    this.block9row1.appendChild(this.tiles[6][8].getElement());
    this.block9row2.appendChild(this.tiles[7][6].getElement());
    this.block9row2.appendChild(this.tiles[7][7].getElement());
    this.block9row2.appendChild(this.tiles[7][8].getElement());
    this.block9row3.appendChild(this.tiles[8][6].getElement());
    this.block9row3.appendChild(this.tiles[8][7].getElement());
    this.block9row3.appendChild(this.tiles[8][8].getElement());

    this.blocksTiles = [
      this.block1Tiles,
      this.block2Tiles,
      this.block3Tiles,
      this.block4Tiles,
      this.block5Tiles,
      this.block6Tiles,
      this.block7Tiles,
      this.block8Tiles,
      this.block9Tiles
    ];

    this.initGameTiles();

    this.startTime1 = Date.now();
    let timerIntervalFunc = () => {
      let endTime1 = Date.now();
      let elapsed1 = (endTime1 - this.startTime1);
      this.startTime1 = endTime1;

      let tmpTimeElapsed = JSON.parse(window.localStorage.getItem("timeElapsed"));
      if(tmpTimeElapsed){
        elapsed1 = elapsed1 + tmpTimeElapsed;
      }
      window.localStorage.setItem("timeElapsed", JSON.stringify(elapsed1));
    };
    this.timerInterval = setInterval(timerIntervalFunc,1000);

    document.addEventListener("pause", (e) => {
      clearInterval(this.timerInterval);
    }, false);

    document.addEventListener("resume", (e) => {
      this.startTime1 = Date.now();
      this.timerInterval = setInterval(timerIntervalFunc,1000);
    }, false);

  }

  getElement(){
    return this.containerElem;
  }

  initBoardRows(){
    this.boardRows = [];
    this.blocks = [];
    for(let i = 0; i < 3; i++){
      // Create baard row
      let boardRow = document.createElement('div');
      boardRow.classList.add('board-row');
      this.containerElem.appendChild(boardRow);
      this.boardRows.push(boardRow);

      // Create blocks
      for(let j = 0; j < 3; j++){
        let block = document.createElement('div');
        block.classList.add('block');
        this.boardRows[i].appendChild(block);
        this.blocks.push(block);
      }
    }
  }



  setSelectedTile(row, column){
    if(!this.selectedTile){
      this.selectedTile = this.tiles[0][0];
      this.tiles[0][0].setSelected(true);
    }
    this.selectedTile.setSelected(false)
    this.selectedTile = this.tiles[row][column];
    this.selectedTile.setSelected(true);

    this.updateTileStyleStates();
  }

  newGame(){
    this.resetGameTiles();
    this.updateTileStyleStates();
  }

  // hide(){
  //   // TODO: Fix this to a proper implementation
  //   let view = document.getElementById('game-container');
  //   view.classList.add('hidden');
  //   // this.getElement().classList.add('hidden');
  // }

  initGameTiles(){
    let storedGameBoard = JSON.parse(window.localStorage.getItem("gameboard2"));
    if(storedGameBoard){
      for(let i = 0; i < storedGameBoard.length; i++){
        this.tiles[storedGameBoard[i].x][storedGameBoard[i].y].setValue(storedGameBoard[i].value, storedGameBoard[i].isOriginal);
      }
    }else{
      this.resetGameTiles();
    }

    let selectedTileItem = JSON.parse(window.localStorage.getItem("selectedTile"));
    if(selectedTileItem){
      this.setSelectedTile(selectedTileItem.x, selectedTileItem.y);
    }else{
      this.setSelectedTile(0, 0);
    }
  }

  resetGameTiles(){
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

    // let N = this.EMPTY_VALUE;
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
    //     if(layout[i][j] == this.EMPTY_VALUE){
    //       this.tiles[i][j].setValue(layout[i][j], false);
    //     }else{
    //       this.tiles[i][j].setValue(layout[i][j], true);
    //     }
    //   }
    // }


    this.qqwing.generatePuzzle();
    this.qqwing.setPrintStyle(QQWING.PrintStyle.ONE_LINE);
    let t = this.qqwing.getSolutionString();
    console.log(t);
    let count = 0;
    for(let i = 0; i < 9; i++){
      for(let j = 0; j < 9; j++){
        // console.log(t[count]);
        if(t[count] == '.'){
          this.tiles[i][j].setValue(this.EMPTY_VALUE, false);
        }else{
          this.tiles[i][j].setValue(parseInt(t[count]), true);
        }
        count++;
      }
    }




    window.localStorage.setItem("timeElapsed", JSON.stringify(0));
  }

  getSolution(){
    // TODO: Fix. Does not give solution
    this.qqwing.solve();
    return this.qqwing.getSolutionString();
  }

  updateTileStyleStates(){
    for(let i = 0; i < 9; i++){
      for(let j = 0; j < 9; j++){
        if(this.selectedTile.isEmpty()){
          this.tiles[i][j].setStyleState(this.tiles[i][j].STYLE_STATES.BASIC);
        }else{
          if(this.selectedTile.getValue() == this.tiles[i][j].getValue() && (this.selectedTile.getRowIndex() != i && this.selectedTile.getColumnIndex() != j)){
            this.tiles[i][j].setStyleState(this.tiles[i][j].STYLE_STATES.SAME_VALUE);
          }else{
            this.tiles[i][j].setStyleState(this.tiles[i][j].STYLE_STATES.BASIC);
          }
        }
      }
    }
    this.checkForConflicts();
    this.saveBoard();
    if(this.selectionsBox){
      this.selectionsBox.update();
    }
  }

  setSelectionsBox(sbox){
    this.selectionsBox = sbox;
  }

  saveBoard(){
    let tmpBoard = [];
    for(let i = 0; i < 9; i++){
      for(let j = 0; j < 9; j++){
        tmpBoard.push({
          "x": i,
          "y": j,
          "value": this.tiles[i][j].getValue(),
          "isOriginal": this.tiles[i][j].isOriginal()
        });
      }
    }
    window.localStorage.setItem("gameboard2", JSON.stringify(tmpBoard));

    window.localStorage.setItem("selectedTile", JSON.stringify({
      "x": this.selectedTile.getRowIndex(),
      "y": this.selectedTile.getColumnIndex()
    }));
  }

  checkForConflicts(){
    // Block Conflicts
    for(let i = 0; i < this.blocksTiles.length; i++){
      this.checkTilesForConflict(this.blocksTiles[i]);
    }
    // Row Conflicts
    for(let i = 0; i < 9; i++){
      let tmp = [];
      for(let j = 0; j < 9; j++){
        tmp.push(this.tiles[i][j]);
      }
      this.checkTilesForConflict(tmp);
    }
    // Column Conflicts
    for(let i = 0; i < 9; i++){
      let tmp = [];
      for(let j = 0; j < 9; j++){
        tmp.push(this.tiles[j][i]);
      }
      this.checkTilesForConflict(tmp);
    }
  }

  checkTilesForConflict(blockTiles){
    let counts = [[],[],[],[],[],[],[],[],[]];
    for(let i = 0; i < 9; i++){
      if(!blockTiles[i].isEmpty()){
        counts[blockTiles[i].getValue()-1].push(blockTiles[i]);
      }
    }
    for(let i = 0; i < 9; i++){
      if(counts[i].length > 1){
        for(let j = 0; j < counts[i].length; j++){
          counts[i][j].setStyleState(counts[i][j].STYLE_STATES.CONFLICTING_VALUE);
        }
      }
    }
  }

  setSelectedTileValue(val){
    if(this.selectedTile.isOriginal()) return false;
    if(!this.selectedTile.isEmpty() && val != this.EMPTY_VALUE) return false;
    this.selectedTile.setValue(val);
    this.updateTileStyleStates();
    let count = 0;
    for(let i = 0; i < 9; i++){
      for(let j = 0; j < 9; j++){
        let v = this.tiles[i][j].getValue();
        if(v == val){
          count++;
        }
      }
    }
    if(count == 9){
      return true;
    }else{
      return false;
    }
  }

  getCompletedValues(){
    let vals = [0,0,0,0,0,0,0,0,0];
    for(let i = 0; i < 9; i++){
      for(let j = 0; j < 9; j++){
        let v = this.tiles[i][j].getValue();
        if(v != this.EMPTY_VALUE){
          vals[v-1]++;
        }
      }
    }
    console.log(vals);
    let doneValues = [];
    for(let i = 0; i < 9; i++){
      if(vals[i] == 9){
        console.log('DoneVals');
        doneValues.push(i+1);
        console.log('DoneVals2');
      }
    }
    return doneValues;
  }

}
