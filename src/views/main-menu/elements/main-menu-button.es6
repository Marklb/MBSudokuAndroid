let Debug = require('../../../debug');
let CustomElement = require('../../custom-element');


let DEBUG = new Debug('MainMenuButton');

const CSS_CLASSES = {
  MAIN_MENU_BUTTON: 'main-menu-button'
};

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------
module.exports =
class MainMenuButton extends CustomElement {
  constructor(x, y) {
    super(CSS_CLASSES.MAIN_MENU_BUTTON);
    DEBUG.log('Loading');



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
