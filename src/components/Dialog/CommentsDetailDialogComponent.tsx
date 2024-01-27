import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { ReactNode, useState } from 'react';
import {
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import {
  Avatar,
  Dialog,
  Portal,
  Text,
  TextInput
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Comment } from '../../Screens/PostingDetail/PostingDetailScreen';
import {
  setOpenCommentsDialog
} from '../../redux/State/Actions';
import {
  grayBorderColor,
  primaryColor
} from '../../root/Colors';
import { iconAvatarPostingSize } from '../../root/Icon';
import { width } from '../../root/ResponsiveSize';
import { RootStackParamList } from '../../root/RootStackParams';
import CommentComponent from '../Common/Comment/CommentComponent';
import DialogStylesComponent from './DialogStyleComponent';

type SignInScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Route'
>;

export interface CommentsDataProperties {
  comments: Comment[];
  postId: string;
  commentsChild?: ReactNode;
}

const MAX_LENGTH = 30;
const MAX_CHARACTERS_PER_LINE = 20;

const CommentsDetailDialogComponent: React.FC<CommentsDataProperties> = ({
  comments,
  postId,
  commentsChild,
}) => {
  // console.log("comment", comments)
  /*-----------------UseState variable-----------------*/
  const openDialog = useSelector(
    (state: any) => state.store.isOpenCommentsDialog
  );
  const [isOpen, setIsOpen] = React.useState(openDialog);
  const [isAccepted, setIsAccepted] = React.useState(false);
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const [textInput, setTextInput] = React.useState('');
  const [lengthText, setLengthText] = React.useState(0);
  const [countOpening, setCountOpening] = useState(0);
  const [showFullComment, setShowFullComment] = useState(false);
  // const [imgUrl, setImgUrl] = useState('#');
  const [comment, setComment] = useState('');

  /*-----------------Usable variable-----------------*/

  const dispatch = useDispatch();
  const translateY = React.useRef(new Animated.Value(600)).current; // Adjust the initial position

  /*-----------------UseEffect-----------------*/
  React.useEffect(() => {
    if (openDialog) {
      showAnimation();
      setIsOpen(true);
    } else {
      hideAnimation();
    }
  }, [openDialog]);

  // React.useEffect(() => {
  //     setImgUrl(comments.user.imgUrl)
  // }, [])

  /*-----------------Function handler-----------------*/
  const hideDialog = () => {
    dispatch(setOpenCommentsDialog(false));
    setIsOpen(false);
    setCountOpening(0);
  };

  const handleAcceptedPolicy = () => {
    setIsAccepted((prevIsAccepted: any) => !prevIsAccepted);
    hideDialog();
  };

  /**
   * Show animation
   */
  const showAnimation = () => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  /**
   * Hide animation
   */
  const hideAnimation = () => {
    Animated.timing(translateY, {
      toValue: 200,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {});
  };

  /**
   * onChangeText
   */
  const handleTextChange = (text: any) => {
    const lines = text.split('\n');
    const truncatedLines = lines.map((line: any) =>
      line.slice(0, MAX_CHARACTERS_PER_LINE)
    );
    const truncatedText = truncatedLines.join('\n');

    if (lengthText + truncatedLines.length > MAX_LENGTH) {
    } else {
      setTextInput(truncatedText);
      setLengthText(lengthText + truncatedLines.length);
    }
  };

  const handleTouchablePress = () => {
    Keyboard.dismiss();
  };

  /**
   * Send comment
   * @param postID
   */
//   const handleSendComment = (postID: any) => {
//     //TODO
//   };

//   const handleToggleComment = () => {
//     setShowFullComment(!showFullComment);
//   };
  const handleSetComment = (text: string) => {
    setComment(text);
  };
  return (
    <TouchableWithoutFeedback onPress={handleTouchablePress}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        aria-disabled
      >
        <View style={{ backgroundColor: 'white' }}>
          <Portal>
            <Dialog
              visible={isOpen}
              style={DialogStylesComponent.postingDialogContainer}
              onDismiss={hideDialog}
            >
              <Dialog.Title style={{ marginTop: 10 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width * 0.8,
                    paddingLeft: 10,
                  }}
                >
                  <Text
                    style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}
                  >
                    Comments
                  </Text>
                </View>
              </Dialog.Title>

              <Dialog.ScrollArea>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  style={DialogStylesComponent.commentDialogContent}
                >
                  {commentsChild}
                  <View
                    style={[
                      DialogStylesComponent.container_postingBar,
                      { flexDirection: 'column' },
                    ]}
                  >
                    {comments.map((comment: Comment, key: any) => (
                      <CommentComponent
                        key={comment.commentID}
                        commentID={comment.commentID}
                        content={comment.content}
                        user={comment.user}
                        date={comment.date}
                      />
                    ))}
                  </View>
                </ScrollView>
              </Dialog.ScrollArea>

              <Dialog.Actions style={{ height: 60, paddingHorizontal: 10 }}>
                <View style={DialogStylesComponent.commentActionContainer}>
                  <Avatar.Image
                    size={iconAvatarPostingSize}
                    source={{ uri: comments[0].user.imgUrl }}
                    style={{ marginRight: 10 }}
                  />
                  <View>
                    <TextInput
                      value={comment}
                      mode='outlined'
                      style={DialogStylesComponent.commentInput}
                      onChangeText={(text: string) => handleSetComment(text)}
                      outlineStyle={{
                        borderRadius: 30,
                        borderColor: grayBorderColor,
                        borderWidth: 1,
                      }}
                      placeholder='Comment at here...'
                      right={
                        <TextInput.Icon
                          size={25}
                          style={{ paddingTop: 25 * 0 }}
                          icon={'send'}
                          color={primaryColor}
                          // onPress={() => handleSendComment(postID)}
                        ></TextInput.Icon>
                      }
                    />
                  </View>
                </View>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default CommentsDetailDialogComponent;
