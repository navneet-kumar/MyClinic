export default class Patient {
  _id: string;
  _name: string;
  _mobile: string;
  _gender: string;
  _age: number;

  constructor(id, name, mobile, gender, age) {
    if (typeof gender == "undefined") {
      gender = "gender";
    }
    this._id = id;
    this._name = name;
    this._mobile = mobile;
    this._gender = gender;
    this._age = age;
  }
}
