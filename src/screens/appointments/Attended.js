import { Body, Content, Icon, Item, Text } from "native-base";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import AppointmentCard from "../../components/AppointmentCard";
import Constant, { Status } from "../../components/Constants";
import Styles from "../../components/Style";
import { getFilteredAppointments } from "../../Database";

export default class Attended extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      attended: null
    };
  }

  load() {
    getFilteredAppointments("status=" + Status.COMPLETED).then(appointments => {
      this.setState({ isLoading: false, attended: appointments });
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
    return <AppointmentCard content={item} />;
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
      </Body>
    );
  }

  render() {
    return (
      <React.Fragment>
        <Content padder contentContainerStyle={styles.container}>
          <FlatList
            data={this.state.attended}
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
