import React, { useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import IconIon from 'react-native-vector-icons/Ionicons';
import { Comment } from '../../../Screens/PostingDetail/PostingDetailScreen';
import { iconAvatarPostingSize } from '../../../root/Icon';
import { calcDiffDayFromNow } from '../../../util/caculate';
import CommentStyle from './CommentStyle';
const { width, height } = Dimensions.get('window');

const CommentComponent: React.FC<Comment> = (props: Comment) => {
  const [showFullComment, setShowFullComment] = useState(false);
  const handleToggleComment = () => {
    setShowFullComment(!showFullComment);
  };
  return (
    <View
      key={props.commentID}
      style={[CommentStyle.container_postingBar, { marginBottom: 25 }]}
    >
      <View
        key={props.commentID}
        style={{ flexDirection: 'row', width: width * 0.8, height: 'auto' }}
      >
        <Avatar.Image
          size={iconAvatarPostingSize * 0.8}
          source={{ uri: props.user.imgUrl }}
        />
        
        <View key={props.commentID} style={CommentStyle.commentContainer}>
          <View key={props.commentID} style={CommentStyle.commentDescribe}>
            <Text
              style={CommentStyle.commentUsername}
            >
              {props.user.userName}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={CommentStyle.commentContent}>
                <Text
                  style={CommentStyle.commentContentText}
                >
                  {showFullComment
                    ? props.content + ' '
                    : props.content.substring(0, 100) + '... '}
                  {props.content.length > 100 && (
                    <Text
                      onPress={handleToggleComment}
                      style={{
                        color: 'black',
                        fontSize: 14,
                        textDecorationLine: 'underline',
                      }}
                    >
                      {showFullComment ? 'See less' : 'See more'}
                    </Text>
                  )}
                </Text>
              </View>
              <View
                style={CommentStyle.commentReact}
              >
                <IconIon name='heart-outline' size={18} color='black' />
              </View>
            </View>
          </View>
          <View style={CommentStyle.commentInfor}>
            <Text
              style={{
                fontSize: 13,
                marginRight: 25,
                color: 'gray',
              }}
            >
              {calcDiffDayFromNow(props.date.toString())}
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: 'gray',
                fontWeight: '600',
              }}
            >
              Reply
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default CommentComponent;
