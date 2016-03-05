'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Debug = require('../../../debug');
var CustomElement = require('../../custom-element');

var DEBUG = new Debug('GameboardTile');

var CSS_CLASSES = {
  GAMEBOARD_TILE: 'gameboard-tile',
  SELECTED: 'selected'
};

var TILE_IDS = [['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'], // row 1
['A4', 'A5', 'A6', 'B4', 'B5', 'B6', 'C4', 'C5', 'C6'], // row 2
['A7', 'A8', 'A9', 'B7', 'B8', 'B9', 'C7', 'C8', 'C9'], // row 3
['D1', 'D2', 'D3', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3'], // row 4
['D4', 'D5', 'D6', 'E4', 'E5', 'E6', 'F4', 'F5', 'F6'], // row 5
['D7', 'D8', 'D9', 'E7', 'E8', 'E9', 'F7', 'F8', 'F9'], // row 6
['G1', 'G2', 'G3', 'H1', 'H2', 'H3', 'I1', 'I2', 'I3'], // row 7
['G4', 'G5', 'G6', 'H4', 'H5', 'H6', 'I4', 'I5', 'I6'], // row 8
['G7', 'G8', 'G9', 'H7', 'H8', 'H9', 'I7', 'I8', 'I9']];

//------------------------------------------------------------------------------
// GameBoardTile is one of the tiles on the 9x9 gameboard grid.
//------------------------------------------------------------------------------
// row 9
module.exports = function (_CustomElement) {
  _inherits(GameboardTile, _CustomElement);

  function GameboardTile(x, y) {
    _classCallCheck(this, GameboardTile);

    // DEBUG.log('Loading');

    //

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GameboardTile).call(this, CSS_CLASSES.GAMEBOARD_TILE));

    _this.tileId = TILE_IDS[x][y];

    //
    _this.isSelectedBool = false;

    //
    _this.setValue(0);

    //
    _this.setIsOriginal(false);

    //
    _this.setIsSameValue(false);

    //
    _this.setHasConflict(false);

    return _this;
  }

  /*
   *
   */

  _createClass(GameboardTile, [{
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
      if (this.isSelected() === true) {
        this.addClass(CSS_CLASSES.SELECTED);
      } else {
        this.removeClass(CSS_CLASSES.SELECTED);
      }
      this.getElement().style.fontSize = this.getHeight() * 0.8 + 'px';

      //
      // TODO: Organize this logic
      if (this.isEmpty()) {
        this.getElement().style.color = 'rgba(0,0,0,0)';
        // this.getElement().style.color = 'rgba(255,255,255,1)';
        if (this.isSelected()) {
          this.getElement().style.borderColor = 'rgba(0,200,100,1)';
        } else {
          this.getElement().style.borderColor = 'rgba(0,150,190,1)';
        }
      } else {
        if (this.isOriginal()) {
          this.getElement().style.color = 'rgba(0,120,190,1)';
          if (this.isSelected()) {
            if (this.hasConflict()) {
              this.getElement().style.borderColor = 'rgba(200,50,50,1)';
            } else {
              this.getElement().style.borderColor = 'rgba(0,200,100,1)';
            }
          } else {
            if (this.hasConflict()) {
              this.getElement().style.borderColor = 'rgba(200,100,100,1)';
            } else {
              if (this.isSameValue()) {
                this.getElement().style.borderColor = 'rgba(0,200,140,1)';
              } else {
                this.getElement().style.borderColor = 'rgba(0,150,190,1)';
              }
            }
          }
        } else {
          this.getElement().style.color = 'rgba(0,150,190,1)';
          if (this.isSelected()) {
            if (this.hasConflict()) {
              this.getElement().style.borderColor = 'rgba(200,50,50,1)';
            } else {
              this.getElement().style.borderColor = 'rgba(0,200,100,1)';
            }
          } else {
            if (this.hasConflict()) {
              this.getElement().style.borderColor = 'rgba(200,100,100,1)';
            } else {
              if (this.isSameValue()) {
                this.getElement().style.borderColor = 'rgba(0,200,140,1)';
              } else {
                this.getElement().style.borderColor = 'rgba(0,150,190,1)';
              }
            }
          }
        }
      }
    }

    /*
     * Returns a unique identifier for the tile based on its position in the grid.
     */

  }, {
    key: 'getTileId',
    value: function getTileId() {
      return this.tileId;
    }

    /*
     *
     */

  }, {
    key: 'setSelected',
    value: function setSelected(b) {
      this.isSelectedBool = b;
    }

    /*
     *
     */

  }, {
    key: 'isSelected',
    value: function isSelected() {
      return this.isSelectedBool;
    }

    /*
     *
     */

  }, {
    key: 'setValue',
    value: function setValue(v) {
      // DEBUG.log('Setting value: '+v);
      // // let possibleTileValues = ['1','2','3','4','5','6','7','8','9'];
      // let possibleTileValues = '123456789';
      // if(possibleTileValues.indexOf(v) != -1){
      //   DEBUG.log('Not a value value');
      //   v = '0';
      // }
      // DEBUG.log('Done checking valid');
      // if(v === '.'){
      //   v = '0';
      // }

      this.value = v + '';
      this.getElement().setAttribute('value', this.getValue());
      this.getElement().innerHTML = '' + this.getValue();
      if (this._onValueChange !== undefined) {
        this._onValueChange();
      }
      // DEBUG.log('Done setting value');
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
    key: 'setIsOriginal',
    value: function setIsOriginal(b) {
      this.isOriginalBool = b;
      this.getElement().setAttribute('original', b);
    }

    /*
     * Returns true if this tile contains a value from the gameboard generation.
     * Original values can't be changed.
     */

  }, {
    key: 'isOriginal',
    value: function isOriginal() {
      return this.isOriginalBool;
    }

    /*
     * Returns whether the tile has a value set.
     * A value of 0 is used to represent an unset tile.
     */

  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      return this.value + '' === 0 + '';
    }

    /*
     * Called when this tiles value is changed
     * Note: This is not an actual event right now.
     *       Its purpose currently is just a way to add a function to the
     *       setValue function outside this class.
     */

  }, {
    key: 'setOnValueChangeEvent',
    value: function setOnValueChangeEvent(func) {
      this._onValueChange = func;
    }

    /*
     *
     */

  }, {
    key: 'setIsSameValue',
    value: function setIsSameValue(b) {
      this.isSameValueBool = b;
      this.getElement().setAttribute('samevalue', this.isSameValue());
    }

    /*
     *
     */

  }, {
    key: 'isSameValue',
    value: function isSameValue() {
      return this.isSameValueBool;
    }

    /*
     *
     */

  }, {
    key: 'setHasConflict',
    value: function setHasConflict(b) {
      this.hasConflictBool = b;
    }

    /*
     *
     */

  }, {
    key: 'hasConflict',
    value: function hasConflict() {
      return this.hasConflictBool;
    }
  }]);

  return GameboardTile;
}(CustomElement);