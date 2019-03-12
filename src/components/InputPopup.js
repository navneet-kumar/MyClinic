import { Button, Container, Content, Icon, Input, Item } from "native-base";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { DocumentPickerUtil } from "react-native-document-picker";
import Modal from "react-native-modalbox";
import Constants from "./Constants";
import Styles from "./Style";

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
  constructor() {
    super();
    this.state = {
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3
    };
  }

  show() {
    this._modal.open();
  }

  hide() {
    this._modal.close();
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
              <Item style={{ borderColor: "transparent" }}>
                <Item style={{ width: "50%" }}>
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
                  />
                </Item>
                <Item
                  style={{
                    width: "50%",
                    borderColor: "transparent",
                    padding: "5%"
                  }}
                >
                  <Button
                    style={{ backgroundColor: Constants.theme_color }}
                    iconRight
                    onPress={() => resourcePicker(DocumentPickerUtil.images())}
                  >
                    <Text style={styles.text}>Upload image</Text>
                    <Icon
                      name="camera"
                      type="FontAwesome"
                      style={[
                        Styles.iconStyle,
                        { color: Constants.theme_compliment_color }
                      ]}
                    />
                  </Button>
                </Item>
              </Item>
              <Item
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: "transparent"
                }}
              >
                <ActionButton
                  name="Done"
                  onTap={() => {
                    this.hide();
                  }}
                />
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
    padding: "8%",
    backgroundColor: Constants.theme_compliment_color
  },

  modalButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
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
