'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Debug = require('../debug');

var DEBUG = new Debug('CustomElement');

//------------------------------------------------------------------------------
// CSS Classes used by class View.
//------------------------------------------------------------------------------
var CSS_CLASSES = {
  CUSTOM_ELEMENT: 'custom-element'
};

//------------------------------------------------------------------------------
// CustomElement is a class to standardize this apps div elements.
// The way dom elements are being handled currently in this app there is a lot
// of repetition of code for dom elements, because it currently just uses div's
// for all the dom elements.
//------------------------------------------------------------------------------
module.exports = function () {
  function CustomElement(cssClass) {
    _classCallCheck(this, CustomElement);

    this.element = document.createElement('div');
    if (cssClass !== undefined) {
      this.getElement().classList.add(cssClass);
    }
  }

  /*
   * Return the dom element.
   */

  _createClass(CustomElement, [{
    key: 'getElement',
    value: function getElement() {
      return this.element;
    }

    /*
     * Updates the manually set element styles
     */

  }, {
    key: 'updateElementStyle',
    value: function updateElementStyle() {
      var style = 'position:absolute;' + 'left:' + this.getX() + 'px;' + 'top:' + this.getY() + 'px;' + 'width:' + this.getWidth() + 'px;' + 'height:' + this.getHeight() + 'px;';
      this.getElement().setAttribute('style', style);
    }

    /*
     *
     */

  }, {
    key: 'addClass',
    value: function addClass(className) {
      this.getElement().classList.add(className);
    }

    /*
     *
     */

  }, {
    key: 'removeClass',
    value: function removeClass(className) {
      this.getElement().classList.remove(className);
    }

    /*
     * Sets the X and Y coordinates.
     */

  }, {
    key: 'setPosition',
    value: function setPosition(x, y) {
      this.setX(x);
      this.setY(y);
    }

    /*
     * Set position from the left.
     */

  }, {
    key: 'setX',
    value: function setX(x) {
      this.x = x;
      this.updateElementStyle();
    }

    /*
     * Get the position from the left.
     */

  }, {
    key: 'getX',
    value: function getX() {
      return this.x;
    }

    /*
     * Set the position from the top.
     */

  }, {
    key: 'setY',
    value: function setY(y) {
      this.y = y;
      this.updateElementStyle();
    }

    /*
     * Get the position from the top.
     */

  }, {
    key: 'getY',
    value: function getY() {
      return this.y;
    }

    /*
     * Set the width and height.
     */

  }, {
    key: 'setSize',
    value: function setSize(w, h) {
      this.setWidth(w);
      this.setHeight(h);
    }

    /*
     * Set the width.
     */

  }, {
    key: 'setWidth',
    value: function setWidth(w) {
      this.w = w;
      this.updateElementStyle();
    }

    /*
     * Get the width.
     */

  }, {
    key: 'getWidth',
    value: function getWidth() {
      return this.w;
    }

    /*
     * Set the height.
     */

  }, {
    key: 'setHeight',
    value: function setHeight(h) {
      this.h = h;
      this.updateElementStyle();
    }

    /*
     * Get the height.
     */

  }, {
    key: 'getHeight',
    value: function getHeight() {
      return this.h;
    }
  }]);

  return CustomElement;
}();