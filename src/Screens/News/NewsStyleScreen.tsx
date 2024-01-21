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
    marginLeft: width * 0.06,
    marginBottom: height * 0.04,
    marginTop: height * 0.02,
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  loadMoreArticle: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: height * 0.03,
    paddingBottom: height * 0.03,
  },
  itemContainer: { margin: 5, alignItems: "center" },
  itemImage: {
    width: width / 4 - 20,
    height: 70,
    resizeMode: "cover",
  },
  itemTitle: {
    marginTop: height * 0.01,
    fontWeight: "bold",
    color: "gray",
    fontSize: 10,
  },
  itemDescription: {
    marginTop: 8,
    fontSize: 14,
    textAlign: "center",
    width: width / 4 - 20,
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
