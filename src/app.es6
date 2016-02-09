let Debug = require('./debug');
let Game = require('./views/game/game');
let MainMenu = require('./views/main-menu/main-menu');
// var attachFastClick = require('./libs/fastclick');

let DEBUG = new Debug('App');

// TODO: History
// TODO: Undo
// TODO: Hint
// TODO: Stats collector
// TODO: Game scoring
// TODO: Difficulty selector
// TODO: New game conformation
// TODO: Win screen
// IDEA: Victory picture
// TODO: Error notification
// IDEA: Multiple games available, this way you can start a new game and come
//       back if you are stuck. The indivitual games should keep track of
//       their own win streak.
// TODO: On view loaded function
// TODO: On view unloaded function


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

    // Initialize MainMenu
    this.mainMenuView = new MainMenu();
    this.addView(this.mainMenuView.getView());

    // Initialize Settings
    // TODO: Implement

    // Initialize Stats
    // TODO: Implement

    // Initialize GameSelection
    // TODO: Implement

    // Initialize Game
    this.gameView = new Game();
    this.addView(this.gameView.getView());

    // Initialize GameOver
    // TODO: Implement



    // this.showView(VIEW_ID.GAME);
    this.showView(VIEW_ID.MAIN_MENU);

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
