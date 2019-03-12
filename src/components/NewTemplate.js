import {
  Body,
  Button,
  Container,
  Content,
  Form,
  Icon,
  Input,
  Item,
  Label,
  Left,
  Right,
  Text,
  Textarea
} from "native-base";
import React, { Component } from "react";
import { ScrollView, StyleSheet } from "react-native";
import Modal from "react-native-modalbox";
import { getSingleSetting, insertNewSetting, updateSetting } from "../Database";
import Settings from "../modal/Settings";
import Constants from "./Constants";
import { ShowOkAlert } from "./Helpers";
import Styles from "./Style";

const Suggestion = props => {
  return (
    <Button
      transparent
      onPress={props.context.onChangeText.bind(props.context, props.text, true)}
    >
      <Text style={{ color: Constants.theme_color }}>{props.name}</Text>
    </Button>
  );
};

export default class NewTemplate extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      content: "",
      isEdit: true
    };
  }

  resetForm() {
    this.setState({ title: "", content: "", isEdit: true });
    this.props.toReloadParent();
    this.hide();
  }

  show() {
    this._modal.open();
  }

  hide() {
    this._modal.close();
  }

  editTemplate(title, content) {
    if (!title) {
      ShowOkAlert("Title is mandatory for editing template.");
      return;
    }
    this.show();
    this.setState({ title: title, content: content, isEdit: false });
  }

  onChangeText(text, append) {
    if (append) {
      let msg = JSON.parse(JSON.stringify(this.state.content));
      msg = msg + text;
      text = msg;
    }
    this.setState({
      content: text
    });
  }

  onTitleChange(txt) {
    this.setState({
      title: txt
    });
  }

  saveTemplate() {
    if (!this.state.title) {
      ShowOkAlert("Title is manadatory");
      return;
    }
    if (!this.state.content) {
      ShowOkAlert("Template message is manadatory");
      return;
    }

    let newTemplate = {
      title: this.state.title,
      content: this.state.content
    };

    getSingleSetting(Constants.sms_templates).then(setting => {
      let msg = "New SMS template added !";
      if (!setting.value) {
        setting = new Settings(setting.key, new Array(newTemplate));
        insertNewSetting(setting).then(() => {
          ShowOkAlert(msg, () => this.resetForm());
        });
      } else {
        let templates = setting.getValue();
        let arr = [];

        for (var t in templates) {
          if (templates[t].title === this.state.title) {
            templates[t].content = this.state.content;
          }
          arr.push(templates[t]);
        }
        if (this.state.isEdit) {
          arr.unshift(newTemplate);
        } else {
          msg = "Template updated successfully !";
        }
        setting = new Settings(setting.getKey(), arr);
        updateSetting(setting).then(() => {
          ShowOkAlert(msg, () => this.resetForm());
        });
      }
    });
  }

  render() {
    return (
      <Modal
        position="bottom"
        style={styles.modal}
        ref={modal => {
          this._modal = modal;
        }}
        swipeToClose={this.state.swipeToClose}
      >
        <Container>
          <Content>
            <Form>
              <Item style={styles.item}>
                <Left />
                <Body>
                  <Text style={styles.label}>New Template</Text>
                </Body>
                <Right>
                  <Button transparent onPress={() => this.resetForm()}>
                    <Icon
                      name="cancel"
                      type="MaterialIcons"
                      style={Styles.iconStyle}
                    />
                  </Button>
                </Right>
              </Item>
              <Item style={styles.item}>
                <Label style={styles.label}>Title</Label>
              </Item>
              <Item style={styles.item}>
                <Input
                  editable={this.state.isEdit}
                  ref={title => {
                    this._title = title;
                  }}
                  onChangeText={this.onTitleChange.bind(this)}
                  value={this.state.title}
                  style={styles.textInput}
                />
              </Item>
              <Item style={styles.item}>
                <Label style={styles.label}>Message</Label>
              </Item>
              <ScrollView
                horizontal={true}
                style={{ borderColor: "transparent", padding: 0 }}
              >
                <Suggestion context={this} name="Salutation" text="$Mr" />
                <Suggestion context={this} name="Name" text="$Name" />
                <Suggestion
                  context={this}
                  name="Appointment Date"
                  text="$Date"
                />
                <Suggestion
                  context={this}
                  name="Appointment Time"
                  text="$Time"
                />
                <Suggestion
                  context={this}
                  name="Appointment Duration"
                  text="$Duration"
                />
              </ScrollView>
              <Item style={styles.item}>
                <Textarea
                  ref={content => {
                    this._content = content;
                  }}
                  onChangeText={this.onChangeText.bind(this)}
                  value={this.state.content}
                  style={styles.textInput}
                  rowSpan={7}
                />
              </Item>
              <Item style={styles.button}>
                <Button
                  style={styles.themeColor}
                  onPress={this.saveTemplate.bind(this)}
                >
                  <Text>Save</Text>
                </Button>
              </Item>
            </Form>
          </Content>
        </Container>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    height: "80%"
  },
  themeColor: {
    backgroundColor: Constants.theme_color
  },
  label: {
    color: Constants.theme_color,
    textDecorationLine: "underline"
  },
  textInput: {
    flex: 1,
    backgroundColor: "#eaecef"
  },
  item: {
    borderColor: "transparent",
    padding: 4
  },
  button: {
    justifyContent: "center",
    borderColor: "transparent",
    padding: 15
  }
});
