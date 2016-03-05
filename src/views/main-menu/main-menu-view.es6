let Debug = require('../../debug');
let View = require('../view');

let MainMenuTitle = require('./elements/main-menu-title');
let MainMenuButton = require('./elements/main-menu-button');

let DEBUG = new Debug('MainMenuView');

const CSS_CLASSES = {
  MAIN_MENU_VIEW: 'main-menu-view'
};


module.exports =
class GameView extends View {
  constructor() {
    super(VIEW_ID.MAIN_MENU);
    // DEBUG.log('Loading');
    this.addClass(CSS_CLASSES.MAIN_MENU_VIEW);

    this.initMainMenuTitle();
    this.initPlayButton();
    this.initStatsButton();
    this.initOptionsButton();

  }

  /*
   *
   */
  initMainMenuTitle(){
    this.mainMenuTitle = new MainMenuTitle();
    this.addElement(this.getMainMenuTitle().getElement());
    this.getMainMenuTitle().setValue('MB Sudoku');
    this.getMainMenuTitle().setSize(this.getWidth()-10, 50);
    this.getMainMenuTitle().setPosition(
      5,
      5
    );
    this.getMainMenuTitle().update();
  }

  /*
   *
   */
  getMainMenuTitle(){
    return this.mainMenuTitle;
  }

  /*
   *
   */
  initPlayButton(){
    this.playButton = new MainMenuButton();
    this.addElement(this.getPlayButton().getElement());
    this.getPlayButton().setValue('Play');
    this.getPlayButton().setSize(this.getWidth()-30, 40);
    this.getPlayButton().setPosition(
      15,
      this.getMainMenuTitle().getY()+this.getMainMenuTitle().getHeight()+10
    );
    this.getPlayButton().update();
  }

  /*
   *
   */
  getPlayButton(){
    return this.playButton;
  }

  /*
   *
   */
  initStatsButton(){
    this.statsButton = new MainMenuButton();
    this.addElement(this.getStatsButton().getElement());
    this.getStatsButton().setValue('Stats');
    this.getStatsButton().setSize(this.getWidth()-30, 40);
    this.getStatsButton().setPosition(
      15,
      this.getPlayButton().getY()+this.getPlayButton().getHeight()+10
    );
    this.getStatsButton().update();
  }

  /*
   *
   */
  getStatsButton(){
    return this.statsButton;
  }

  /*
   *
   */
  initOptionsButton(){
    this.optionsButton = new MainMenuButton();
    this.addElement(this.getOptionsButton().getElement());
    this.getOptionsButton().setValue('Options');
    this.getOptionsButton().setSize(this.getWidth()-30, 40);
    this.getOptionsButton().setPosition(
      15,
      this.getStatsButton().getY()+this.getStatsButton().getHeight()+10
    );
    this.getOptionsButton().update();
  }

  /*
   *
   */
  getOptionsButton(){
    return this.optionsButton;
  }



}
