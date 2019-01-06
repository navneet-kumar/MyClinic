import React from "react";
import Styles from "./Style";
import { Font, AppLoading } from "expo";
import Constants from "./Constants";
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
  Text
} from "native-base";

export default class AddAppointment extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      patient: {
        name: "",
        mobile: "",
        gender: "gender",
        age: "",
        treatment: "Treatment",
        description: "",
        appointment: ""
      }
    };
  }

  selectGender(selectedGender) {
    this.setState({
      patient: {
        gender: selectedGender
      }
    });
  }

  selectTreatment(selectedTreatment) {
    this.setState({
      patient: {
        treatment: selectedTreatment
      }
    });
  }

  addAppointment() {
    console.log("submit()");
  }

  setDateTime() {
    this.props.navigation.navigate("setDateTime");
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
            <Body>
              <Title>Add Appointment</Title>
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
                <Item style={{ width: "50%" }}>
                  <Icon
                    type="FontAwesome"
                    name="transgender"
                    style={Styles.iconStyle}
                  />
                  <Picker
                    mode="dropdown"
                    iosHeader="Select Gender"
                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                    selectedValue={this.state.patient.gender}
                    onValueChange={this.selectGender.bind(this)}
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
                <Item style={{ width: "50%" }}>
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
                  iosHeader="Select Treatment"
                  iosIcon={<Icon name="ios-arrow-down-outline" />}
                  selectedValue={this.state.patient.treatment}
                  onValueChange={this.selectTreatment.bind(this)}
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
                  onPress={this.setDateTime.bind(this)}
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
