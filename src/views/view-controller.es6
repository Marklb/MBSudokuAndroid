let Debug = require('../debug');

let DEBUG = new Debug('ViewController');


// function addClassNameListener(elemId, callback) {
function addClassNameListener(elemObj, callback) {
    // var elem = document.getElementById(elemId);
    var elem = elemObj;
    var lastClassName = elem.className;
    window.setInterval( function() {
       var className = elem.className;
        if (className !== lastClassName) {
            callback();
            lastClassName = className;
        }
    },10);
}

//------------------------------------------------------------------------------
// Handles the actions of a view.
//------------------------------------------------------------------------------
module.exports =
class ViewController {
  constructor(view) {
    this.view = view;

    addClassNameListener(this.getView().getElement(), () => {
      if(this.getView().getElement().classList.contains('shown')){
        this.getView().getElement().classList.remove('shown');
        this.onShowView();
      }
    });
  }

  getView(){
    return this.view;
  }

  onShowView(){

  }

}
