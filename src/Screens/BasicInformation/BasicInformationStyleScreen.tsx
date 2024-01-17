import { StyleSheet, Dimensions } from "react-native";
import { textColor, greenSpringColor } from "../../root/Colors";

const { width, height } = Dimensions.get("window");
const containerPadding = 36;

const BasicInformationStyle = StyleSheet.create({
  container: {
    flex: 1,
    fontWeight: "bold",
    padding: containerPadding,
  },
  headerText: { marginTop: 20 },
  textDescription: {
    marginTop: 20,
    color: "#D4D4D4",
    width: 306,
    height: 100,
    fontSize: 28,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 33,
    letterSpacing: -1,
  },
  cardContainer: {
    marginTop: height*0.02,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardContent: { justifyContent: "center", alignItems: "center" },
  cardImg: { height: height * 0.27, width: width * 0.39 },
  card: {
    height: height * 0.27,
    width: width * 0.39,
  },
  card2: { marginTop: height*0.01 },
  titleContent: {
    textAlign: "center",
    color: textColor,
    marginTop: height*0.01,
    fontSize: 17,
  },
  buttonCSS: {
    backgroundColor: greenSpringColor,
    marginTop: height * 0.015,
  },
  textButton: {
    fontSize: 20,
  },
});

export default BasicInformationStyle;
