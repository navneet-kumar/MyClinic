import React from "react";
import Styles from "../components/Style";
import Constants from "../components/Constants";
import { FlatList } from "react-native";
import {
  Container,
  Header,
  Content,
  Title,
  Icon,
  Left,
  Right,
  Body,
  List,
  ListItem,
  Text,
  Item
} from "native-base";
import AppointmentCard from "../components/AppointmentCard";

const appointments = [
  {
    name: "brayn",
    mobile: "+91 8090898872",
    gender: "male",
    age: 43,
    description: "RCT week 3",
    appointment: ""
  },
  {
    name: "john",
    mobile: "+91 8090898872",
    gender: "male",
    age: 23,
    description: "Clean up",
    appointment: ""
  },
  {
    name: "Maria",
    mobile: "+91 8090898872",
    gender: "female",
    age: 18,
    description: "Checkup",
    appointment: ""
  },
  {
    name: "kaun",
    mobile: "+91 8090898872",
    gender: "male",
    age: 53,
    description: "No info",
    appointment: ""
  },
  {
    name: "Julie",
    mobile: "+91 8090898872",
    gender: "female",
    age: 35,
    description: " RCT week 3",
    appointment: ""
  }
];

export default class TodaysAppointment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: Constants.theme_color }}>
          <Left>
            <Icon
              type="FontAwesome"
              name="bookmark"
              style={[
                Styles.iconStyle,
                { color: Constants.theme_compliment_color }
              ]}
            />
          </Left>
          <Body style={{ flex: 3 }}>
            <Title style={{ color: Constants.theme_compliment_color }}>
              Today's Appointments
            </Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <ShowAppointments appointments={appointments} />
        </Content>
      </Container>
    );
  }
}

class ShowAppointments extends React.Component {
  render() {
    if (this.props.appointments.length > 0) {
      return (
        <FlatList
          data={this.props.appointments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <AppointmentCard
              name={item.name}
              mobile={item.mobile}
              age={item.age}
              gender={item.gender}
              description={item.description}
            />
          )}
        />
      );
    } else {
      return <Title>No Appointments</Title>;
    }
  }
}
