import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Text,
  Title
} from "native-base";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import Constants from "../../components/Constants";
import Styles from "../../components/Style";

const IconWithText = props => {
  return (
    <React.Fragment>
      <Left>
        <Icon name={props.name} type={props.type} style={Styles.iconStyle} />
        <Text style={styles.settingsText}>{props.text}</Text>
      </Left>
    </React.Fragment>
  );
};

export default class BackupRestore extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Container>
        <Header style={styles.themeColor}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon
                name="arrow-back"
                style={[
                  Styles.iconStyle,
                  { color: Constants.theme_compliment_color }
                ]}
              />
            </Button>
          </Left>
          <Body style={styles.themeComplementColor}>
            <Title>Appointments</Title>
          </Body>
        </Header>
        <Content />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  themeColor: {
    color: Constants.theme_color,
    backgroundColor: Constants.theme_color
  },
  themeComplementColor: {
    flex: 4,
    color: Constants.theme_complement_color,
    backgroundColor: Constants.theme_complement_color
  },
  settingsText: {
    color: Constants.theme_color,
    paddingLeft: 12
  }
});
