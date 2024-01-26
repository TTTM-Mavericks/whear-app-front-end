import { StyleSheet, Dimensions } from 'react-native';
import { backgroundColor, grayBackgroundColor } from '../../root/Colors';
import { ITEM_WIDTH } from '../../components/ListView/ListViewStyleComponent';
import { ITEM_HEIGHT } from '../../components/Common/AppBarHeader/AppBarHeaderStyleComponent';


const { width, height } = Dimensions.get('window');
const containerPadding = 16;

const PostingDetailStyleScreen = StyleSheet.create({
  container: {
    height: 'auto',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: containerPadding,
    backgroundColor: backgroundColor
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
});

export default PostingDetailStyleScreen;
