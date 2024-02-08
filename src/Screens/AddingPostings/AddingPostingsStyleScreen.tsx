import { StyleSheet, Dimensions, Platform } from 'react-native';
import { backgroundColor, grayBackgroundColor, grayBorderColor, primaryColor } from '../../root/Colors';
import { ITEM_HEIGHT, ITEM_WIDTH } from '../../components/Common/AppBarHeader/AppBarHeaderStyleComponent';

const { width, height } = Dimensions.get('window');
const containerPadding = 16;

const AddingPostingsStyleScreen = StyleSheet.create({
  container: {
    height: 'auto',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: containerPadding,
    backgroundColor: backgroundColor,
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
  title: {
    fontSize: width * 0.1,
    marginBottom: 16,
  },
  input: {
    height: height * 0.05,
    width: width * 0.6,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
  flatlist: {
    backgroundColor: backgroundColor,
    flex: 1,
    flexDirection: 'row',

  },
  postingEditorContainer: {
    width: width,
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  postingInput: {
    width: width * 0.9,
    backgroundColor: backgroundColor,
    height: 30,
    borderRadius: 8
  },
  container_cardContainer: {
    width: width,
    marginLeft: 0,
    borderRadius: 0,
  },
  container_cardContent: {
    width: width,
    borderRadius: 0,

  },
  container_postingBar: {
    width: width,
    flexDirection: 'row',
    backgroundColor: 'white',

  },
  container_groupIconBar: {
    width: width * 0.8,
    height: height * 0.05,
    paddingTop: height,
    backgroundColor: 'blue',

  },
  commentInput: {
    width: width * 0.95,
    backgroundColor: backgroundColor,
    height: 30,
    borderRadius: 50,

  },
  commentContent: {
    width: width * 0.8,
    marginLeft: 10,
    marginTop: -5,
    borderRadius: 10,
    backgroundColor: grayBackgroundColor
  },
  titlePage: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingTop: 12,
    height: ITEM_HEIGHT,
  },
  linearBackground: {
    height: ITEM_HEIGHT,
    width: ITEM_WIDTH,
  },
  postingDialogContainer: {
    width: width,
    marginTop: 20,
    backgroundColor: backgroundColor,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0
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
    width: width,
    height: height * 0.5,
    marginBottom: 310,
    marginTop: 10,
    // marginLeft: width*0.05

  },
  picture: {
    position: 'relative',
    width: width,
    height: height * 0.5,
    marginTop: 10,

  },
  clothesPropsArea: {
    // width: width * 0.45,
    height: height * 0.4,
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: Platform.OS === 'ios' ? 10 : 5

  },

  buttonGroup_button: {
    width: width * 0.95,
    height: height * 0.045,
    borderRadius: 5,
    marginTop:5,
    marginBottom: 5,
    borderWidth: 0,
    textAlign: 'left',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  buttonGroup_button_lable: {
    height: height * 0.04,
    marginTop: height * 0.04 * 0.75,
    fontSize: 13,
    fontWeight: '400',
    color: 'black',
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    textAlign: 'left',
    borderRadius: 8

  },
  postingDialogContainer_textInput: {
    borderColor: backgroundColor,
    backgroundColor: backgroundColor,
    borderWidth: 0,
    marginRight: 0,
    marginLeft: 0,
    height: 200
  },
  postingDialogContainer_title: {
    width: '100%',
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'

  },
  postingDialogContainer_header: {
    flexDirection: 'row',
    marginLeft: 20,
    marginBottom: 20
  },
  toolUploadPosting: {
    width: width * 1.01,
    height: 320,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: grayBackgroundColor,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    backgroundColor: backgroundColor
  },
  multilineText: {
    width: width*0.9,
    height: height*0.2,
    backgroundColor: backgroundColor,
  },
  multilineTextContainer:{
    marginTop: 10,
    marginLeft: width*0.05
  },
  lableDropDown: {
    fontSize: 14,
    fontWeight: '500',
    paddingBottom: 5

  },
});

export default AddingPostingsStyleScreen;
