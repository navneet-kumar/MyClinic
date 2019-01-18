import { PermissionsAndroid } from "react-native";
import { name as appName } from "../app.json";
import { Alert } from "react-native";

export async function GetAllPermissions() {
  try {
    const userResponse = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      PermissionsAndroid.PERMISSIONS.CALL_PHONE
    ]);
    return userResponse;
  } catch (err) {
    console.warn(err);
    return null;
  }
}

export async function ShowOkAlert(message) {
  try {
    Alert.alert(
      appName,
      message,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  } catch (err) {}
}
