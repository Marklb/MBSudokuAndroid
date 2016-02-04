let View = require('./view');

const DEBUG_PREFIX = '[MainMenu]: ';

module.exports =
class MainMenu extends View {
  constructor() {
    super(VIEW_ID.MAIN_MENU);
    this.containerElem = document.createElement('div');
    this.containerElem.classList.add('main-menu-container');
    this.addElement(this.getElement());

    this.mainMenuContainer = document.createElement('div');
    this.mainMenuContainer.classList.add('main-menu');
    this.getElement().appendChild(this.mainMenuContainer);

    this.initTitle();
    this.initButtons();



  }

  getElement(){
    return this.containerElem;
  }

  /*
   * Title
   */
  initTitle(){
    if(!this.titleElem){
      this.titleElem = document.createElement('div');
      this.titleElem.classList.add('title');
      this.mainMenuContainer.appendChild(this.getTitleElem());
    }
    this.setTitle('MB Sudoku');
  }

  getTitleElem(){
    return this.titleElem;
  }

  setTitle(title){
    this.getTitleElem().innerHTML = title;
  }

  /*
   * Buttons
   */
  initButtons(){
    if(this.buttons === undefined){
      this.buttons = [];
      this.buttonsContainer = document.createElement('div');
      this.buttonsContainer.classList.add('buttons-container');
      this.mainMenuContainer.appendChild(this.buttonsContainer);
    }
    this.initPlayButton();
    this.initStatsButton();
  }

  getButtonsContainer(){
    if(this.buttonsContainer === undefined){
      console.log(DEBUG_PREFIX+'Buttons container undefined.');
    }
    return this.buttonsContainer;
  }

  addButton(btn){
    this.buttons.push(btn);
    this.getButtonsContainer().appendChild(btn);
  }

  createButton(buttonName){
    let btn = document.createElement('div');
    btn.classList.add('btn');
    btn.innerHTML = buttonName;
    return btn
  }

  /*
   * Play Button
   */
  initPlayButton(){
    if(this.startButton === undefined){
      this.startButton = this.createButton('Play');
      this.addButton(this.startButton);
      this.startButton.addEventListener('mousedown', (e) => {
        app.showView(VIEW_ID.GAME);
      });
    }
  }

  /*
   * Stats Button
   */
  initStatsButton(){
    if(this.statsButton === undefined){
      this.statsButton = this.createButton('Stats');
      this.addButton(this.statsButton);
    }
  }




}
