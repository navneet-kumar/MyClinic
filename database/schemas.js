import Realm from "realm";

export const Appointment = {
  name: "appointment_schema",
  primaryKey: "id",
  properties: {
    id: "string",
    patient: "patient_schema",
    treatment: "string?",
    description: "string?",
    reminder: { type: "int", default: 30 },
    timestamp: "date",
    duration: { type: "int", default: 30 }
  }
};

export const Patient = {
  name: "patient_schema",
  primaryKey: "id",
  properties: {
    id: "string",
    name: "string",
    mobile: "string",
    gender: "string?",
    age: "int?"
  }
};

const databaseOptions = {
  path: "MyClinic.realm",
  schema: [Patient, Appointment],
  schemaVersion: 0
};

/**
 *
 * @param {*} appointment
 */
export const insertAppointment = appointment =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          console.log("writing appointment");
          console.log(appointment);
          realm.create("appointment_schema", appointment);
          resolve(appointment);
        });
      })
      .catch(error => reject(error));
  });

/**
 *
 * @param {*} appointment
 */
export const updateAppointment = appointment =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let appointmentToBeUpdated = realm.objectForPrimaryKey(
            "appointment_schema",
            appointment.id
          );
          appointmentToBeUpdated.patient = appointment.patient;
          appointmentToBeUpdated.treatment = appointment.treatment;
          appointmentToBeUpdated.description = appointment.description;
          appointmentToBeUpdated.reminder = appointment.reminder;
          appointmentToBeUpdated.timestamp = appointment.timestamp;
          appointmentToBeUpdated.duration = appointment.duration;
          resolve();
        });
      })
      .catch(error => reject(error));
  });

/**
 *
 * @param {*} appointmentId
 */
export const deleteAppointment = appointmentId =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let appointmentToBeDeleted = realm.objectForPrimaryKey(
            "appointment_schema",
            appointmentId
          );
          realm.delete(appointmentToBeDeleted);
          resolve();
        });
      })
      .catch(error => reject(error));
  });

export const getAllAppointment = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let appointments = realm.objects("appointment_schema");
          resolve(appointments);
        });
      })
      .catch(error => reject(error));
  });
