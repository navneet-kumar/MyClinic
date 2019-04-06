import moment from "moment";
import { Alert, Dimensions, PermissionsAndroid, Platform } from "react-native";
import { DocumentPicker } from "react-native-document-picker";
import RNImmediatePhoneCall from "react-native-immediate-phone-call";
import SendSMS from "react-native-sms";
import RNFetchBlob from "rn-fetch-blob";
import { name as appName } from "../../App";
import { getSingleSetting } from "../Database";
import Constants from "./Constants";

export const Screen = Dimensions.get("window");

export async function GetAllPermissions() {
  try {
    if (Platform.OS === "android") {
      const userResponse = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        PermissionsAndroid.PERMISSIONS.CALL_PHONE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      ]);
      return userResponse;
    }
  } catch (err) {
    Warning(err);
  }
  return null;
}

export async function ShowOkAlert(message, onOKPressed) {
  try {
    Alert.alert(
      appName,
      message,
      [
        {
          text: "OK",
          onPress: () => {
            if (typeof onOKPressed === "function") {
              onOKPressed();
            }
          }
        }
      ],
      { cancelable: false }
    );
  } catch (err) {
    Warning(err);
  }
}

export async function positiveNegativeAlert(
  message,
  btnPositiveTxt,
  btnNegativeTxt,
  onPositive,
  onNegative
) {
  try {
    Alert.alert(
      appName,
      message,
      [
        {
          text: btnNegativeTxt,
          onPress: () => {
            if (typeof onNegative === "function") {
              onNegative();
            }
          },
          style: "cancel"
        },
        {
          text: btnPositiveTxt,
          onPress: () => {
            if (typeof onPositive === "function") {
              onPositive();
            }
          }
        }
      ],
      { cancelable: false }
    );
  } catch (err) {
    Warning(err);
  }
}

export async function positiveNegativeNeutralAlert(
  message,
  btnPositiveTxt,
  btnNegativeTxt,
  btnNeutralTxt,
  onPositive,
  onNegative,
  onNeutral
) {
  try {
    Alert.alert(
      appName,
      message,
      [
        {
          text: btnNeutralTxt,
          onPress: () => {
            if (typeof onNeutral === "function") {
              onNeutral();
            }
          }
        },
        {
          text: btnNegativeTxt,
          onPress: () => {
            if (typeof onNegative === "function") {
              onNegative();
            }
          },
          style: "cancel"
        },
        {
          text: btnPositiveTxt,
          onPress: () => {
            if (typeof onPositive === "function") {
              onPositive();
            }
          }
        }
      ],
      { cancelable: false }
    );
  } catch (err) {
    Warning(err);
  }
}

export function isAndroid() {
  return Platform.OS === "android" ? true : false;
}

export function Warning(error) {
  let msg = error.message;
  if (error.fileName) {
    msg +=
      " @fileName:lineNumber [ " +
      error.fileName +
      ":" +
      error.lineNumber +
      " ]";
  }
  console.warn(msg);
}

export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function call(phoneNumber) {
  if (phoneNumber) {
    RNImmediatePhoneCall.immediatePhoneCall(phoneNumber);
  }
}

/**
 * Read template and replace place holder with appointment data
 * @param {*} templateKey
 * @param {*} appointment
 */
export function getSmsContentFromTemplate(templateKey, appointment) {
  return new Promise(resolve => {
    let content = "";
    //"$Mr","$Name","$Date","$Time","$Duration"
    getSingleSetting(Constants.sms_templates).then(templates => {
      templates.getValue().map(item => {
        if (item.title === templateKey) {
          content = item.content;
          content = content.replace(
            "$Mr",
            appointment.patient.gender
              ? appointment.patient.gender === "male"
                ? "Mr"
                : "Ms"
              : "Mr/s"
          );
          content = content.replace(
            "$Name",
            appointment.patient.name ? appointment.patient.name : ""
          );
          content = content.replace(
            "$Date",
            appointment.timestamp
              ? moment(appointment.timestamp).format("dddd, Do MMMM, YYYY")
              : ""
          );
          content = content.replace(
            "$Time",
            appointment.timestamp
              ? moment(appointment.timestamp).format("hh:mm a")
              : ""
          );
          content = content.replace(
            "$Duration",
            appointment.duration ? appointment.duration + " min(s)" : ""
          );
          resolve(content);
        }
      });
    });
  });
}

