let MainMenu = require('./main-menu');
let Game = require('./game');
// var attachFastClick = require('./libs/fastclick');

// TODO: History
// TODO: Undo
// TODO: Hint
// TODO: Stats collector
// TODO: Difficulty selector
// TODO: New game conformation
// TODO: Win screen
// IDEA: Victory picture
// TODO: Error notification

global.VIEW_ID = {
  MAIN_MENU: 'MAIN_MENU_VIEW',
  GAME: 'GAME_VIEW'
};


class App {
  constructor() {
    // attachFastClick(document.body);
    console.log("Starting MB Sudoku");
    this.containerElem = document.getElementById('app-container');


    this.mainMenu = new MainMenu();
    this.addView(this.mainMenu);

    this.game = new Game();
    this.addView(this.game);



    this.showView(this.mainMenu.getViewName());
  }

  getElement(){
    return this.containerElem;
  }

  addView(view){
    if(this.views === undefined){
      this.views = [];
    }
    this.views.push(view);
    this.getElement().appendChild(view.getViewElement());
  }

  showView(viewName){
    for(let i = 0; i < this.views.length; i++){
      if(this.views[i].getViewName() === viewName){
        this.hideActiveView();
        this.views[i].show();
        this.activeView = this.views[i];
      }
    }
  }

  hideActiveView(){
    if(this.activeView !== undefined){
      this.activeView.hide();
    }
  }


}

global.app = new App();

// module.exports = new App();
