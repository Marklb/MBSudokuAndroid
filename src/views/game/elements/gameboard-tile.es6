let Debug = require('../../../debug');
let CustomElement = require('../../custom-element');


let DEBUG = new Debug('GameboardTile');

const CSS_CLASSES = {
  GAMEBOARD_TILE: 'gameboard-tile',
  SELECTED: 'selected'
};

const TILE_IDS = [
  ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'], // row 1
  ['A4', 'A5', 'A6', 'B4', 'B5', 'B6', 'C4', 'C5', 'C6'], // row 2
  ['A7', 'A8', 'A9', 'B7', 'B8', 'B9', 'C7', 'C8', 'C9'], // row 3
  ['D1', 'D2', 'D3', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3'], // row 4
  ['D4', 'D5', 'D6', 'E4', 'E5', 'E6', 'F4', 'F5', 'F6'], // row 5
  ['D7', 'D8', 'D9', 'E7', 'E8', 'E9', 'F7', 'F8', 'F9'], // row 6
  ['G1', 'G2', 'G3', 'H1', 'H2', 'H3', 'I1', 'I2', 'I3'], // row 7
  ['G4', 'G5', 'G6', 'H4', 'H5', 'H6', 'I4', 'I5', 'I6'], // row 8
  ['G7', 'G8', 'G9', 'H7', 'H8', 'H9', 'I7', 'I8', 'I9'], // row 9
];

//------------------------------------------------------------------------------
// GameBoardTile is one of the tiles on the 9x9 gameboard grid.
//------------------------------------------------------------------------------
module.exports =
class GameboardTile extends CustomElement {
  constructor(x, y) {
    super(CSS_CLASSES.GAMEBOARD_TILE);
    // DEBUG.log('Loading');

    //
    this.tileId = TILE_IDS[x][y];

    //
    this.isSelectedBool = false;

    //
    this.setValue(0);

    //
    this.setIsOriginal(false);

    //
    this.setIsSameValue(false);

    //
    this.setHasConflict(false);

  }

  /*
   *
   */
  update(){
    this.updateStyles();
  }

  /*
   *
   */
  updateStyles(){
    if(this.isSelected() === true){
      this.addClass(CSS_CLASSES.SELECTED);
    }else{
      this.removeClass(CSS_CLASSES.SELECTED);
    }
    this.getElement().style.fontSize = (this.getHeight()*0.8)+'px';

    //
    // TODO: Organize this logic
    if(this.isEmpty()){
      this.getElement().style.color = 'rgba(0,0,0,0)';
      // this.getElement().style.color = 'rgba(255,255,255,1)';
      if(this.isSelected()){
        this.getElement().style.borderColor = 'rgba(0,200,100,1)';
      }else{
        this.getElement().style.borderColor = 'rgba(0,150,190,1)';
      }
    }else{
      if(this.isOriginal()){
        this.getElement().style.color = 'rgba(0,120,190,1)';
        if(this.isSelected()){
          if(this.hasConflict()){
            this.getElement().style.borderColor = 'rgba(200,50,50,1)';
          }else{
            this.getElement().style.borderColor = 'rgba(0,200,100,1)';
          }
        }else{
          if(this.hasConflict()){
            this.getElement().style.borderColor = 'rgba(200,100,100,1)';
          }else{
            if(this.isSameValue()){
              this.getElement().style.borderColor = 'rgba(0,200,140,1)';
            }else{
              this.getElement().style.borderColor = 'rgba(0,150,190,1)';
            }
          }
        }
      }else{
        this.getElement().style.color = 'rgba(0,150,190,1)';
        if(this.isSelected()){
          if(this.hasConflict()){
            this.getElement().style.borderColor = 'rgba(200,50,50,1)';
          }else{
            this.getElement().style.borderColor = 'rgba(0,200,100,1)';
          }
        }else{
          if(this.hasConflict()){
            this.getElement().style.borderColor = 'rgba(200,100,100,1)';
          }else{
            if(this.isSameValue()){
              this.getElement().style.borderColor = 'rgba(0,200,140,1)';
            }else{
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
  getTileId(){
    return this.tileId;
  }

  /*
   *
   */
  setSelected(b){
    this.isSelectedBool = b;
  }

  /*
   *
   */
  isSelected(){
    return this.isSelectedBool;
  }

  /*
   *
   */
  setValue(v){
    // DEBUG.log('Setting value: '+v);
    // // let possibleTileValues = ['1','2','3','4','5','6','7','8','9'];
    // let possibleTileValues = '123456789';
    // if(possibleTileValues.indexOf(v) != -1){
    //   DEBUG.log('Not a value value');
    //   v = '0';
    // }
    // DEBUG.log('Done checking valid');
    // if(v === '.'){
    //   v = '0';
    // }

    this.value = v+'';
    this.getElement().setAttribute('value', this.getValue());
    this.getElement().innerHTML = ''+this.getValue();
    if(this._onValueChange !== undefined){
      this._onValueChange();
    }
    // DEBUG.log('Done setting value');
  }

  /*
   *
   */
  getValue(){
    return this.value;
  }

  /*
   *
   */
  setIsOriginal(b){
    this.isOriginalBool = b;
    this.getElement().setAttribute('original', b);
  }

  /*
   * Returns true if this tile contains a value from the gameboard generation.
   * Original values can't be changed.
   */
  isOriginal(){
    return this.isOriginalBool;
  }

  /*
   * Returns whether the tile has a value set.
   * A value of 0 is used to represent an unset tile.
   */
  isEmpty(){
    return (this.value+'' === 0+'');
  }

  /*
   * Called when this tiles value is changed
   * Note: This is not an actual event right now.
   *       Its purpose currently is just a way to add a function to the
   *       setValue function outside this class.
   */
  setOnValueChangeEvent(func){
    this._onValueChange = func;
  }

  /*
   *
   */
  setIsSameValue(b){
    this.isSameValueBool = b;
    this.getElement().setAttribute('samevalue', this.isSameValue());
  }

  /*
   *
   */
  isSameValue(){
    return this.isSameValueBool;
  }

  /*
   *
   */
  setHasConflict(b){
    this.hasConflictBool = b;
  }

  /*
   *
   */
  hasConflict(){
    return this.hasConflictBool;
  }

}
