import moment from "moment";
import Patient from "./Patient";

export default class Appointment {
  id: string;
  patient: Patient;
  treatment: string;
  description: string;
  reminder: number; // always in min(s)
  timestamp: Date;
  duration: number;

  constructor() {
    this.id = this.uuidv4();
    this.patient = new Patient();
    this.treatment = "Treatment";
    this.reminder = 30;
    this.timestamp = moment().toDate();
    this.duration = 30;
  }

  uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
