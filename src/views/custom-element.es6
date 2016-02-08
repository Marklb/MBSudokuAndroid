let Debug = require('../debug');

let DEBUG = new Debug('CustomElement');

//------------------------------------------------------------------------------
// CSS Classes used by class View.
//------------------------------------------------------------------------------
const CSS_CLASSES = {
  CUSTOM_ELEMENT: 'custom-element'
};


//------------------------------------------------------------------------------
// CustomElement is a class to standardize this apps div elements.
// The way dom elements are being handled currently in this app there is a lot
// of repetition of code for dom elements, because it currently just uses div's
// for all the dom elements.
//------------------------------------------------------------------------------
module.exports =
class CustomElement {
  constructor(cssClass) {
    this.element = document.createElement('div');
    if(cssClass !== undefined){
      this.getElement().classList.add(cssClass);
    }
  }

  /*
   * Return the dom element.
   */
  getElement(){
    return this.element;
  }

  /*
   * Updates the manually set element styles
   */
  updateElementStyle(){
    let style = 'position:absolute;'
      +'left:'+this.getX()+'px;'
      +'top:'+this.getY()+'px;'
      +'width:'+this.getWidth()+'px;'
      +'height:'+this.getHeight()+'px;';
    this.getElement().setAttribute('style', style);
  }

  /*
   *
   */
  addClass(className){
    this.getElement().classList.add(className);
  }

  /*
   *
   */
  removeClass(className){
    this.getElement().classList.remove(className);
  }

  /*
   * Sets the X and Y coordinates.
   */
  setPosition(x, y){
    this.setX(x);
    this.setY(y);
  }

  /*
   * Set position from the left.
   */
  setX(x){
    this.x = x;
    this.updateElementStyle();
  }

  /*
   * Get the position from the left.
   */
  getX(){
    return this.x;
  }

  /*
   * Set the position from the top.
   */
  setY(y){
    this.y = y;
    this.updateElementStyle();
  }

  /*
   * Get the position from the top.
   */
  getY(){
    return this.y;
  }

  /*
   * Set the width and height.
   */
  setSize(w, h){
    this.setWidth(w);
    this.setHeight(h);
  }

  /*
   * Set the width.
   */
  setWidth(w){
    this.w = w;
    this.updateElementStyle();
  }

  /*
   * Get the width.
   */
  getWidth(){
    return this.w;
  }

  /*
   * Set the height.
   */
  setHeight(h){
    this.h = h;
    this.updateElementStyle();
  }

  /*
   * Get the height.
   */
  getHeight(){
    return this.h;
  }

}
