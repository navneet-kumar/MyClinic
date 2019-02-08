import {
  Body,
  Container,
  Content,
  Header,
  Icon,
  Item,
  Left,
  Right,
  Text,
  Title
} from "native-base";
import React from "react";
import { FlatList } from "react-native";
import Appointment from "../components/Appointment";
import Constant from "../components/Constants";
import { GetAllPermissions } from "../components/Helpers";
import Styles from "../components/Style";
import { getAllAppointment } from "../database/Database";

export default class TodaysAppointment extends React.Component {
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
          padder
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
            borderColor: "transparent"
          }}
        >
          <ShowAppointments />
        </Content>
      </Container>
    );
  }
}

class ShowAppointments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      appointments: this.todaysAppointment()
    };
  }

  onRefresh() {
    this.setState({ isFetching: true });
    this.todaysAppointment();
  }

  todaysAppointment() {
    getAllAppointment().then(appointments => {
      this.setState({ isFetching: false, appointments: appointments });
    });
  }

  renderItem(item) {
    return (
      <Appointment
        id={item.id}
        name={item.patient.name}
        mobile={item.patient.mobile}
        age={item.patient.age}
        gender={item.patient.gender}
        description={item.description}
        treatment={item.treatment}
      />
    );
  }

  NoAppointmentMessage() {
    return (
      <Body style={{ paddingTop: "50%" }}>
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
      </Body>
    );
  }

  render() {
    return (
      <FlatList
        data={this.state.appointments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => this.renderItem(item)}
        onRefresh={() => this.onRefresh()}
        refreshing={this.state.isLoading}
        ListEmptyComponent={this.NoAppointmentMessage()}
      />
    );
  }
}
