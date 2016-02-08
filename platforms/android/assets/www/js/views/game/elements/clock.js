'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Debug = require('../../../debug');
var CustomElement = require('../../custom-element');

var DEBUG = new Debug('Clock');

var CSS_CLASSES = {
  CLOCK: 'clock'
};

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------
module.exports = function (_CustomElement) {
  _inherits(CLOCK, _CustomElement);

  function CLOCK() {
    _classCallCheck(this, CLOCK);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CLOCK).call(this, CSS_CLASSES.CLOCK));

    DEBUG.log('Loading');

    return _this;
  }

  /*
   *
   */

  _createClass(CLOCK, [{
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
    }

    /*
     *
     */

  }, {
    key: 'setValue',
    value: function setValue(v) {
      this.value = v;
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
    key: 'setTime',
    value: function setTime(t) {
      var SECONDS = 1000;
      var MINUTES = SECONDS * 60;
      var HOURS = MINUTES * 60;
      var DAYS = HOURS * 24;
      var YEARS = DAYS * 365;

      //  t = t/SECONDS;
      //  let seconds = Math.round(t % 60);
      //  let minutes = Math.round((t / 60) % 60);
      //  let hours = Math.round((t / (60 * 60)) % 24);
      var d = new Date(t);
      var seconds = d.getSeconds();
      var minutes = d.getMinutes();
      // let hours = d.getHours();

      var secStr = "" + seconds;
      if (seconds < 10) {
        secStr = "0" + seconds;
      }
      var minStr = "" + minutes;
      if (minutes < 10) {
        minStr = "0" + minutes;
      }
      //  let hourStr = ""+hours;
      //  if(hours<10){hourStr = "0"+hours;}

      //  this.setValue(hourStr+":"+minStr+":"+secStr);
      this.setValue(minStr + ":" + secStr);
    }
  }]);

  return CLOCK;
}(CustomElement);