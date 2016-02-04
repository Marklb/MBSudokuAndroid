'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function GameBoardTile(gameBoard, row, column) {
    var _this = this;

    _classCallCheck(this, GameBoardTile);

    this.gameBoard = gameBoard;
    this.containerElem = document.createElement('div');
    this.containerElem.classList.add('tile');

    this.row = row;
    this.column = column;

    this.VALUE_STATES = {};
    this.VALUE_STATES.EMPTY = 0;
    this.VALUE_STATES.ORIGINAL = 1;
    this.VALUE_STATES.REGULAR = 2;

    this.VALUE_STATES_CLASSES = [];
    this.VALUE_STATES_CLASSES[this.VALUE_STATES.EMPTY] = 'empty-value';
    this.VALUE_STATES_CLASSES[this.VALUE_STATES.ORIGINAL] = 'original-value';
    this.VALUE_STATES_CLASSES[this.VALUE_STATES.REGULAR] = 'regular-value';
    this.currValState = this.VALUE_STATES.EMPTY;
    this.containerElem.classList.add(this.VALUE_STATES_CLASSES[this.currValState]);
    // If value is -1 then it is blank
    this.setValue(-1);

    this.STYLE_STATES = {};
    this.STYLE_STATES.BASIC = 0;
    this.STYLE_STATES.SAME_VALUE = 1;
    this.STYLE_STATES.CONFLICTING_VALUE = 2;

    this.STYLE_STATES_CLASSES = {};
    this.STYLE_STATES_CLASSES[this.STYLE_STATES.BASIC] = 'style-state-basic';
    this.STYLE_STATES_CLASSES[this.STYLE_STATES.SAME_VALUE] = 'style-state-same-value';
    this.STYLE_STATES_CLASSES[this.STYLE_STATES.CONFLICTING_VALUE] = 'style-state-conflicting-value';

    // this.containerElem.addEventListener('mousedown', () => {
    this.containerElem.addEventListener('touchstart', function () {
      _this.gameBoard.setSelectedTile(_this.row, _this.column);
    });
    // this.containerElem.addEventListener('touchstart', () => {
    //   this.gameBoard.setSelectedTile(this.row, this.column);
    // });
  }

  _createClass(GameBoardTile, [{
    key: 'getElement',
    value: function getElement() {
      return this.containerElem;
    }
  }, {
    key: 'getRowIndex',
    value: function getRowIndex() {
      return this.row;
    }
  }, {
    key: 'getColumnIndex',
    value: function getColumnIndex() {
      return this.column;
    }
  }, {
    key: 'setSelected',
    value: function setSelected(b) {
      if (b) {
        this.containerElem.classList.add('selected');
      } else {
        this.containerElem.classList.remove('selected');
      }
    }
  }, {
    key: 'setValue',
    value: function setValue(val) {
      var isOriginal = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      // console.log("Setting: "+val);
      var tmpValState = this.currValState;
      this.value = val;
      this.containerElem.textContent = '' + this.value;

      if (this.value == -1) {
        this.currValState = this.VALUE_STATES.EMPTY;
      } else {
        if (isOriginal) {
          this.currValState = this.VALUE_STATES.ORIGINAL;
        } else {
          this.currValState = this.VALUE_STATES.REGULAR;
        }
      }

      if (this.currValState != tmpValState) {
        this.containerElem.classList.remove(this.VALUE_STATES_CLASSES[tmpValState]);
      }
      if (!this.containerElem.classList.contains(this.VALUE_STATES_CLASSES[this.currValState])) {
        this.containerElem.classList.add(this.VALUE_STATES_CLASSES[this.currValState]);
      }
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.value;
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      return this.value == -1;
    }
  }, {
    key: 'isOriginal',
    value: function isOriginal() {
      return this.currValState == this.VALUE_STATES.ORIGINAL;
    }
  }, {
    key: 'setStyleState',
    value: function setStyleState(state) {
      if (!this.currStyleState) {
        this.currStyleState = this.STYLE_STATES.BASIC;
        this.containerElem.classList.add(this.STYLE_STATES_CLASSES[this.currStyleState]);
      }
      if (this.currStyleState != state) {
        this.containerElem.classList.remove(this.STYLE_STATES_CLASSES[this.currStyleState]);
        this.currStyleState = state;
        this.containerElem.classList.add(this.STYLE_STATES_CLASSES[this.currStyleState]);
      }
    }
  }, {
    key: 'setTilesInBlock',
    value: function setTilesInBlock(tiles) {
      this.tilesInBlock = tiles;
    }
  }, {
    key: 'getTilesInBlock',
    value: function getTilesInBlock() {
      return this.tilesInBlock;
    }
  }]);

  return GameBoardTile;
}();