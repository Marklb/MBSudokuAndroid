let Debug = require('../../debug');
let ViewController = require('../view-controller');
let MainMenuView = require('./main-menu-view');

let DEBUG = new Debug('MainMenu');

module.exports =
class MainMenu extends ViewController {
  constructor() {
    super(new MainMenuView());
    // DEBUG.log('Loading.');

    this.initPlayButtonEvents();

  }

  /*
   *
   */
  initPlayButtonEvents(){
    // DEBUG.log('initPlayButtonEvents');
    this.getView().getPlayButton().getElement().addEventListener(
      TOUCH_START_EVENT, () => {
        DEBUG.log('Clicked Play Button');
        app.showView(VIEW_ID.DIFFICULY_SELECTION);
      }
    );
  }


}
