'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var View = require('./view');

var DEBUG_PREFIX = '[MainMenu]: ';

module.exports = function (_View) {
  _inherits(MainMenu, _View);

  function MainMenu() {
    _classCallCheck(this, MainMenu);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MainMenu).call(this, VIEW_ID.MAIN_MENU));

    _this.containerElem = document.createElement('div');
    _this.containerElem.classList.add('main-menu-container');
    _this.addElement(_this.getElement());

    _this.mainMenuContainer = document.createElement('div');
    _this.mainMenuContainer.classList.add('main-menu');
    _this.getElement().appendChild(_this.mainMenuContainer);

    _this.initTitle();
    _this.initButtons();

    return _this;
  }

  _createClass(MainMenu, [{
    key: 'getElement',
    value: function getElement() {
      return this.containerElem;
    }

    /*
     * Title
     */

  }, {
    key: 'initTitle',
    value: function initTitle() {
      if (!this.titleElem) {
        this.titleElem = document.createElement('div');
        this.titleElem.classList.add('title');
        this.mainMenuContainer.appendChild(this.getTitleElem());
      }
      this.setTitle('MB Sudoku');
    }
  }, {
    key: 'getTitleElem',
    value: function getTitleElem() {
      return this.titleElem;
    }
  }, {
    key: 'setTitle',
    value: function setTitle(title) {
      this.getTitleElem().innerHTML = title;
    }

    /*
     * Buttons
     */

  }, {
    key: 'initButtons',
    value: function initButtons() {
      if (this.buttons === undefined) {
        this.buttons = [];
        this.buttonsContainer = document.createElement('div');
        this.buttonsContainer.classList.add('buttons-container');
        this.mainMenuContainer.appendChild(this.buttonsContainer);
      }
      this.initPlayButton();
      this.initStatsButton();
    }
  }, {
    key: 'getButtonsContainer',
    value: function getButtonsContainer() {
      if (this.buttonsContainer === undefined) {
        console.log(DEBUG_PREFIX + 'Buttons container undefined.');
      }
      return this.buttonsContainer;
    }
  }, {
    key: 'addButton',
    value: function addButton(btn) {
      this.buttons.push(btn);
      this.getButtonsContainer().appendChild(btn);
    }
  }, {
    key: 'createButton',
    value: function createButton(buttonName) {
      var btn = document.createElement('div');
      btn.classList.add('btn');
      btn.innerHTML = buttonName;
      return btn;
    }

    /*
     * Play Button
     */

  }, {
    key: 'initPlayButton',
    value: function initPlayButton() {
      if (this.startButton === undefined) {
        this.startButton = this.createButton('Play');
        this.addButton(this.startButton);
        // this.startButton.addEventListener('mousedown', (e) => {
        this.startButton.addEventListener('touchstart', function (e) {
          app.showView(VIEW_ID.GAME);
        });
      }
    }

    /*
     * Stats Button
     */

  }, {
    key: 'initStatsButton',
    value: function initStatsButton() {
      if (this.statsButton === undefined) {
        this.statsButton = this.createButton('Stats');
        this.addButton(this.statsButton);
      }
    }
  }]);

  return MainMenu;
}(View);