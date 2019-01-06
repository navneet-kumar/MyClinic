import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";
import Constant from "./Constants";

const Styles = StyleSheet.create({
  cardBody: {
    flex: 1,
    flexDirection: "column",
    padding: 15,
    backgroundColor: Constant.theme_color
  },
  cardRow: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    backgroundColor: Constant.theme_compliment_color
  },
  space: {
    flexDirection: "row",
    height: 2 * Constant.icon_size,
    paddingLeft: Constant.icon_size,
    paddingRight: Constant.icon_size,
    borderColor: Constant.theme_color
  },
  line: {
    borderWidth: 0.5,
    height: 2 * Constant.icon_size,
    borderColor: Constant.theme_color
  }
});

const verticalDivider = (
  <View style={Styles.space}>
    <View style={Styles.line} />
  </View>
);

/**
 * Appointment card
 */
export default class AppointmentCard extends React.Component {
  render() {
    return (
      <View style={Styles.cardBody}>
        <View style={Styles.cardRow}>
          <Icon
            name="user"
            size={2 * Constant.icon_size}
            color={Constant.theme_color}
          />
          {verticalDivider}
          <Text>{this.props.name}</Text>
        </View>
        <View style={Styles.cardRow}>
          <Icon
            name="phone"
            size={2 * Constant.icon_size}
            color={Constant.theme_color}
          />
          {verticalDivider}
          <Text>{this.props.mobile}</Text>
        </View>
        <View style={Styles.cardRow}>
          <Icon
            name="child"
            size={2 * Constant.icon_size}
            color={Constant.theme_color}
          />
          {verticalDivider}
          <Text>{this.props.age}</Text>
          <View style={Styles.space} />
          <View style={Styles.space} />
          <View style={Styles.space} />
          <View style={Styles.space} />
          <Icon
            name="transgender"
            size={2 * Constant.icon_size}
            color={Constant.theme_color}
          />
          {verticalDivider}
          <Text>{this.props.gender}</Text>
        </View>
        <View style={Styles.cardRow}>
          <Icon
            name="pencil"
            size={2 * Constant.icon_size}
            color={Constant.theme_color}
          />
          {verticalDivider}
          <Text>{this.props.description}</Text>
        </View>
      </View>
    );
  }
}

AppointmentCard.propTypes = {
  name: PropTypes.string,
  mobile: PropTypes.string,
  age: PropTypes.number,
  gender: PropTypes.oneOf(["male", "female"]),
  description: PropTypes.string
};
