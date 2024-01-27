import React from 'react'
import PostContentStyle from "./PostContentStyle"
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'
import IconFeather from 'react-native-vector-icons/Feather'
import { Text, View } from "react-native"
import { Post } from '../../../Screens/PostingDetail/PostingDetailScreen'

interface PostContentProps {
    props: Post
}
const PostContentComponent = ({props}: PostContentProps) => {
    return (
        <View>
            <View style={PostContentStyle.post__content_child}>
            <View style={PostContentStyle.post__content_interaction}>
              <IconMaterial
                name='heart-outline'
                size={25}
                color={'black'}
                style={PostContentStyle.interaction_icon}
              />
              <Text style={PostContentStyle.interaction_number}>
                {props.react}
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
                {props.comment.length}
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
                {props.react}
              </Text>
            </View>
          </View>

          <View style={PostContentStyle.post__content_child}>
            {props.hashtag.map((hashtag, key) => (
              <Text style={PostContentStyle.post__content_hashtag}>
                {hashtag}
              </Text>
            ))}
          </View>

          
        </View>
    )
}
export default PostContentComponent