import { Body, Content, Icon, Item, Text } from "native-base";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import ActionPopup from "../../components/ActionPopup";
import AppointmentCard from "../../components/AppointmentCard";
import Constant from "../../components/Constants";
import Styles from "../../components/Style";
import { getAllAppointment } from "../../Database";

export default class Today extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      appointmentId: "",
      appointments: null,
      attended: []
    };
    this.todaysAppointment();
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
      <AppointmentCard
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
        <Content padder contentContainerStyle={styles.container}>
          <ActionPopup
            elements={[
              { Attended: this.onAttendedAppointment.bind(this) },
              { Reschedule: this.onRescheduleAppointment.bind(this) },
              { "Cancel Appointment": this.onCancelAppointment.bind(this) }
            ]}
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
        </Content>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    borderColor: "transparent"
  }
});
