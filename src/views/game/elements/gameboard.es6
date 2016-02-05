let Debug = require('../../../debug');

let DEBUG = new Debug('GameBoard');

const CSS_CLASSES = {
  GAME_BOARD: 'game-board'
};

//------------------------------------------------------------------------------
// GameBoard is the grid containing the played tiles.
//------------------------------------------------------------------------------
module.exports =
class GameBoard {
  constructor(game) {
    DEBUG.log('Loading.');
    this.elem = document.createElement('div');
    this.elem.classList.add(CSS_CLASSES.GAME_BOARD);


  }

  getElement(){
    return this.elem;
  }

  setPosition(x, y){
    this.setX(x);
    this.setY(y);
  }

  setX(x){
    this.x = x;
  }

  getX(){
    return this.x;
  }

  setY(y){
    this.y = y;
  }

  getY(){
    return this.y;
  }

  setSize(w, h){
    this.setWidth(w);
    this.setHeight(h);
  }

  setWidth(w){
    this.w = w;
  }

  getWidth(){
    return this.getWidth();
  }

  setHeight(h){
    this.h = h;
  }

  getHeight(){
    return this.h;
  }





}
