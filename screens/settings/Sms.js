import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Item,
  Left,
  List,
  ListItem,
  Right,
  Switch,
  Text,
  Title
} from "native-base";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import Accordion from "../../components/Accordion";
import Constants from "../../components/Constants";
import { ShowOkAlert } from "../../components/Helpers";
import NewTemplate from "../../components/NewTemplate";
import SelectPopup from "../../components/SelectPopup";
import Styles from "../../components/Style";
import { getSingleSetting, insertNewSetting } from "../../database/Database";
import Settings from "../../modal/Settings";

export default class Sms extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      appointmentAddSms: undefined,
      smsTemplates: []
    };
    this.getTemplates();
    this.getSendSmsSetting();
  }

  getTemplates() {
    getSingleSetting(Constants.sms_templates).then(templates => {
      this.setState({ smsTemplates: templates.getValue() });
    });
  }

  getSendSmsSetting() {
    getSingleSetting(Constants.sms_appointment).then(template => {
      this.setState({ appointmentAddSms: template.getValue() });
    });
  }

  onTemplateChange(val) {
    insertNewSetting(new Settings(Constants.sms_appointment, val)).then(
      setting => {
        this.setState({
          appointmentAddSms: setting.getValue()
        });
      }
    );
  }

  deleteTemplate(item) {
    let newTemplate = [];
    if (item.title === this.state.appointmentAddSms) {
      ShowOkAlert(
        'Template "' +
          item.title +
          '" is being used and hence cannot be deleted !'
      );
      return;
    }
    for (let t in this.state.smsTemplates) {
      if (this.state.smsTemplates[t].title !== item.title) {
        newTemplate.push(this.state.smsTemplates[t]);
      }
    }
    insertNewSetting(new Settings(Constants.sms_templates, newTemplate)).then(
      setting => {
        this.setState({ smsTemplates: JSON.parse(setting.value) });
      }
    );
  }

  editTemplate(item) {
    this._template.editTemplate(item.title, item.content);
  }

  render() {
    return (
      <Container>
        <NewTemplate
          ref={template => {
            this._template = template;
          }}
          toReloadParent={this.getTemplates.bind(this)}
        />
        <SelectPopup
          ref={selectPopup => {
            this._selectPopup = selectPopup;
          }}
          elements={this.state.smsTemplates}
          selected={this.state.appointmentAddSms}
          onSelectionChange={this.onTemplateChange.bind(this)}
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
            <Title>SMS</Title>
          </Body>
        </Header>
        <Content>
          <List>
            <ListItem>
              <Left style={{ flex: 1, flexDirection: "column" }}>
                <Text style={styles.settingsText}>
                  Send SMS on adding appointment
                </Text>
                <Text style={styles.subscript}>
                  {this.state.appointmentAddSms
                    ? String(this.state.appointmentAddSms)
                    : "Please set default template"}
                </Text>
              </Left>
              <Right>
                <Switch
                  value={this.state.appointmentAddSms ? true : false}
                  thumbColor={Constants.theme_color}
                  onValueChange={status =>
                    status
                      ? this._selectPopup.show()
                      : this.onTemplateChange(undefined)
                  }
                  trackColor={{
                    false: "#d9d9d9",
                    true: "#d9d9d9"
                  }}
                />
              </Right>
            </ListItem>
            <ListItem
              onPress={() => {
                this._template.show();
              }}
            >
              <Left>
                <Text style={styles.settingsText}>Add a new template</Text>
              </Left>
              <Right>
                <Button
                  icon
                  transparent
                  onPress={() => {
                    this._template.show();
                  }}
                >
                  <Icon
                    name="addfile"
                    type="AntDesign"
                    style={Styles.iconStyle}
                  />
                </Button>
              </Right>
            </ListItem>
            <ListItem style={styles.templates}>
              <Item>
                <Left>
                  <Text style={[styles.settingsText, styles.subheading]}>
                    SMS Templates
                  </Text>
                </Left>
              </Item>
              <Item>
                <Accordion
                  animation={true}
                  dataArray={this.state.smsTemplates}
                  renderHeader={this.accordionHeader}
                  renderContent={this.accordionContent}
                  onEdit={this.editTemplate.bind(this)}
                  onDelete={this.deleteTemplate.bind(this)}
                />
              </Item>
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
    color: Constants.theme_color
  },
  subheading: {
    fontWeight: "bold",
    fontSize: 16
  },
  subscript: {
    fontSize: 12,
    color: "grey"
  },
  templates: {
    flex: 1,
    flexDirection: "column"
  }
});
