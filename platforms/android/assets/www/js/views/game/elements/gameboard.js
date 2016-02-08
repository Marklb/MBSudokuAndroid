'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Debug = require('../../../debug');
var CustomElement = require('../../custom-element');
var GameboardTile = require('./gameboard-tile');

var DEBUG = new Debug('Gameboard');

var CSS_CLASSES = {
  GAMEBOARD: 'gameboard'
};

var PADDING = {
  LEFT: 4,
  RIGHT: 4,
  TOP: 4,
  BOTTOM: 4,
  INNER: 4
};

var BLOCK_BORDER_SIZE = 4;

//------------------------------------------------------------------------------
// GameBoard is the grid containing the played tiles.
//------------------------------------------------------------------------------
module.exports = function (_CustomElement) {
  _inherits(Gameboard, _CustomElement);

  function Gameboard(game) {
    _classCallCheck(this, Gameboard);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Gameboard).call(this, CSS_CLASSES.GAMEBOARD));

    DEBUG.log('Loading.');

    // Array containing the tiles on the 9x9 grid
    _this.tiles = [];

    return _this;
  }

  /*
   * Update anything dynamically handled by the gameboard.
   */

  _createClass(Gameboard, [{
    key: 'update',
    value: function update() {
      this.updateTilePositions();
      this.updateTileStyles();
    }

    /*
     *
     */

  }, {
    key: 'updateTilePositions',
    value: function updateTilePositions() {
      var tileSize = (this.getWidth() - BLOCK_BORDER_SIZE * 2 - PADDING.LEFT - PADDING.RIGHT - 8 * PADDING.INNER - BLOCK_BORDER_SIZE * 2) / 9;

      var i = 0;
      for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
          //
          var rowBlockOffset = 0;
          if (row === 3 || row === 4 || row === 5) {
            rowBlockOffset = BLOCK_BORDER_SIZE;
          }
          if (row === 6 || row === 7 || row === 8) {
            rowBlockOffset = BLOCK_BORDER_SIZE * 2;
          }
          //
          var colBlockOffset = 0;
          if (col === 3 || col === 4 || col === 5) {
            colBlockOffset = BLOCK_BORDER_SIZE;
          }
          if (col === 6 || col === 7 || col === 8) {
            colBlockOffset = BLOCK_BORDER_SIZE * 2;
          }
          //
          this.tiles[i].setPosition(this.getX() + BLOCK_BORDER_SIZE + PADDING.LEFT + row * tileSize + row * PADDING.INNER + rowBlockOffset, // X
          this.getY() + BLOCK_BORDER_SIZE + PADDING.TOP + col * tileSize + col * PADDING.INNER + colBlockOffset // Y
          );
          //
          this.tiles[i].setSize(tileSize, tileSize);
          //
          i++;
        }
      }
    }

    /*
     *
     */

  }, {
    key: 'updateTileStyles',
    value: function updateTileStyles() {
      for (var i = 0; i < this.getTiles().length; i++) {
        this.getTiles()[i].updateStyles();
      }
    }

    /*
     * Add a tile to the gameboard.
     * A tile is one of the squares on the 9x9 gameboard.
     */

  }, {
    key: 'addTile',
    value: function addTile(tile) {
      if (tile instanceof GameboardTile) {
        // Check if the tile being added already exists
        for (var i = 0; i < this.tiles.length; i++) {
          if (this.tiles[i].getTileId() === tile.getTileId()) {
            DEBUG.error('Tile: ' + tile.getTileId() + ' is already added.');
            return;
          }
        }
        // Add the tile to the tiles array.
        this.tiles.push(tile);
      } else {
        DEBUG.error('tile is not of type GameboardTile.');
      }
    }

    /*
     *
     */

  }, {
    key: 'getTiles',
    value: function getTiles() {
      return this.tiles;
    }
  }]);

  return Gameboard;
}(CustomElement);