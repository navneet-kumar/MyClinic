import { Container, Header, Tab, Tabs } from "native-base";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import Constants from "../components/Constants";
import { GetAllPermissions } from "../components/Helpers";
import Attended from "./appointments/Attended";
import Cancelled from "./appointments/Cancelled";
import Upcoming from "./appointments/Upcoming";

export default class Appointments extends React.Component {
  async componentWillMount() {
    // get all desired permissions
    GetAllPermissions().then(data => {
      Constants.permissions = data;
    });
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Header hasTabs style={styles.tabHeader} />
        <Tabs
          tabBarPosition="top"
          tabBarActiveTextColor={Constants.theme_compliment_color}
          tabBarInactiveTextColor={Constants.theme_color}
          tabContainerStyle={styles.tabContainer}
          tabBarUnderlineStyle={styles.theme_compliment}
          onChangeTab={tab => {
            switch (tab.i) {
              case 0:
                this._upcoming.load();
                break;
              case 1:
                this._attended.load();
                break;
              case 2:
                this._cancelled.load();
                break;
            }
          }}
        >
          <Tab
            heading="Upcoming"
            activeTabStyle={styles.theme}
            activeTextStyle={styles.headingText}
            tabStyle={styles.theme}
          >
            <Upcoming
              ref={upcoming => {
                this._upcoming = upcoming;
              }}
            />
          </Tab>
          <Tab
            heading="Attended"
            activeTabStyle={styles.theme}
            activeTextStyle={styles.headingText}
            tabStyle={styles.theme}
          >
            <Attended
              ref={attended => {
                this._attended = attended;
              }}
            />
          </Tab>
          <Tab
            heading="Cancelled"
            activeTabStyle={styles.theme}
            activeTextStyle={styles.headingText}
            tabStyle={styles.theme}
          >
            <Cancelled
              ref={cancelled => {
                this._cancelled = cancelled;
              }}
            />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  theme: {
    backgroundColor: Constants.theme_color
  },
  theme_compliment: {
    backgroundColor: Constants.theme_compliment_color
  },
  headingText: {
    fontSize: 22,
    fontWeight: "normal",
    color: Constants.theme_compliment_color
  },
  tabHeader: { height: 0.01, backgroundColor: Constants.theme_color },
  tabContainer: {
    height: Platform.OS === "ios" ? "6.7%" : "9.2%"
  }
});
