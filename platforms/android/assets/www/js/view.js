'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Debug = require('./debug');

var DEBUG = new Debug('View');

//------------------------------------------------------------------------------
// CSS Classes used by class View.
//------------------------------------------------------------------------------
var CSS_CLASSES = {
  VIEW: 'view',
  HIDDEN: 'hidden'
};

//------------------------------------------------------------------------------
// A View takes up the entire screen.
// Only one view is visible at a time.
// Anything seen has to be added to a View.
//------------------------------------------------------------------------------
module.exports = function () {
  function View(viewId) {
    _classCallCheck(this, View);

    DEBUG.log('Loading: ' + viewId);
    this.viewElement = document.createElement('div');
    this.getViewElement().classList.add(CSS_CLASSES.VIEW);
    this.getViewElement().classList.add(CSS_CLASSES.HIDDEN);

    this.initBounds();

    this.setViewId(viewId);

    DEBUG.log('w: ' + this.getWidth());
    DEBUG.log('h: ' + this.getHeight());
  }

  _createClass(View, [{
    key: 'initBounds',
    value: function initBounds() {
      // DEBUG.log('InitBounds');
      this.bounds = {
        x: 0,
        y: 0,
        w: window.innerWidth,
        h: window.innerHeight
      };
      // DEBUG.log('w:' + this.bounds.w);
    }
  }, {
    key: 'getBounds',
    value: function getBounds() {
      return this.bounds;
    }
  }, {
    key: 'getX',
    value: function getX() {
      return this.getBounds().x;
    }
  }, {
    key: 'getY',
    value: function getY() {
      return this.getBounds().y;
    }
  }, {
    key: 'getWidth',
    value: function getWidth() {
      return this.getBounds().w;
    }
  }, {
    key: 'getHeight',
    value: function getHeight() {
      return this.getBounds().h;
    }
  }, {
    key: 'setViewId',
    value: function setViewId(id) {
      this.viewId = id;
    }
  }, {
    key: 'getViewId',
    value: function getViewId() {
      return this.viewId;
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