import { Icon } from "native-base";
import React from "react";
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  TabBarBottom
} from "react-navigation";
import Calendar from "../components/Calendar";
import Constant from "../components/Constants";
import AddAppointment from "../screens/AddAppointment";
import TodaysAppointment from "../screens/TodaysAppointment";
import Website from "../screens/Website";

const AddAppointmentStackNavigator = createStackNavigator(
  {
    addAppointment: {
      screen: AddAppointment
    },
    setDateTime: {
      screen: Calendar
    }
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
            size={2 * Constant.icon_size}
            style={{ color: tintColor }}
            color={tintColor}
          />
        )
      }
    },
    appointmentFeed: {
      screen: TodaysAppointment,
      navigationOptions: {
        tabBarLabel: "Appointments",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="Octicons"
            name="calendar"
            size={2 * Constant.icon_size}
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
            size={2 * Constant.icon_size}
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
      activeTintColor: Constant.theme_color,
      inactiveTintColor: "gray"
    }
  }
);

export default createAppContainer(MainTabNavigator);
