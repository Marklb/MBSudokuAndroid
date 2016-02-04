'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CSS_CLASSES = {
  VIEW: 'view',
  HIDDEN: 'hidden'
};

module.exports = function () {
  function View(viewName) {
    _classCallCheck(this, View);

    this.viewElement = document.createElement('div');
    this.getViewElement().classList.add(CSS_CLASSES.VIEW);
    this.getViewElement().classList.add(CSS_CLASSES.HIDDEN);

    this.setViewName(viewName);
  }

  _createClass(View, [{
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