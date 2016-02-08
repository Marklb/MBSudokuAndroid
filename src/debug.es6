module.exports =
class Debug {
  constructor(debugId) {
    this.debugId = debugId;
  }

  getMessagePrefix(){
    return '['+this.debugId+']: ';
  }

  log(msg){
    console.log(this.getMessagePrefix()+msg);
  }

  error(msg){
    console.error(this.getMessagePrefix()+msg);
  }

}
