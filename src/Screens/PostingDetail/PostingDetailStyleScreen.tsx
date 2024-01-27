import { StyleSheet, Dimensions } from 'react-native';
import { backgroundColor } from '../../root/Colors';

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
 
  
});

export default PostingDetailStyleScreen;
