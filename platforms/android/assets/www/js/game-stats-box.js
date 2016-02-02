'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function GameStatsBox(gameBoard) {
    var _this = this;

    _classCallCheck(this, GameStatsBox);

    this.gameBoard = gameBoard;
    console.log('Creating Game Stats Box');
    this.containerElem = document.createElement('div');
    this.containerElem.classList.add('game-stats-box');

    this.menuButtonElem = document.createElement('div');
    this.menuButtonElem.classList.add('left');
    this.menuButtonElem.textContent = "X";
    this.containerElem.appendChild(this.menuButtonElem);

    this.titleElem = document.createElement('div');
    this.titleElem.classList.add('timer');
    this.titleElem.textContent = "00:00:00";
    this.containerElem.appendChild(this.titleElem);

    this.resetBtnElem = document.createElement('div');
    this.resetBtnElem.classList.add('right');
    this.resetBtnElem.textContent = "X";
    this.containerElem.appendChild(this.resetBtnElem);

    setInterval(function () {
      var timeElapsed = JSON.parse(window.localStorage.getItem("timeElapsed"));
      if (timeElapsed) {
        _this.setTime(timeElapsed);
      } else {
        _this.setTime(0);
      }
    }, 1000);
  }

  _createClass(GameStatsBox, [{
    key: 'getElement',
    value: function getElement() {
      return this.containerElem;
    }
  }, {
    key: 'setTime',
    value: function setTime(t) {
      var SECONDS = 1000;
      var MINUTES = SECONDS * 60;
      var HOURS = MINUTES * 60;
      var DAYS = HOURS * 24;
      var YEARS = DAYS * 365;

      t = t / SECONDS;
      var seconds = Math.round(t % 60);
      var minutes = Math.round(t / 60 % 60);
      var hours = Math.round(t / (60 * 60) % 24);

      var secStr = "" + seconds;
      if (seconds < 10) {
        secStr = "0" + seconds;
      }
      var minStr = "" + minutes;
      if (minutes < 10) {
        minStr = "0" + minutes;
      }
      var hourStr = "" + hours;
      if (hours < 10) {
        hourStr = "0" + hours;
      }

      this.titleElem.textContent = hourStr + ":" + minStr + ":" + secStr;
    }
  }]);

  return GameStatsBox;
}();