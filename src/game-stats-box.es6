module.exports =
class GameStatsBox {
  constructor(gameBoard) {
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


    setInterval(() => {
      let timeElapsed = JSON.parse(window.localStorage.getItem("timeElapsed"));
      if(timeElapsed){
        this.setTime(timeElapsed);
      }else{
        this.setTime(0);
      }
    },1000);

  }

  getElement(){
    return this.containerElem;
  }

  setTime(t){
    let SECONDS = 1000;
    let MINUTES = SECONDS * 60;
    let HOURS = MINUTES * 60;
    let DAYS = HOURS * 24;
    let YEARS = DAYS * 365;

    t = t/SECONDS;
    let seconds = Math.round(t % 60);
    let minutes = Math.round((t / 60) % 60);
    let hours = Math.round((t / (60 * 60)) % 24);

    let secStr = ""+seconds;
    if(seconds<10){secStr = "0"+seconds;}
    let minStr = ""+minutes;
    if(minutes<10){minStr = "0"+minutes;}
    let hourStr = ""+hours;
    if(hours<10){hourStr = "0"+hours;}

    this.titleElem.textContent = hourStr+":"+minStr+":"+secStr;
  }



}
