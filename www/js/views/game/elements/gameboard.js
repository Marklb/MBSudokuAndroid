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