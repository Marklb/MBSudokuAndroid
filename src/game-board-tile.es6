module.exports =
class GameBoardTile {
  constructor(gameBoard, row, column) {
    this.gameBoard = gameBoard;
    this.containerElem = document.createElement('div');
    this.containerElem.classList.add('tile');

    this.row = row;
    this.column = column;

    this.EMPTY_VALUE = 0;

    this.VALUE_STATES = {};
    this.VALUE_STATES.EMPTY = 0;
    this.VALUE_STATES.ORIGINAL = 1;
    this.VALUE_STATES.REGULAR = 2;

    this.VALUE_STATES_CLASSES = [];
    this.VALUE_STATES_CLASSES[this.VALUE_STATES.EMPTY] = 'empty-value';
    this.VALUE_STATES_CLASSES[this.VALUE_STATES.ORIGINAL] = 'original-value';
    this.VALUE_STATES_CLASSES[this.VALUE_STATES.REGULAR] = 'regular-value';
    this.currValState = this.VALUE_STATES.EMPTY;
    this.containerElem.classList.add(this.VALUE_STATES_CLASSES[this.currValState]);
    // If value is this.EMPTY_VALUE then it is blank
    this.setValue(this.EMPTY_VALUE);


    this.STYLE_STATES = {};
    this.STYLE_STATES.BASIC = 0;
    this.STYLE_STATES.SAME_VALUE = 1;
    this.STYLE_STATES.CONFLICTING_VALUE = 2;

    this.STYLE_STATES_CLASSES = {};
    this.STYLE_STATES_CLASSES[this.STYLE_STATES.BASIC] = 'style-state-basic';
    this.STYLE_STATES_CLASSES[this.STYLE_STATES.SAME_VALUE] = 'style-state-same-value';
    this.STYLE_STATES_CLASSES[this.STYLE_STATES.CONFLICTING_VALUE] = 'style-state-conflicting-value';



    // this.containerElem.addEventListener('mousedown', () => {
    this.containerElem.addEventListener(TOUCH_EVENT, () => {
      this.gameBoard.setSelectedTile(this.row, this.column);
    });
    // this.containerElem.addEventListener('touchstart', () => {
    //   this.gameBoard.setSelectedTile(this.row, this.column);
    // });

  }

  getElement(){
    return this.containerElem;
  }

  getRowIndex(){
    return this.row;
  }

  getColumnIndex(){
    return this.column;
  }

  setSelected(b){
    if(b){
      this.containerElem.classList.add('selected');
    }else{
      this.containerElem.classList.remove('selected');
    }
  }

  setValue(val, isOriginal = false){
    // console.log("Setting: "+val);
    let tmpValState = this.currValState;
    this.value = val;
    this.containerElem.textContent = ''+this.value;

    if(this.value == this.EMPTY_VALUE){
      this.currValState = this.VALUE_STATES.EMPTY;
    }else{
      if(isOriginal){
        this.currValState = this.VALUE_STATES.ORIGINAL;
      }else{
        this.currValState = this.VALUE_STATES.REGULAR;
      }
    }

    if(this.currValState != tmpValState){
      this.containerElem.classList.remove(this.VALUE_STATES_CLASSES[tmpValState]);
    }
    if(!this.containerElem.classList.contains(this.VALUE_STATES_CLASSES[this.currValState])){
      this.containerElem.classList.add(this.VALUE_STATES_CLASSES[this.currValState]);
    }

  }

  getValue(){
    return this.value;
  }

  isEmpty(){
    console.log('Val:'+this.value+'    '+this.EMPTY_VALUE);
    return (this.value == this.EMPTY_VALUE);
  }

  isOriginal(){
    return (this.currValState == this.VALUE_STATES.ORIGINAL);
  }

  setStyleState(state){
    if(!this.currStyleState){
      this.currStyleState = this.STYLE_STATES.BASIC;
      this.containerElem.classList.add(this.STYLE_STATES_CLASSES[this.currStyleState]);
    }
    if(this.currStyleState != state){
      this.containerElem.classList.remove(this.STYLE_STATES_CLASSES[this.currStyleState]);
      this.currStyleState = state;
      this.containerElem.classList.add(this.STYLE_STATES_CLASSES[this.currStyleState]);
    }
  }

  setTilesInBlock(tiles){
    this.tilesInBlock = tiles;
  }

  getTilesInBlock(){
    return this.tilesInBlock;
  }

}
