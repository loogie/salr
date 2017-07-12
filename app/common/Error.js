export default class Error{
  constructor(message, name, level, htmlMessage){
    this.name = name;
    this.level = level;
    this.message = message;
    this.htmlMessage = htmlMessage;
    this.toString = ()=>{
      return this.name + ": " + this.message;
    }
  }
}
