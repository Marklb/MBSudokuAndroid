module.exports =
class SelectionsBox {
  constructor(gameBoard) {
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
    this.removeBtnElem.addEventListener('mousedown', (e) => {
      console.log("Pressed");
      this.gameBoard.setSelectedTileValue(-1);
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
    this.tile1.addEventListener('mousedown', (e) => {
      this.gameBoard.setSelectedTileValue(1);
    });
    // Tile 2
    this.tile2 = document.createElement('div');
    this.tile2.classList.add('tile');
    this.tile2.classList.add('even');
    this.tile2.numValue = 2;
    this.tile2.textContent = '2';
    this.tilesContainerElem.appendChild(this.tile2);
    this.tile2.addEventListener('mousedown', (e) => {
      this.gameBoard.setSelectedTileValue(2);
    });
    // Tile 3
    this.tile3 = document.createElement('div');
    this.tile3.classList.add('tile');
    this.tile3.classList.add('odd');
    this.tile3.numValue = 3;
    this.tile3.textContent = '3';
    this.tilesContainerElem.appendChild(this.tile3);
    this.tile3.addEventListener('mousedown', (e) => {
      this.gameBoard.setSelectedTileValue(3);
    });
    // Tile 4
    this.tile4 = document.createElement('div');
    this.tile4.classList.add('tile');
    this.tile4.classList.add('even');
    this.tile4.numValue = 4;
    this.tile4.textContent = '4';
    this.tilesContainerElem.appendChild(this.tile4);
    this.tile4.addEventListener('mousedown', (e) => {
      this.gameBoard.setSelectedTileValue(4);
    });
    // Tile 5
    this.tile5 = document.createElement('div');
    this.tile5.classList.add('tile');
    this.tile5.classList.add('odd');
    this.tile5.numValue = 5;
    this.tile5.textContent = '5';
    this.tilesContainerElem.appendChild(this.tile5);
    this.tile5.addEventListener('mousedown', (e) => {
      this.gameBoard.setSelectedTileValue(5);
    });
    // Tile 6
    this.tile6 = document.createElement('div');
    this.tile6.classList.add('tile');
    this.tile6.classList.add('even');
    this.tile6.numValue = 6;
    this.tile6.textContent = '6';
    this.tilesContainerElem.appendChild(this.tile6);
    this.tile6.addEventListener('mousedown', (e) => {
      this.gameBoard.setSelectedTileValue(6);
    });
    // Tile 7
    this.tile7 = document.createElement('div');
    this.tile7.classList.add('tile');
    this.tile7.classList.add('odd');
    this.tile7.numValue = 7;
    this.tile7.textContent = '7';
    this.tilesContainerElem.appendChild(this.tile7);
    this.tile7.addEventListener('mousedown', (e) => {
      this.gameBoard.setSelectedTileValue(7);
    });
    // Tile 8
    this.tile8 = document.createElement('div');
    this.tile8.classList.add('tile');
    this.tile8.classList.add('even');
    this.tile8.numValue = 8;
    this.tile8.textContent = '8';
    this.tilesContainerElem.appendChild(this.tile8);
    this.tile8.addEventListener('mousedown', (e) => {
      this.gameBoard.setSelectedTileValue(8);
    });
    // Tile 9
    this.tile9 = document.createElement('div');
    this.tile9.classList.add('tile');
    this.tile9.classList.add('odd');
    this.tile9.numValue = 9;
    this.tile9.textContent = '9';
    this.tilesContainerElem.appendChild(this.tile9);
    this.tile9.addEventListener('mousedown', (e) => {
      this.gameBoard.setSelectedTileValue(9);
    });




  }

  getElement(){
    return this.containerElem;
  }

}
