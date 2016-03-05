let Debug = require('../../../debug');
let CustomElement = require('../../custom-element');
let GameboardTile = require('./gameboard-tile');

let DEBUG = new Debug('Gameboard');

const CSS_CLASSES = {
  GAMEBOARD: 'gameboard'
};

const PADDING = {
  LEFT: 4,
  RIGHT: 4,
  TOP: 4,
  BOTTOM: 4,
  INNER: 4
};

const BLOCK_BORDER_SIZE = 4;

//------------------------------------------------------------------------------
// GameBoard is the grid containing the played tiles.
//------------------------------------------------------------------------------
module.exports =
class Gameboard extends CustomElement {
  constructor(game) {
    super(CSS_CLASSES.GAMEBOARD);
    // DEBUG.log('Loading.');

    // Array containing the tiles on the 9x9 grid
    this.tiles = [];

  }

  /*
   * Update anything dynamically handled by the gameboard.
   */
  update(){
    this.updateTilePositions();
    this.updateTileStyles();
  }

  /*
   *
   */
  updateTilePositions(){
    let tileSize = ((this.getWidth()-(BLOCK_BORDER_SIZE*2))
      -PADDING.LEFT-PADDING.RIGHT-(8*PADDING.INNER)-(BLOCK_BORDER_SIZE*2))/9;

    let i = 0;
    for(let row = 0; row < 9; row++){
      for(let col = 0; col < 9; col++){
        //
        let rowBlockOffset = 0;
        if(row === 3 || row === 4 || row === 5){
          rowBlockOffset = BLOCK_BORDER_SIZE;
        }
        if(row === 6 || row === 7 || row === 8){
          rowBlockOffset = BLOCK_BORDER_SIZE*2;
        }
        //
        let colBlockOffset = 0;
        if(col === 3 || col === 4 || col === 5){
          colBlockOffset = BLOCK_BORDER_SIZE;
        }
        if(col === 6 || col === 7 || col === 8){
          colBlockOffset = BLOCK_BORDER_SIZE*2;
        }
        //
        this.tiles[i].setPosition(
          this.getX()+BLOCK_BORDER_SIZE+PADDING.LEFT
            +(row*tileSize)+(row*PADDING.INNER)+rowBlockOffset,// X
          this.getY()+BLOCK_BORDER_SIZE+PADDING.TOP
            +(col*tileSize)+(col*PADDING.INNER)+colBlockOffset // Y
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
  updateTileStyles(){
    for(let i = 0; i < this.getTiles().length; i++){
      this.getTiles()[i].updateStyles();
    }
  }

  /*
   * Add a tile to the gameboard.
   * A tile is one of the squares on the 9x9 gameboard.
   */
  addTile(tile){
    if(tile instanceof GameboardTile){
        // Check if the tile being added already exists
        for(let i = 0; i < this.tiles.length; i++){
          if(this.tiles[i].getTileId() === tile.getTileId()){
            // DEBUG.error('Tile: '+tile.getTileId()+' is already added.');
            return;
          }
        }
        // Add the tile to the tiles array.
        this.tiles.push(tile);
    }else{
      // DEBUG.error('tile is not of type GameboardTile.');
    }
  }

  /*
   *
   */
  getTiles(){
    return this.tiles;
  }





}
