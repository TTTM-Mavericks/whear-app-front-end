import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Image, Keyboard, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, IconButton, TextInput } from 'react-native-paper';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommentsInterface, PostingInterface, UserInterFace } from '../../models/ObjectInterface';
import api from '../../api/AxiosApiConfig';
import LoadingComponent from '../../components/Common/Loading/LoadingComponent';

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

type PostingResponse = {
  post: PostingInterface,
  react: any;
}
const PostingDetailScreen = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>();

  /*-----------------UseState variable-----------------*/

  const [comment, setComment] = useState('');
  const [isKeyBoardOpen, setIskeyboardOpen] = useState(false);
  const [heightOfKeyBoard, setHeightOfKeyBoard] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [postingObj, setPostingObj] = useState<PostingInterface>();
  const [postingResponse, setPostingResponse] = useState<PostingResponse>();
  const [user, setUser] = useState<UserInterFace>();
  const [commentGetting, setCommmentGetting] = useState<CommentsInterface[]>([]);




  /*-----------------Usable variable-----------------*/
  const dispatch = useDispatch();

  const route = useRoute();
  const postID = (route.params as { postID?: string })?.postID || '';

  /*-----------------UseEffect-----------------*/
  const clothID = (route.params as { clothID?: string })?.clothID || '';

  /*-----------------UseEffect-----------------*/
  useEffect(() => {
    const fetchData = async () => {
      const tokenStorage = await AsyncStorage.getItem('access_token');
      const userStorage = await AsyncStorage.getItem('userData');
      setIsLoading(true);
      if (userStorage) {
        const userParse: UserInterFace = JSON.parse(userStorage);
        setUser(userParse);
        if (tokenStorage) {
          const tokenString = JSON.parse(tokenStorage);
          const params = {}
          try {
            const getData = await api.get(`/api/v1/post/get-post-by-postid?post_id=${postID}&based_userid=${userParse.userID}`, params, tokenString);
            // const getData = await api.get(`/api/v1/post/get-post-by-postid?post_id=4&based_userid=${userParse.userID}`, params, tokenString);

            if (getData.success === 200) {
              setPostingObj(getData.data);
              setPostingResponse(getData.data)
              setTimeout(() => {
                setIsLoading(false);
              }, 1000)
            }
            else {
              setTimeout(() => {
                setIsLoading(false);
              }, 1000)
            }
          } catch (error) {
            console.error("An error occurred during data fetching:", error);
          }
        }
      }
    }
    fetchData();
  }, [clothID]);

  React.useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', e => {
      setHeightOfKeyBoard(e.endCoordinates.height)
      setIskeyboardOpen(true);
    }
    );
    const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
      setIskeyboardOpen(false);
      setHeightOfKeyBoard(0);
    }
    );
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    }
  }, [heightOfKeyBoard]);

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

  /**
   * Send comment
   * @param postID
   */
  const handleSendComment = async (postID: any) => {
    const bodyRequest = {
      userID: user?.userID,
      postID: postID,
      content: comment
    }
    try {
      const response = await api.post('/api/v1/comment/create-comment', bodyRequest);
      if (response.success === 200) {
        setPostingObj((prev) => ({
          ...prev,
          comment: [...(prev?.comment || []), response.data],
        }));

      } else {


      }
    } catch (error) {

    }
  };

  /**
   * Comments group element
   * @returns ReactNode
   */

  return (
    <View style={PostingDetailStyleScreen.container}>
      <LoadingComponent spinner={isLoading}></LoadingComponent>
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
        style={[PostingDetailStyleScreen.scrollView,]}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={[{ marginTop: 20, marginBottom: 10, flex: 1, },]}>
          <TouchableOpacity
            onPress={() => handleMoveToUserProfile(postingObj?.userResponse?.userID)}
          >
            <View
              style={{
                flexDirection: 'row',
                width: width * 0.8,
              }}
            >
              <Avatar.Image
                size={iconAvatarPostingSize}
                source={{ uri: postingObj?.userResponse?.imgUrl }}
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
                  {postingObj?.userResponse?.username}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <View>
                    <Text style={{ fontSize: spanTextSize * 0.8 }}>
                      {postingObj?.date}
                    </Text>
                  </View>

                </View>

              </View>

            </View>
          </TouchableOpacity>
          <View style={{ position: 'absolute', right: 0, flexDirection: 'row' }}>
            <IconButton icon={require('../../assets/icon/3dotmenu.png')} size={20}></IconButton>
          </View>
        </View>
        {
          postingObj?.image && (
            <View style={PostingDetailStyleScreen.post_imageContainter}>
              <Image
                style={PostingDetailStyleScreen.post_image}
                source={{ uri: postingObj?.image[0] }}
              />
            </View>
          )
        }

        <View style={PostingDetailStyleScreen.post__content}>

          {/* ----------React---------- */}
          {postingObj && (
            <PostContentComponent props={postingObj}  isReact={postingObj.reacted} />
          )}

          {/* ----------Contents---------- */}
          <View style={PostingDetailStyleScreen.post__content_child}>
            <Text style={{ color: 'black', fontSize: 15 }}>
              {postingObj?.content}
            </Text>
          </View>

          {/* ----------Comments---------- */}
          {postingObj?.comment && (
            <View style={[PostingDetailStyleScreen.post__content_child, { flexDirection: 'column', marginTop: 20 }]}>
              <View>

                <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}
                >{postingObj?.comment.length} comments</Text>
              </View>
              {postingObj.comment.map((comment: CommentsInterface, key: any) => (
                <CommentComponent
                  key={comment.commentID}
                  commentID={comment.commentID}
                  content={comment.content}
                  user={comment.user}
                  date={comment.date}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView >

      <View
        style={[{
          paddingVertical: 20,
          borderTopWidth: 0.5,
          borderTopColor: grayBorderColor,
        }, Platform.OS === 'ios' && isKeyBoardOpen && { position: 'absolute', bottom: heightOfKeyBoard, backgroundColor: backgroundColor }]}
      >
        <View
          style={[
            PostingDetailStyleScreen.container_postingBar,
            { paddingHorizontal: 15 },
          ]}
        >
          <Avatar.Image
            size={iconAvatarPostingSize}
            source={{ uri: user?.imgUrl }}
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
                  onPress={() => handleSendComment(postID)}
                ></TextInput.Icon>
              }
            />
          </View>
        </View>
      </View>
    </View >
  );
};

export default PostingDetailScreen;
