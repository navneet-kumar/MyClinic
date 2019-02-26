import { Tab, Tabs } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import Constant from "../components/Constants";
import { GetAllPermissions } from "../components/Helpers";
import Attended from "./appointments/Attended";
import Cancelled from "./appointments/Cancelled";
import Today from "./appointments/Today";

export default class Appointments extends React.Component {
  async componentWillMount() {
    // get all desired permissions
    GetAllPermissions().then(data => {
      Constant.permissions = data;
    });
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Tabs
        tabContainerStyle={{ height: "9.2%" }}
        tabBarUnderlineStyle={styles.theme_compliment}
      >
        <Tab
          heading="Upcoming"
          activeTabStyle={styles.theme}
          activeTextStyle={styles.headingText}
          tabStyle={styles.theme}
        >
          <Today />
        </Tab>
        <Tab
          heading="Attended"
          activeTabStyle={styles.theme}
          activeTextStyle={styles.headingText}
          tabStyle={styles.theme}
        >
          <Attended />
        </Tab>
        <Tab
          heading="Cancelled"
          activeTabStyle={styles.theme}
          activeTextStyle={styles.headingText}
          tabStyle={styles.theme}
        >
          <Cancelled />
        </Tab>
      </Tabs>
    );
  }
}

const styles = StyleSheet.create({
  theme: {
    backgroundColor: Constant.theme_color
  },
  theme_compliment: {
    backgroundColor: Constant.theme_compliment_color
  },
  headingText: {
    fontSize: 22,
    fontWeight: "normal"
  }
});

// class ShowAppointments extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isLoading: false,
//       appointmentId: "",
//       appointments: this.todaysAppointment(),
//       attended: []
//     };
//   }

//   onRefresh() {
//     this.setState({ isFetching: true });
//     this.todaysAppointment();
//   }

//   todaysAppointment() {
//     getAllAppointment().then(appointments => {
//       this.setState({
//         isFetching: false,
//         appointments: appointments
//       });
//     });
//   }

//   renderItem(item, isDisabled) {
//     return (
//       <Appointment
//         id={item.id}
//         name={item.patient.name}
//         mobile={item.patient.mobile}
//         age={item.patient.age}
//         gender={item.patient.gender}
//         description={item.description}
//         treatment={item.treatment}
//         isDisabled={isDisabled}
//         onAppointmentDismiss={this.onAppointmentClose.bind(this)}
//       />
//     );
//   }

//   onAppointmentClose(aid) {
//     this._popup.show();
//     this.setState({ appointmentId: aid });
//   }

//   onCancelAppointment() {
//     ShowOkAlert("Cancel - " + this.state.appointmentId);
//   }

//   onAttendedAppointment() {
//     let aptmnts = JSON.parse(JSON.stringify(this.state.appointments));
//     let appointment = aptmnts.filter(apt => {
//       return apt.id == this.state.appointmentId;
//     });
//     let attended = aptmnts.splice(aptmnts.indexOf(appointment));
//     this.setState({
//       attended: this.state.attended.concat(attended),
//       appointments: aptmnts
//     });
//   }

//   onRescheduleAppointment() {
//     ShowOkAlert("reschedule - " + this.state.appointmentId);
//   }

//   showHeader() {
//     if (this.state.attended.length > 0)
//       return <Text style={{ color: Constant.theme_color }}>ATTENDED</Text>;
//     else return null;
//   }

//   NoAppointmentMessage() {
//     return (
//       <Body style={{ paddingTop: "50%" }}>
//         <Item style={{ flexDirection: "column", borderColor: "transparent" }}>
//           <Item style={{ borderColor: "transparent" }}>
//             <Icon
//               type="EvilIcons"
//               name="calendar"
//               style={[Styles.iconStyle, { fontSize: 150 }]}
//             />
//           </Item>
//           <Item style={{ borderColor: "transparent" }}>
//             <Text style={{ textAlign: "center", color: Constant.theme_color }}>
//               No Appointments scheduled for today ... {"\n"} Enjoy !!
//             </Text>
//           </Item>
//         </Item>
//       </Body>
//     );
//   }

//   render() {
//     return (
//       <React.Fragment>
//         <ActionPopup
//           elements={[
//             { Attended: this.onAttendedAppointment.bind(this) },
//             { Reschedule: this.onRescheduleAppointment.bind(this) },
//             { "Cancel Appointment": this.onCancelAppointment.bind(this) }
//           ]}
//           ref={popup => {
//             this._popup = popup;
//           }}
//         />
//         <FlatList
//           data={this.state.appointments}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({ item }) => this.renderItem(item, false)}
//           onRefresh={() => this.onRefresh()}
//           refreshing={this.state.isLoading}
//           ListEmptyComponent={this.NoAppointmentMessage()}
//         />
//         <FlatList
//           data={this.state.attended}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({ item }) => this.renderItem(item, true)}
//           onRefresh={() => this.onRefresh()}
//           refreshing={this.state.isLoading}
//           ListHeaderComponent={this.showHeader()}
//         />
//       </React.Fragment>
//     );
//   }
// }
