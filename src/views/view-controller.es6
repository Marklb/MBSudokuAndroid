let Debug = require('../debug');

let DEBUG = new Debug('ViewController');


//------------------------------------------------------------------------------
// Handles the actions of a view.
//------------------------------------------------------------------------------
module.exports =
class ViewController {
  constructor(view) {
    this.view = view;
  }

  getView(){
    return this.view;
  }

}
