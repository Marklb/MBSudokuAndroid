'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Debug = require('../../debug');
var View = require('../view');

var MainMenuTitle = require('./elements/main-menu-title');
var MainMenuButton = require('./elements/main-menu-button');

var DEBUG = new Debug('MainMenuView');

var CSS_CLASSES = {
  MAIN_MENU_VIEW: 'main-menu-view'
};

module.exports = function (_View) {
  _inherits(GameView, _View);

  function GameView() {
    _classCallCheck(this, GameView);

    // DEBUG.log('Loading');

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GameView).call(this, VIEW_ID.MAIN_MENU));

    _this.addClass(CSS_CLASSES.MAIN_MENU_VIEW);

    _this.initMainMenuTitle();
    _this.initPlayButton();
    _this.initStatsButton();
    _this.initOptionsButton();

    return _this;
  }

  /*
   *
   */

  _createClass(GameView, [{
    key: 'initMainMenuTitle',
    value: function initMainMenuTitle() {
      this.mainMenuTitle = new MainMenuTitle();
      this.addElement(this.getMainMenuTitle().getElement());
      this.getMainMenuTitle().setValue('MB Sudoku');
      this.getMainMenuTitle().setSize(this.getWidth() - 10, 50);
      this.getMainMenuTitle().setPosition(5, 5);
      this.getMainMenuTitle().update();
    }

    /*
     *
     */

  }, {
    key: 'getMainMenuTitle',
    value: function getMainMenuTitle() {
      return this.mainMenuTitle;
    }

    /*
     *
     */

  }, {
    key: 'initPlayButton',
    value: function initPlayButton() {
      this.playButton = new MainMenuButton();
      this.addElement(this.getPlayButton().getElement());
      this.getPlayButton().setValue('Play');
      this.getPlayButton().setSize(this.getWidth() - 30, 40);
      this.getPlayButton().setPosition(15, this.getMainMenuTitle().getY() + this.getMainMenuTitle().getHeight() + 10);
      this.getPlayButton().update();
    }

    /*
     *
     */

  }, {
    key: 'getPlayButton',
    value: function getPlayButton() {
      return this.playButton;
    }

    /*
     *
     */

  }, {
    key: 'initStatsButton',
    value: function initStatsButton() {
      this.statsButton = new MainMenuButton();
      this.addElement(this.getStatsButton().getElement());
      this.getStatsButton().setValue('Stats');
      this.getStatsButton().setSize(this.getWidth() - 30, 40);
      this.getStatsButton().setPosition(15, this.getPlayButton().getY() + this.getPlayButton().getHeight() + 10);
      this.getStatsButton().update();
    }

    /*
     *
     */

  }, {
    key: 'getStatsButton',
    value: function getStatsButton() {
      return this.statsButton;
    }

    /*
     *
     */

  }, {
    key: 'initOptionsButton',
    value: function initOptionsButton() {
      this.optionsButton = new MainMenuButton();
      this.addElement(this.getOptionsButton().getElement());
      this.getOptionsButton().setValue('Options');
      this.getOptionsButton().setSize(this.getWidth() - 30, 40);
      this.getOptionsButton().setPosition(15, this.getStatsButton().getY() + this.getStatsButton().getHeight() + 10);
      this.getOptionsButton().update();
    }

    /*
     *
     */

  }, {
    key: 'getOptionsButton',
    value: function getOptionsButton() {
      return this.optionsButton;
    }
  }]);

  return GameView;
}(View);