import { Card, CardItem, Icon, Left, Right, Text } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Constants, { Status } from "./Constants";
import { call, positiveNegativeNeutralAlert, sms } from "./Helpers";
import Styles from "./Style";

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

getIconStyle = function(status, extra) {
  return status == Status.CANCELLED
    ? [Styles.iconStyle, style.themeDisabled, extra]
    : [Styles.iconStyle, extra];
};

getTextStyle = function(status, extra) {
  return status == Status.PENDING
    ? [style.theme, extra]
    : [style.themeDisabled, extra];
};

const PatientName = props => {
  if (props.name) {
    return (
      <Left>
        <Icon name="person" style={getIconStyle(props.status)} />
        <Text style={getTextStyle(props.status)}>{props.name}</Text>
      </Left>
    );
  } else {
    return null;
  }
};

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
          <Icon
            name="call"
            style={getIconStyle(props.status, { paddingRight: 10 })}
          />
          <Icon
            name="message-text"
            type="MaterialCommunityIcons"
            style={getIconStyle(props.status)}
          />
          <Text style={getTextStyle(props.status)}>{props.mobile}</Text>
        </TouchableOpacity>
      </Left>
    );
  } else {
    return null;
  }
};

const PatientGender = props => {
  if (props.gender && (props.gender === "male" || props.gender === "female")) {
    return <Icon name={props.gender} style={getIconStyle(props.status)} />;
  } else {
    return null;
  }
};

const PatientAge = props => {
  if (props.age) {
    return <Text style={getTextStyle(props.status)}>{props.age} yr(s)</Text>;
  } else {
    return null;
  }
};

const Treatment = props => {
  if (props.treatment) {
    return (
      <CardItem style={style.cardRow}>
        <Icon
          type="FontAwesome"
          name="stethoscope"
          style={getIconStyle(props.status)}
        />
        <Text style={getTextStyle(props.status)}>{props.treatment}</Text>
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
        <Icon
          type="FontAwesome"
          name="user-md"
          style={getIconStyle(props.status)}
        />
        <Text style={getTextStyle(props.status)}>{props.description}</Text>
      </CardItem>
    );
  } else {
    return null;
  }
};

const Options = props => {
  if (props.status == Status.PENDING) {
    return (
      <TouchableOpacity onPress={() => props.onOptionsPress(props.patientId)}>
        <Right style={{ flex: 1 }}>
          <Icon
            type="SimpleLineIcons"
            name="options-vertical"
            style={style.theme}
          />
        </Right>
      </TouchableOpacity>
    );
  } else {
    return null;
  }
};

const Details = props => {
  if (props.status != Status.CANCELLED) {
    return (
      <TouchableOpacity
        onPress={() => props.onUploadPress(props.appointmentId)}
      >
        <Right>
          <Icon type="FontAwesome" name="upload" style={style.theme} />
        </Right>
      </TouchableOpacity>
    );
  } else {
    return null;
  }
};

/**
 * Appointment card
 */
export default class AppointmentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointment: this.props.content
    };
  }

  render() {
    return (
      <Card style={{ flex: 0 }}>
        <CardItem style={style.cardRow}>
          <PatientName
            name={this.props.content.patient.name}
            status={this.props.content.status}
          />
          <Options
            patientId={this.props.content.id}
            status={this.props.content.status}
            onOptionsPress={this.props.onAppointmentDismiss}
          />
        </CardItem>
        <CardItem style={style.cardRow}>
          <PatientPhone
            mobile={this.props.content.patient.mobile}
            name={this.props.content.patient.name}
            status={this.props.content.status}
          />
          <Left style={{ flex: 0 }}>
            <PatientGender
              gender={this.props.content.patient.gender}
              status={this.props.content.status}
            />
            <PatientAge
              age={this.props.content.patient.age}
              status={this.props.content.status}
            />
          </Left>
        </CardItem>
        <Treatment
          treatment={this.props.content.treatment}
          status={this.props.content.status}
        />
        <Description
          description={this.props.content.description}
          status={this.props.content.status}
        />
        <CardItem style={style.upload}>
          <Details
            appointmentId={this.props.content.id}
            status={this.props.content.status}
            onUploadPress={this.props.onUploadPress}
          />
        </CardItem>
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
  },
  theme: {
    color: Constants.theme_color
  },
  themeDisabled: {
    color: "grey"
  },
  upload: {
    flex: 0,
    flexDirection: "row-reverse",
    paddingTop: 0
  }
});

AppointmentCard.propTypesTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  mobile: PropTypes.string,
  age: PropTypes.number,
  gender: PropTypes.oneOf(["male", "female"]),
  description: PropTypes.string,
  treatment: PropTypes.string
};
