import { StyleSheet, Dimensions } from "react-native";
import {
  textColor,
  greenSpringColor,
  backgroundColor,
} from "../../root/Colors";
import { ITEM_HEIGHT } from '../../components/Common/AppBarHeader/AppBarHeaderStyleComponent';
import { ITEM_WIDTH } from '../../components/ListView/ListViewStyleComponent';

const { width, height } = Dimensions.get("window");
const containerPadding = 16;

const NewsStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: containerPadding,
    backgroundColor: backgroundColor
  },
  chipButton: {
    // marginLeft: width * 0.02,
    marginBottom: height * 0.03,
    marginLeft: 20,
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chipStyles: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderColor: "#D9D9D9",
    backgroundColor: backgroundColor,
  },

  loadMoreArticle: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: height * 0.03,
    paddingBottom: height * 0.03,
  },
  itemContainer: {
    alignItems: "center",
    marginLeft: 2,
    marginRight: 2,
    borderRadius: 8
  },
  itemImage: {
    width: width / 2 - 20,
    height: height / 6 - 20,
    resizeMode: "cover",
    borderRadius: 8
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
    // justifyContent: "space-between",
  },
  titlePage: {
    fontSize: 20,
    fontWeight: "700",
    alignSelf: "center",
    height: ITEM_HEIGHT,
    paddingTop: 8
  },
  linearBackground: {
    height: ITEM_HEIGHT,
    width: ITEM_WIDTH,
  },
  scrollView: {
    width: width,
    flex: 1,
    backgroundColor: backgroundColor,

  },
  scrollViewContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default NewsStyle;
