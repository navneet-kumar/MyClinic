import React from "react";
import Realm from "realm";
import {
  Appointment as AppointmentSchema,
  Patient as PatientSchema
} from "./schemas";
import Patient from "../modal/Patient";
import { Text } from "native-base";

export default class Database extends React.Component {
  constructor(props) {
    super(props);
    this.state = { realm: null };
  }

  // componentWillMount() {
  //   Realm.open({
  //     schema: [{ name: "Dog", properties: { name: "string" } }]
  //   }).then(realm => {
  //     realm.write(() => {
  //       realm.create("Dog", { name: "Rex" });
  //     });
  //     this.setState({ realm });
  //   });
  // }
  componentWillMount() {
    console.log("I am working");
    let p = new Patient();
    p._name = "navneet";
    p._mobile = "3627326873";
    p._age = 34;
    Realm.open({
      schema: [PatientSchema]
    }).then(realm => {
      realm.write(() => {
        realm.create("Patient", {
          id: p._id,
          name: p._name,
          mobile: p._mobile,
          gender: p._gender,
          age: p._age
        });
      });
      this.setState({ realm });
    });
  }

  render() {
    const info = this.state.realm
      ? "Number of dogs in this Realm: " + this.state.realm.objects("Patient")
      : "Loading...";
    let res = JSON.stringify(info);
    console.log(res);
    return <Text>{res}</Text>;
  }
}