export function sms(phoneNumber, content) {
  if (!phoneNumber && !content) {
    ShowOkAlert(
      "Unable to send sms, mobile no and sms body is mandatory field"
    );
  } else {
    SendSMS.send(
      {
        body: content,
        recipients: [phoneNumber],
        successTypes: ["sent", "queued"],
        allowAndroidSendWithoutReadPermission: true
      },
      (completed, cancelled, error) => {
        console.log(
          "SMS Callback: completed: " +
            completed +
            " cancelled: " +
            cancelled +
            "error: " +
            error
        );
      }
    );
  }
}

export async function downloadFile(filename, fileContent) {
  let dir = RNFetchBlob.fs.dirs.DownloadDir + "/" + moment().format("DDMMYYYY");
  if (!(await RNFetchBlob.fs.isDir(dir))) {
    RNFetchBlob.fs.mkdir(dir);
  }
  RNFetchBlob.fs.writeStream(dir + "/" + filename, "utf8").then(stream => {
    stream.write(fileContent);
    stream.close();
  });
  return dir;
}

export function filterById(data, id) {
  for (var index = 0; index < data.length; index++) {
    if (data[index].id == id) {
      return JSON.parse(JSON.stringify(data[index]));
    }
  }
  return null;
}

export async function readFile(uri, base64) {
  return RNFetchBlob.fs.readFile(uri, "base64").then(content => {
    return base64 ? content : RNFetchBlob.base64.decode(content);
  });
}

/**
 * category : "image"
 * @param {*} src
 * @param {*} category
 */
export async function copyFile(src, folder, category) {
  return new Promise(resolve => {
    if (!category) return;
    try {
      let dest = RNFetchBlob.fs.dirs.DocumentDir;
      switch (category) {
        case "image":
          dest += "/images/" + folder;
          break;
      }
      RNFetchBlob.fs.exists(dest).then(async isPresent => {
        if (!isPresent) {
          RNFetchBlob.fs.mkdir(dest);
        }
        dest += src.substr(src.lastIndexOf("/"));
        await RNFetchBlob.fs.cp(src, dest);
        resolve(dest);
      });
    } catch (err) {
      resolve(null);
    }
  });
}

/**
 * encoding - "utf8" | "ascii" | "base64"
 * @param {*} data
 * @param {*} encoding
 */
export async function writeFile(data, encoding) {
  let dir = RNFetchBlob.fs.dirs.DocumentDir + "/images/";
  if (!(await RNFetchBlob.fs.isDir(dir))) {
    RNFetchBlob.fs.mkdir(dir);
  }
  let uri = dir + uuidv4();
  return RNFetchBlob.fs
    .writeFile(uri, data, encoding)
    .then(response => {
      return response;
    })
    .catch(error => {
      ShowOkAlert("Error while saving file : \n " + error);
    });
}

export async function resourcePicker(resourceType) {
  return new Promise(resolve => {
    DocumentPicker.show({ filetype: [resourceType] }, (error, res) => {
      try {
        if (isAndroid()) {
          if (res.uri.includes("raw%3A")) {
            res["uri"] = res.uri.split("raw%3A")[1].replace(/\%2F/gm, "/");
          }
          resolve(res);
        } else {
          let arr = fileUri.split("/");
          const dirs = RNFetchBlob.fs.dirs;
          filePath = `${dirs.DocumentDir}/${arr[arr.length - 1]}`;
        }
      } catch (error) {
        console.log(error);
      }
    });
  });
}
