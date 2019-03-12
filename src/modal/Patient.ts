import { uuidv4 } from "../components/Helpers";

export default class Patient {
  id: string;
  name: string;
  mobile: string;
  gender: string;
  age: number;

  constructor() {
    this.id = uuidv4();
  }
}
