import {
  Container,
  Content,
  Icon,
  Left,
  List,
  ListItem,
  Text
} from "native-base";
import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { DocumentPickerUtil } from "react-native-document-picker";
import ActivityProgress from "../../components/ActivityProgress";
import CommonHeader from "../../components/CommonHeader";
import Constants from "../../components/Constants";
import {
  createDirectory,
  downloadFile,
  readFile,
  resourcePicker,
  ShowOkAlert
} from "../../components/Helpers";
import Styles from "../../components/Style";
import {
  appointment_table_name,
  getAllAppointment,
  getAllPatients,
  getAllSettings,
  insertAppointments,
  insertPatients,
  insertSettings,
  patient_table_name,
  settings_table_name
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

  async backup() {
    this.setState({ showActivityIndicator: true });

    try {
      const allAppointments = await getAllAppointment();
      const allPatients = await getAllPatients();
      const allSettings = await getAllSettings();

      const data = [
        { table: appointment_table_name, content: allAppointments },
        { table: patient_table_name, content: allPatients },
        { table: settings_table_name, content: allSettings }
      ];

      let dir = await createDirectory();
      let promises = [];
      data.map(async item => {
        const p = downloadFile(
          dir,
          item.table + Constants.backup_extension,
          JSON.stringify(item.content)
        );
        promises.push(p);
      });
      const folder = await Promise.all(promises);

      ShowOkAlert("Backup successful, files stored at : \n" + folder[0]);
      this.setState({ showActivityIndicator: false });
    } catch (err) {
      this.setState({ showActivityIndicator: false });
      ShowOkAlert("Error occurred while taking backup :" + err);
    }
  }

  restore() {
    this.setState({ showActivityIndicator: true });
    resourcePicker(DocumentPickerUtil.allFiles()).then(res => {
      let tableName = res
        ? res.fileName.split(".")[0]
        : this.setState({ showActivityIndicator: false });
      if (tableName) {
        switch (tableName) {
          case appointment_table_name:
            readFile(res.uri, false).then(plainText => {
              insertAppointments(JSON.parse(plainText))
                .then(count => {
                  this.setState({ showActivityIndicator: false });
                  ShowOkAlert(count + " appointments restored successfully !");
                })
                .catch(err => {
                  this.setState({ showActivityIndicator: false });
                  ShowOkAlert(
                    "Something went wrong while restoring file : " + err
                  );
                });
            });
            break;
          case patient_table_name:
            readFile(res.uri, false).then(plainText => {
              insertPatients(JSON.parse(plainText))
                .then(count => {
                  this.setState({ showActivityIndicator: false });
                  ShowOkAlert(count + " patients restored successfully !");
                })
                .catch(err => {
                  this.setState({ showActivityIndicator: false });
                  ShowOkAlert(
                    "Something went wrong while restoring file : " + err
                  );
                });
            });
            break;
          case settings_table_name:
            readFile(res.uri, false).then(plainText => {
              insertSettings(JSON.parse(plainText))
                .then(count => {
                  this.setState({ showActivityIndicator: false });
                  ShowOkAlert(count + " settings restored successfully !");
                })
                .catch(err => {
                  this.setState({ showActivityIndicator: false });
                  ShowOkAlert(
                    "Something went wrong while restoring file : " + err
                  );
                });
            });
            break;
          default:
            ShowOkAlert(
              "Unrecognized backup file " +
                res.fileName +
                ", make sure not to change name or content of backup file."
            );
        }
      }
    });
  }

  render() {
    return (
      <Container>
        <ActivityProgress
          showActivityIndicator={this.state.showActivityIndicator}
        />
        <CommonHeader
          title="Backup and Restore"
          iconName="arrow-back"
          goBack={this.props.navigation.goBack}
        />
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
