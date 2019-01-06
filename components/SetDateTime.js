import React from "react";
import Constants from "./Constants";
import Styles from "./Style";
import { Agenda } from "react-native-calendars";
import {
  Container,
  Header,
  Content,
  Title,
  Icon,
  Left,
  Right,
  Body,
  Button
} from "native-base";

export default class SetDateTime extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: Constants.theme_color }}>
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
          <Body>
            <Title>{Constants.date_time}</Title>
          </Body>
          <Right />
        </Header>
        <Content contentContainerStyle={{ flexGrow: 1 }}>
          <Agenda />
        </Content>
      </Container>
    );
  }
}
