import { Body, Button, Header, Icon, Left, Right, Title } from "native-base";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import Constants from "../components/Constants";
import Styles from "../components/Style";

export default class CommonHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Header style={styles.themeColor}>
        <Left>
          <Button
            transparent
            onPress={() => (this.props.goBack ? this.props.goBack() : null)}
          >
            <Icon
              type={this.props.iconType}
              name={this.props.iconName}
              style={[
                Styles.iconStyle,
                { color: Constants.theme_compliment_color }
              ]}
            />
          </Button>
        </Left>
        <Body style={styles.themeComplementColor}>
          <Title style={styles.title}>{this.props.title}</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  themeColor: {
    color: Constants.theme_color,
    backgroundColor: Constants.theme_color
  },
  themeComplementColor: {
    flex: 2,
    color: Constants.theme_complement_color,
    backgroundColor: Constants.theme_complement_color
  },
  title: {
    color: Constants.theme_compliment_color
  }
});
