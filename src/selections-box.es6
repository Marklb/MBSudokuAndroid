module.exports =
class SelectionsBox {
  constructor(gameBoard) {
    this.gameBoard = gameBoard;
    console.log('Creating Selections Box');
    this.containerElem = document.createElement('div');
    this.containerElem.classList.add('selections-box');

    //--------------------------------------------------------------------------
    // Create the option buttons
    //--------------------------------------------------------------------------
    this.optionsContainerElem = document.createElement('div');
    this.optionsContainerElem.classList.add('options-container');
    this.containerElem.appendChild(this.optionsContainerElem);

    this.spacerElem = document.createElement('div');
    this.spacerElem.classList.add('spacer');
    this.spacerElem.textContent = 'X';
    this.optionsContainerElem.appendChild(this.spacerElem);

    this.removeBtnElem = document.createElement('div');
    this.removeBtnElem.classList.add('remove-btn');
    this.removeBtnElem.textContent = 'X';
    this.optionsContainerElem.appendChild(this.removeBtnElem);
    this.removeBtnElem.addEventListener('mousedown', (e) => {
      this.gameBoard.setSelectedTileValue(-1);
      this.updateTileStyleStates();
    });

    this.STATE = {};
    this.STATE.ENABLED = 0;
    this.STATE.DISABLED = 1;

    //--------------------------------------------------------------------------
    // Create the selection tiles
    //--------------------------------------------------------------------------
    this.tilesContainerElem = document.createElement('div');
    this.tilesContainerElem.classList.add('tiles-container');
    this.containerElem.appendChild(this.tilesContainerElem);


    this.selectionTiles = [];
    for(let i = 0; i < 9; i++){
      let tmpTile = document.createElement('div');
      tmpTile.classList.add('tile');
      if((i+1) % 2 == 0){
        tmpTile.classList.add('even');
      }else{
        tmpTile.classList.add('odd');
      }
      tmpTile.numValue = i+1;
      tmpTile.textContent = ''+tmpTile.numValue;
      this.tilesContainerElem.appendChild(tmpTile);
      tmpTile.addEventListener('mousedown', (e) => {
        if(!tmpTile.classList.contains('done')){
          let isDone = this.gameBoard.setSelectedTileValue(tmpTile.numValue);
          if(isDone){
            tmpTile.classList.add('done');
          }
        }
      });
      this.selectionTiles.push(tmpTile);
    }



    this.updateTileStyleStates();

  }

  getElement(){
    return this.containerElem;
  }

  update(){
    this.updateTileStyleStates();
  }

  updateTileStyleStates(){
    let doneVals = this.gameBoard.getCompletedValues();
    for(let i = 0; i < 9; i++){
      let tmpTile = this.selectionTiles[i];
      let found = false;
      for(let j = 0; j < doneVals.length; j++){
        if(doneVals[j] == tmpTile.numValue){
          found = true;
        }
      }
      if(found){
        this.setTileActiveState(tmpTile.numValue, this.STATE.DISABLED);
      }else{
        this.setTileActiveState(tmpTile.numValue, this.STATE.ENABLED);
      }
    }
  }

  setTileActiveState(tileValue, state){
    if(state == this.STATE.ENABLED){
      if(this.selectionTiles[tileValue-1].classList.contains('done')){
        this.selectionTiles[tileValue-1].classList.remove('done')
      }
    }else if(state == this.STATE.DISABLED){
      if(!this.selectionTiles[tileValue-1].classList.contains('done')){
        this.selectionTiles[tileValue-1].classList.add('done')
      }
    }
  }

}
