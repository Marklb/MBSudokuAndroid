module.exports =
class GameTopBox {
  constructor(gameBoard) {
    this.gameBoard = gameBoard;
    console.log('Creating Game Top Box');
    this.containerElem = document.createElement('div');
    this.containerElem.classList.add('game-top-box');


    this.menuButtonElem = document.createElement('div');
    this.menuButtonElem.classList.add('menu-btn');
    this.menuButtonElem.textContent = "X";
    this.containerElem.appendChild(this.menuButtonElem);
    // this.menuButtonElem.addEventListener('mousedown', (e) => {
    this.menuButtonElem.addEventListener('touchstart', (e) => {
      // this.gameBoard.newGame();
      // let solution = this.gameBoard.getSolution();
      // console.log(solution);
      app.showView(VIEW_ID.MAIN_MENU);
    });

    this.titleElem = document.createElement('div');
    this.titleElem.classList.add('title');
    this.titleElem.textContent = "MB Sudoku";
    this.containerElem.appendChild(this.titleElem);

    this.resetBtnElem = document.createElement('div');
    this.resetBtnElem.classList.add('reset-btn');
    this.resetBtnElem.textContent = "X";
    this.containerElem.appendChild(this.resetBtnElem);
    // this.resetBtnElem.addEventListener('mousedown', (e) => {
    this.resetBtnElem.addEventListener('touchstart', (e) => {
      this.gameBoard.newGame();
    });



  }

  getElement(){
    return this.containerElem;
  }



}
