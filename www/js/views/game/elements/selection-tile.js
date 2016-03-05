'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Debug = require('../../../debug');
var CustomElement = require('../../custom-element');

var DEBUG = new Debug('SelectionTile');

var CSS_CLASSES = {
  SELECTION_TILE: 'selection-tile'
};

//------------------------------------------------------------------------------
// SelectionTile is one of the 9 tiles under the gameboard to add a tile to
// the gameboard.
//------------------------------------------------------------------------------
module.exports = function (_CustomElement) {
  _inherits(SelectionTile, _CustomElement);

  function SelectionTile(x, y) {
    _classCallCheck(this, SelectionTile);

    // DEBUG.log('Loading');

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SelectionTile).call(this, CSS_CLASSES.SELECTION_TILE));

    _this.setDone(false);

    return _this;
  }

  /*
   *
   */

  _createClass(SelectionTile, [{
    key: 'update',
    value: function update() {
      this.updateStyles();
    }

    /*
     *
     */

  }, {
    key: 'updateStyles',
    value: function updateStyles() {
      this.getElement().style.fontSize = this.getHeight() * 0.8 + 'px';
      if (this.isDone()) {
        this.getElement().style.opacity = '0';
      } else {
        this.getElement().style.opacity = '1';
      }
    }

    /*
     *
     */

  }, {
    key: 'setValue',
    value: function setValue(v) {
      this.value = v + '';
      this.getElement().setAttribute('value', this.getValue());
      this.getElement().innerHTML = '' + this.getValue();
    }

    /*
     *
     */

  }, {
    key: 'getValue',
    value: function getValue() {
      return this.value;
    }

    /*
     *
     */

  }, {
    key: 'setDone',
    value: function setDone(b) {
      this.isDoneBool = b;
    }

    /*
     *
     */

  }, {
    key: 'isDone',
    value: function isDone() {
      return this.isDoneBool;
    }
  }]);

  return SelectionTile;
}(CustomElement);