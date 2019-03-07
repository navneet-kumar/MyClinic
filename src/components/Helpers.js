import { Alert, Dimensions, PermissionsAndroid, Platform } from "react-native";
import { DocumentPicker } from "react-native-document-picker";
import RNImmediatePhoneCall from "react-native-immediate-phone-call";
import SendSMS from "react-native-sms";
import RNFetchBlob from "rn-fetch-blob";
import { name as appName } from "../../App";

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

export function sms(phoneNumber, content) {
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

export async function downloadFile(filename, fileContent) {
  let filePath = RNFetchBlob.fs.dirs.DownloadDir + "/" + filename;
  RNFetchBlob.fs.writeStream(filePath, "utf8").then(stream => {
    stream.write(fileContent);
    stream.close();
  });
  return filePath;
}

export function filterById(data, id) {
  for (var index = 0; index < data.length; index++) {
    if (data[index].id == id) {
      return JSON.parse(JSON.stringify(data[index]));
    }
  }
  return null;
}

export async function readFile(uri) {
  const data = await RNFetchBlob.fs.readFile(uri, "base64");
  return new Buffer(data, "base64");
}
// RNFetchBlob.fs.readFile(fileUri, "base64").then(data => {
//   res["data"] = data;
//   return res;
// });
export async function resourcePicker(resourceType) {
  DocumentPicker.show(
    {
      filetype: [resourceType]
    },
    (error, res) => {
      if (isAndroid()) {
        res["uri"] = res.uri.split("raw%3A")[1].replace(/\%2F/gm, "/");
        return res;
      } else {
        let arr = fileUri.split("/");
        const dirs = RNFetchBlob.fs.dirs;
        filePath = `${dirs.DocumentDir}/${arr[arr.length - 1]}`;
      }
    }
  );
}
