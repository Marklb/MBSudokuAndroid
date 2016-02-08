'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Debug = require('../debug');

var DEBUG = new Debug('ViewController');

//------------------------------------------------------------------------------
// Handles the actions of a view.
//------------------------------------------------------------------------------
module.exports = function () {
  function ViewController(view) {
    _classCallCheck(this, ViewController);

    this.view = view;
  }

  _createClass(ViewController, [{
    key: 'getView',
    value: function getView() {
      return this.view;
    }
  }]);

  return ViewController;
}();