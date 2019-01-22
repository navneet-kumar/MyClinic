import React from "react";
import Styles from "../components/Style";
import Constant from "../components/Constants";
import AppointmentCard from "../components/AppointmentCard";
import { FlatList } from "react-native";
import { GetAllPermissions } from "../components/Helpers";
import {
  Container,
  Header,
  Content,
  Title,
  Text,
  Left,
  Right,
  Body,
  Icon,
  Item
} from "native-base";

const appointments = [];
//   {
//     name: "brayn",
//     mobile: "+91 8090898872",
//     gender: "male",
//     age: 43,
//     description: "RCT week 3",
//     appointment: ""
//   },
//   {
//     name: "john",
//     mobile: "+91 8090898872",
//     gender: "male",
//     age: 23,
//     description: "Clean up",
//     appointment: ""
//   },
//   {
//     name: "Maria",
//     mobile: "+91 8090898872",
//     gender: "female",
//     age: 18,
//     description: "Checkup",
//     appointment: ""
//   },
//   {
//     name: "kaun",
//     mobile: "+91 8090898872",
//     gender: "male",
//     age: 53,
//     description: "No info",
//     appointment: ""
//   },
//   {
//     name: "Julie",
//     mobile: "+91 8090898872",
//     gender: "female",
//     age: 35,
//     description: " RCT week 3",
//     appointment: ""
//   }
// ];

export default class TodaysAppointment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listViewData: appointments
    };
  }

  async componentWillMount() {
    // get all desired permissions
    GetAllPermissions().then(data => {
      Constant.permissions = data;
    });
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: Constant.theme_color }}>
          <Left>
            <Icon
              type="FontAwesome"
              name="bookmark"
              style={[
                Styles.iconStyle,
                { color: Constant.theme_compliment_color }
              ]}
            />
          </Left>
          <Body style={{ flex: 3 }}>
            <Title style={{ color: Constant.theme_compliment_color }}>
              Today's Appointments
            </Title>
          </Body>
          <Right />
        </Header>
        <Content
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
            borderColor: "transparent"
          }}
        >
          <ShowAppointments appointments={appointments} />
        </Content>
      </Container>
    );
  }
}

class ShowAppointments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enable: true
    };
  }
  renderItem(item) {
    return (
      <AppointmentCard
        name={item.name}
        mobile={item.mobile}
        age={item.age}
        gender={item.gender}
        description={item.description}
      />
    );
  }

  setScrollEnabled(enable) {
    this.setState({
      enable
    });
  }

  render() {
    if (this.props.appointments.length > 0) {
      return (
        <FlatList
          data={this.props.appointments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => this.renderItem(item)}
        />
      );
    } else {
      return (
        <Item style={{ flexDirection: "column", borderColor: "transparent" }}>
          <Item style={{ borderColor: "transparent" }}>
            <Icon
              type="EvilIcons"
              name="calendar"
              style={[Styles.iconStyle, { fontSize: 150 }]}
            />
          </Item>
          <Item style={{ borderColor: "transparent" }}>
            <Text style={{ textAlign: "center", color: Constant.theme_color }}>
              No Appointments scheduled for today ... {"\n"} Enjoy !!
            </Text>
          </Item>
        </Item>
      );
    }
  }
}
