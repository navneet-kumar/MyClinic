import {
  Body,
  Button,
  Container,
  Content,
  Fab,
  Header,
  Icon,
  Input,
  Item,
  Left,
  ListItem,
  Text,
  Title
} from "native-base";
import React, { Component } from "react";
import { FlatList, StyleSheet } from "react-native";
import Constants from "../../components/Constants";
import { positiveNegativeAlert, ShowOkAlert } from "../../components/Helpers";
import Styles from "../../components/Style";
import {
  getSingleSetting,
  insertNewSetting,
  updateSetting
} from "../../Database";
import Settings from "../../modal/Settings";

export default class Treatment extends Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.state = {
      showActivityIndicator: false,
      treatments: [],
      fab: true,
      newTreatment: ""
    };
    this.getTreatments();
  }

  getTreatments() {
    getSingleSetting(Constants.treatments_list)
      .then(treatments => {
        if (!treatments.getValue()) {
          this.setState({ treatments: [] });
        } else {
          this.setState({ treatments: treatments.getValue() });
        }
        this.setState({ showActivityIndicator: false });
      })
      .catch(() => {
        this.setState({ showActivityIndicator: false });
      });
  }

  onRefresh() {
    this.setState({ showActivityIndicator: true });
    this.getTreatments();
  }

  addNewTreatment() {
    if (this.state.treatments == null) {
      this.setState({ treatments: [null] });
    } else {
      if (this.state.treatments.indexOf(null) !== -1) {
        ShowOkAlert("Only 1 treatment can be added at a time.");
      } else {
        this.setState({ treatments: this.state.treatments.concat(null) });
      }
    }
  }

  saveTreatment() {
    if (this.state.newTreatment) {
      let treatments = [].concat(this.state.treatments);
      treatments.splice(
        treatments.lastIndexOf(null),
        1,
        this.state.newTreatment
      );
      insertNewSetting(
        new Settings(Constants.treatments_list, treatments)
      ).then(() => {
        this.setState({ treatments: treatments, newTreatment: "" });
      });
    } else {
      ShowOkAlert("Treatment name can not be empty");
    }
  }

  cancelAddingTreatment() {
    let treatments = [].concat(this.state.treatments);

    if (!this.state.newTreatment) {
      treatments.splice(treatments.lastIndexOf(null), 1);
      this.setState({ treatments: treatments });
    } else {
      positiveNegativeAlert(
        "Are you sure you want to discard changes ?",
        "Yes",
        "No",
        () => {
          treatments.splice(treatments.lastIndexOf(null), 1);
          this.setState({ treatments: treatments });
        },
        null
      );
    }
  }

  deleteTreatment(treatment) {
    positiveNegativeAlert(
      "Are you sure you want to delete \n '" + treatment + "' ?",
      "Delete",
      "cancel",
      () => {
        let treatments = [].concat(this.state.treatments);
        treatments.splice(treatments.indexOf(treatment), 1);
        updateSetting(new Settings(Constants.treatments_list, treatments)).then(
          () => this.getTreatments()
        );
      },
      null
    );
  }

  renderItem(item) {
    return (
      <ListItem style={{ paddingBottom: 0 }}>
        <Icon type="FontAwesome" name="stethoscope" style={Styles.iconStyle} />
        {item == null ? (
          <React.Fragment>
            <Input
              ref={name => {
                this._treatment = name;
              }}
              style={styles.settingsText}
              autoFocus={true}
              onChangeText={text => {
                this.setState({ newTreatment: text });
              }}
            />
            <Button transparent iconRight onPress={() => this.saveTreatment()}>
              <Icon
                type="MaterialIcons"
                name="check"
                style={[Styles.iconStyle]}
              />
            </Button>
            <Button
              transparent
              iconRight
              onPress={() => this.cancelAddingTreatment()}
            >
              <Icon
                type="MaterialIcons"
                name="close"
                style={[
                  Styles.iconStyle,
                  { color: Constants.theme_color_error }
                ]}
              />
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Text style={styles.settingsText}>{item}</Text>
            <Button
              transparent
              iconRight
              onPress={() => this.deleteTreatment(item)}
            >
              <Icon
                type="EvilIcons"
                name="trash"
                style={[
                  Styles.iconStyle,
                  { color: Constants.theme_color_error }
                ]}
              />
            </Button>
          </React.Fragment>
        )}
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

  render() {
    return (
      <Container>
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
          style={{
            backgroundColor: Constants.theme_color,
            opacity: this.state.fab ? 1 : 0
          }}
          position="bottomRight"
          onPress={() => {
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
    paddingLeft: 12,
    width: "95%"
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
