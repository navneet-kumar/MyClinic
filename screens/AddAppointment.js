import React from "react";
import Styles from "../components/Style";
import Constants from "../components/Constants";
import Appointment from "../modal/Appointment.ts";
import { ShowOkAlert, isAndroid, Warning } from "../components/Helpers";
import moment from "moment";
import InputWithSuggestions from "../components/InputWithSuggestions";
import Contacts from "react-native-contacts";
import { insertAppointment, getAllAppointment } from "../database/schemas";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Title,
  Icon,
  Left,
  Right,
  Body,
  Picker,
  Textarea,
  Button,
  Text,
  Label
} from "native-base";

export default class AddAppointment extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      timeUnit: 0,
      loading: true,
      appointment: new Appointment(),
      contacts: []
    };
  }

  updateGender(selectedGender) {
    let apnmt = this.state.appointment;
    apnmt.patient.gender = selectedGender;
    this.setState({
      appointment: apnmt
    });
  }

  updateAge(selectedAge) {
    try {
      let age = parseInt(selectedAge);
      let apnmt = this.state.appointment;
      apnmt.patient.age = age;
      this.setState({
        appointment: apnmt
      });
    } catch (err) {
      ShowOkAlert("Only numbers allowed in age.");
    }
  }

  resetAddAppointmentForm() {
    // reset form elements
    // this._patientName.setNativeProps({ text: "" });
    this._phoneNumber.setNativeProps({ text: "" });
    this._age.setNativeProps({ text: "" });
    Constants.date_time = "Date & Time";
    this._desc.setNativeProps({ text: "" });
    this._reminder.setNativeProps({ text: "30" });
    this.setState({
      timeUnit: 0,
      appointment: new Appointment()
    });
  }

  updateContact(contact) {
    let apnmt = this.state.appointment;
    apnmt.patient.name = contact.name;
    apnmt.patient.mobile = contact.number;
    apnmt.patient.id = contact.id;
    this.setState({
      appointment: apnmt
    });
  }

  updateDesc(desc) {
    let apnmt = this.state.appointment;
    apnmt.description = desc;
    this.setState({
      appointment: apnmt
    });
  }

  updateTreatment(selectedTreatment) {
    let apnmt = this.state.appointment;
    apnmt.treatment = selectedTreatment;
    this.setState({
      appointment: apnmt
    });
  }

  updateTimeUnit() {
    let unit = this.state.timeUnit;
    unit++;
    unit = unit % Constants.time_unit.length;
    this.setState({
      timeUnit: unit
    });
  }

  addAppointment() {
    insertAppointment(this.state.appointment).then(() => {
      ShowOkAlert("Appointment added successfully ..!!");
      this.resetAddAppointmentForm();
    });
  }

  updateDateTime(date, time, duration) {
    let dateTimeStr = date + ", " + time;

    // update title to selected date & time
    Constants.date_time = dateTimeStr + " [ " + duration + " min(s) ]";
    let timestamp = new moment(dateTimeStr, "DD/MM/YYYY, hh:mm A").toDate();

    let apnmt = this.state.appointment;
    apnmt.duration = duration;
    apnmt.timestamp = timestamp;

    this.setState({
      appointment: apnmt
    });
  }

  getAllContacts() {
    let getContacts = true;
    var contactList = [];

    if (isAndroid()) {
      if (
        Constants.permissions["android.permission.READ_CONTACTS"] !== "granted"
      ) {
        getContacts = false;
        ShowOkAlert(
          "Please allow us to read your contacts and help us give you a better experience."
        );
      }
    }

    if (getContacts) {
      Contacts.getAll((err, contacts) => {
        if (err) {
          Warning(err);
        } else if (contacts.length > 0) {
          for (var i in contacts) {
            try {
              contactList.push({
                id: contacts[i].recordID,
                name:
                  (contacts[i].givenName || "") +
                  " " +
                  (contacts[i].familyName || ""),
                number: contacts[i].phoneNumbers[0].number
              });
            } catch (err) {
              Warning(err);
            }
          }
        }
      });
    }
    return contactList;
  }

  async componentWillMount() {
    this.setState({ loading: false, contacts: this.getAllContacts() });
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: Constants.theme_color }}>
          <Left>
            <Icon
              type="FontAwesome"
              name="user-plus"
              style={[
                Styles.iconStyle,
                { color: Constants.theme_compliment_color }
              ]}
            />
          </Left>
          <Body style={{ flex: 3 }}>
            <Title style={{ color: Constants.theme_compliment_color }}>
              Add Appointment
            </Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <Item>
              <Icon name="person" style={Styles.iconStyle} />
              <InputWithSuggestions
                placeholder="Patient Name"
                options={this.state.contacts}
                renderLabel={c => {
                  return c.name;
                }}
                renderKey={c => {
                  return c.id;
                }}
                onSelectOption={c => {
                  this.updateContact(c);
                }}
              />
            </Item>
            <Item>
              <Icon name="call" style={Styles.iconStyle} />
              <Input
                placeholder="Mobile Number"
                keyboardType="numeric"
                maxLength={15}
                ref={phoneNumber => (this._phoneNumber = phoneNumber)}
                placeholderTextColor={Constants.theme_color}
                defaultValue={this.state.appointment.patient.mobile}
              />
            </Item>
            <Item style={{ flex: 3 }}>
              <Item style={{ width: "50%", borderColor: "transparent" }}>
                <Icon
                  type="FontAwesome"
                  name="transgender"
                  style={Styles.iconStyle}
                />
                <Picker
                  mode="dropdown"
                  textStyle={{ color: Constants.theme_color }}
                  iosIcon={
                    <Icon style={Styles.iconStyle} name="ios-arrow-down" />
                  }
                  selectedValue={this.state.appointment.patient.gender}
                  onValueChange={this.updateGender.bind(this)}
                >
                  <Picker.Item
                    color={Constants.theme_color}
                    label="Gender"
                    value="gender"
                  />
                  <Picker.Item
                    color={Constants.theme_color}
                    label="Male"
                    value="male"
                  />
                  <Picker.Item
                    color={Constants.theme_color}
                    label="Female"
                    value="female"
                  />
                </Picker>
              </Item>
              <Item style={{ width: "50%", borderColor: "transparent" }}>
                <Icon
                  type="FontAwesome"
                  name="child"
                  style={Styles.iconStyle}
                />
                <Input
                  placeholder="Age"
                  keyboardType="numeric"
                  maxLength={2}
                  placeholderTextColor={Constants.theme_color}
                  ref={age => (this._age = age)}
                  onChangeText={inputAge => {
                    this.updateAge(inputAge);
                  }}
                />
              </Item>
            </Item>
            <Item>
              <Icon
                type="FontAwesome"
                name="stethoscope"
                style={Styles.iconStyle}
              />
              <Picker
                iosHeader="Treatments"
                textStyle={{ color: Constants.theme_color }}
                iosIcon={
                  <Icon style={Styles.iconStyle} name="ios-arrow-down" />
                }
                selectedValue={this.state.appointment.treatment}
                onValueChange={this.updateTreatment.bind(this)}
              >
                {Constants.treatments.map((treatment, index) => {
                  return (
                    <Picker.Item
                      color={Constants.theme_color}
                      key={index}
                      label={treatment}
                      value={treatment}
                    />
                  );
                })}
              </Picker>
            </Item>
            <Item>
              <Icon
                type="FontAwesome"
                name="calendar"
                style={Styles.iconStyle}
              />
              <Button
                transparent
                onPress={() => {
                  this.props.navigation.navigate("setDateTime", {
                    updateDateTime: this.updateDateTime.bind(this),
                    appointment: this.state.appointment
                  });
                }}
                style={{
                  flex: 1
                }}
              >
                <Text
                  uppercase={false}
                  style={{ paddingLeft: 5, color: Constants.theme_color }}
                >
                  {Constants.date_time}
                </Text>
                <Icon
                  type="FontAwesome"
                  name="caret-right"
                  style={{ fontSize: 15, color: Constants.theme_color }}
                />
              </Button>
            </Item>
            <Item>
              <Icon type="FontAwesome" name="bell" style={Styles.iconStyle} />
              <Label style={{ paddingLeft: 5, color: Constants.theme_color }}>
                Remind me before
              </Label>
              <Item style={{ borderColor: "transparent", width: "10%" }}>
                <Input
                  selectTextOnFocus
                  defaultValue={Constants.reminder + ""}
                  ref={reminder => (this._reminder = reminder)}
                  keyboardType="numeric"
                  maxLength={2}
                  placeholderTextColor={Constants.theme_color}
                  style={{ color: Constants.theme_color }}
                />
              </Item>
              <Label
                onPress={this.updateTimeUnit.bind(this)}
                style={{ color: Constants.theme_color }}
              >
                {Constants.time_unit[this.state.timeUnit]}
              </Label>
            </Item>
            <Item last style={{ paddingTop: 20 }}>
              <Icon
                type="FontAwesome"
                name="paperclip"
                style={Styles.iconStyle}
              />
              <Textarea
                rowSpan={4}
                placeholder="Additional case information, if available."
                placeholderTextColor={Constants.theme_color}
                style={{ color: Constants.theme_color }}
                ref={desc => (this._desc = desc)}
                onChangeText={desc => {
                  this.updateDesc(desc);
                }}
              />
            </Item>
            <Item style={{ paddingTop: 30, alignSelf: "center" }}>
              <Button
                iconLeft
                style={{ backgroundColor: Constants.theme_color }}
                onPress={this.addAppointment.bind(this)}
              >
                <Icon
                  type="FontAwesome"
                  name="user-plus"
                  style={[
                    Styles.iconStyle,
                    { color: Constants.theme_compliment_color }
                  ]}
                />
                <Text>Add Appointment</Text>
              </Button>
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}
