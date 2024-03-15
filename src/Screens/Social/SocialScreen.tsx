import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { Avatar, IconButton, TextInput } from 'react-native-paper';
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
import { CommentsInterface, PostingInterface, UserInterFace } from '../../models/ObjectInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api/AxiosApiConfig';
import LoadingComponent from '../../components/Common/Loading/LoadingComponent';
import UserListHoriziableComponent from '../../components/Common/UserListHoriziable/UserListHoriziableComponent';

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
  const [currentPosting, setCurrentPosting] = useState<PostingInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [postingObj, setPostingObj] = useState<PostingInterface>();
  const [user, setUser] = useState<UserInterFace>();

  /*-----------------Usable variable-----------------*/
  const dispatch = useDispatch();
  const openCommentsDialog = useSelector(
    (state: any) => state.store.isOpenCommentsDialog
  );

  /*-----------------UseEffect-----------------*/
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const tokenStorage = await AsyncStorage.getItem('access_token');
      const userStorage = await AsyncStorage.getItem('userData');
      if (userStorage) {
        const userParse: UserInterFace = JSON.parse(userStorage);
        console.log("userrrrr=r=r==r=: ", userParse.userID);
        setUser(userParse);
        if (tokenStorage) {
          const tokenString = JSON.parse(tokenStorage);
          const params = {}
          try {
            const getData = await api.get(`/api/v1/post/get-all-post-for-user?user_id=${userParse.userID}`, params, tokenString);
            console.log('===================================: ', getData);
            if (getData.success === 200) {
              const arrData: PostingInterface[] = getData.data
              // const result = arrData.filter((item: PostingInterface) => item.typeOfPosts === 'POSTS');
              // if (result) {
              setCurrentPosting(arrData);
              // }
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
  }, []);

  /*-----------------Function handler-----------------*/
  const hanldeGoBack = () => {
    navigation.goBack();
  }

  const handleOpenPostingForm = () => {
    // dispatch(setOpenUpPostingDialog(true));
    // setIsOpenCommentsDialog(true);
    navigation.navigate('AddingPostingsScreen')
  };

  const handleOpenCommentsDialog = (postID: any) => {
    const selectedItem = currentPosting.find((item) => item.postID === postID);
    if (selectedItem && selectedItem.postID) {
      setSelectedItem(selectedItem.postID);
    }
    setIsOpenCommentsDialog(true);
    dispatch(setOpenCommentsDialog(true));
  };

  const handleToggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const handleSetComment = (text: string, postID: string) => {
    setComments((prevComments) => ({
      ...prevComments,
      [postID]: text,
    }));
  };
  const handleNumberOfComment = async (postID: number, postComment: CommentsInterface[]) => {
    let posting = [...currentPosting]
     posting.forEach((item) => {
      if (item.postID === postID) {
        item.comment = postComment;
      }
    });
    setCurrentPosting(posting);
  }

  const handleSendComment = (id: string) => {
  };

  const handleMoveToPostingDetail = (postID: any) => {
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
        isLogo={true}
        backAction={() => hanldeGoBack()}
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
          <UserListHoriziableComponent></UserListHoriziableComponent>
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
            data={currentPosting}
            keyExtractor={(item: any) => item.postID}
            renderItem={({ item }) => (
              <ListViewComponent
                key={item.postID}
                data={[{ id: item.postID, imgUrl: '#' }]}
                extendImgUrl={item.image && item.image[0]}
                cardStyleContainer={SocailStyleScreen.container_cardContainer}
                cardStyleContent={SocailStyleScreen.container_cardContent}
                onPress={() => handleMoveToPostingDetail(item.postID)}
                extendHeaderChild={
                  <View
                    key={item.postID}
                    style={[
                      SocailStyleScreen.container_postingBar,
                      { marginTop: 20 },
                    ]}
                  >
                    <TouchableOpacity
                      onPress={() => handleMoveToUserProfile(item?.userResponse?.userID)}
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
                          source={{ uri: item?.userResponse?.imgUrl }}
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
                            {item.userResponse?.username}
                          </Text>
                          <Text style={{ fontSize: spanTextSize * 0.8 }}>
                            {item.date}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                    <View style={{ position: 'absolute', right: 0 }}>
                      <IconButton icon={require('../../assets/icon/3dotmenu.png')} size={20}></IconButton>
                    </View>
                  </View>
                }
                extendChild={
                  <View key={item.postID} style={SocailStyleScreen.post__content}>

                    <PostContentComponent key={item.postID} props={item} user={user} isReact={item.reacted} />

                    <View style={SocailStyleScreen.post__content_child}>
                      {item.content && (
                        <Text style={{ color: 'black', fontSize: 15 }}>
                          {showFullContent
                            ? item.content
                            : item?.content.substring(0, 150) + '...'}
                          {"  "}
                          {item.content.length > 150 && (
                            <Text
                              onPress={handleToggleContent}
                              style={{ color: 'black', fontSize: 15, textDecorationLine: 'underline' }}
                            >
                              {showFullContent ? 'See less' : 'See more'}
                            </Text>
                          )}
                        </Text>
                      )}



                      {user && item.postID === selectedItem && (
                        <SafeAreaView >
                          {item.comment && (
                            <CommentsDetailDialogComponent
                              postId={item.postID}
                              comments={item.comment}
                              user={user}
                              handleNumberOfComment={handleNumberOfComment}
                            ></CommentsDetailDialogComponent>
                          )}
                        </SafeAreaView>
                      )}
                    </View>
                    <View style={{ paddingVertical: 5 }}>
                      <TouchableOpacity onPress={() => handleOpenCommentsDialog(item.postID)}>
                        <Text
                          style={{ color: 'gray', fontSize: 15 }}
                        >
                          See all {item.comment ? item.comment.length : '0'} comments
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                }
              />
            )}
            contentContainerStyle={{ paddingRight: 0 }}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
          {/* <PostingDialogComponent></PostingDialogComponent> */}
        </View>
      </ScrollView>
      <AppBarFooterComponents
        isHide={scrollUp}
        centerIcon={'plus'}
      ></AppBarFooterComponents>
      <LoadingComponent spinner={isLoading}></LoadingComponent>

    </View>
  );
};

export default SocialScreen;
