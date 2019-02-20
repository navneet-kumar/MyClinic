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
import NewTemplate from "../../components/NewTemplate";
import Styles from "../../components/Style";
import { getSingleSetting, updateSetting } from "../../database/Database";
import Settings from "../../modal/Settings";

export default class BackupRestore extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      sendSms: false,
      smsTemplates: []
    };
    this.getTemplates();
  }

  getTemplates() {
    getSingleSetting(Constants.sms_templates).then(templates => {
      this.setState({ smsTemplates: templates.getValue() });
    });
  }

  getSendSmsSetting() {}

  toggleSendSms(val) {
    this.setState({
      sendSms: val
    });
  }

  deleteTemplate(item) {
    let newTemplate = [];
    for (let t in this.state.smsTemplates) {
      if (this.state.smsTemplates[t].title !== item.title) {
        newTemplate.push(this.state.smsTemplates[t]);
      }
    }
    updateSetting(new Settings(Constants.sms_templates, newTemplate)).then(
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
              <Left>
                <Text style={styles.settingsText}>
                  Send SMS on adding appointment
                </Text>
              </Left>
              <Right>
                <Switch
                  onValueChange={this.toggleSendSms.bind(this)}
                  value={this.state.sendSms}
                  thumbColor={Constants.theme_color}
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
  templates: {
    flex: 1,
    flexDirection: "column"
  }
});
