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
import {
  default as Constant,
  default as Constants
} from "../components/Constants";
import { GetAllPermissions, ShowOkAlert } from "../components/Helpers";
import Popup from "../components/Popup";
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
      appointmentId: "",
      appointments: this.todaysAppointment(),
      attended: []
    };
  }

  onRefresh() {
    this.setState({ isFetching: true });
    this.todaysAppointment();
  }

  todaysAppointment() {
    getAllAppointment().then(appointments => {
      this.setState({
        isFetching: false,
        appointments: appointments
      });
    });
  }

  renderItem(item, isDisabled) {
    return (
      <Appointment
        id={item.id}
        name={item.patient.name}
        mobile={item.patient.mobile}
        age={item.patient.age}
        gender={item.patient.gender}
        description={item.description}
        treatment={item.treatment}
        isDisabled={isDisabled}
        onAppointmentDismiss={this.onAppointmentClose.bind(this)}
      />
    );
  }

  onAppointmentClose(aid) {
    this._popup.show();
    this.setState({ appointmentId: aid });
  }

  onCancelAppointment() {
    ShowOkAlert("Cancel - " + this.state.appointmentId);
  }

  onAttendedAppointment() {
    let aptmnts = JSON.parse(JSON.stringify(this.state.appointments));
    let appointment = aptmnts.filter(apt => {
      return apt.id == this.state.appointmentId;
    });
    let attended = aptmnts.splice(aptmnts.indexOf(appointment));
    this.setState({
      attended: this.state.attended.concat(attended),
      appointments: aptmnts
    });
  }

  onRescheduleAppointment() {
    ShowOkAlert("reschedule - " + this.state.appointmentId);
  }

  showHeader() {
    if (this.state.attended.length > 0)
      return <Text style={{ color: Constants.theme_color }}>ATTENDED</Text>;
    else return null;
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
      <React.Fragment>
        <Popup
          onCancelAppointment={this.onCancelAppointment.bind(this)}
          onAttendedAppointment={this.onAttendedAppointment.bind(this)}
          onRescheduleAppointment={this.onRescheduleAppointment.bind(this)}
          ref={popup => {
            this._popup = popup;
          }}
        />
        <FlatList
          data={this.state.appointments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => this.renderItem(item, false)}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isLoading}
          ListEmptyComponent={this.NoAppointmentMessage()}
        />
        <FlatList
          data={this.state.attended}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => this.renderItem(item, true)}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isLoading}
          ListHeaderComponent={this.showHeader()}
        />
      </React.Fragment>
    );
  }
}
