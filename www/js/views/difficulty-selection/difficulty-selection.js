'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Debug = require('../../debug');
var MbSudoku = require('../../mb_sudoku');
var ViewController = require('../view-controller');
var DifficultySelectionView = require('./difficulty-selection-view');

var DEBUG = new Debug('DifficultySelection');

module.exports = function (_ViewController) {
  _inherits(DifficultySelection, _ViewController);

  function DifficultySelection() {
    _classCallCheck(this, DifficultySelection);

    // DEBUG.log('Loading.');

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DifficultySelection).call(this, new DifficultySelectionView()));

    _this.initDifficultySelectionButtonEvents();

    return _this;
  }

  /*
   *
   */

  _createClass(DifficultySelection, [{
    key: 'initDifficultySelectionButtonEvents',
    value: function initDifficultySelectionButtonEvents() {
      // DEBUG.log('initDifficultySelectionButtonEvents');

      // Easy Difficulty Selection Button
      this.getView().getEasyDifficultySelectionButton().getElement().addEventListener(TOUCH_START_EVENT, function () {
        DEBUG.log('Clicked Easy Difficulty Button');
        app.gameView.setDifficulty(MbSudoku.DIFFICULIES.EASY);
        app.showView(VIEW_ID.GAME);
      });

      // Simple Difficulty Selection Button
      this.getView().getSimpleDifficultySelectionButton().getElement().addEventListener(TOUCH_START_EVENT, function () {
        DEBUG.log('Clicked Simple Difficulty Button');
        app.gameView.setDifficulty(MbSudoku.DIFFICULIES.SIMPLE);
        app.showView(VIEW_ID.GAME);
      });

      // Intermediate Difficulty Selection Button
      this.getView().getIntermediateDifficultySelectionButton().getElement().addEventListener(TOUCH_START_EVENT, function () {
        DEBUG.log('Clicked Intermediate Difficulty Button');
        app.gameView.setDifficulty(MbSudoku.DIFFICULIES.INTERMEDIATE);
        app.showView(VIEW_ID.GAME);
      });

      // Expert Difficulty Selection Button
      this.getView().getExpertDifficultySelectionButton().getElement().addEventListener(TOUCH_START_EVENT, function () {
        DEBUG.log('Clicked Expert Difficulty Button');
        app.gameView.setDifficulty(MbSudoku.DIFFICULIES.EXPERT);
        app.showView(VIEW_ID.GAME);
      });
    }
  }]);

  return DifficultySelection;
}(ViewController);