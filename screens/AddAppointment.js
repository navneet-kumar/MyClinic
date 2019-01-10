import React from "react";
import Styles from "../components/Style";
import { Font, AppLoading } from "expo";
import Constants from "../components/Constants";
import Appointment from "../modal/Appointment";
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
      appointment: new Appointment()
    };
  }

  updateGender(selectedGender) {
    let apnmt = this.state.appointment;
    apnmt.patient._gender = selectedGender;
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
    console.log("submit()");
  }

  updateDateTime(date, time, duration) {
    console.log("I am call back() ");
    console.log(
      "Response : " + date + ", " + time + " ( " + duration + " min(s) )"
    );
    let apnmt = this.state.appointment;
    apnmt.duration = duration;
    apnmt.timestamp = new Date(time);

    // var hm = time.split(" ");
    // var h = 0;
    // if (hm[hm.length - 1] == "pm") {
    //   h = 12;
    // }
    // hm = hm[0].split(":");
    // h = h + parseInt(hm[0]);
    // var m = parseInt(hm[1]);

    this.setState({
      appointment: apnmt
    });
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <AppLoading />;
    } else {
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
                <Input
                  placeholder="Patient Name"
                  placeholderTextColor={Constants.theme_color}
                />
              </Item>
              <Item>
                <Icon name="call" style={Styles.iconStyle} />
                <Input
                  placeholder="Mobile Number"
                  keyboardType="numeric"
                  maxLength={10}
                  placeholderTextColor={Constants.theme_color}
                />
              </Item>
              <Item>
                <Item style={{ width: "50%", borderColor: "transparent" }}>
                  <Icon
                    type="FontAwesome"
                    name="transgender"
                    style={Styles.iconStyle}
                  />
                  <Picker
                    mode="dropdown"
                    iosHeader="Select Gender"
                    textStyle={{ color: Constants.theme_color }}
                    iosIcon={
                      <Icon style={Styles.iconStyle} name="ios-arrow-down" />
                    }
                    selectedValue={this.state.appointment.patient._gender}
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
                      updateDateTime: this.updateDateTime.bind(this)
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
                    {this.state.schedule}
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
                  placeholder="Description"
                  placeholderTextColor={Constants.theme_color}
                  style={{ color: Constants.theme_color }}
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
}
