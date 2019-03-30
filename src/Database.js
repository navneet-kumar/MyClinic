import Realm from "realm";
import Settings from "./modal/Settings";

export const database_name = "MyClinic.realm";
export const patient_table_name = "patient";
export const appointment_table_name = "appointment";
export const settings_table_name = "settings";

/*********************************/
/**
 * DataBase schema description
 */
/*********************************/
export const AppointmentSchema = {
  name: appointment_table_name,
  primaryKey: "id",
  properties: {
    id: "string",
    patient: patient_table_name,
    treatment: "string?",
    description: "string?",
    reminder: { type: "int", default: 30 },
    timestamp: "date",
    duration: { type: "int", default: 30 },
    status: { type: "int", default: 1 },
    earnings: "int?"
  }
};

export const PatientSchema = {
  name: patient_table_name,
  primaryKey: "id",
  properties: {
    id: "string",
    name: "string",
    mobile: "string",
    gender: "string?",
    age: "int?"
  }
};

export const SettingsSchema = {
  name: settings_table_name,
  primaryKey: "key",
  properties: {
    key: "string",
    value: "string"
  }
};

/**
 * Data base name and schema
 */
/*********************************/
const databaseOptions = {
  path: database_name,
  schema: [AppointmentSchema, PatientSchema, SettingsSchema],
  schemaVersion: 0
};

/*********************************/
/**
 * get all appointments
 */
export const getAllAppointment = async () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let appointments = realm.objects(appointment_table_name);
          resolve(Array.from(appointments));
        });
      })
      .catch(error => reject(error));
  });

/**
 *
 * @param {*} appointment
 */
export const getAppointmentById = appointmentId =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let appointment = realm.objectForPrimaryKey(
            appointment_table_name,
            appointmentId
          );
          resolve(JSON.parse(JSON.stringify(appointment)));
        });
      })
      .catch(error => reject(error));
  });

/**
 * get all appointments
 */
export const getFilteredAppointments = query =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let appointments = realm
            .objects(appointment_table_name)
            .filtered(query);
          resolve(appointments);
        });
      })
      .catch(error => reject(error));
  });

/**
 *
 * @param {*} appointment
 */
export const insertAppointment = appointment =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          realm.create(appointment_table_name, appointment, true);
          resolve(appointment);
        });
      })
      .catch(error => reject(error));
  });

/**
 * insert multiple appointments in bulk
 * @param {Appointment} Appointment
 */
export const insertAppointments = appointments =>
  new Promise((resolve, reject) => {
    console.log(appointments);
    Realm.open(databaseOptions)
      .then(realm => {
        appointments.map(appointment => {
          realm.write(() => {
            realm.create(appointment_table_name, appointment, true);
          });
        });
        resolve(appointments.length);
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
            appointment_table_name,
            appointment.id
          );
          appointmentToBeUpdated.patient = appointment.patient;
          appointmentToBeUpdated.treatment = appointment.treatment;
          appointmentToBeUpdated.description = appointment.description;
          appointmentToBeUpdated.reminder = appointment.reminder;
          appointmentToBeUpdated.timestamp = appointment.timestamp;
          appointmentToBeUpdated.duration = appointment.duration;
          appointmentToBeUpdated.status = appointment.status;
          appointmentToBeUpdated.earnings = appointment.earnings;
          appointmentToBeUpdated.images = appointment.images;
          resolve(true);
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
            appointment_table_name,
            appointmentId
          );
          realm.delete(appointmentToBeDeleted);
          resolve();
        });
      })
      .catch(error => reject(error));
  });
/*********************************/
/**
 * get all patients
 */
export const getAllPatients = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let patients = realm.objects(patient_table_name);
          resolve(Array.from(patients));
        });
      })
      .catch(error => reject(error));
  });

/**
 * insert single patient
 * @param {Patient} Patient
 */
export const insertPatient = patient =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          realm.create(patient_table_name, patient);
          resolve(appointment);
        });
      })
      .catch(error => reject(error));
  });

/**
 * insert multiple patients in bulk
 * @param {Patient} patients
 */
export const insertPatients = patients =>
  new Promise((resolve, reject) => {
    console.log(patients);
    Realm.open(databaseOptions)
      .then(realm => {
        patients.map(patient => {
          realm.write(() => {
            realm.create(patient_table_name, patient, true);
          });
        });
        resolve(patients.length);
      })
      .catch(error => reject(error));
  });

export const updatePatient = patient =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let patientToBeUpdated = realm.objectForPrimaryKey(
            patient_table_name,
            patient.id
          );
          patientToBeUpdated.name = patient.name;
          patientToBeUpdated.mobile = patient.mobile;
          patientToBeUpdated.gender = patient.gender;
          patientToBeUpdated.age = patient.age;
          resolve(patient);
        });
      })
      .catch(error => reject(error));
  });
/*********************************/
/**
 * get all Settings
 */
export const getAllSettings = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let settings = realm.objects(settings_table_name);
          resolve(Array.from(settings ? settings : []));
        });
      })
      .catch(error => reject(error));
  });

/**
 * get single Settings
 */
export const getSingleSetting = settingKey =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let setting = realm.objectForPrimaryKey(
            settings_table_name,
            settingKey
          );
          if (!setting) {
            setting = new Settings(settingKey, undefined);
          } else {
            setting = new Settings(setting.key, JSON.parse(setting.value));
          }
          resolve(setting);
        });
      })
      .catch(error => reject(error));
  });

/**
 * insert multiple settings in bulk, list of {@link Settings.ts}
 * @param {Setting} setting
 */
export const insertSettings = settings =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        settings.map(setting => {
          realm.write(() => {
            realm.create(settings_table_name, setting);
          });
        });
        resolve(settings.length);
      })
      .catch(error => reject(error));
  });

/**
 *
 * @param {*} Setting
 */
export const insertNewSetting = setting =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          realm.create(settings_table_name, setting, true);
          resolve(setting);
        });
      })
      .catch(error => reject(error));
  });

/**
 *
 * @param {*} setting
 */
export const updateSetting = setting =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let settingsToBeUpdated = realm.objectForPrimaryKey(
            settings_table_name,
            setting.key
          );
          settingsToBeUpdated.value = setting.value;
          resolve(setting);
        });
      })
      .catch(error => reject(error));
  });
