import React, { useEffect, useState } from 'react';
import PostContentStyle from "./PostContentStyle";
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import { Text, TouchableOpacity, View } from "react-native";
import { PostingInterface, ReactInterface, UserInterFace } from '../../../models/ObjectInterface';
import { fourthColor } from '../../../root/Colors';
import api from '../../../api/AxiosApiConfig';

interface PostContentProps {
  props: PostingInterface;
  react?: ReactInterface[] | boolean | undefined; 
  hasReact?: boolean;
  user?: UserInterFace;
  isReact?: boolean;
  updateCommentCount: (count: number) => void; 
}

const PostContentComponent = ({ props, react, user, isReact, updateCommentCount }: PostContentProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [numOfReact, setNumOfReact] = useState(0);

  useEffect(() => {
    if (props.react) {
      setNumOfReact(props.react.length);
    }
  }, [props]);

  const handleSetLike = async () => {
    const bodyRequest: ReactInterface = {
      userID: user?.userID,
      postID: props.postID,
      react: "LIKE"
    };
    try {
      const response = await api.post('/api/v1/react/un-send-react', bodyRequest);
      if (response.success === 200) {
        if (response.data) {
          setNumOfReact(numOfReact + 1);
          setIsLiked(true);
        } else {
          setIsLiked(false);
          setNumOfReact(numOfReact - 1);
        }
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View key={props.postID}>
      <View style={PostContentStyle.post__content_child}>
        <View style={PostContentStyle.post__content_interaction}>
          <TouchableOpacity onPress={handleSetLike}>
            <IconMaterial
              name={isReact || isLiked ? 'heart' : 'heart-outline'}
              size={25}
              color={isReact || isLiked ? fourthColor : 'black'}
              style={PostContentStyle.interaction_icon}
            />
          </TouchableOpacity>
          <Text style={PostContentStyle.interaction_number}>
            {numOfReact}
          </Text>
        </View>
        <View style={PostContentStyle.post__content_interaction}>
          <IconMaterial
            name='comment-outline'
            size={25}
            color={'black'}
            style={PostContentStyle.interaction_icon}
          />
          <Text style={PostContentStyle.interaction_number}>
            {props.comment ? props.comment.length : 0}
          </Text>
        </View>
        <View style={PostContentStyle.post__content_interaction}>
          <IconFeather
            name='send'
            size={21}
            color={'black'}
            style={PostContentStyle.interaction_icon}
          />
          <Text style={PostContentStyle.interaction_number}>
            {/* {props.react} */}
          </Text>
        </View>
      </View>

      <View style={PostContentStyle.post__content_child}>
        {props?.hashtag && props?.hashtag.map((hashtag, key) => (
          <Text key={key} style={PostContentStyle.post__content_hashtag}>
            {hashtag}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default PostContentComponent;
