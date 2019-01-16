import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Website from "../screens/Website";
import AddAppointment from "../screens/AddAppointment";
import TodaysAppointment from "../screens/TodaysAppointment";
import SetDateTime from "../screens/SetDateTime";
import Constant from "../components/Constants";
import {
  createAppContainer,
  createBottomTabNavigator,
  TabBarBottom,
  createStackNavigator
} from "react-navigation";

const AddAppointmentStackNavigator = createStackNavigator(
  {
    addAppointment: {
      screen: AddAppointment
    },
    setDateTime: {
      screen: SetDateTime
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
            size={3 * Constant.icon_size}
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
            name={"calendar-times-o"}
            size={3 * Constant.icon_size}
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
            name={"calendar-plus-o"}
            size={3 * Constant.icon_size}
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
