'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function SelectionsBox(gameBoard) {
    var _this = this;

    _classCallCheck(this, SelectionsBox);

    this.gameBoard = gameBoard;
    console.log('Creating Selections Box');
    this.containerElem = document.createElement('div');
    this.containerElem.classList.add('selections-box');

    //--------------------------------------------------------------------------
    // Create the option buttons
    //--------------------------------------------------------------------------
    this.optionsContainerElem = document.createElement('div');
    this.optionsContainerElem.classList.add('options-container');
    this.containerElem.appendChild(this.optionsContainerElem);

    this.spacerElem = document.createElement('div');
    this.spacerElem.classList.add('spacer');
    this.spacerElem.textContent = 'X';
    this.optionsContainerElem.appendChild(this.spacerElem);

    this.removeBtnElem = document.createElement('div');
    this.removeBtnElem.classList.add('remove-btn');
    this.removeBtnElem.textContent = 'X';
    this.optionsContainerElem.appendChild(this.removeBtnElem);
    // this.removeBtnElem.addEventListener('mousedown', (e) => {
    this.removeBtnElem.addEventListener('touchstart', function (e) {
      _this.gameBoard.setSelectedTileValue(-1);
      _this.updateTileStyleStates();
    });

    this.STATE = {};
    this.STATE.ENABLED = 0;
    this.STATE.DISABLED = 1;

    //--------------------------------------------------------------------------
    // Create the selection tiles
    //--------------------------------------------------------------------------
    this.tilesContainerElem = document.createElement('div');
    this.tilesContainerElem.classList.add('tiles-container');
    this.containerElem.appendChild(this.tilesContainerElem);

    this.selectionTiles = [];

    var _loop = function _loop(i) {
      var tmpTile = document.createElement('div');
      tmpTile.classList.add('tile');
      if ((i + 1) % 2 == 0) {
        tmpTile.classList.add('even');
      } else {
        tmpTile.classList.add('odd');
      }
      tmpTile.numValue = i + 1;
      tmpTile.textContent = '' + tmpTile.numValue;
      _this.tilesContainerElem.appendChild(tmpTile);
      // tmpTile.addEventListener('mousedown', (e) => {
      tmpTile.addEventListener('touchstart', function (e) {
        if (!tmpTile.classList.contains('done')) {
          var isDone = _this.gameBoard.setSelectedTileValue(tmpTile.numValue);
          if (isDone) {
            tmpTile.classList.add('done');
          }
        }
      });
      _this.selectionTiles.push(tmpTile);
    };

    for (var i = 0; i < 9; i++) {
      _loop(i);
    }

    this.updateTileStyleStates();
  }

  _createClass(SelectionsBox, [{
    key: 'getElement',
    value: function getElement() {
      return this.containerElem;
    }
  }, {
    key: 'update',
    value: function update() {
      this.updateTileStyleStates();
    }
  }, {
    key: 'updateTileStyleStates',
    value: function updateTileStyleStates() {
      var doneVals = this.gameBoard.getCompletedValues();
      for (var i = 0; i < 9; i++) {
        var _tmpTile = this.selectionTiles[i];
        var found = false;
        for (var j = 0; j < doneVals.length; j++) {
          if (doneVals[j] == _tmpTile.numValue) {
            found = true;
          }
        }
        if (found) {
          this.setTileActiveState(_tmpTile.numValue, this.STATE.DISABLED);
        } else {
          this.setTileActiveState(_tmpTile.numValue, this.STATE.ENABLED);
        }
      }
    }
  }, {
    key: 'setTileActiveState',
    value: function setTileActiveState(tileValue, state) {
      if (state == this.STATE.ENABLED) {
        if (this.selectionTiles[tileValue - 1].classList.contains('done')) {
          this.selectionTiles[tileValue - 1].classList.remove('done');
        }
      } else if (state == this.STATE.DISABLED) {
        if (!this.selectionTiles[tileValue - 1].classList.contains('done')) {
          this.selectionTiles[tileValue - 1].classList.add('done');
        }
      }
    }
  }]);

  return SelectionsBox;
}();