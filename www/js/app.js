'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MainMenu = require('./main-menu');
var Game = require('./game');
// var attachFastClick = require('./libs/fastclick');

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

var App = function () {
  function App() {
    _classCallCheck(this, App);

    // attachFastClick(document.body);
    console.log("Starting MB Sudoku");
    this.containerElem = document.getElementById('app-container');

    this.mainMenu = new MainMenu();
    this.addView(this.mainMenu);

    this.game = new Game();
    this.addView(this.game);

    this.showView(this.mainMenu.getViewName());
  }

  _createClass(App, [{
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
      this.getElement().appendChild(view.getViewElement());
    }
  }, {
    key: 'showView',
    value: function showView(viewName) {
      for (var i = 0; i < this.views.length; i++) {
        if (this.views[i].getViewName() === viewName) {
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