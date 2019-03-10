import {
  Body,
  Button,
  Container,
  Content,
  Fab,
  Header,
  Icon,
  Item,
  Left,
  ListItem,
  Text,
  Title
} from "native-base";
import React, { Component } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import ActivityProgress from "../../components/ActivityProgress";
import Constants from "../../components/Constants";
import { ShowOkAlert } from "../../components/Helpers";
import Styles from "../../components/Style";
import { getSingleSetting } from "../../Database";

const IconWithText = props => {
  return (
    <TouchableOpacity style={styles.full}>
      <Left>
        <Icon name={props.name} type={props.type} style={Styles.iconStyle} />
        <Text style={styles.settingsText}>{props.text}</Text>
      </Left>
    </TouchableOpacity>
  );
};

export default class Treatment extends Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.state = {
      showActivityIndicator: false,
      treatments: ["Disease 1", "Disease 2", "Disease 3", "Disease 4"],
      fab: true
    };
    // this.getTreatments();
  }

  getTreatments() {
    getSingleSetting(Constants.treatments_list).then(treatments => {
      if (treatments.getValue()) {
        this.setState({ treatments: [] });
      } else {
        this.setState({ treatments: treatments.getValue() });
      }
    });
  }

  onRefresh() {
    this.setState({ showActivityIndicator: true });
  }

  renderItem(item) {
    return (
      <ListItem onLongPress={() => ShowOkAlert("Long pressed")}>
        <Icon type="FontAwesome" name="stethoscope" style={Styles.iconStyle} />
        <Text style={styles.settingsText}>{item}</Text>
      </ListItem>
    );
  }

  NoAppointmentMessage() {
    return (
      <Body style={{ paddingTop: "50%" }}>
        <Item style={styles.vertical}>
          <Item style={styles.transparent}>
            <Icon
              type="FontAwesome"
              name="stethoscope"
              style={[Styles.iconStyle, { fontSize: 130 }]}
            />
          </Item>
          <Item style={styles.transparent}>
            <Text style={styles.textCenter}>No treatments found !</Text>
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

  addNewTreatment() {
    let treatments = this.state.treatments
      ? this.state.treatments.concat("")
      : [].concat("");
    ShowOkAlert(JSON.stringify(treatments));
    this.setState({ treatments: treatments });
  }

  render() {
    return (
      <Container>
        <ActivityProgress
          showActivityIndicator={this.state.showActivityIndicator}
        />
        <Header style={styles.themeColor}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon
                name="arrow-back"
                style={[
                  Styles.iconStyle,
                  { color: Constants.theme_compliment_color }
                ]}
              />
            </Button>
          </Left>
          <Body style={styles.themeComplementColor}>
            <Title>Treatments</Title>
          </Body>
        </Header>
        <Content>
          <FlatList
            data={this.state.treatments}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => this.renderItem(item)}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.showActivityIndicator}
            ListEmptyComponent={this.NoAppointmentMessage()}
          />
        </Content>
        <Fab
          active={this.state.fab}
          direction="up"
          style={{ backgroundColor: Constants.theme_color }}
          position="bottomRight"
          onPress={() => {
            this.setState({ fab: !this.state.fab });
            this.addNewTreatment();
          }}
        >
          <Icon name="plus" type="AntDesign" />
        </Fab>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  themeColor: {
    color: Constants.theme_color,
    backgroundColor: Constants.theme_color
  },
  themeComplementColor: {
    flex: 4,
    color: Constants.theme_complement_color,
    backgroundColor: Constants.theme_complement_color
  },
  settingsText: {
    color: Constants.theme_color,
    paddingLeft: 12
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
    color: Constants.theme_color
  }
});
