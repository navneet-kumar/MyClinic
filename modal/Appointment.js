import Patient from "./Patient";

export default class Appointment {
  id: string;
  patient: Patient;
  treatment: string;
  description: string;
  reminder: number; // always in min(s)
  timestamp: Date;

  constructor(existingPatient) {
    if (typeof existingPatient == "undefined") {
      this.patient = new Patient();
    } else {
      this.patient = existingPatient;
    }
    this.treatment = "Treatment";
  }
}
