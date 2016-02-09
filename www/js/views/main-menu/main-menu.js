'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Debug = require('../../debug');
var ViewController = require('../view-controller');
var MainMenuView = require('./main-menu-view');

var DEBUG = new Debug('MainMenu');

module.exports = function (_ViewController) {
  _inherits(MainMenu, _ViewController);

  function MainMenu() {
    _classCallCheck(this, MainMenu);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MainMenu).call(this, new MainMenuView()));

    DEBUG.log('Loading.');

    _this.initPlayButtonEvents();

    return _this;
  }

  /*
   *
   */

  _createClass(MainMenu, [{
    key: 'initPlayButtonEvents',
    value: function initPlayButtonEvents() {
      DEBUG.log('initPlayButtonEvents');
      console.log(this.getView().getPlayButton().getElement());
      this.getView().getPlayButton().getElement().addEventListener(TOUCH_START_EVENT, function () {
        DEBUG.log('Clicked Play Button');
        app.showView(VIEW_ID.GAME);
      });
      console.log(this.getView().getPlayButton().getElement());
    }
  }]);

  return MainMenu;
}(ViewController);