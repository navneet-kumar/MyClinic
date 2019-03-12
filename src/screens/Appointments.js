import { Tab, Tabs } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import Constant from "../components/Constants";
import { GetAllPermissions } from "../components/Helpers";
import Attended from "./appointments/Attended";
import Cancelled from "./appointments/Cancelled";
import Upcoming from "./appointments/Upcoming";

export default class Appointments extends React.Component {
  async componentWillMount() {
    // get all desired permissions
    GetAllPermissions().then(data => {
      Constant.permissions = data;
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      upcoming: null,
      attended: null,
      rescheduled: null
    };
  }

  render() {
    return (
      <Tabs
        tabContainerStyle={{ height: "9.2%" }}
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
