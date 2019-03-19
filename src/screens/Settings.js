import {
  Container,
  Content,
  Icon,
  Left,
  List,
  ListItem,
  Right,
  Text
} from "native-base";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import CommonHeader from "../components/CommonHeader";
import Constant from "../components/Constants";
import Styles from "../components/Style";

const IconWithText = props => {
  return (
    <React.Fragment>
      <Left>
        <Icon name={props.name} type={props.type} style={Styles.iconStyle} />
        <Text style={styles.settingsText}>{props.text}</Text>
      </Left>
      <Right>
        <Icon name="arrow-forward" style={Styles.iconStyle} />
      </Right>
    </React.Fragment>
  );
};

export default class Settings extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Container>
        <CommonHeader
          title="Settings"
          iconType="SimpleLineIcons"
          iconName="settings"
        />
        <Content>
          <List>
            <ListItem onPress={() => this.props.navigation.navigate("sms")}>
              <IconWithText
                name="message-settings"
                type="MaterialCommunityIcons"
                text="SMS"
              />
            </ListItem>
            <ListItem
              onPress={() => this.props.navigation.navigate("backupRestore")}
            >
              <IconWithText
                name="settings-backup-restore"
                type="MaterialIcons"
                text="Backup & Resotre"
              />
            </ListItem>
            <ListItem
              onPress={() => this.props.navigation.navigate("appointment")}
            >
              <IconWithText
                name="calendar-range"
                type="MaterialCommunityIcons"
                text="Appointment"
              />
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  themeColor: {
    color: Constant.theme_color,
    backgroundColor: Constant.theme_color
  },
  themeComplementColor: {
    flex: 4,
    color: Constant.theme_complement_color,
    backgroundColor: Constant.theme_complement_color
  },
  settingsText: {
    color: Constant.theme_color,
    paddingLeft: 12
  }
});
