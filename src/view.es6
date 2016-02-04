const CSS_CLASSES = {
  VIEW: 'view',
  HIDDEN: 'hidden'
};

module.exports =
class View {
  constructor(viewName) {
    this.viewElement = document.createElement('div');
    this.getViewElement().classList.add(CSS_CLASSES.VIEW);
    this.getViewElement().classList.add(CSS_CLASSES.HIDDEN);


    this.setViewName(viewName);
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
