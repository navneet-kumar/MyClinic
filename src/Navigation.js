import { Icon } from "native-base";
import React from "react";
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  TabBarBottom
} from "react-navigation";
import Calendar from "./components/Calendar";
import Constants from "./components/Constants";
import AddNewAppointment from "./screens/AddNewAppointment";
import Appointments from "./screens/Appointments";
import Settings from "./screens/Settings";
import Appointment from "./screens/settings/Appointment";
import BackupRestore from "./screens/settings/BackupRestore";
import Sms from "./screens/settings/Sms";
import Treatment from "./screens/settings/Treatment";
import Website from "./screens/Website";

const AddAppointmentStackNavigator = createStackNavigator(
  {
    addAppointment: { screen: AddNewAppointment },
    setDateTime: { screen: Calendar }
  },
  {}
);

const settingsStackNavigator = createStackNavigator(
  {
    settings: { screen: Settings },
    sms: { screen: Sms },
    backupRestore: { screen: BackupRestore },
    appointment: { screen: Appointment },
    treatmentsManager: { screen: Treatment }
  },
  {}
);

const MainTabNavigator = createBottomTabNavigator(
  {
    website: {
      screen: Website,
      navigationOptions: {
        tabBarLabel: "My Website",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name={"globe"}
            size={2 * Constants.icon_size}
            style={{ color: tintColor }}
            color={tintColor}
          />
        )
      }
    },
    appointmentFeed: {
      screen: Appointments,
      navigationOptions: {
        tabBarLabel: "Appointments",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="Octicons"
            name="calendar"
            size={2 * Constants.icon_size}
            style={{ color: tintColor }}
            color={tintColor}
          />
        )
      }
    },
    addAppointment: {
      screen: AddAppointmentStackNavigator,
      navigationOptions: {
        tabBarLabel: "Add Appointments",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="MaterialCommunityIcons"
            name="calendar-edit"
            size={2 * Constants.icon_size}
            style={{ color: tintColor }}
            color={tintColor}
          />
        )
      }
    },
    settings: {
      screen: settingsStackNavigator,
      navigationOptions: {
        tabBarLabel: "Settings",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="Octicons"
            name="settings"
            size={2 * Constants.icon_size}
            style={{ color: tintColor }}
            color={tintColor}
          />
        )
      }
    }
  },
  {
    initialRouteName: "appointmentFeed",
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    shifting: true,
    tabBarOptions: {
      activeTintColor: Constants.theme_color,
      inactiveTintColor: "gray"
    }
  }
);

export default createAppContainer(MainTabNavigator);
