import { Card, CardItem, Icon, Left, Right, Text } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Constants from "./Constants";
import { call, positiveNegativeNeutralAlert, sms } from "./Helpers";
import Styles from "./Style";

const PatientName = props => {
  if (props.name) {
    return (
      <Left>
        <Icon name="person" style={Styles.iconStyle} />
        <Text style={{ color: Constants.theme_color }}>{props.name}</Text>
      </Left>
    );
  } else {
    return null;
  }
};

function onContactPress(name, contactNo) {
  positiveNegativeNeutralAlert(
    "Select action for patient '" + name + "' \n " + contactNo,
    "call",
    "send sms",
    "cancel",
    () => call(contactNo),
    () => sms(contactNo, Constants.myclinic_address)
  );
}

const PatientPhone = props => {
  if (props.mobile) {
    return (
      <Left>
        <TouchableOpacity
          style={{ flex: 1, flexDirection: "row" }}
          onPress={() => {
            onContactPress(props.name, props.mobile);
          }}
        >
          <Icon name="call" style={[Styles.iconStyle, { paddingRight: 10 }]} />
          <Icon
            name="message-text"
            type="MaterialCommunityIcons"
            style={Styles.iconStyle}
          />
          <Text style={{ color: Constants.theme_color }}>{props.mobile}</Text>
        </TouchableOpacity>
      </Left>
    );
  } else {
    return null;
  }
};

const PatientGender = props => {
  if (props.gender) {
    return <Icon name={props.gender} style={Styles.iconStyle} />;
  } else {
    return null;
  }
};

const PatientAge = props => {
  if (props.age) {
    return (
      <Text style={{ color: Constants.theme_color }}>{props.age} yr(s)</Text>
    );
  } else {
    return null;
  }
};

const Treatment = props => {
  if (props.treatment) {
    return (
      <CardItem style={style.cardRow}>
        <Icon type="FontAwesome" name="stethoscope" style={Styles.iconStyle} />
        <Text style={{ color: Constants.theme_color }}>{props.treatment}</Text>
      </CardItem>
    );
  } else {
    return null;
  }
};

const Description = props => {
  if (props.description) {
    return (
      <CardItem style={style.cardRow}>
        <Icon type="FontAwesome" name="user-md" style={Styles.iconStyle} />
        <Text style={{ color: Constants.theme_color }}>
          {props.description}
        </Text>
      </CardItem>
    );
  } else {
    return null;
  }
};

/**
 * Appointment card
 */
export default class Appointment extends React.Component {
  render() {
    return (
      <Card style={{ flex: 0 }}>
        <CardItem style={style.cardRow}>
          <PatientName name={this.props.name} />
          <TouchableOpacity
            onPress={() =>
              this.props.isDisabled
                ? null
                : this.props.onAppointmentDismiss(this.props.id)
            }
          >
            <Right style={{ flex: 1 }}>
              <Icon
                type="MaterialIcons"
                name="cancel"
                style={{ color: Constants.theme_color_error }}
              />
            </Right>
          </TouchableOpacity>
        </CardItem>
        <CardItem style={style.cardRow}>
          <PatientPhone mobile={this.props.mobile} name={this.props.name} />
          <Left style={{ flex: 0 }}>
            <PatientGender gender={this.props.gender} />
            <PatientAge age={this.props.age} />
          </Left>
        </CardItem>
        <Treatment treatment={this.props.treatment} />
        <Description description={this.props.description} />
        <CardItem />
      </Card>
    );
  }
}

const style = StyleSheet.create({
  cardRow: {
    paddingBottom: 0
  },
  button: {
    height: "10%",
    paddingLeft: 0
  }
});

Appointment.propTypesTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  mobile: PropTypes.string,
  age: PropTypes.number,
  gender: PropTypes.oneOf(["male", "female"]),
  description: PropTypes.string,
  treatment: PropTypes.string
};
