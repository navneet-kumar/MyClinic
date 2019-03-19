import moment from "moment";
import {
  Body,
  Button,
  Container,
  Content,
  Form,
  Header,
  Icon,
  Input,
  Item,
  Label,
  Left,
  Right,
  Root,
  Text,
  Textarea,
  Title,
  Toast
} from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import Constants from "../components/Constants";
import {
  getSmsContentFromTemplate,
  ShowOkAlert,
  sms
} from "../components/Helpers";
import MyContacts from "../components/MyContacts";
import PickerWrapper from "../components/PickerWrapper";
import Styles from "../components/Style";
import { getSingleSetting, insertAppointment } from "../Database";
import Appointment from "../modal/Appointment.ts";

const Mandatory = () => <Text style={styles.theme_color}>*</Text>;

export default class AddNewAppointment extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.updatePatientDetails = this.updatePatientDetails.bind(this);
    this.state = {
      timeUnit: 0,
      isLoading: true,
      appointment: new Appointment(),
      treatments: ["Treatment"]
    };
  }

  async componentWillMount() {
    getSingleSetting(Constants.treatments_list).then(setting => {
      if (setting && setting.getValue()) {
        this.setState({
          isLoading: false,
          treatments: this.state.treatments.concat(setting.getValue())
        });
      }
    });
  }

  updatePatientName(patientName) {
    // let patient = Object.assign({}, this.state.appointment.patient, {name: patientName});
    let apnmt = this.state.appointment;
    apnmt.patient.name = patientName;
    this.setState({
      appointment: apnmt
    });
  }

  updatePatientMobile(mobile) {
    let apnmt = this.state.appointment;
    apnmt.patient.mobile = mobile;
    this.setState({
      appointment: apnmt
    });
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

  updatePatientDetails(patient) {
    let apnmt = this.state.appointment;
    apnmt.patient.name = patient.name;
    apnmt.patient.mobile = patient.mobile;
    apnmt.patient.id = patient.id;
    apnmt.patient.age = patient.age;
    apnmt.patient.gender = patient.gender;
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

  resetAddAppointmentForm() {
    // reset form elements
    this._patientName.setNativeProps({ text: "" });
    this._phoneNumber.setNativeProps({ text: "" });
    this._age.setNativeProps({ text: "" });
    Constants.date_time = "Date & Time";
    this._desc.setNativeProps({ text: "" });
    this._reminder.setNativeProps({ text: "30" });
    this.setState({
      timeUnit: 0,
      appointment: new Appointment()
    });

    // reset error icons
    this._patientNameIcon.setNativeProps({
      style: {
        color: Constants.theme_color
      }
    });
    this._patientPhoneIcon.setNativeProps({
      style: {
        color: Constants.theme_color
      }
    });
    this._dateTimeIcon.setNativeProps({
      style: {
        color: Constants.theme_color
      }
    });
  }

  validateFields() {
    const { patient, timestamp } = this.state.appointment;
    if (!patient.name) {
      this._patientNameIcon.setNativeProps({
        style: {
          color: Constants.theme_color_error
        }
      });
      this._patientName._root.focus();
      return false;
    } else {
      this._patientNameIcon.setNativeProps({
        style: {
          color: Constants.theme_color
        }
      });
    }

    if (!patient.mobile) {
      this._patientPhoneIcon.setNativeProps({
        style: {
          color: Constants.theme_color_error
        }
      });
      this._phoneNumber._root.focus();
      return false;
    } else {
      this._patientPhoneIcon.setNativeProps({
        style: {
          color: Constants.theme_color
        }
      });
    }

    if (!timestamp) {
      this._dateTimeIcon.setNativeProps({
        style: {
          color: Constants.theme_color_error
        }
      });
      return false;
    } else {
      this._dateTimeIcon.setNativeProps({
        style: {
          color: Constants.theme_color
        }
      });
    }
    return true;
  }

  sendSms(template, appointment) {
    getSmsContentFromTemplate(template.getValue(), appointment).then(content =>
      sms(appointment.patient.mobile, content)
    );
  }

  componentWillUnmount() {
    Toast.toastInstance = null;
  }

  addAppointment() {
    if (this.validateFields()) {
      insertAppointment(this.state.appointment).then(() => {
        getSingleSetting(Constants.sms_appointment).then(template => {
          if (template.getValue()) {
            Toast.show({
              text: "Appointment added successfully ..!!",
              type: "success"
            });
            this.sendSms(
              template,
              JSON.parse(JSON.stringify(this.state.appointment))
            );
          } else {
            ShowOkAlert("Appointment added successfully ..!!");
          }
          this.resetAddAppointmentForm();
        });
      });
    }
  }

  render() {
    return (
      <Root>
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
            <Right>
              <Icon
                type="MaterialCommunityIcons"
                name="broom"
                style={[
                  Styles.iconStyle,
                  { color: Constants.theme_compliment_color }
                ]}
                onPress={() => {
                  this.resetAddAppointmentForm();
                }}
              />
            </Right>
          </Header>
          <Content>
            <Form>
              <Item>
                <Mandatory />
                <Icon
                  name="person"
                  style={Styles.iconStyle}
                  ref={pni => {
                    this._patientNameIcon = pni;
                  }}
                />
                <Input
                  placeholder="Patient Name"
                  autoCorrect={false}
                  ref={patientName => {
                    this._patientName = patientName;
                  }}
                  placeholderTextColor={Constants.theme_color}
                  style={{ color: Constants.theme_color }}
                  value={this.state.appointment.patient.name}
                  onChangeText={name => {
                    this.updatePatientName(name);
                  }}
                />
                <MyContacts onContactSelected={this.updatePatientDetails} />
              </Item>
              <Item>
                <Mandatory />
                <Icon
                  name="call"
                  style={Styles.iconStyle}
                  ref={pph => {
                    this._patientPhoneIcon = pph;
                  }}
                />

                <Input
                  placeholder="Mobile Number"
                  keyboardType="numeric"
                  maxLength={15}
                  style={{ color: Constants.theme_color }}
                  ref={phoneNumber => (this._phoneNumber = phoneNumber)}
                  placeholderTextColor={Constants.theme_color}
                  value={this.state.appointment.patient.mobile}
                  onChangeText={mobile => {
                    this.updatePatientMobile(mobile);
                  }}
                />
              </Item>
              <Item style={{ flex: 3 }}>
                <Item style={{ width: "50%", borderColor: "transparent" }}>
                  <Icon
                    type="FontAwesome"
                    name="transgender"
                    style={Styles.iconStyle}
                  />
                  <PickerWrapper
                    mode="dropdown"
                    data={["Gender", "male", "female"]}
                    onValueChange={this.updateGender.bind(this)}
                    selected={this.state.appointment.patient.gender}
                  />
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
                    style={{ color: Constants.theme_color }}
                    placeholderTextColor={Constants.theme_color}
                    value={
                      this.state.appointment.patient.age > 0
                        ? String(this.state.appointment.patient.age)
                        : ""
                    }
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
                <PickerWrapper
                  data={this.state.treatments}
                  selected={this.state.appointment.treatment}
                  onValueChange={this.updateTreatment.bind(this)}
                  header={"Treatments"}
                />
              </Item>
              <Item>
                <Mandatory />
                <Icon
                  type="FontAwesome"
                  name="calendar"
                  style={Styles.iconStyle}
                  ref={dti => {
                    this._dateTimeIcon = dti;
                  }}
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
              <Item style={styles.paddedButton}>
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
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  paddedButton: {
    paddingTop: 30,
    alignSelf: "center"
  },
  theme_color: {
    color: Constants.theme_color
  }
});
