export default class Patient {
  id: string;
  name: string;
  mobile: string;
  gender: string;
  age: number;

  constructor() {
    this.id = this.uuidv4();
    this.name = "";
    this.mobile = "";
    this.gender = "gender";
  }
  uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
