let Debug = require('../../../debug');

let DEBUG = new Debug('GameBoard');

const CSS_CLASSES = {
  GAME_BOARD: 'game-board'
};

//------------------------------------------------------------------------------
// GameBoard is the grid containing the played tiles.
//------------------------------------------------------------------------------
module.exports =
class Gameboard {
  constructor(game) {
    DEBUG.log('Loading.');
    this.elem = document.createElement('div');
    this.elem.classList.add(CSS_CLASSES.GAME_BOARD);


  }

  /*
   * Return the gameboard base element.
   */
  getElement(){
    return this.elem;
  }

  /*
   * Update anything dynamically handled by the gameboard.
   */
  update(){

  }

  /*
   * Sets the X and Y coordinates of the gameboard.
   */
  setPosition(x, y){
    this.setX(x);
    this.setY(y);
  }

  /*
   * Set position from the left.
   */
  setX(x){
    this.x = x;
  }

  /*
   * Get the position from the left.
   */
  getX(){
    return this.x;
  }

  /*
   * Set the position from the top.
   */
  setY(y){
    this.y = y;
  }

  /*
   * Get the position from the top.
   */
  getY(){
    return this.y;
  }

  /*
   * Set the width and height of the gameboard.
   */
  setSize(w, h){
    this.setWidth(w);
    this.setHeight(h);
  }

  /*
   * Set the width of the gameboard.
   */
  setWidth(w){
    this.w = w;
  }

  /*
   * Get the width of the gameboard.
   */
  getWidth(){
    return this.getWidth();
  }

  /*
   * Set the height of the gameboard.
   */
  setHeight(h){
    this.h = h;
  }

  /*
   * Get the height of the gameboard.
   */
  getHeight(){
    return this.h;
  }





}
