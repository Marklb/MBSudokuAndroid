let Debug = require('../../debug');
let MbSudoku = require('../../mb_sudoku');
let ViewController = require('../view-controller');
let DifficultySelectionView = require('./difficulty-selection-view');

let DEBUG = new Debug('DifficultySelection');

module.exports =
class DifficultySelection extends ViewController {
  constructor() {
    super(new DifficultySelectionView());
    // DEBUG.log('Loading.');

    this.initDifficultySelectionButtonEvents();

  }

  /*
   *
   */
  initDifficultySelectionButtonEvents(){
    // DEBUG.log('initDifficultySelectionButtonEvents');

    // Easy Difficulty Selection Button
    this.getView().getEasyDifficultySelectionButton().getElement().addEventListener(
      TOUCH_START_EVENT, () => {
        DEBUG.log('Clicked Easy Difficulty Button');
        app.gameView.setDifficulty(MbSudoku.DIFFICULIES.EASY);
        app.showView(VIEW_ID.GAME);
      }
    );

    // Simple Difficulty Selection Button
    this.getView().getSimpleDifficultySelectionButton().getElement().addEventListener(
      TOUCH_START_EVENT, () => {
        DEBUG.log('Clicked Simple Difficulty Button');
        app.gameView.setDifficulty(MbSudoku.DIFFICULIES.SIMPLE);
        app.showView(VIEW_ID.GAME);
      }
    );

    // Intermediate Difficulty Selection Button
    this.getView().getIntermediateDifficultySelectionButton().getElement().addEventListener(
      TOUCH_START_EVENT, () => {
        DEBUG.log('Clicked Intermediate Difficulty Button');
        app.gameView.setDifficulty(MbSudoku.DIFFICULIES.INTERMEDIATE);
        app.showView(VIEW_ID.GAME);
      }
    );

    // Expert Difficulty Selection Button
    this.getView().getExpertDifficultySelectionButton().getElement().addEventListener(
      TOUCH_START_EVENT, () => {
        DEBUG.log('Clicked Expert Difficulty Button');
        app.gameView.setDifficulty(MbSudoku.DIFFICULIES.EXPERT);
        app.showView(VIEW_ID.GAME);
      }
    );
  }


}
