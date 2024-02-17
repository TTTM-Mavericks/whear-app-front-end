import { StyleSheet, Dimensions } from "react-native";
import { backgroundColor } from "../../root/Colors";
import { ITEM_HEIGHT } from '../../components/Common/AppBarHeader/AppBarHeaderStyleComponent';
import { ITEM_WIDTH } from '../../components/ListView/ListViewStyleComponent';

const { width, height } = Dimensions.get("window");
const containerPadding = 16;

const MessageStyle = StyleSheet.create({
  mainContainer: {
    height: "auto",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: containerPadding,
    paddingTop: height * 0.05,
    backgroundColor: backgroundColor,
  },
  titleTopBar: {
    fontSize: 20,
    fontWeight: "700",
    alignSelf: "center",
    height: ITEM_HEIGHT,
    paddingTop: 10
  },
  linearBackground: {
    height: ITEM_HEIGHT,
    width: ITEM_WIDTH,
  },

  itemContainer: {
    margin: 10,
    backgroundColor: "#F6F7F9",
    justifyContent: "center",
    width: width * 0.9,
    height: height * 0.15,
    flexDirection: "row",
    borderRadius: 16,
    flexWrap: "wrap",
  },

  itemImage: { marginLeft: width * 0.07, marginTop: height * 0.02 },
  rightBody: {
    flexDirection: "column",
    marginTop: height * 0.02,
  },
  itemName: { marginLeft: width * 0.07, fontSize: 16, fontWeight: "700" },
  itemDescription: {
    marginLeft: width * 0.07,
    marginTop: height * 0.007,
    overflow: "scroll",
    width: width * 0.55,
    height: height * 0.03,
    color: "#828282",
    fontSize: 14,
    fontWeight: "400",
  },
  underBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemTimeAgo: {
    marginLeft: width * 0.07,
    color: "#BDBDBD",
  },
  titlePage: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    paddingTop: 12,
    height: ITEM_HEIGHT,
  },
});

export default MessageStyle;
