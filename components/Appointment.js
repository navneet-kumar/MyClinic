import { Button, Card, CardItem, Icon, Left, Right, Text } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet } from "react-native";
import Constants from "./Constants";
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

const PatientPhone = props => {
  if (props.mobile) {
    return (
      <Left>
        <Button light iconLeft style={style.button}>
          <Icon
            name="message-text"
            type="MaterialCommunityIcons"
            style={Styles.iconStyle}
          />
          <Icon name="call" style={Styles.iconStyle} />
          <Text style={{ color: Constants.theme_color }}>{props.mobile}</Text>
        </Button>
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
          <Right style={{ flex: 1 }}>
            <Icon
              type="MaterialIcons"
              name="cancel"
              style={{ color: Constants.theme_color_error }}
            />
          </Right>
        </CardItem>
        <CardItem style={style.cardRow}>
          <PatientPhone mobile={this.props.mobile} />
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
