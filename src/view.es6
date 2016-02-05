// const CSS_CLASSES = {
//   VIEW: 'view',
//   HIDDEN: 'hidden'
// };

//------------------------------------------------------------------------------
// CSS Classes used by class View.
//------------------------------------------------------------------------------
const CSS_CLASSES = {
  VIEW: 'view2',
  HIDDEN: 'hidden2'
};

//------------------------------------------------------------------------------
// A View takes up the entire screen.
// Only one view is visible at a time.
// Anything seen has to be added to a View.
//------------------------------------------------------------------------------
module.exports =
class View {
  constructor(viewName) {
    this.viewElement = document.createElement('div');
    this.getViewElement().classList.add(CSS_CLASSES.VIEW);
    this.getViewElement().classList.add(CSS_CLASSES.HIDDEN);

    initDimensions();

    this.setViewName(viewName);
  }

  initDimensions(){
    this.dimensions = {
      x: 0,
      y: 0,
      w: window.innerWidth,
      h: window.innerHeight
    };
  }

  setViewName(name){
    this.viewName = name;
  }

  getViewName(){
    return this.viewName;
  }

  getViewElement(){
    return this.viewElement;
  }

  addElement(elem){
    this.getViewElement().appendChild(elem);
  }

  show(){
    this.getViewElement().classList.remove(CSS_CLASSES.HIDDEN);
  }

  hide(){
    this.getViewElement().classList.add(CSS_CLASSES.HIDDEN);
  }


}
