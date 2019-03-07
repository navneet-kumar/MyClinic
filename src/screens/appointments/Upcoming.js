import { Body, Content, Icon, Item, Text } from "native-base";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import ActionPopup from "../../components/ActionPopup";
import AppointmentCard from "../../components/AppointmentCard";
import Constant, { Status } from "../../components/Constants";
import { filterById } from "../../components/Helpers";
import InputPopup from "../../components/InputPopup";
import Styles from "../../components/Style";
import { getFilteredAppointments, updateAppointment } from "../../Database";

export default class Upcoming extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      appointmentId: null,
      appointments: null
    };
  }

  componentDidMount() {
    this.load();
  }

  load() {
    getFilteredAppointments("status=" + Status.PENDING).then(appointments => {
      this.setState({ isLoading: false, appointments: appointments });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state != nextState;
  }

  onRefresh() {
    this.setState({ isLoading: true });
    this.load();
  }

  renderItem(item) {
    return (
      <AppointmentCard
        content={item}
        onAppointmentDismiss={this.onAppointmentClose.bind(this)}
      />
    );
  }

  onAppointmentClose(aid) {
    this._popup.show();
    this.setState({ appointmentId: aid });
  }

  onCancelAppointment() {
    let a = filterById(this.state.appointments, this.state.appointmentId);
    a.status = Status.CANCELLED;
    updateAppointment(a).then(() => {
      this.load();
    });
  }

  onAttendedAppointment() {
    this._inputPopup.show();
    // let a = filterById(this.state.appointments, this.state.appointmentId);
    // a.status = Status.COMPLETED;
    // updateAppointment(a).then(() => {
    //   this.load();
    // });
  }

  onRescheduleAppointment() {
    let a = filterById(this.state.appointments, this.state.appointmentId);
    a.status = Status.PENDING;
    updateAppointment(a).then(() => {
      this.load();
    });
  }

  NoAppointmentMessage() {
    return (
      <Body style={{ paddingTop: "50%" }}>
        <Item style={styles.vertical}>
          <Item style={styles.transparent}>
            <Icon
              type="EvilIcons"
              name="calendar"
              style={[Styles.iconStyle, { fontSize: 150 }]}
            />
          </Item>
          <Item style={styles.transparent}>
            <Text style={styles.textCenter}>
              No Appointments scheduled for today ... {"\n"} Enjoy !!
            </Text>
          </Item>
        </Item>
        <Item style={[styles.vertical, { paddingTop: "30%" }]}>
          <Item style={[styles.transparent]}>
            <Icon
              type="MaterialCommunityIcons"
              name="chevron-double-down"
              style={Styles.iconStyle}
            />
          </Item>
          <Item style={[styles.transparent]}>
            <Text style={styles.textCenter}>Pull down to reload</Text>
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
          <InputPopup
            ref={popup => {
              this._inputPopup = popup;
            }}
          />
          <FlatList
            data={this.state.appointments}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => this.renderItem(item, false)}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isLoading}
            ListEmptyComponent={this.NoAppointmentMessage(this.state.isLoading)}
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
  },
  transparent: {
    borderColor: "transparent"
  },
  vertical: {
    flexDirection: "column",
    borderColor: "transparent"
  },
  textCenter: {
    textAlign: "center",
    color: Constant.theme_color
  }
});
