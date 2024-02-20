import React, { useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import IconIon from 'react-native-vector-icons/Ionicons';
import { Comment } from '../../../Screens/PostingDetail/PostingDetailScreen';
import { iconAvatarPostingSize } from '../../../root/Icon';
import { calcDiffDayFromNow } from '../../../util/caculate';
import CommentStyle from './CommentStyle';
import { CommentsInterface } from '../../../models/ObjectInterface';
import { grayBackgroundColor, grayBorderColor } from '../../../root/Colors';
const { width, height } = Dimensions.get('window');

const CommentComponent: React.FC<CommentsInterface> = (props: CommentsInterface) => {
  const [showFullComment, setShowFullComment] = useState(false);
  const handleToggleComment = () => {
    setShowFullComment(!showFullComment);
  };
  return (
    <View
      key={props.commentID}
      style={[CommentStyle.container_postingBar, { marginTop: 10 }]}
    >
      <View
        key={props.commentID}
        style={{ flexDirection: 'row', width: width * 0.93, height: 'auto', paddingBottom: 10, paddingTop: 10, paddingLeft: 10, paddingRight: 10, backgroundColor: grayBackgroundColor, borderRadius: 10 }}
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
              {props.user.username}
            </Text>
            <View style={{ flexDirection: 'row', width: width }}>
              <View style={CommentStyle.commentContent}>
                <Text
                  style={CommentStyle.commentContentText}
                >
                  {showFullComment && props
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
              <View style={{paddingRight: 50, marginRight: 50, position: 'absolute', right: -45}}>
                <View
                  style={CommentStyle.commentReact}
                >
                  <IconIon name='heart-outline' size={18} color='black' />
                </View>
              </View>
            </View>
          </View>
          {props?.date && (

            <View style={CommentStyle.commentInfor}>
              <Text
                style={{
                  fontSize: 13,
                  marginRight: 25,
                  color: 'gray',
                }}
              >
                {props?.date.substring(0, 16)}
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
          )}
        </View>
      </View>
    </View>
  );
};
export default CommentComponent;
