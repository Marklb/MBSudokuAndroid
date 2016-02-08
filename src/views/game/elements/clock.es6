let Debug = require('../../../debug');
let CustomElement = require('../../custom-element');


let DEBUG = new Debug('Clock');

const CSS_CLASSES = {
  CLOCK: 'clock'
};

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------
module.exports =
class CLOCK extends CustomElement {
  constructor() {
    super(CSS_CLASSES.CLOCK);
    DEBUG.log('Loading');



  }

  /*
   *
   */
  update(){
    this.updateStyles();
  }

  /*
   *
   */
  updateStyles(){
    this.getElement().style.fontSize = (this.getHeight()*0.8)+'px';
  }

  /*
   *
   */
  setValue(v){
    this.value = v;
    this.getElement().setAttribute('value', this.getValue());
    this.getElement().innerHTML = ''+this.getValue();
  }

  /*
   *
   */
  getValue(){
    return this.value;
  }

  /*
   *
   */
 setTime(t){
   let SECONDS = 1000;
   let MINUTES = SECONDS * 60;
   let HOURS = MINUTES * 60;
   let DAYS = HOURS * 24;
   let YEARS = DAYS * 365;

  //  t = t/SECONDS;
  //  let seconds = Math.round(t % 60);
  //  let minutes = Math.round((t / 60) % 60);
  //  let hours = Math.round((t / (60 * 60)) % 24);
  let d = new Date(t);
  let seconds = d.getSeconds();
  let minutes = d.getMinutes();
  // let hours = d.getHours();

   let secStr = ""+seconds;
   if(seconds<10){secStr = "0"+seconds;}
   let minStr = ""+minutes;
   if(minutes<10){minStr = "0"+minutes;}
  //  let hourStr = ""+hours;
  //  if(hours<10){hourStr = "0"+hours;}

  //  this.setValue(hourStr+":"+minStr+":"+secStr);
   this.setValue(minStr+":"+secStr);
 }


}
