import { StyleSheet } from "react-native";
import Constants from "./Constants";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.theme_color
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Constants.theme_color
  },
  form: {
    alignItems: "stretch",
    justifyContent: "center",
    paddingTop: 50,
    backgroundColor: Constants.theme_color
  },
  card: {
    padding: 16
  },
  title: {
    paddingBottom: 12,
    textAlign: "center",
    color: Constants.theme_compliment_color,
    fontSize: 20,
    fontWeight: "bold"
  },
  subTitle: {
    marginLeft: 12,
    color: Constants.theme_compliment_color,
    fontSize: 15,
    fontWeight: "bold"
  },
  age: {
    marginLeft: 12,
    height: 32,
    width: 30,
    color: Constants.theme_color,
    backgroundColor: Constants.theme_compliment_color,
    fontWeight: "bold",
    fontSize: 15
  },
  line: {
    borderWidth: 0.5,
    borderColor: Constants.theme_color,
    margin: 1
  },
  cardContent: {
    flex: 1,
    flexDirection: "row"
  },
  iconStyle: {
    fontSize: 2 * Constants.icon_size,
    color: Constants.theme_color
  }
});

export default Styles;
