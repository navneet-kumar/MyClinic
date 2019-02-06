import { Card, CardItem, Icon, Text } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import Constants from "./Constants";
import { ShowOkAlert } from "./Helpers";
import Styles from "./Style";

/**
 * Appointment card
 */
export default class Appointment extends React.Component {
  render() {
    return (
      <Card>
        <CardItem>
          <Icon name="person" style={Styles.iconStyle} />
          <Text style={{ color: Constants.theme_color }}>
            {this.props.name}
          </Text>
        </CardItem>
        <CardItem>
          <Icon name={this.props.gender} style={Styles.iconStyle} />
          <Text style={{ color: Constants.theme_color }}>
            {this.props.age} yr(s)
          </Text>
          <CardItem />
          <Icon
            onPress={() => {
              ShowOkAlert(
                "This action will call patient, currently it's in testing mode. "
              );
            }}
            name="call"
            style={Styles.iconStyle}
          />
          <Icon
            onPress={() => {
              ShowOkAlert(
                "This action will send message patient, currently it's in testing mode."
              );
            }}
            name="new-message"
            type="Entypo"
            style={Styles.iconStyle}
          />
          <CardItem style={{ alignSelf: "flex-end" }}>
            <Text style={{ color: Constants.theme_color }}>
              {this.props.mobile}
            </Text>
          </CardItem>
        </CardItem>
        <CardItem>
          <Icon
            type="FontAwesome"
            name="stethoscope"
            style={Styles.iconStyle}
          />
          <Text style={{ color: Constants.theme_color }}>
            {this.props.treatment}
          </Text>
        </CardItem>
        <CardItem>
          <Icon type="FontAwesome" name="user-md" style={Styles.iconStyle} />
          <Text style={{ color: Constants.theme_color }}>
            {this.props.description}
          </Text>
        </CardItem>
      </Card>
    );
  }
}

Appointment.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  mobile: PropTypes.string,
  age: PropTypes.number,
  gender: PropTypes.oneOf(["male", "female"]),
  description: PropTypes.string,
  treatment: PropTypes.string
};
