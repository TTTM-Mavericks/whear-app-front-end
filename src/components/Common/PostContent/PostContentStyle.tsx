import { StyleSheet } from "react-native";
import { width } from "../../../root/ResponsiveSize";
const containerPadding = 16
const PostContentStyle = StyleSheet.create({
    post__content_child : {
        flexDirection: 'row',
        marginVertical: 3,
        flexWrap: 'wrap',
        width: width - containerPadding
      },
      post__content_interaction: {
        flexDirection: 'row', 
        alignItems:'center', 
        marginRight: 20
    
      },
      interaction_icon: {
        paddingRight: 5,
    
      },
      interaction_number: {
        color: 'black', 
        fontSize: 15 
      },
      post__content_hashtag: {
        color: 'black', fontSize: 15,
        marginRight: 5
      }
})

export default PostContentStyle;