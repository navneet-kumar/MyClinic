import { Body, Content, Icon, Item, Text } from "native-base";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import AppointmentCard from "../../components/AppointmentCard";
import Constant, { Status } from "../../components/Constants";
import Styles from "../../components/Style";
import { getFilteredAppointments } from "../../Database";

export default class Cancelled extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      cancelled: null
    };
  }

  load() {
    getFilteredAppointments("status=" + Status.CANCELLED).then(appointments => {
      this.setState({ isLoading: false, cancelled: appointments });
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
              name="trash"
              style={[Styles.iconStyle, { fontSize: 150 }]}
            />
          </Item>
          <Item style={styles.transparent}>
            <Text style={styles.textCenter}>
              No Appointments in the Trash !!
            </Text>
          </Item>
        </Item>
        <Item style={[styles.vertical, { paddingTop: "35%" }]}>
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
          <FlatList
            data={this.state.cancelled}
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
