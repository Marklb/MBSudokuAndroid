let Debug = require('../../../debug');
let CustomElement = require('../../custom-element');


let DEBUG = new Debug('SelectionTile');

const CSS_CLASSES = {
  SELECTION_TILE: 'selection-tile'
};

//------------------------------------------------------------------------------
// SelectionTile is one of the 9 tiles under the gameboard to add a tile to
// the gameboard.
//------------------------------------------------------------------------------
module.exports =
class SelectionTile extends CustomElement {
  constructor(x, y) {
    super(CSS_CLASSES.SELECTION_TILE);
    // DEBUG.log('Loading');

    this.setDone(false);

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
    this.getElement().style.fontSize = (this.getHeight()*0.8)+'px';
    if(this.isDone()){
      this.getElement().style.opacity = '0';
    }else{
      this.getElement().style.opacity = '1';
    }
  }

  /*
   *
   */
  setValue(v){
    this.value = v+'';
    this.getElement().setAttribute('value', this.getValue());
    this.getElement().innerHTML = ''+this.getValue();
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
  setDone(b){
    this.isDoneBool = b;
  }

  /*
   *
   */
  isDone(){
    return this.isDoneBool;
  }


}
