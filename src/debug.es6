module.exports =
class Debug {
  constructor(debug_id) {
    this.debug_id = debug_id;
  }

  log(msg){
    console.log('['+this.debug_id+']: '+msg);
  }

}
