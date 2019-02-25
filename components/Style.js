import { StyleSheet } from "react-native";
import Constant from "./Constants";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constant.theme_color
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Constant.theme_color
  },
  form: {
    alignItems: "stretch",
    justifyContent: "center",
    paddingTop: 50,
    backgroundColor: Constant.theme_color
  },
  card: {
    padding: 16
  },
  title: {
    paddingBottom: 12,
    textAlign: "center",
    color: Constant.theme_compliment_color,
    fontSize: 20,
    fontWeight: "bold"
  },
  subTitle: {
    marginLeft: 12,
    color: Constant.theme_compliment_color,
    fontSize: 15,
    fontWeight: "bold"
  },
  age: {
    marginLeft: 12,
    height: 32,
    width: 30,
    color: Constant.theme_color,
    backgroundColor: Constant.theme_compliment_color,
    fontWeight: "bold",
    fontSize: 15
  },
  line: {
    borderWidth: 0.5,
    borderColor: Constant.theme_color,
    margin: 1
  },
  cardContent: {
    flex: 1,
    flexDirection: "row"
  },
  iconStyle: {
    fontSize: 2 * Constant.icon_size,
    color: Constant.theme_color
  }
});

export default Styles;
