let Debug = require('./debug');
let Game = require('./views/game/game');
let MainMenu = require('./views/main-menu/main-menu');
let DifficultySelection = require('./views/difficulty-selection/difficulty-selection');
// var attachFastClick = require('./libs/fastclick');

let DEBUG = new Debug('App');

// TODO: History
// TODO: Undo
// TODO: Hint
// TODO: Stats collector
// TODO: Game scoring
// TODO: New game conformation
// TODO: Win screen
// IDEA: Victory picture
// TODO: Error notification
// IDEA: Multiple games available, this way you can start a new game and come
//       back if you are stuck. The indivitual games should keep track of
//       their own win streak.
// TODO: On view unloaded function

// window.localStorage.clear();

global.VIEW_ID = {
  MAIN_MENU: 'MAIN_MENU_VIEW',
  DIFFICULY_SELECTION: 'DIFFICULY_SELECTION_VIEW',
  GAME: 'GAME_VIEW'
};

global.TOUCH_START_EVENT = 'mousedown';
// global.TOUCH_START_EVENT = 'touchstart';

global.VERSION = '31';


class App {
  constructor() {
    DEBUG.log('Starting MB Sudoku');
    this.checkVersion();

    this.containerElem = document.getElementById('app-container');

    // Initialize MainMenu
    this.mainMenuView = new MainMenu();
    this.addView(this.mainMenuView.getView());

    // Initialize Settings
    // TODO: Implement

    // Initialize Stats
    // TODO: Implement

    // Initialize DifficultySelection
    this.difficultySelectionView = new DifficultySelection();
    this.addView(this.difficultySelectionView.getView());

    // Initialize Game
    this.gameView = new Game();
    this.addView(this.gameView.getView());

    // Initialize GameOver
    // TODO: Implement



    // this.showView(VIEW_ID.GAME);
    this.showView(VIEW_ID.MAIN_MENU);

  }

  /*
   *
   */
  checkVersion(){
    this.isNewVersionBool = false;
    // Check if version changed
    let storedVersion = JSON.parse(window.localStorage.getItem('version'));
    if(storedVersion){
      // There is a version stored
      if(parseInt(storedVersion) !== parseInt(VERSION)){
        // Stored version is different
        this.isNewVersionBool = true;
        // DEBUG.log('Version different');
        // this.resetGame();
        // window.localStorage.setItem("version", VERSION);
        // return;
      }
    }else{
      // There is not a version stored
      // DEBUG.log('No version set');
      this.isNewVersionBool = true;
      // window.localStorage.setItem("version", VERSION);
    }

    if(this.isNewVersion()){
      window.localStorage.setItem("version", VERSION);
    }
  }

  /*
   *
   */
  isNewVersion(){
    return this.isNewVersionBool;
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
