'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function Debug(debugId) {
    _classCallCheck(this, Debug);

    this.debugId = debugId;
  }

  _createClass(Debug, [{
    key: 'getMessagePrefix',
    value: function getMessagePrefix() {
      return '[' + this.debugId + ']: ';
    }
  }, {
    key: 'log',
    value: function log(msg) {
      console.log(this.getMessagePrefix() + msg);
    }
  }, {
    key: 'error',
    value: function error(msg) {
      console.error(this.getMessagePrefix() + msg);
    }
  }]);

  return Debug;
}();