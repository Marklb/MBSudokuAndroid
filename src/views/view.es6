let Debug = require('../debug');

let DEBUG = new Debug('View');

//------------------------------------------------------------------------------
// CSS Classes used by class View.
//------------------------------------------------------------------------------
const CSS_CLASSES = {
  VIEW: 'view',
  HIDDEN: 'hidden'
};


//------------------------------------------------------------------------------
// A View takes up the entire screen.
// Only one view is visible at a time.
// Anything seen has to be added to a View.
//------------------------------------------------------------------------------
module.exports =
class View {
  constructor(viewId) {
    DEBUG.log('Loading: '+viewId);
    this.setViewId(viewId);

    this.initElement();
    this.initBounds();

    this.updateElement();
  }

  initBounds(){
    this.bounds = {
      x: 0,
      y: 0,
      w: window.innerWidth,
      h: window.innerHeight
    };
  }

  getBounds(){
    return this.bounds;
  }

  getX(){
    return this.getBounds().x;
  }

  getY(){
    return this.getBounds().y;
  }

  getWidth(){
    return this.getBounds().w;
  }

  getHeight(){
    return this.getBounds().h;
  }

  setViewId(id){
    this.viewId = id;
  }

  getViewId(){
    return this.viewId;
  }

  initElement(){
    this.element = document.createElement('div');
    this.getElement().classList.add(CSS_CLASSES.VIEW);
    this.getElement().classList.add(CSS_CLASSES.HIDDEN);
  }

  getElement(){
    return this.element;
  }

  updateElement(){
    this.getElement().setAttribute('style', 'left:'+this.getX()+'px;');
    this.getElement().setAttribute('style', 'top:'+this.getY()+'px;');
    this.getElement().setAttribute('style', 'width:'+this.getWidth()+'px;');
    this.getElement().setAttribute('style', 'height:'+this.getHeight()+'px;');
  }

  addElement(elem){
    this.getElement().appendChild(elem);
  }

  show(){
    this.getElement().classList.remove(CSS_CLASSES.HIDDEN);
  }

  hide(){
    this.getElement().classList.add(CSS_CLASSES.HIDDEN);
  }


}
