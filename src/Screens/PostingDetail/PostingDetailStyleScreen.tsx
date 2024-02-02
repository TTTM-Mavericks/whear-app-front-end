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
    backgroundColor: backgroundColor,
  },
  scrollView: {
    width: width,
    flex: 1,
    backgroundColor: backgroundColor,
    height: 'auto',
  },
  post_imageContainter: {
    height: 'auto',
    backgroundColor: 'green',
  },
  post_image: {
    width: width,
    height: 500,
    marginLeft: 0,
    borderRadius: 0,
  },
  post__content: {
    paddingHorizontal: containerPadding,
    paddingVertical: containerPadding - 10
  },
  post__content_child : {
    flexDirection: 'row',
    marginVertical: 3,
    flexWrap: 'wrap',
    width: width - containerPadding
  },
  postingInput: {
    width: width * 0.9,
    backgroundColor: backgroundColor,
    height: 30,
    borderRadius: 8,
  },
  container_postingBar: {
    width: width,
    flexDirection: 'row',
  },
  commentInput: {
    width: width * 0.75,
    backgroundColor: backgroundColor,
    height: 40,
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
