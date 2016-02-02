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

    this.titleElem = document.createElement('div');
    this.titleElem.classList.add('title');
    this.titleElem.textContent = "MB Sudoku";
    this.containerElem.appendChild(this.titleElem);

    this.resetBtnElem = document.createElement('div');
    this.resetBtnElem.classList.add('reset-btn');
    this.resetBtnElem.textContent = "X";
    this.containerElem.appendChild(this.resetBtnElem);
    this.resetBtnElem.addEventListener('mousedown', (e) => {
      this.gameBoard.newGame();
    });



  }

  getElement(){
    return this.containerElem;
  }



}
