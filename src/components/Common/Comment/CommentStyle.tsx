import { Dimensions, StyleSheet } from 'react-native';
import { backgroundColor, grayBorderColor } from '../../../root/Colors';
import { iconAvatarPostingSize } from '../../../root/Icon';
const { width, height } = Dimensions.get('window');

const CommentStyle = StyleSheet.create({
  commentDialogContent: {
    marginLeft: -20,
    width: width,
    marginBottom: 20,
  },
  container_postingBar: {
    width: width,
    flexDirection: 'row',
    backgroundColor: 'white',
  },

  commentContainer: {
    marginLeft: 10,
    marginTop: -5,
    marginRight: 10,
    flexDirection: 'column',
  },
  commentUsername: {
    color: 'gray',
    paddingTop: -iconAvatarPostingSize * 1,
    fontSize: 13,
  },
  commentDescribe: {
    borderRadius: 10,
    paddingLeft: 10,
  },
  commentContent: {
    marginRight: 15,
    width: width * 0.67,
  },
  commentContentText: {
    color: 'black',
    fontWeight: '400',
    fontSize: 14,
    paddingVertical: 4,
  },
  commentReact: {
    alignItems: 'center',
    borderRadius: 50,
    borderColor: grayBorderColor,
    borderStyle: 'solid',
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 5,
    marginRight: 40
  },
  commentActionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentInfor: {
    paddingHorizontal: 12,
    flexDirection: 'row',
  },
});

export default CommentStyle;
