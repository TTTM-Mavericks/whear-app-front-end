import { StyleSheet, Dimensions, Platform } from "react-native";
import {
  textColor,
  greenSpringColor,
  backgroundColor,
  primaryColor,
} from "../../root/Colors";
import { ITEM_HEIGHT } from '../../components/Common/AppBarHeader/AppBarHeaderStyleComponent';
import { ITEM_WIDTH } from '../../components/ListView/ListViewStyleComponent';
import { inputTextSize } from "../../root/Texts";

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
    marginRight: 10,
    borderRadius: 8,
    marginBottom: 50
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
  addNewsButton: {
    backgroundColor: primaryColor,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 100,
    right: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  input: {
    width: width * 0.9,
    borderColor: 'gray',
    fontSize: inputTextSize,
    backgroundColor: 'transparent',
    marginBottom: 10
  },
  buttonGroup_button: {
    width: width * 0.9,
    height: height * 0.05,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
    borderWidth: 0,
  },
  buttonGroup_button_lable: {
    height: height * 0.035,
    marginTop: height * 0.04 * 0.75,
    fontSize: 20,
    fontWeight: '400',
    color: 'black',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8

  },
  imagePickerButton: {
    backgroundColor: '#4CAF50',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
    right: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginLeft: 40
  },
  imagePickerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  imageDetails: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  clothesAddingArea: {
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: width * 0.05,
    marginBottom: 30
  },
  pictureArea: {
    position: 'relative',
    width: width * 0.5,
    height: height * 0.4,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: primaryColor,
    marginLeft: 100
  },
  picture: {
    position: 'relative',
    width: width * 0.495,
    height: height * 0.398,
  },
  iconUploadPicture: {
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  ropdownContainer: {
    marginBottom: 10
  },
  lableDropDown: {
    fontSize: 14,
    fontWeight: '500',
    paddingBottom: 5

  },
  dropdownContainer: {
    marginBottom: 10,
    marginTop: 10
  },
  buttondropDownStyle: {
    backgroundColor: 'white',
    borderRadius: 8,
    height: 30,
    width: Platform.OS === 'ios' ? 145 : 135,
    borderWidth: 0.8,
    borderColor: primaryColor,
    fontSize: 10
  },
  buttonTextStyle: {
    fontSize: 12,
  },
  listItems: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  editBUtton: {
    backgroundColor: primaryColor,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    // top: 620,
    right: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  buttonGroup_button01: {
    width: width * 0.9,
    height: height * 0.05,
    marginLeft: 20,
    marginRight: 5,
    borderRadius: 5,
    borderWidth: 0,
    marginTop: 60
  },
});

export default NewsStyle;
