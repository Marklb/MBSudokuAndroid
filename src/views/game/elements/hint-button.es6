let Debug = require('../../../debug');
let CustomElement = require('../../custom-element');


let DEBUG = new Debug('HintButton');

const CSS_CLASSES = {
  HINT_BUTTON: 'hint-button'
};

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------
module.exports =
class HintButton extends CustomElement {
  constructor(x, y) {
    super(CSS_CLASSES.HINT_BUTTON);
    // DEBUG.log('Loading');



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
  }

  /*
   *
   */
  setValue(v){
    this.value = v;
    this.getElement().setAttribute('value', this.getValue());
    this.getElement().innerHTML = ''+this.getValue();
  }

  /*
   *
   */
  getValue(){
    return this.value;
  }


}
