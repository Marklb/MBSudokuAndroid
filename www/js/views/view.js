'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Debug = require('../debug');

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
    this.setViewId(viewId);

    this.initElement();
    this.initBounds();

    this.updateElement();
  }

  _createClass(View, [{
    key: 'initBounds',
    value: function initBounds() {
      this.bounds = {
        x: 0,
        y: 0,
        w: window.innerWidth,
        h: window.innerHeight
      };
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
    key: 'initElement',
    value: function initElement() {
      this.element = document.createElement('div');
      this.getElement().classList.add(CSS_CLASSES.VIEW);
      this.getElement().classList.add(CSS_CLASSES.HIDDEN);
    }
  }, {
    key: 'getElement',
    value: function getElement() {
      return this.element;
    }
  }, {
    key: 'updateElement',
    value: function updateElement() {
      this.getElement().setAttribute('style', 'left:' + this.getX() + 'px;');
      this.getElement().setAttribute('style', 'top:' + this.getY() + 'px;');
      this.getElement().setAttribute('style', 'width:' + this.getWidth() + 'px;');
      this.getElement().setAttribute('style', 'height:' + this.getHeight() + 'px;');
    }
  }, {
    key: 'addElement',
    value: function addElement(elem) {
      this.getElement().appendChild(elem);
    }
  }, {
    key: 'show',
    value: function show() {
      this.getElement().classList.remove(CSS_CLASSES.HIDDEN);
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.getElement().classList.add(CSS_CLASSES.HIDDEN);
    }
  }]);

  return View;
}();