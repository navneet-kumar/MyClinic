export default class Patient {
  _id: string;
  _name: string;
  _mobile: string;
  _gender: string;
  _age: number;

  constructor() {
    this._id = this.uuidv4();
    this._name = "";
    this._mobile = "";
    this._gender = "gender";
  }
  uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
