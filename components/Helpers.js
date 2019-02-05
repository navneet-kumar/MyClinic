import { Alert, PermissionsAndroid, Platform } from "react-native";
import { name as appName } from "../app.json";

export async function GetAllPermissions() {
  try {
    if (Platform.OS === "android") {
      const userResponse = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        PermissionsAndroid.PERMISSIONS.CALL_PHONE
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
