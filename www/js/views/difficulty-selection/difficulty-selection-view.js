'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Debug = require('../../debug');
var View = require('../view');

var DifficulySelectionButton = require('./elements/difficulty-selection-button');

var DEBUG = new Debug('DifficultySelectionView');

var CSS_CLASSES = {
  DIFFICULTY_SELECTION_VIEW: 'difficulty-selection-view'
};

module.exports = function (_View) {
  _inherits(DifficultySelectionView, _View);

  function DifficultySelectionView() {
    _classCallCheck(this, DifficultySelectionView);

    // DEBUG.log('Loading');

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DifficultySelectionView).call(this, VIEW_ID.DIFFICULY_SELECTION));

    _this.addClass(CSS_CLASSES.DIFFICULTY_SELECTION_VIEW);

    _this.initEasyDifficultySelectionButton();
    _this.initSimpleDifficultySelectionButton();
    _this.initIntermediateDifficultySelectionButton();
    _this.initExpertDifficultySelectionButton();

    return _this;
  }

  /*
   *
   */

  _createClass(DifficultySelectionView, [{
    key: 'initEasyDifficultySelectionButton',
    value: function initEasyDifficultySelectionButton() {
      this.easyDifficultyButton = new DifficulySelectionButton();
      this.addElement(this.getEasyDifficultySelectionButton().getElement());
      this.getEasyDifficultySelectionButton().setValue('Easy');
      this.getEasyDifficultySelectionButton().setSize(this.getWidth() - 30, 40);
      this.getEasyDifficultySelectionButton().setPosition(15, 5);
      this.getEasyDifficultySelectionButton().update();
    }

    /*
     *
     */

  }, {
    key: 'getEasyDifficultySelectionButton',
    value: function getEasyDifficultySelectionButton() {
      return this.easyDifficultyButton;
    }

    /*
     *
     */

  }, {
    key: 'initSimpleDifficultySelectionButton',
    value: function initSimpleDifficultySelectionButton() {
      this.simpleDifficultyButton = new DifficulySelectionButton();
      this.addElement(this.getSimpleDifficultySelectionButton().getElement());
      this.getSimpleDifficultySelectionButton().setValue('Simple');
      this.getSimpleDifficultySelectionButton().setSize(this.getWidth() - 30, 40);
      this.getSimpleDifficultySelectionButton().setPosition(15, this.getEasyDifficultySelectionButton().getY() + this.getEasyDifficultySelectionButton().getHeight() + 10);
      this.getSimpleDifficultySelectionButton().update();
    }

    /*
     *
     */

  }, {
    key: 'getSimpleDifficultySelectionButton',
    value: function getSimpleDifficultySelectionButton() {
      return this.simpleDifficultyButton;
    }

    /*
     *
     */

  }, {
    key: 'initIntermediateDifficultySelectionButton',
    value: function initIntermediateDifficultySelectionButton() {
      this.intermediateDifficultyButton = new DifficulySelectionButton();
      this.addElement(this.getIntermediateDifficultySelectionButton().getElement());
      this.getIntermediateDifficultySelectionButton().setValue('Intermediate');
      this.getIntermediateDifficultySelectionButton().setSize(this.getWidth() - 30, 40);
      this.getIntermediateDifficultySelectionButton().setPosition(15, this.getSimpleDifficultySelectionButton().getY() + this.getSimpleDifficultySelectionButton().getHeight() + 10);
      this.getIntermediateDifficultySelectionButton().update();
    }

    /*
     *
     */

  }, {
    key: 'getIntermediateDifficultySelectionButton',
    value: function getIntermediateDifficultySelectionButton() {
      return this.intermediateDifficultyButton;
    }

    /*
     *
     */

  }, {
    key: 'initExpertDifficultySelectionButton',
    value: function initExpertDifficultySelectionButton() {
      this.expertDifficultyButton = new DifficulySelectionButton();
      this.addElement(this.getExpertDifficultySelectionButton().getElement());
      this.getExpertDifficultySelectionButton().setValue('Expert');
      this.getExpertDifficultySelectionButton().setSize(this.getWidth() - 30, 40);
      this.getExpertDifficultySelectionButton().setPosition(15, this.getIntermediateDifficultySelectionButton().getY() + this.getIntermediateDifficultySelectionButton().getHeight() + 10);
      this.getExpertDifficultySelectionButton().update();
    }

    /*
     *
     */

  }, {
    key: 'getExpertDifficultySelectionButton',
    value: function getExpertDifficultySelectionButton() {
      return this.expertDifficultyButton;
    }
  }]);

  return DifficultySelectionView;
}(View);