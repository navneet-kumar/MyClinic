import { isAndroid } from "./Helpers";

export const Status = Object.freeze({
  PENDING: 1,
  ONGOING: 2,
  COMPLETED: 3,
  CANCELLED: 4
});

const Constants = {
  theme_color: "#6a51ae",
  theme_compliment_color: "#ffffff",
  theme_color_error: "#cc0000",
  font: {
    fontFamily: isAndroid() ? "Roboto" : "System",
    fontSize: 15
  },
  website_url: "http://www.teethnbeauty.com/",
  icon_size: 10,
  date_time: "Date & Time",
  reminder: 30,
  today: new Date(),
  /**
   * The maximum amount of time where you can book appointments by default it's 6 months
   */
  appointment_booking_range: 6,
  time_unit: ["min(s)", "hr(s)"],
  /**
   * User permissions for android
   * permissions["android.permission.CALL_PHONE"]
   * permissions["android.permission.READ_CONTACTS"]
   */
  permissions: null,
  treatments: [
    "Treatment",
    "COMPLETE DENTURE",
    "TOOTH COLORED PERMANENT FILLING",
    "OCCLUSAL SPLINT (NIGHT GUARD)",
    "ORTHODONTIC TREATMENT- BRACES",
    "Painless root canal treatment",
    "Fixed Partial Denture (Fixed tooth)",
    "Extraction (tooth removal)",
    "Cap replacement",
    "Check-up and xray (dental radiograph)",
    "TOOTH JEWELRY",
    "PAINLESS KIDS ROOT CANAL TREATMENT"
  ],
  myclinic_address:
    "Dr. Purnata's Dental & Cosmetic Care Flat no. 6, Between Lane 5 & 6, Ganga Cascade, Meera Nagar, Koregaon Park, Pune, Maharashtra, Mobile no - +91 80-3364-7478",

  /* Database  */

  /* General */
  treatments_list: "treatment_list",
  /* SMS */
  sms_templates: "sms_templates",
  sms_appointment: "sms_appointment_add"
};

export default Constants;
