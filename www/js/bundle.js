(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// let MainMenu = require('./main-menu');
// let Game = require('./game');
var Game = require('./views/game/game');
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

global.TOUCH_EVENT = 'mousedown';
// global.TOUCH_EVENT = 'touchstart';

var App = function () {
  function App() {
    _classCallCheck(this, App);

    // this.TOUCH_EVENT = 'mousedown';
    // attachFastClick(document.body);
    console.log("Starting MB Sudoku");
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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./views/game/game":6}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function Debug(debug_id) {
    _classCallCheck(this, Debug);

    this.debug_id = debug_id;
  }

  _createClass(Debug, [{
    key: 'log',
    value: function log(msg) {
      console.log('[' + this.debug_id + ']: ' + msg);
    }
  }]);

  return Debug;
}();
},{}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// const CSS_CLASSES = {
//   VIEW: 'view',
//   HIDDEN: 'hidden'
// };

//------------------------------------------------------------------------------
// CSS Classes used by class View.
//------------------------------------------------------------------------------
var CSS_CLASSES = {
  VIEW: 'view2',
  HIDDEN: 'hidden2'
};

//------------------------------------------------------------------------------
// A View takes up the entire screen.
// Only one view is visible at a time.
// Anything seen has to be added to a View.
//------------------------------------------------------------------------------
module.exports = function () {
  function View(viewName) {
    _classCallCheck(this, View);

    console.log('Load Id: ' + viewName);
    this.viewElement = document.createElement('div');
    this.getViewElement().classList.add(CSS_CLASSES.VIEW);
    this.getViewElement().classList.add(CSS_CLASSES.HIDDEN);

    this.initDimensions();

    this.setViewName(viewName);
  }

  _createClass(View, [{
    key: 'initDimensions',
    value: function initDimensions() {
      this.dimensions = {
        x: 0,
        y: 0,
        w: window.innerWidth,
        h: window.innerHeight
      };
    }
  }, {
    key: 'getDimensions',
    value: function getDimensions() {
      return this.dimensions;
    }
  }, {
    key: 'getX',
    value: function getX() {
      return this.getDimensions().x;
    }
  }, {
    key: 'getY',
    value: function getY() {
      return this.getDimensions().y;
    }
  }, {
    key: 'getWidth',
    value: function getWidth() {
      return this.getDimensions().w;
    }
  }, {
    key: 'getHeight',
    value: function getHeight() {
      return this.getDimensions().h;
    }
  }, {
    key: 'setViewName',
    value: function setViewName(name) {
      this.viewName = name;
    }
  }, {
    key: 'getViewName',
    value: function getViewName() {
      return this.viewName;
    }
  }, {
    key: 'getViewElement',
    value: function getViewElement() {
      return this.viewElement;
    }
  }, {
    key: 'addElement',
    value: function addElement(elem) {
      this.getViewElement().appendChild(elem);
    }
  }, {
    key: 'show',
    value: function show() {
      this.getViewElement().classList.remove(CSS_CLASSES.HIDDEN);
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.getViewElement().classList.add(CSS_CLASSES.HIDDEN);
    }
  }]);

  return View;
}();
},{}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Debug = require('../../../debug');

var DEBUG = new Debug('GameBoard');

var CSS_CLASSES = {
  GAME_BOARD: 'game-board'
};

//------------------------------------------------------------------------------
// GameBoard is the grid containing the played tiles.
//------------------------------------------------------------------------------
module.exports = function () {
  function GameBoard(game) {
    _classCallCheck(this, GameBoard);

    DEBUG.log('Loading.');
    this.elem = document.createElement('div');
    this.elem.classList.add(CSS_CLASSES.GAME_BOARD);
  }

  _createClass(GameBoard, [{
    key: 'getElement',
    value: function getElement() {
      return this.elem;
    }
  }, {
    key: 'setPosition',
    value: function setPosition(x, y) {
      this.setX(x);
      this.setY(y);
    }
  }, {
    key: 'setX',
    value: function setX(x) {
      this.x = x;
    }
  }, {
    key: 'getX',
    value: function getX() {
      return this.x;
    }
  }, {
    key: 'setY',
    value: function setY(y) {
      this.y = y;
    }
  }, {
    key: 'getY',
    value: function getY() {
      return this.y;
    }
  }, {
    key: 'setSize',
    value: function setSize(w, h) {
      this.setWidth(w);
      this.setHeight(h);
    }
  }, {
    key: 'setWidth',
    value: function setWidth(w) {
      this.w = w;
    }
  }, {
    key: 'getWidth',
    value: function getWidth() {
      return this.getWidth();
    }
  }, {
    key: 'setHeight',
    value: function setHeight(h) {
      this.h = h;
    }
  }, {
    key: 'getHeight',
    value: function getHeight() {
      return this.h;
    }
  }]);

  return GameBoard;
}();
},{"../../../debug":2}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Debug = require('../../debug');
var View = require('../../view');

var GameBoard = require('./elements/gameboard');

var DEBUG = new Debug('GameView');

module.exports = function (_View) {
  _inherits(GameView, _View);

  function GameView() {
    _classCallCheck(this, GameView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GameView).call(this, VIEW_ID.GAME));

    DEBUG.log('Loading');

    _this.initBoard();

    return _this;
  }

  _createClass(GameView, [{
    key: 'initBoard',
    value: function initBoard() {
      this.gameBoard = new GameBoard();
      this.addElement(this.gameBoard.getElement());
    }
  }]);

  return GameView;
}(View);
},{"../../debug":2,"../../view":3,"./elements/gameboard":4}],6:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Debug = require('../../debug');
var GameView = require('./game-view');

var DEBUG = new Debug('Game');

module.exports = function () {
  function Game() {
    _classCallCheck(this, Game);

    DEBUG.log('Loading.');
    this.view = new GameView();
  }

  _createClass(Game, [{
    key: 'getView',
    value: function getView() {
      return this.view;
    }
  }]);

  return Game;
}();
},{"../../debug":2,"./game-view":5}]},{},[1]);
