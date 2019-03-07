import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Left,
  List,
  ListItem,
  Text,
  Title
} from "native-base";
import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { DocumentPickerUtil } from "react-native-document-picker";
import ActivityProgress from "../../components/ActivityProgress";
import Constants from "../../components/Constants";
import {
  downloadFile,
  readFile,
  resourcePicker,
  ShowOkAlert
} from "../../components/Helpers";
import Styles from "../../components/Style";
import {
  getAllAppointment,
  getAllPatients,
  getAllSettings
} from "../../Database";

const IconWithText = props => {
  return (
    <TouchableOpacity style={styles.full} onPress={() => props.onPress()}>
      <Left>
        <Icon name={props.name} type={props.type} style={Styles.iconStyle} />
        <Text style={styles.settingsText}>{props.text}</Text>
      </Left>
    </TouchableOpacity>
  );
};

export default class BackupRestore extends Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.state = {
      showActivityIndicator: false
    };
  }

  backup() {
    this.setState({ showActivityIndicator: true });

    getAllAppointment()
      .then(allAppointment => {
        downloadFile("appointment.json", JSON.stringify(allAppointment));
      })
      .then(() => {
        getAllPatients().then(allPatients => {
          downloadFile("patients.json", JSON.stringify(allPatients));
        });
      })
      .then(() => {
        getAllSettings().then(allSettings => {
          downloadFile("settings.json", JSON.stringify(allSettings));
        });
      })
      .then(() => {
        this.setState({ showActivityIndicator: false });
        ShowOkAlert(" Backup Completed ..!");
      });
  }

  restore() {
    resourcePicker(DocumentPickerUtil.allFiles()).then(res => {
      console.log(res);
      let content = readFile(res.uri);
      console.log(content);
    });
    // let content = readFile(resource.uri);
    // console.log(content);
  }

  render() {
    return (
      <Container>
        <ActivityProgress
          showActivityIndicator={this.state.showActivityIndicator}
        />
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
            <Title>Backup and Restore</Title>
          </Body>
        </Header>
        <Content>
          <List>
            <ListItem>
              <IconWithText
                name="storage"
                type="MaterialIcons"
                text="Take Backup"
                onPress={this.backup.bind(this)}
              />
            </ListItem>
            <ListItem>
              <IconWithText
                name="file-restore"
                type="MaterialCommunityIcons"
                text="Restore Backup"
                onPress={this.restore.bind(this)}
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
  },
  full: {
    flex: 1,
    flexDirection: "row"
  }
});
