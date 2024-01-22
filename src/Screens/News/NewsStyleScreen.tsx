import { StyleSheet, Dimensions } from "react-native";
import {
  textColor,
  greenSpringColor,
  backgroundColor,
} from "../../root/Colors";

const { width, height } = Dimensions.get("window");
const containerPadding = 0;

const NewsStyle = StyleSheet.create({
  container: {
    height: "auto",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: containerPadding,
    backgroundColor: backgroundColor,
  },
  chipButton: {
    marginLeft: width * 0.02,
    marginBottom: height * 0.03,
    marginTop: height * 0.02,
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  chipStyles: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderColor: "#D9D9D9",
  },

  loadMoreArticle: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: height * 0.03,
    paddingBottom: height * 0.03,
  },
  itemContainer: { margin: 10, alignItems: "center" },
  itemImage: {
    width: width / 2 - 20,
    height: height / 6 - 20,
    resizeMode: "cover",
  },
  itemTitle: {
    marginTop: height * 0.01,
    width: width / 2 - 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "gray",
    fontSize: 9,
    textTransform: "uppercase",
  },
  itemDescription: {
    marginTop: 7,
    fontSize: 14,
    textAlign: "center",
    width: width / 2 - 20,
  },
  loadMore: {
    textDecorationLine: "underline",
    fontSize: 16,
    fontWeight: "400",
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
  },
});

export default NewsStyle;
