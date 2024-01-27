import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, TextInput } from 'react-native-paper';
import CommentComponent from '../../components/Common/Comment/CommentComponent';
import PostContentComponent from '../../components/Common/PostContent/PostContentComponent';
import { RootStackParamList } from '../../root/RootStackParams';
import { height, width } from '../../root/ResponsiveSize';
import { backgroundColor, grayBorderColor, primaryColor, secondaryColor } from '../../root/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenAddToCollectionsDialog, setOpenCommentsDialog, setOpenUpPostingDialog } from '../../redux/State/Actions';
import AddingToCollectionComponent from '../../components/Dialog/AddingToCollectionComponent';
import PostingDialogComponent from '../../components/Dialog/PostingDialogComponent';
import { spanTextSize } from '../../root/Texts';
import PostingDetailStyleScreen from './PostingDetailStyleScreen';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import AppBarHeaderComponent from '../../components/Common/AppBarHeader/AppBarHeaderComponent';
import { iconAvatarPostingSize } from '../../root/Icon';

export interface Comment {
  commentID: string;
  user: User;
  content: string;
  date: Date;
}
interface User {
  userID: string;
  userName: string;
  imgUrl: string;
}
export interface Post {
  postID: string;
  react: number;
  status: boolean;
  content: {
    imgUrl: string;
    content: string;
  };
  user: User;
  typeOfPost: string;
  hashtag: string[];
  date: Date;
  comment: Comment[];
}

const data: Post = {
  postID: '1',
  user: {
    userID: '1',
    imgUrl:
      'https://dntt.mediacdn.vn/197608888129458176/2020/10/9/dsj7695xssw-1602235317180-16022353176351525365665.jpg',
    userName: 'Nguyễn Minh Tú',
  },
  typeOfPost: 'Posting',
  hashtag: ['#spring2024', '#hottrend', '#sports'],
  date: new Date(),
  comment: [
    {
      commentID: '1',
      user: {
        userID: '2',
        userName: 'Nguyễn Minh Tú',
        imgUrl:
          'https://dntt.mediacdn.vn/197608888129458176/2020/10/9/dsj7695xssw-1602235317180-16022353176351525365665.jpg',
      },
      content:
        'wowww, this is so crazy, I want to see more of your collection. see more of your collectionsee more of your collectionsee more of your collection',
      date: new Date(),
    },
    {
      commentID: '2',
      user: {
        userID: '3',
        userName: 'Nguyễn Minh Tú',
        imgUrl:
          'https://dntt.mediacdn.vn/197608888129458176/2020/10/9/dsj7695xssw-1602235317180-16022353176351525365665.jpg',
      },
      content: 'wowww, this is so crazy, I want to see more of your collection',
      date: new Date(),
    },
    {
      commentID: '3',
      user: {
        userID: '4',
        userName: 'Nguyễn Minh Tú',
        imgUrl:
          'https://dntt.mediacdn.vn/197608888129458176/2020/10/9/dsj7695xssw-1602235317180-16022353176351525365665.jpg',
      },
      content: 'wowww, this is so crazy, I want to see more of your collection',
      date: new Date(),
    },
    {
      commentID: '4',
      user: {
        userID: '2',
        userName: 'Nguyễn Minh Tú',
        imgUrl:
          'https://dntt.mediacdn.vn/197608888129458176/2020/10/9/dsj7695xssw-1602235317180-16022353176351525365665.jpg',
      },
      content: 'wowww, this is so crazy, I want to see more of your collection',
      date: new Date(),
    },
    {
      commentID: '5',
      user: {
        userID: '2',
        userName: 'Nguyễn Minh Tú',
        imgUrl:
          'https://dntt.mediacdn.vn/197608888129458176/2020/10/9/dsj7695xssw-1602235317180-16022353176351525365665.jpg',
      },
      content: 'wowww, this is so crazy, I want to see more of your collection',
      date: new Date(),
    },
    {
      commentID: '6',
      user: {
        userID: '2',
        userName: 'Nguyễn Minh Tú',
        imgUrl:
          'https://dntt.mediacdn.vn/197608888129458176/2020/10/9/dsj7695xssw-1602235317180-16022353176351525365665.jpg',
      },
      content: 'wowww, this is so crazy, I want to see more of your collection',
      date: new Date(),
    },
  ],
  react: 1203,
  status: true,
  content: {
    imgUrl:
      'https://thejulius.com.vn/wp-content/uploads/2021/06/thoi-trang-mua-he.jpg',
    content:
      'Ngày 3/1, cư dân mạng bất ngờ phát hiện Khả Như đã bỏ theo dõi Puka trên Instagram cá nhân. Hành động này của nữ diễn viên khiến netizen nhận định rằng tình bạn của cả hai đã chính thức "toang" và không còn hàn gắn được.',
  },
};

type SignInScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Route'
>;
const PostingDetailScreen = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>();

  /*-----------------UseState variable-----------------*/

  const [comment, setComment] = useState('');

  /*-----------------Usable variable-----------------*/
  const dispatch = useDispatch();

  const route = useRoute();
  const postID = (route.params as { postID?: string })?.postID || '';

  /*-----------------UseEffect-----------------*/
  React.useEffect(() => {}, []);

  /*-----------------Function handler-----------------*/
  function hanldeGoBack(): void {
    navigation.navigate('Social');
  }

  const handleSearch = () => {
    alert('search');
  };

  const handleMore = () => {
    alert('handleMore');
  };

  const handleMoveToUserProfile = (userID: any) => {
    navigation.replace('UserProfile', { userID });
  };

  const handleSetComment = (text: string) => {
    setComment(text);
  };

  // const handleSendComment = (id: string) => {
  //   console.log('post: ', id, ' - ', comments);
  // };

  /**
   * Comments group element
   * @returns ReactNode
   */

  return (
    <View style={PostingDetailStyleScreen.container}>
      <AppBarHeaderComponent
        title={
          <View>
            <MaskedView
              maskElement={
                <Text style={PostingDetailStyleScreen.titlePage}>Posting</Text>
              }
            >
              <LinearGradient
                colors={[secondaryColor, primaryColor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={PostingDetailStyleScreen.linearBackground}
              >
                <Text style={{ opacity: 0 }}>Posting</Text>
              </LinearGradient>
            </MaskedView>
          </View>
        }
        backAction={() => hanldeGoBack()}
      >
      </AppBarHeaderComponent>

      <ScrollView
        persistentScrollbar={false}
        style={PostingDetailStyleScreen.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={[{ marginTop: 20, marginBottom: 10, flex: 1 }]}>
          <TouchableOpacity
            onPress={() => handleMoveToUserProfile(data.user.userID)}
          >
            <View
              style={{
                flexDirection: 'row',
                width: width * 0.8,
              }}
            >
              <Avatar.Image
                size={iconAvatarPostingSize}
                source={{ uri: data.user.imgUrl }}
                style={{ marginLeft: 10 }}
              />
              <View
                style={{
                  marginLeft: 10,
                  marginTop: 5,
                }}
              >
                <Text
                  style={{
                    fontWeight: 'bold',
                    paddingTop: iconAvatarPostingSize * 0.05,
                  }}
                >
                  {data.user.userName}
                </Text>
                <Text style={{ fontSize: spanTextSize * 0.8 }}>
                  {data.date.toLocaleString()}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={PostingDetailStyleScreen.post_imageContainter}>
          <Image
            style={PostingDetailStyleScreen.post_image}
            source={{ uri: data.content.imgUrl }}
          />
        </View>

        <View style={PostingDetailStyleScreen.post__content}>
          <PostContentComponent props={data}/>
          <View style={PostingDetailStyleScreen.post__content_child}>
            <Text style={{ color: 'black', fontSize: 15 }}>
              {data.content.content}
            </Text>
          </View>
          <View style={[PostingDetailStyleScreen.post__content_child, { flexDirection: 'column', marginTop: 20 }]}>          
             <View>
              <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold'}}
              >{data.comment.length} comments</Text>
              </View>
              {data.comment.map((comment: Comment, key: any) => (
                <CommentComponent
                  key={comment.commentID}
                  commentID={comment.commentID}
                  content={comment.content}
                  user={comment.user}
                  date={comment.date}
                />
              ))}
            </View>
        </View>
      </ScrollView>

      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 0.5,
          borderTopColor: grayBorderColor,
        }}
      >
        <View
          style={[
            PostingDetailStyleScreen.container_postingBar,
            { paddingHorizontal: 15 },
          ]}
        >
          <Avatar.Image
            size={iconAvatarPostingSize}
            source={{ uri: data.user.imgUrl }}
            style={{ marginRight: 10 }}
          />
          <View>
            <TextInput
              value={comment}
              mode='outlined'
              style={PostingDetailStyleScreen.commentInput}
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
      </View>
    </View>
  );
};

export default PostingDetailScreen;
