'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Debug = require('./debug');
var Game = require('./views/game/game');
var MainMenu = require('./views/main-menu/main-menu');
var DifficultySelection = require('./views/difficulty-selection/difficulty-selection');
// var attachFastClick = require('./libs/fastclick');

var DEBUG = new Debug('App');

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

var App = function () {
  function App() {
    _classCallCheck(this, App);

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

  _createClass(App, [{
    key: 'checkVersion',
    value: function checkVersion() {
      this.isNewVersionBool = false;
      // Check if version changed
      var storedVersion = JSON.parse(window.localStorage.getItem('version'));
      if (storedVersion) {
        // There is a version stored
        if (parseInt(storedVersion) !== parseInt(VERSION)) {
          // Stored version is different
          this.isNewVersionBool = true;
          // DEBUG.log('Version different');
          // this.resetGame();
          // window.localStorage.setItem("version", VERSION);
          // return;
        }
      } else {
          // There is not a version stored
          // DEBUG.log('No version set');
          this.isNewVersionBool = true;
          // window.localStorage.setItem("version", VERSION);
        }

      if (this.isNewVersion()) {
        window.localStorage.setItem("version", VERSION);
      }
    }

    /*
     *
     */

  }, {
    key: 'isNewVersion',
    value: function isNewVersion() {
      return this.isNewVersionBool;
    }
  }, {
    key: 'getElement',
    value: function getElement() {
      return this.containerElem;
    }
  }, {
    key: 'addView',
    value: function addView(view) {
      if (this.views === undefined) {
        this.views = [];
      }
      this.views.push(view);
      this.getElement().appendChild(view.getElement());
    }
  }, {
    key: 'showView',
    value: function showView(viewId) {
      for (var i = 0; i < this.views.length; i++) {
        if (this.views[i].getViewId() === viewId) {
          this.hideActiveView();
          this.views[i].show();
          this.activeView = this.views[i];
        }
      }
    }
  }, {
    key: 'hideActiveView',
    value: function hideActiveView() {
      if (this.activeView !== undefined) {
        this.activeView.hide();
      }
    }
  }]);

  return App;
}();

global.app = new App();

// module.exports = new App();