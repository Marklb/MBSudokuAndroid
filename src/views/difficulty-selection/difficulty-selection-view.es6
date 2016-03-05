let Debug = require('../../debug');
let View = require('../view');

let DifficulySelectionButton = require('./elements/difficulty-selection-button');

let DEBUG = new Debug('DifficultySelectionView');

const CSS_CLASSES = {
  DIFFICULTY_SELECTION_VIEW: 'difficulty-selection-view'
};


module.exports =
class DifficultySelectionView extends View {
  constructor() {
    super(VIEW_ID.DIFFICULY_SELECTION);
    // DEBUG.log('Loading');
    this.addClass(CSS_CLASSES.DIFFICULTY_SELECTION_VIEW);

    this.initEasyDifficultySelectionButton();
    this.initSimpleDifficultySelectionButton();
    this.initIntermediateDifficultySelectionButton();
    this.initExpertDifficultySelectionButton();

  }

  /*
   *
   */
  initEasyDifficultySelectionButton(){
    this.easyDifficultyButton = new DifficulySelectionButton();
    this.addElement(this.getEasyDifficultySelectionButton().getElement());
    this.getEasyDifficultySelectionButton().setValue('Easy');
    this.getEasyDifficultySelectionButton().setSize(this.getWidth()-30, 40);
    this.getEasyDifficultySelectionButton().setPosition(
      15,
      5
    );
    this.getEasyDifficultySelectionButton().update();
  }

  /*
   *
   */
  getEasyDifficultySelectionButton(){
    return this.easyDifficultyButton;
  }

  /*
   *
   */
  initSimpleDifficultySelectionButton(){
    this.simpleDifficultyButton = new DifficulySelectionButton();
    this.addElement(this.getSimpleDifficultySelectionButton().getElement());
    this.getSimpleDifficultySelectionButton().setValue('Simple');
    this.getSimpleDifficultySelectionButton().setSize(this.getWidth()-30, 40);
    this.getSimpleDifficultySelectionButton().setPosition(
      15,
      this.getEasyDifficultySelectionButton().getY()+this.getEasyDifficultySelectionButton().getHeight()+10
    );
    this.getSimpleDifficultySelectionButton().update();
  }

  /*
   *
   */
  getSimpleDifficultySelectionButton(){
    return this.simpleDifficultyButton;
  }

  /*
   *
   */
  initIntermediateDifficultySelectionButton(){
    this.intermediateDifficultyButton = new DifficulySelectionButton();
    this.addElement(this.getIntermediateDifficultySelectionButton().getElement());
    this.getIntermediateDifficultySelectionButton().setValue('Intermediate');
    this.getIntermediateDifficultySelectionButton().setSize(this.getWidth()-30, 40);
    this.getIntermediateDifficultySelectionButton().setPosition(
      15,
      this.getSimpleDifficultySelectionButton().getY()+this.getSimpleDifficultySelectionButton().getHeight()+10
    );
    this.getIntermediateDifficultySelectionButton().update();
  }

  /*
   *
   */
  getIntermediateDifficultySelectionButton(){
    return this.intermediateDifficultyButton;
  }

  /*
   *
   */
  initExpertDifficultySelectionButton(){
    this.expertDifficultyButton = new DifficulySelectionButton();
    this.addElement(this.getExpertDifficultySelectionButton().getElement());
    this.getExpertDifficultySelectionButton().setValue('Expert');
    this.getExpertDifficultySelectionButton().setSize(this.getWidth()-30, 40);
    this.getExpertDifficultySelectionButton().setPosition(
      15,
      this.getIntermediateDifficultySelectionButton().getY()+this.getIntermediateDifficultySelectionButton().getHeight()+10
    );
    this.getExpertDifficultySelectionButton().update();
  }

  /*
   *
   */
  getExpertDifficultySelectionButton(){
    return this.expertDifficultyButton;
  }

}
