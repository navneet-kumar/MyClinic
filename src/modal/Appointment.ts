import { uuidv4 } from "../components/Helpers";
import Patient from "./Patient";

export default class Appointment {
  id: string;
  patient: Patient;
  treatment: string;
  description: string;
  reminder: number; // always in min(s)
  timestamp: Date;
  duration: number;
  status: string;
  earnings: number;

  constructor() {
    this.id = uuidv4();
    this.patient = new Patient();
    this.reminder = 30;
    this.duration = 30;
    this.status = "PENDING";
  }
}
