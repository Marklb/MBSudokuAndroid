let Debug = require('./debug');
// let MainMenu = require('./main-menu');
// let Game = require('./game');
let Game = require('./views/game/game');
// var attachFastClick = require('./libs/fastclick');

let DEBUG = new Debug('App');

// TODO: History
// TODO: Undo
// TODO: Hint
// TODO: Stats collector
// TODO: Difficulty selector
// TODO: New game conformation
// TODO: Win screen
// IDEA: Victory picture
// TODO: Error notification


global.VIEW_ID = {
  MAIN_MENU: 'MAIN_MENU_VIEW',
  GAME: 'GAME_VIEW'
};

// global.TOUCH_START_EVENT = 'mousedown';
global.TOUCH_START_EVENT = 'touchstart';

global.VERSION = '0';

class App {
  constructor() {
    DEBUG.log('Starting MB Sudoku');

    this.containerElem = document.getElementById('app-container');


    // this.mainMenu = new MainMenu();
    // this.addView(this.mainMenu);
    //
    // this.game = new Game();
    // this.addView(this.game);
    //
    //
    //
    // this.showView(this.mainMenu.getViewName());


    this.gameView = new Game();
    this.addView(this.gameView.getView());


    this.showView(VIEW_ID.GAME);

  }

  getElement(){
    return this.containerElem;
  }

  addView(view){
    if(this.views === undefined){
      this.views = [];
    }
    this.views.push(view);
    this.getElement().appendChild(view.getElement());
  }

  showView(viewId){
    for(let i = 0; i < this.views.length; i++){
      if(this.views[i].getViewId() === viewId){
        this.hideActiveView();
        this.views[i].show();
        this.activeView = this.views[i];
      }
    }
  }

  hideActiveView(){
    if(this.activeView !== undefined){
      this.activeView.hide();
    }
  }


}

global.app = new App();

// module.exports = new App();
