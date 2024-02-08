import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { Avatar, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import AppBarFooterComponents from '../../components/Common/AppBarFooter/AppBarFooterComponents';
import AppBarHeaderComponent from '../../components/Common/AppBarHeader/AppBarHeaderComponent';
import PostContentComponent from '../../components/Common/PostContent/PostContentComponent';
import CommentsDetailDialogComponent from '../../components/Dialog/CommentsDetailDialogComponent';
import PostingDialogComponent from '../../components/Dialog/PostingDialogComponent';
import ListViewComponent from '../../components/ListView/ListViewComponent';
import {
  setOpenCommentsDialog,
  setOpenUpPostingDialog
} from '../../redux/State/Actions';
import { primaryColor, secondaryColor } from '../../root/Colors';

import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { iconAvatarPostingSize } from '../../root/Icon';
import { width } from '../../root/ResponsiveSize';
import { RootStackParamList } from '../../root/RootStackParams';
import { spanTextSize } from '../../root/Texts';
import SocailStyleScreen from './SocailStyleScreen';

interface ListItem {
  id: string;
  title?: string;
  imgUrl?: any;
  description?: string;
}

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
interface Post {
  postID: string;
  react: number;
  status: boolean;
  content: {
    imgUrl: string;
    content: string;
  };
  user: {
    userID: string;
    imgUrl: string;
    userName: string;
  };
  typeOfPost: string;
  hashtag: string[];
  date: Date;
  comment: Comment[];
}

const data: Post[] = [
  {
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
        content:
          'wowww, this is so crazy, I want to see more of your collection',
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
        content:
          'wowww, this is so crazy, I want to see more of your collection',
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
        content:
          'wowww, this is so crazy, I want to see more of your collection',
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
        content:
          'wowww, this is so crazy, I want to see more of your collection',
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
        content:
          'wowww, this is so crazy, I want to see more of your collection',
        date: new Date(),
      },
      {
        commentID: '7',
        user: {
          userID: '2',
          userName: 'Nguyễn Minh Tú',
          imgUrl:
            'https://dntt.mediacdn.vn/197608888129458176/2020/10/9/dsj7695xssw-1602235317180-16022353176351525365665.jpg',
        },
        content:
          'wowww, this is so crazy, I want to see more of your collection',
        date: new Date(),
      },
      {
        commentID: '8',
        user: {
          userID: '2',
          userName: 'Nguyễn Minh Tú',
          imgUrl:
            'https://dntt.mediacdn.vn/197608888129458176/2020/10/9/dsj7695xssw-1602235317180-16022353176351525365665.jpg',
        },
        content:
          'wowww, this is so crazy, I want to see more of your collection',
        date: new Date(),
      },
    ],
    react: 1203,
    status: true,
    content: {
      imgUrl:
        'https://i.imgur.com/uvNCUfX.jpeg',
      content:
        'Ngày 3/1, cư dân mạng bất ngờ phát hiện Khả Như đã bỏ theo dõi Puka trên Instagram cá nhân. Hành động này của nữ diễn viên khiến netizen nhận định rằng tình bạn của cả hai đã chính thức "toang" và không còn hàn gắn được.',
    },
  },
  {
    postID: '2',
    user: {
      userID: '2',
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
        content:
          'wowww, this is so crazy, I want to see more of your collection',
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
        content:
          'wowww, this is so crazy, I want to see more of your collection',
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
        content:
          'wowww, this is so crazy, I want to see more of your collection',
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
        content:
          'wowww, this is so crazy, I want to see more of your collection',
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
        content:
          'wowww, this is so crazy, I want to see more of your collection',
        date: new Date(),
      },
    ],
    react: 1203,
    status: true,
    content: {
      imgUrl:
        'https://i.imgur.com/E9C2u4c.jpeg',
      content:
        'Ngày 3/1, cư dân mạng bất ngờ phát hiện Khả Như đã bỏ theo dõi Puka trên Instagram cá nhân. Hành động này của nữ diễn viên khiến netizen nhận định rằng tình bạn của cả hai đã chính thức "toang" và không còn hàn gắn được.',
    },
  },
];

type NavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;
const SocialScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  /*-----------------UseState variable-----------------*/
  const [colorIconAdded, setColorIconAdded] = useState('#C90801');
  const [addItemToCollection, setAddItemToCollection] = useState(true);
  const [addedItems, setAddedItems] = useState<string[]>([]);
  const [postingContent, setPostingContent] = useState(
    'What are you thinking?'
  );
  const [showFullContent, setShowFullContent] = useState(false);
  const [comments, setComments] = useState<{ [key: string]: string }>({});
  const [openCommentsDialogItemId, setOpenCommentsDialogItemId] = useState<{
    [key: string]: boolean;
  }>({});
  const [isOpenCommentsDialog, setIsOpenCommentsDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [scrollUp, setScrollUp] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  /*-----------------Usable variable-----------------*/
  const dispatch = useDispatch();
  const openCommentsDialog = useSelector(
    (state: any) => state.store.isOpenCommentsDialog
  );

  /*-----------------UseEffect-----------------*/
  // useEffect(() => {
  //   dispatch(setOpenCommentsDialog(true));
  //   console.log(selectedItem);
  // }, [selectedItem])

  /*-----------------Function handler-----------------*/
  const hanldeGoBack = () => {
    navigation.goBack();
  }

  const handleSearch = () => {
    alert('search');
  };

  const handleMore = () => {
    alert('handleMore');
  };

  const handleOpenPostingForm = () => {
    // dispatch(setOpenUpPostingDialog(true));
    // setIsOpenCommentsDialog(true);
    navigation.navigate('AddingPostingsScreen')
  };

  const handleOpenCommentsDialog = (postID: string) => {
    const selectedItem = data.find((item) => item.postID === postID);
    if (selectedItem) {
      setSelectedItem(selectedItem.postID);
    }
    setIsOpenCommentsDialog(true);
    dispatch(setOpenCommentsDialog(true));
  };

  const handleToggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const handleSetComment = (text: string, postID: string) => {
    console.log('textSocial', text);
    setComments((prevComments) => ({
      ...prevComments,
      [postID]: text,
    }));
  };

  const handleSendComment = (id: string) => {
    console.log('post: ', id, ' - ', comments);
  };

  const handleMoveToPostingDetail = (postID: string) => {
    navigation.navigate('PostingDetail', { postID });
  };

  const handleScroll = (event: any) => {
    const currentScrollPos = event.nativeEvent.contentOffset.y;

    if (currentScrollPos > prevScrollPos) {
      setScrollUp(false);
    } else if (currentScrollPos < prevScrollPos) {
      setScrollUp(true);
    }

    // Update the previous scroll position
    setPrevScrollPos(currentScrollPos);
  };

  const handleMoveToUserProfile = (userID: any) => {
    navigation.replace('UserProfile', { userID });
  };

  return (
    <View style={SocailStyleScreen.container}>
      <AppBarHeaderComponent
        title={
          <View>
            <MaskedView
              maskElement={
                <Text style={SocailStyleScreen.titlePage}>Social</Text>
              }
            >
              <LinearGradient
                colors={[secondaryColor, primaryColor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={SocailStyleScreen.linearBackground}
              >
                <Text style={{ opacity: 0 }}>Social</Text>
              </LinearGradient>
            </MaskedView>
          </View>
        }
        backAction={hanldeGoBack}
      ></AppBarHeaderComponent>

      <ScrollView
        persistentScrollbar={false}
        style={SocailStyleScreen.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => handleScroll(event)}
        scrollEventThrottle={16}
      >
        <View style={SocailStyleScreen.scrollViewContent}>
          <View style={SocailStyleScreen.postingEditorContainer}>
            <View style={{ marginTop: 20 }}>
              <TextInput
                value='What are you thinking?'
                mode='outlined'
                style={SocailStyleScreen.postingInput}
                contentStyle={{}}
                onPressIn={handleOpenPostingForm}
                right={
                  <TextInput.Icon
                    icon={'image'}
                    color={primaryColor}
                  ></TextInput.Icon>
                }
              />
            </View>
          </View>

          {/* Regular FlatList */}
          <FlatList
            style={SocailStyleScreen.flatlist}
            data={data.slice(0, 10)}
            keyExtractor={(item) => item.postID}
            renderItem={({ item }) => (
              <ListViewComponent
                key={item.postID}
                data={[{ id: item.postID, imgUrl: '' }]}
                extendImgUrl={item.content.imgUrl}
                cardStyleContainer={SocailStyleScreen.container_cardContainer}
                cardStyleContent={SocailStyleScreen.container_cardContent}
                onPress={() => handleMoveToPostingDetail(item.postID)}
                extendHeaderChild={
                  <View
                    style={[
                      SocailStyleScreen.container_postingBar,
                      { marginTop: 20 },
                    ]}
                  >
                    <TouchableOpacity
                      onPress={() => handleMoveToUserProfile(item.user.userID)}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          width: width * 0.8,
                          height: 'auto',
                        }}
                      >
                        <Avatar.Image
                          size={iconAvatarPostingSize}
                          source={{ uri: item.user.imgUrl }}
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
                            Nguyen Minh Tu
                          </Text>
                          <Text style={{ fontSize: spanTextSize * 0.8 }}>
                            {item.date.toLocaleString()}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                }
                extendChild={
                  <View style={SocailStyleScreen.post__content}>

                    <PostContentComponent key={item.postID} props={item} />

                    <View style={SocailStyleScreen.post__content_child}>
                      <Text style={{ color: 'black', fontSize: 15 }}>
                        {showFullContent
                          ? item.content.content
                          : item.content.content.substring(0, 150) + '...'}
                        {"  "}
                        {item.content.content.length > 150 && (
                          <Text
                            onPress={handleToggleContent}
                            style={{ color: 'black', fontSize: 15, textDecorationLine: 'underline' }}
                          >
                            {showFullContent ? 'See less' : 'See more'}
                          </Text>
                        )}
                      </Text>
                      <View style={{ paddingVertical: 5 }}>
                        <Text
                          style={{ color: 'gray', fontSize: 15 }}
                          onPress={() => handleOpenCommentsDialog(item.postID)}
                        >
                          See all {item.comment.length} comments
                        </Text>
                      </View>

                      {item.postID === selectedItem && (
                        <SafeAreaView >
                          <CommentsDetailDialogComponent
                            postId={item.postID}
                            comments={item.comment as Comment[]}
                          ></CommentsDetailDialogComponent>
                        </SafeAreaView>
                      )}
                    </View>
                  </View>
                }
              />
            )}
            contentContainerStyle={{ paddingRight: 0 }}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />

          <PostingDialogComponent></PostingDialogComponent>
        </View>
      </ScrollView>
      <AppBarFooterComponents
        isHide={scrollUp}
        centerIcon={'plus'}
      ></AppBarFooterComponents>
    </View>
  );
};

export default SocialScreen;
