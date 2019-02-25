import {
  Container,
  Content,
  Left,
  ListItem,
  Radio,
  Right,
  Text,
  View
} from "native-base";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import Modal from "react-native-modalbox";
import Constants from "./Constants";
import { ShowOkAlert } from "./Helpers";

const Option = props => {
  let isSelected = false;
  if (props.selected === props.name) {
    isSelected = true;
  }
  return (
    <ListItem selected>
      <Left>
        <Text style={styles.text}>{props.name}</Text>
      </Left>
      <Right>
        <Radio
          onPress={() => props.onSelectionChange(props.name)}
          selected={isSelected}
        />
      </Right>
    </ListItem>
  );
};

export default class SelectPopup extends Component {
  constructor() {
    super();
    this.state = {
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3
    };
  }

  show() {
    this.props.elements
      ? this._modal.open()
      : ShowOkAlert(
          "There are not templates available, please add templates first."
        );
  }

  hide() {
    this._modal.close();
  }

  render() {
    return (
      <Modal
        style={styles.wrapper}
        position={"center"}
        swipeArea={20}
        isDisabled={false}
        ref={modal => {
          this._modal = modal;
        }}
      >
        <Container>
          <Content>
            <View style={styles.modal}>
              {this.props.elements
                ? this.props.elements.map((element, index) => {
                    return (
                      <Option
                        key={index}
                        name={element[Object.keys(element)[0]]}
                        selected={this.props.selected}
                        onSelectionChange={this.props.onSelectionChange}
                      />
                    );
                  })
                : null}
            </View>
          </Content>
        </Container>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: "60%"
  },
  modal: {
    padding: "1%",
    backgroundColor: Constants.theme_compliment_color
  },
  text: {
    color: Constants.theme_color
  }
});
