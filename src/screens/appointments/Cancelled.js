import React, { Component } from "react";

export default class Cancelled extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <Content
          padder
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
            borderColor: "transparent"
          }}
        >
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
