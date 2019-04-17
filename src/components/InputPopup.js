import {
  Button,
  Container,
  Content,
  Icon,
  Input,
  Item,
  Left,
  Right
} from "native-base";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { DocumentPickerUtil } from "react-native-document-picker";
import Modal from "react-native-modalbox";
import { getAppointmentById, updateAppointment } from "../Database";
import ActivityProgress from "./ActivityProgress";
import Constants from "./Constants";
import { copyFile, resourcePicker, ShowOkAlert } from "./Helpers";
import Styles from "./Style";

const Attachment = props => {
  return (
    <Button transparent icon style={{ padding: 0 }}>
      <Text>{props.fileName}</Text>
      <Icon
        name="circle-with-cross"
        type="Entypo"
        style={{
          color: Constants.theme_color_error
        }}
        onPress={() => props.onPress(props.index)}
      />
    </Button>
  );
};

const ActionButton = props => {
  return (
    <Button
      style={styles.modalButton}
      onPress={() => {
        props.onTap();
      }}
    >
      {props.icon ? props.icon : null}
      <Text style={styles.text}>{props.name}</Text>
    </Button>
  );
};

export default class InputPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: false,
      swipeToClose: false,
      sliderValue: 0.3,
      attachments: [],
      showActivityIndicator: false,
      appointmentId: null,
      earnings: null
    };
  }

  show() {
    this._modal.open();
  }

  hide() {
    this._modal.close();
  }

  componentWillReceiveProps(props) {
    if (props && props.appointmentId) {
      this.setState({ appointmentId: props.appointmentId });
    }
  }

  selectResource() {
    resourcePicker(DocumentPickerUtil.images()).then(result => {
      if (result && result.uri) {
        if (this.state.attachments.includes(result.uri)) {
          ShowOkAlert(result.fileName + " - already selected.");
        } else {
          this.setState({
            attachments: this.state.attachments.concat(result)
          });
        }
      } else {
        ShowOkAlert("Error, not a valid file: " + JSON.stringify(result));
      }
    });
  }

  removeResource(index) {
    let selectedFiles = [].concat(this.state.attachments);
    if (index < selectedFiles.length) {
      selectedFiles.splice(index, 1);
      this.setState({ attachments: selectedFiles });
    }
  }

  async uploadResource() {
    return new Promise(async resolve => {
      let selectedFiles = this.state.attachments;
      let promises = [];
      try {
        if (selectedFiles.length > 0) {
          selectedFiles.map(file => {
            promises.push(copyFile(file, this.state.appointmentId, "image"));
          });
          let uploadedResources = await Promise.all(promises);
          resolve(uploadedResources);
        } else {
          resolve([]);
        }
      } catch (err) {
        ShowOkAlert("Error occurred while uploading ");
      }
    });
  }

  refresh() {
    this.setState({
      attachments: [],
      showActivityIndicator: false,
      appointmentId: null
    });
    this.hide();
  }

  async onDone() {
    if (this.state.earnings || this.state.attachments.length > 0) {
      this.setState({ showActivityIndicator: true });
      let uploadedResources = await this.uploadResource();
      let appointment = await getAppointmentById(this.state.appointmentId);
      appointment.images = uploadedResources;
      appointment.earnings = this.state.earnings;
      if (await updateAppointment(appointment)) {
        ShowOkAlert("Appointment updated successfully !!");
      }
      this.refresh();
    }
    this.hide();
  }

  render() {
    return (
      <Modal
        style={styles.verticalList}
        position={this.props.position ? this.props.position : "bottom"}
        swipeArea={20}
        isDisabled={false}
        ref={modal => {
          this._modal = modal;
        }}
      >
        <Container>
          <Content>
            <View style={styles.modal}>
              <ActivityProgress
                showActivityIndicator={this.state.showActivityIndicator}
              />
              <Item
                style={{
                  borderColor: "transparent",
                  flex: 1,
                  flexDirection: "column"
                }}
              >
                <Item>
                  <Icon
                    name="rupee"
                    type="FontAwesome"
                    style={Styles.iconStyle}
                  />
                  <Input
                    placeholder="Earning"
                    keyboardType="numeric"
                    maxLength={6}
                    style={{ color: Constants.theme_color }}
                    placeholderTextColor={Constants.theme_color}
                    onChangeText={text => {
                      this.setState({ earnings: parseInt(text) });
                    }}
                  />
                </Item>
                <Item>
                  <Left>
                    <Button
                      onPress={this.selectResource.bind(this)}
                      style={{
                        backgroundColor: Constants.theme_color
                      }}
                    >
                      <Icon
                        name="attachment"
                        type="Entypo"
                        style={[
                          Styles.iconStyle,
                          { color: Constants.theme_compliment_color }
                        ]}
                      />
                    </Button>
                  </Left>
                  <Right>
                    {this.state.attachments.map((res, index) => {
                      return (
                        <Attachment
                          key={index}
                          context={this}
                          onPress={this.removeResource.bind(this)}
                          fileName={res.fileName}
                          index={index}
                        />
                      );
                    })}
                  </Right>
                </Item>
                <Item />
                <Item
                  style={{
                    paddingTop: "12%",
                    borderColor: "transparent"
                  }}
                >
                  <ActionButton name="Done" onTap={this.onDone.bind(this)} />
                </Item>
              </Item>
            </View>
          </Content>
        </Container>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    padding: "4%",
    backgroundColor: Constants.theme_compliment_color
  },

  modalButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    backgroundColor: Constants.theme_color
  },
  text: {
    color: Constants.theme_compliment_color,
    fontSize: 16,
    paddingLeft: 6,
    paddingRight: 6
  },
  verticalList: {
    height: 230
  }
});
