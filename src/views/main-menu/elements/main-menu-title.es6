let Debug = require('../../../debug');
let CustomElement = require('../../custom-element');


let DEBUG = new Debug('MainMenuTitle');

const CSS_CLASSES = {
  MAIN_MENU_TITLE: 'main-menu-title'
};

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------
module.exports =
class MainMenuTitle extends CustomElement {
  constructor() {
    super(CSS_CLASSES.MAIN_MENU_TITLE);
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
