import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Animated, Keyboard, Platform, ScrollView, TouchableWithoutFeedback, View } from 'react-native';
import { Avatar, Dialog, Portal, Text, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenCommentsDialog } from '../../redux/State/Actions';
import { backgroundColor, grayBorderColor, primaryColor } from '../../root/Colors';
import { iconAvatarPostingSize } from '../../root/Icon';
import { height, width } from '../../root/ResponsiveSize';
import { RootStackParamList } from '../../root/RootStackParams';
import CommentComponent from '../Common/Comment/CommentComponent';
import DialogStylesComponent from './DialogStyleComponent';
import { CommentsInterface, PostingInterface, UserInterFace } from '../../models/ObjectInterface';
import api from '../../api/AxiosApiConfig';

type SignInScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Route'
>;

export interface CommentsDataProperties {
  comments: CommentsInterface[];
  postId: any;
  commentsChild?: React.ReactNode;
  user: UserInterFace;
}

const CommentsDetailDialogComponent: React.FC<CommentsDataProperties> = ({
  comments,
  postId,
  commentsChild,
  user,
}) => {
  const dispatch = useDispatch();
  const openDialog = useSelector(
    (state: any) => state.store.isOpenCommentsDialog
  );
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const [comment, setComment] = useState('');
  const [isKeyBoardOpen, setIskeyboardOpen] = useState(false);
  const [heightOfKeyBoard, setHeightOfKeyBoard] = useState(0);
  const [commentGetting, setCommmentGetting] = useState<CommentsInterface[]>([]);
  const [commentCount, setCommentCount] = useState(comments.length);
  const translateY = React.useRef(new Animated.Value(600)).current;
  const MAX_LENGTH = 30;
  const MAX_CHARACTERS_PER_LINE = 20;

  useEffect(() => {
    if (openDialog) {
      showAnimation();
    } else {
      hideAnimation();
    }
  }, [openDialog]);

  useEffect(() => {
    setCommmentGetting(comments);
  }, [comments]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', e => {
      setHeightOfKeyBoard(e.endCoordinates.height)
      setIskeyboardOpen(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
      setIskeyboardOpen(false);
      setHeightOfKeyBoard(0);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const hideDialog = () => {
    dispatch(setOpenCommentsDialog(false));
  };

  const handleTextChange = (text: string) => {
    const lines = text.split('\n');
    const truncatedLines = lines.map(line =>
      line.slice(0, MAX_CHARACTERS_PER_LINE)
    );
    const truncatedText = truncatedLines.join('\n');

    if (truncatedLines.length > MAX_LENGTH) {
      // Do something if exceeded max length
    } else {
      setComment(truncatedText);
    }
  };

  const handleTouchablePress = () => {
    Keyboard.dismiss();
  };

  const handleSendComment = async () => {
    const bodyRequest = {
      userID: user?.userID,
      postID: postId,
      content: comment,

    }
    try {
      const response = await api.post('/api/v1/comment/create-comment', bodyRequest);
      if (response.success === 200) {
        setCommmentGetting(prevComments => [...prevComments, response.data]);
        setCommentCount(prevCount => prevCount + 1); 
        setComment('');
      } else {
        // Handle error response
      }
    } catch (error) {
      // Handle network or other errors
    }
    
  };

  const showAnimation = () => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const hideAnimation = () => {
    Animated.timing(translateY, {
      toValue: 200,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableWithoutFeedback onPress={handleTouchablePress}>
      <View style={{ backgroundColor: 'white' }}>
        <Portal>
          <Dialog
            visible={openDialog}
            style={[
              DialogStylesComponent.postingDialogContainer,
              Platform.OS === 'ios' && isKeyBoardOpen && { position: 'absolute', bottom: heightOfKeyBoard - 30, backgroundColor: backgroundColor }
            ]}
            onDismiss={hideDialog}
          >
            <Dialog.Title style={{ marginTop: 10 }}>
              <View style={{ flexDirection: 'row', width: width * 0.8, paddingLeft: 10 }}>
                <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}>Comments</Text>
              </View>
            </Dialog.Title>

            <Dialog.ScrollArea>
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={DialogStylesComponent.commentDialogContent}
                keyboardShouldPersistTaps="handled"
              >
                {commentsChild}
                {commentGetting && commentGetting.map((comment: CommentsInterface) => (
                  <CommentComponent
                    key={comment.commentID}
                    commentID={comment.commentID}
                    content={comment.content}
                    user={comment.user}
                    date={comment.date}
                  />
                ))}
              </ScrollView>
            </Dialog.ScrollArea>

            {commentGetting.length >= 0 && (
              <Dialog.Actions style={{ height: 60, paddingHorizontal: 10 }}>
                <View style={DialogStylesComponent.commentActionContainer}>
                  <Avatar.Image
                    size={iconAvatarPostingSize}
                    source={{ uri: user.imgUrl }}
                    style={{ marginRight: 10 }}
                  />
                  <View>
                    <TextInput
                      value={comment}
                      mode='outlined'
                      style={DialogStylesComponent.commentInput}
                      onChangeText={(text: string) => handleTextChange(text)}
                      outlineStyle={{
                        borderRadius: 30,
                        borderColor: grayBorderColor,
                        borderWidth: 1,
                      }}
                      placeholder='Comment at here...'
                      right={
                        <TextInput.Icon
                          size={25}
                          icon='send'
                          color={primaryColor}
                          onPress={handleSendComment}
                        />
                      }
                    />
                  </View>
                </View>
              </Dialog.Actions>
            )}
          </Dialog>
        </Portal>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CommentsDetailDialogComponent;
