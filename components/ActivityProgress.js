import React, { Component } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import Constants from "../components/Constants";
import { isAndroid } from "./Helpers";

export default class ActivityProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showActivityIndicator: props.showActivityIndicator
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.showActivityIndicator != prevProps.showActivityIndicator) {
      this.setState({
        showActivityIndicator: this.props.showActivityIndicator
      });
    }
  }

  render() {
    return (
      <ActivityIndicator
        size={isAndroid() ? 100 : "large"}
        color={Constants.theme_color}
        animating={true}
        style={[
          { opacity: this.state.showActivityIndicator ? 1 : 0 },
          styles.spinnerLoading
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  spinnerLoading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});
