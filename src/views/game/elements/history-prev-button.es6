let Debug = require('../../../debug');
let CustomElement = require('../../custom-element');


let DEBUG = new Debug('HistoryPrevButton');

const CSS_CLASSES = {
  HISTORY_PREV_BUTTON: 'history-prev-button'
};

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------
module.exports =
class HistoryPrevButton extends CustomElement {
  constructor(x, y) {
    super(CSS_CLASSES.HISTORY_PREV_BUTTON);
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
