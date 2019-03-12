import { Button, Container, Content } from "native-base";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modalbox";
import Constants from "./Constants";

const ActionButton = props => {
  return (
    <Button
      block
      rounded
      style={styles.modalButton}
      onPress={() => {
        props.context.hide();
        props.onTap();
      }}
    >
      <Text style={styles.text}>{props.name}</Text>
    </Button>
  );
};

export default class ActionPopup extends Component {
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
              {this.props.elements.map((element, index) => {
                return (
                  <ActionButton
                    key={index}
                    name={Object.keys(element)[0]}
                    onTap={element[Object.keys(element)[0]]}
                    context={this}
                  />
                );
              })}
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
    justifyContent: "space-between",
    backgroundColor: Constants.theme_compliment_color
  },

  modalButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Constants.theme_color
  },
  text: {
    color: Constants.theme_compliment_color,
    fontSize: 18,
    fontWeight: "bold"
  },
  verticalList: {
    height: 230
  }
});
