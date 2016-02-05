let Debug = require('../../debug');
let GameView = require('./game-view');

let DEBUG = new Debug('Game');

module.exports =
class Game {
  constructor() {
    DEBUG.log('Loading.');
    this.view = new GameView();
  }

  getView(){
    return this.view;
  }

}
