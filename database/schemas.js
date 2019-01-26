export const Appointment = {
  name: "Appointment",
  primaryKey: "id",
  properties: {
    id: "string",
    patient: "Patient",
    treatment: "string",
    description: "string",
    reminder: "int",
    timestamp: "date",
    duration: "int"
  }
};

export const Patient = {
  name: "Patient",
  primaryKey: "id",
  properties: {
    id: "string",
    name: "string",
    mobile: "string",
    gender: "string",
    age: "int"
  }
};
