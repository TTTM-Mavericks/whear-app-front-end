import { StyleSheet, Dimensions } from "react-native";
import { textColor, greenSpringColor, backgroundColor, grayText } from "../../root/Colors";

const { width, height } = Dimensions.get("window");
const containerPadding = 36;

const BasicInformationStyle = StyleSheet.create({
  container: {
    flex: 1,
    fontWeight: "bold",
    padding: containerPadding,
    backgroundColor: backgroundColor,
  },
  headerText: { marginTop: 20 },
  textDescription: {
    marginTop: 10,
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
    marginTop: height * 0.02,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: backgroundColor

  },
  cardContent: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: backgroundColor

  },
  cardImg: {
    height: height * 0.27,
    width: width * 0.39
  },
  card: {
    height: height * 0.27,
    width: width * 0.39,
  },
  card2: { marginTop: height * 0.01 },
  titleContent: {
    textAlign: "center",
    color: textColor,
    marginTop: height * 0.01,
    fontSize: 17,
  },
  buttonCSS: {
    backgroundColor: greenSpringColor,
    marginTop: height * 0.015,
  },
  textButton: {
    fontSize: 20,
  },
  buttonGroup_button: {
    width: width * 0.5,
    height: height * 0.05,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
    borderWidth: 0,


  },
  buttonGroup_button_lable: {
    height: height * 0.045,
    marginTop: height * 0.05 * 0.8,
    fontSize: 13,
    fontWeight: '400',
    color: backgroundColor,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8

  },
  buttonArea: {
    alignContent: 'center',
    alignItems: 'center'
  },
  titleView: {
    width: width - containerPadding * 2,
    paddingRight: 50,
    paddingBottom: 20,
    marginTop: 25
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    lineHeight: 35,
  },
  linearBackground: {
    height: 80,
  },
  subTitle: {
    fontSize: 22,
    color: grayText,
    lineHeight: 33,
    marginTop: 10
  },
});

export default BasicInformationStyle;
