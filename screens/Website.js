import React from "react";
import { Text, View, WebView } from "react-native";
import Styles from "../components/Style";
import Constant from "../components/Constants";

export default class Website extends React.Component {
  static navigationOptions = {
    tapBarLabel: "Website"
  };
  render() {
    return (
      <WebView
        source={{ uri: Constant.website_url }}
        style={{ marginTop: 25 }}
      />
    );
  }
}
