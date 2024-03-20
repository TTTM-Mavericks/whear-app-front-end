
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, FlatList, Image, Platform, TouchableOpacity } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../root/RootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';
import ListViewComponent from '../../components/ListView/ListViewComponent';
import { Button, Card, Dialog, Icon, IconButton, Portal, SegmentedButtons } from 'react-native-paper';
import { height, width } from '../../root/ResponsiveSize';
import { backgroundColor, fourthColor, grayBackgroundColor, grayBorderColor, primaryColor, thirthColor } from '../../root/Colors';
import { useDispatch, useSelector } from 'react-redux';
import PostingDialogComponent from '../../components/Dialog/PostingDialogComponent';
import UserProfileStyleScreen from './UserProfileStyleScreen';
import AppBarFooterComponents from '../../components/Common/AppBarFooter/AppBarFooterComponents';
import AddImageButtonComponent from '../../components/ImagePicker/AddImageButtonComponent';
import api from '../../api/AxiosApiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ClothesInterface, CollectionInterface, PostingInterface, TransactionInterface, UserInterFace } from '../../models/ObjectInterface';
import { setIsLogined, setOpenUpgradeRolesDialog, setUploadToFireBase } from '../../redux/State/Actions';
import { clothesLogoUrlDefault, spanTextSize } from '../../root/Texts';
import Toast from 'react-native-toast-message';
import LoadingComponent from '../../components/Common/Loading/LoadingComponent';
import UpgradeRoleDialogComponent from '../../components/Dialog/UpgradeRoleDialogComponent';

interface ListItem {
  id: string;
  title?: string;
  imgUrl?: any;
  description?: string;
}



type NavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;
const UserProfileScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp>();
  const userIDParam = (route.params as { userID?: string })?.userID || 0;


  /*-----------------UseState variable-----------------*/
  const [selectedItem, setSelectedItem] = useState({});
  const [value, setValue] = React.useState('');
  const [scrollUp, setScrollUp] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [avatrImgUrl, setAvatarImgUrl] = useState('avatrImgUrl');
  const [userStorage, setUserStorage] = useState<UserInterFace>();
  const [currentUser, setCurrentUser] = useState<UserInterFace>();
  const [follower, setFollower] = useState<UserInterFace[]>([]);
  const [flollowing, setFollowing] = useState([]);
  const [userParam, setUserParam] = useState(userIDParam);
  const [refresh, setRefresh] = React.useState(false);
  const [isFolowed, setIsFollowed] = useState(false);
  const [countFollower, setCountFollower] = useState(0);
  const [visibleFollowingDialog, setVisibleFollowingDialog] = useState(false);
  const [visibleFollowerDialog, setVisibleFollowerDialog] = useState(false);
  const [isFollowedInFollowingUser, setIsFollowedInFollowingUser] = useState(true);
  const [selectedItems, setSelectedItems] = useState([] as string[]);
  const [selectedTag, setSelectedTag] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState('');
  const [userClothes, setUserColthes] = useState<ClothesInterface[]>([]);
  const [userCollection, setUserCollection] = useState<CollectionInterface[]>([]);
  const [data, setData] = useState<CollectionInterface[] | ClothesInterface[]>([]);
  const [history, setHistory] = useState<TransactionInterface[]>([]);
  const [posting, setPosting] = useState<PostingInterface[]>([]);








  /*-----------------Usable variable-----------------*/
  const dispatch = useDispatch();
  const imageUrl = useSelector((state: any) => state.store.imageUrl);
  const isUploadedImage = useSelector((state: any) => state.store.isUploadedImageToFireBase);


  /*-----------------UseEffect-----------------*/

  /**
   * Fetch data to get user by ID
   */
  useEffect(() => {

    setSelectedTag('clothes');

    const fetchData = async () => {
      const userStorage = await AsyncStorage.getItem("userData");
      const tokenStorage = await AsyncStorage.getItem('access_token');
      if (tokenStorage) {
        const tokenString = JSON.parse(tokenStorage);
        setToken(tokenString);
      }
      if (userStorage) {
        const userParse: UserInterFace = JSON.parse(userStorage);
        setUserStorage(userParse);
        if (userParam !== 0) {
          try {
            const userIDParam = (route.params as { userID?: any })?.userID
            const response = await api.get(`/api/v1/user/get-user-by-userid?userid=${userIDParam}&base_userid=${userParse?.userID}`);
            if (response.success === 200) {
              console.log('hihihihi', response.data);
              setCurrentUser(response.data);
              if (response.followed) {
                setIsFollowed(true);
              } else {
                setIsFollowed(false);
              }
            } else {
              // console.log(response.message);
            }
          } catch (error) {
            console.error("An error occurred during data fetching:", error);
          }
        }
      };
    }
    fetchData();
  }, []);


  /**
   * Fetch data to render user avatar
   */
  useEffect(() => {
    setSelectedTag('clothes');
    setAvatarImgUrl(imageUrl);
    if (isUploadedImage) {
      console.log('fetch');
      try {
        const requestBody = {
          ...currentUser,
          imgUrl: imageUrl,
          isFirstLogin: true,
          subRole: "LV1",
        }
        const fetchData = async () => {
          const response = await api.put('/api/v1/user/update-user-by-userid', requestBody);
          if (response.success === 200) {
            setUserStorage(response.data);
            const data = response.data
            // AsyncStorage.setItem('userData', JSON.stringify(data));
            dispatch(setUploadToFireBase(false));
            Toast.show({
              type: 'success',
              text1: JSON.stringify(response.message),
              position: 'top'
            });
          } else {
            // console.log(response.message);
            Toast.show({
              type: 'error',
              text1: JSON.stringify(response.message),
              position: 'top'
            });
          }
        }
        fetchData();


      } catch (error) {
        console.error('Error posting data:', error);
      }
    }

  }, [currentUser]);


  /**
   * Fetch data to get follower User
   */
  useEffect(() => {
    setSelectedTag('clothes');
    const fetchData = async () => {
      try {
        const userIDParam = (route.params as { userID?: string })?.userID;
        const response = await api.get(`/api/v1/follow/get-all-follower-user?userid=${userIDParam}`);
        if (response.success === 200) {
          setFollower(response.data);
          setCountFollower(response.data.length);
        } else {
          // console.log(response.message);
        }

      } catch (error) {
        console.error("An error occurred during data fetching:", error);
      }
    };

    fetchData();
  }, []);


  /**
   * Fetch data to get following User
   */
  useEffect(() => {
    setSelectedTag('clothes');
    setIsLoading(true);
    const fetchData = async () => {
      const userStorage = await AsyncStorage.getItem("userData");
      if (userStorage) {
        const userParse: UserInterFace = JSON.parse(userStorage);
        setUserStorage(userParse);

        try {
          const userIDParam = (route.params as { userID?: string })?.userID;
          const response = await api.get(`/api/v1/follow/get-all-following-user?userid=${userIDParam}&base_userid=${userParse.userID}`);
          if (response.success === 200) {
            setFollowing(response.data);
            console.log('edsdfsdfsdfS:', response.data);
            setIsLoading(false);
            Toast.show({
              type: 'success',
              text1: response.message
            });
          } else {
            console.log(response.message);
            Toast.show({
              type: 'error',
              text1: response.message
            });
          }

        } catch (error) {
          console.error("An error occurred during data fetching:", error);

        }
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    console.log('selectedTag: ', selectedTag);
    setSelectedTag(selectedTag);
    fetchData();
  }, [selectedTag]);

  const fetchData = async () => {
    setIsLoading(true);
    const params = {}
    try {
      // selectedTag === 'clothes'
      // if (selectedTag === 'clothes') {
      //   const getData = await api.get(`/api/v1/collection/get-all-by-userid?user_id=${userStorage?.userID}`, params, token);

      //   if (getData.success === 200) {
      //     setUserColthes(getData.data);
      //     setTimeout(() => {
      //       setIsLoading(false);
      //     }, 1000)
      //   }
      //   else {
      //     console.log(getData.data);
      //     setTimeout(() => {
      //       setIsLoading(false);
      //     }, 1000)
      //   }
      // }

      // selectedTag === 'collection'
      setSelectedTag(selectedTag);

      if (selectedTag === 'clothes') {
        console.log('selectedTag: ', 1);
        const getData = await api.get(`/api/v1/clothes/get-clothes-by-user-id?userId=${currentUser?.userID}`, params, token);
        console.log(userStorage?.userID);
        if (getData.success === 200) {
          setUserColthes(getData.data);
          setData(getData.data);
          console.log('hihihi: ', getData.data);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000)
        }
        else {
          console.log(getData.data);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000)
        }
      }

      if (selectedTag === 'posting') {
        const getData = await api.get(`/api/v1/post/get-all-post-of-user?user_id=${currentUser?.userID}`, params, token);

        if (getData.success === 200) {
          setPosting(getData.data)
          console.log(getData.data);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000)
        }
        else {
          console.log(getData.data);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000)
        }
      }



      if (selectedTag === 'history' && currentUser?.userID === userStorage?.userID) {
        console.log('history');
        const getData = await api.get(`/api/v1/payment/get-all-payment?userId=${userStorage?.userID}`, params, token);
        console.log(userStorage?.userID);
        if (getData.success === 200) {
          setHistory(getData.data);
          console.log(getData.data);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000)
        }
        else {
          console.log(getData.data);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000)
        }
      }

      if (selectedTag === 'menu') {
        setIsLoading(false);
      }


    } catch (error) {
      console.error("An error occurred during data fetching:", error);
    }
  }


  /*-----------------Function handler-----------------*/



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



  const handleFollow = async (tagertUserID: any) => {
    const userStorage = await AsyncStorage.getItem("userData");
    if (userStorage) {
      const userParse: UserInterFace = JSON.parse(userStorage);
      try {
        const requestBody =
        {
          baseUserID: userParse?.userID,
          targetUserID: tagertUserID
        }

        const fetchData = async () => {
          const response = await api.post('/api/v1/follow/un-follow', requestBody);
          if (response.success === 200) {
            setUserStorage(response.data);
            const data = response.data
            if (isFolowed) {
              setCountFollower(countFollower - 1);
            } else {
              setCountFollower(countFollower + 1);
            }
            setIsFollowed(!isFolowed);

          } else {
            console.log(response.message);
          }
        }
        fetchData();


      } catch (error) {
        console.error('Error posting data:', error);
      }
    }

  }

  const handleFollowInDialog = async (tagertUserID: any) => {
    const userStorage = await AsyncStorage.getItem("userData");
    if (userStorage) {
      const userParse: UserInterFace = JSON.parse(userStorage);
      try {
        const requestBody =
        {
          baseUserID: userParse?.userID,
          targetUserID: tagertUserID
        }

        const fetchData = async () => {
          const response = await api.post('/api/v1/follow/un-follow', requestBody);
          if (response.success === 200) {
            setUserStorage(response.data);
            const data = response.data
            setIsFollowedInFollowingUser(!isFollowedInFollowingUser);
            handleSetSelectedItems(tagertUserID);

          } else {
            console.log(response.message);
          }
        }
        fetchData();


      } catch (error) {
        console.error('Error posting data:', error);
      }
    }

  }

  const handleHideDialog = () => {
    setVisibleFollowingDialog(false);
    setVisibleFollowerDialog(false);
  }

  const handleOpenFollowingUser = () => {
    setVisibleFollowingDialog(true);
  }

  const handleOpenFollowerUser = () => {
    setVisibleFollowerDialog(true);
  }

  const handleSetSelectedItems = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };


  const handleMoveToDetail = (id: any) => {
    console.log('id: ', id);
    navigation.navigate('TransactionDetailScreen', { transactionId: id })
  }

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('userData');
      // Optional: Perform any other logout-related actions
      console.log('Items cleared successfully');
      console.log('AsyncStorage cleared successfully');
      dispatch(setIsLogined(false));
      AsyncStorage.setItem('logined', 'false');
      setTimeout(() => {
        navigation.navigate('SignIn');
      }, 500)
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  }

  const handleMoveToPostDetail = (postID: any) => {
    navigation.navigate('PostingDetail', { postID: postID })
  }
  const hanleOpenUpgrade = () => {
    dispatch(setOpenUpgradeRolesDialog(true));
  }

  return (
    <View style={UserProfileStyleScreen.container}>
      <Toast
        position='top'
        bottomOffset={20}

      />
      <View style={UserProfileStyleScreen.header}>
        <IconButton icon={require('../../assets/icon/backarrow.png')} onPress={() => navigation.navigate('Social')}></IconButton>
        <TouchableOpacity onPress={hanleOpenUpgrade} style={UserProfileStyleScreen.upgradeBanner} >
          <Icon source={require('../../assets/img/logo/logo.png')} size={40}></Icon>
          <TouchableOpacity onPress={hanleOpenUpgrade}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginRight: 10 }}>Upgrade to Premium</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      <View style={[UserProfileStyleScreen.backGroundImg, Platform.OS === 'ios' ? { marginTop: -width * 0.88 } : { marginTop: -width * 1.05 }]}>
        <View style={UserProfileStyleScreen.avatarImg}>
          <Image source={currentUser?.imgUrl !== '#' ? { uri: currentUser?.imgUrl } : require('../../assets/icon/user.png')} style={UserProfileStyleScreen.img}></Image>
          {/* <IconButton
            icon={'camera'}
            size={25}
            style={UserProfileStyleScreen.iconImg}
            iconColor='black' ></IconButton> */}
          {currentUser?.userID === userStorage?.userID && (

            <AddImageButtonComponent
              icon={require('../../assets/icon/photo-camera.png')}
              style={UserProfileStyleScreen.iconImg}
              iconColor='black'
              isUserAvatar={true}
              width={3}
              height={3}
            />


          )}
          {/* <ImagePickerComponent style={UserProfileStyleScreen.iconImg} cutWidth={3} cutHeight={3} iconButton={require('../../assets/icon/photo-camera.png')}></ImagePickerComponent> */}
        </View>


      </View>

      <View
        style={UserProfileStyleScreen.information}
      >
        <View style={{
          flexDirection: 'row',
          alignContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={UserProfileStyleScreen.fullname}>{currentUser?.username}</Text>
          {currentUser?.subRole === 'LV2' && (
            <IconButton icon={require('../../assets/icon/upgrade.png')} iconColor={'black'} size={25} style={{ position: 'absolute', right: -50 }}></IconButton>
          )}

        </View>

        <Text style={UserProfileStyleScreen.levelUp}>{currentUser?.subRole}</Text>

        <View style={UserProfileStyleScreen.buttonGroup}>
          <Button
            mode='outlined'
            contentStyle={Platform.OS === 'ios' ? { height: height * 0.045 } : { height: height * 0.04 }}
            style={[UserProfileStyleScreen.buttonGroup_button, { backgroundColor: isFolowed ? primaryColor : grayBackgroundColor }]}
            labelStyle={[UserProfileStyleScreen.buttonGroup_button_lable, { color: isFolowed ? 'white' : 'black' }]}
            onPress={() => {
              if (currentUser?.userID !== userStorage?.userID) {
                handleFollow(currentUser?.userID);
              } else {
                handleOpenFollowerUser();
              }
            }}
          >
            <Text style={{ fontWeight: '500', fontSize: 12 }}>{countFollower}
              {currentUser?.userID !== userStorage?.userID && isFolowed ? ' Followed'
                : currentUser?.userID !== userStorage?.userID && !isFolowed && ' Follower'}
              {currentUser?.userID === userStorage?.userID && ' Follower'}
            </Text>
          </Button>

          <Button
            mode='outlined'
            contentStyle={Platform.OS === 'ios' ? { height: height * 0.045 } : { height: height * 0.04 }}
            style={[UserProfileStyleScreen.buttonGroup_button, { backgroundColor: grayBackgroundColor }]}
            labelStyle={[UserProfileStyleScreen.buttonGroup_button_lable,]}
            onPress={() => handleOpenFollowingUser()}
          >
            <Text style={{ fontWeight: '500', fontSize: 12 }}>{flollowing.length} Following</Text>
          </Button>


        </View>

        <View
          style={[UserProfileStyleScreen.segmentedButtons,]}
        >
          <IconButton icon={'facebook'} size={15} onPress={() => navigation.navigate('Home')} style={UserProfileStyleScreen.button} />
          <IconButton icon={'instagram'} size={15} onPress={() => navigation.navigate('Home')} style={UserProfileStyleScreen.button} />
          <IconButton icon={'information'} size={15} onPress={() => navigation.navigate('UserProfileSetting')} style={UserProfileStyleScreen.button} />

        </View>

      </View>

      <SegmentedButtons
        style={[UserProfileStyleScreen.segmentedButtonsNavbar]}
        theme={{ roundness: 2 }}
        value={selectedTag}
        onValueChange={setSelectedTag}
        buttons={[
          {
            value: 'clothes',
            icon: 'image',
            style: {
              marginTop: 0,
              borderRadius: 0,
              borderColor: grayBorderColor,
              borderTopWidth: 0,
              borderBottomWidth: 0,
              borderRightWidth: 0,
              borderLeftWidth: 0,
              backgroundColor: backgroundColor,
            },
            checkedColor: 'black',
            uncheckedColor: '#808991',
          },
          {
            value: 'posting',
            icon: require('../../assets/icon/hashtag.png'),
            style: {
              borderRadius: 0,
              borderColor: grayBorderColor,
              borderTopWidth: 0,
              borderBottomWidth: 0,
              borderRightWidth: 0,
              borderLeftWidth: 0,
              backgroundColor: backgroundColor,
            },
            checkedColor: 'black',
            uncheckedColor: '#808991',
          },
          {
            value: 'history',
            icon: 'history',
            style: {
              borderRadius: 0,
              borderColor: grayBorderColor,
              borderTopWidth: 0,
              borderBottomWidth: 0,
              borderRightWidth: 0,
              borderLeftWidth: 0,
              backgroundColor: backgroundColor,
            },
            checkedColor: 'black',
            uncheckedColor: '#808991',
          },
          {
            value: 'menu',
            icon: 'menu',
            style: {
              borderRadius: 0,
              borderColor: grayBorderColor,
              borderTopWidth: 0,
              borderBottomWidth: 0,
              borderRightWidth: 0,
              borderLeftWidth: 0,
              backgroundColor: backgroundColor,
            },
            checkedColor: 'black',
            uncheckedColor: '#808991',
          },
        ]}
      />



      <ScrollView
        persistentScrollbar={false}
        style={UserProfileStyleScreen.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => handleScroll(event)}
        scrollEventThrottle={16}
      >
        <View style={UserProfileStyleScreen.scrollViewContent}>
          {selectedTag === 'posting' ? posting.length > 0 ?
            (
              <FlatList
                style={UserProfileStyleScreen.flatlist}
                data={posting}
                keyExtractor={(item) => item.postID}
                numColumns={1}
                renderItem={({ item }) => (
                  <TouchableOpacity key={item.postID} style={UserProfileStyleScreen.cardContentPost} onPress={() => handleMoveToPostDetail(item.postID)}>
                    <View style={{ padding: 10, flexDirection: 'row', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }} >
                      <View style={[UserProfileStyleScreen.cardContentStatusPost]}>
                        <Image style={[UserProfileStyleScreen.cardContentStatusPost]} source={{ uri: item.image ? item.image[0] : clothesLogoUrlDefault }}></Image>
                      </View>
                      <View style={UserProfileStyleScreen.cardContentDetailPost}>
                        <Text>{item.content?.slice(0, 200)} ...</Text>
                        <View style={{ padding: 0, flexDirection: 'row', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                          <Icon source={require('../../assets/icon/heart.png')} size={15}></Icon>
                          <Text style={{ paddingLeft: 10, fontSize: 15 }}>{item.react?.length}</Text>
                        </View>
                        <View style={{ padding: 0, flexDirection: 'row', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                          <Icon source={require('../../assets/icon/talking.png')} size={15}></Icon>
                          <Text style={{ paddingLeft: 10, fontSize: 15 }}>{item.comment?.length}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                contentContainerStyle={{ paddingRight: 0 }}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
              />
            ) : (
              <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', marginTop: 10, marginBottom: 10 }}>
                <Text style={{ fontSize: 17, fontWeight: 'bold', color: primaryColor }}>Do not have any collection.</Text>
              </View>
            )
            : (
              <View></View>
            )
          }


          {selectedTag === 'clothes' ? userClothes.length > 0 ?
            (
              <FlatList
                style={UserProfileStyleScreen.flatlist}
                data={userClothes}
                keyExtractor={(item) => item.clothesID}
                numColumns={2}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => navigation.navigate('ClothesDetailScreen', { clothID: item.clothesID })}>
                    <ListViewComponent data={[{ id: item.clothesID, imgUrl: item.clothesImages ? item.clothesImages[0] : clothesLogoUrlDefault, }]} />
                  </TouchableOpacity>
                )}
                contentContainerStyle={{ paddingRight: 0 }}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
              />
            )
            : (
              <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', marginTop: 10, marginBottom: 10 }}>
                <Text style={{ fontSize: 17, fontWeight: 'bold', color: primaryColor }}>Do not have any Cloth.</Text>
              </View>
            )
            : (
              <View></View>
            )}

          {selectedTag === 'history' ? history.length > 0 ?
            (
              <FlatList
                style={UserProfileStyleScreen.flatlist}
                data={history}
                keyExtractor={(item) => item.data.id}
                numColumns={1}
                renderItem={({ item }) => (
                  <TouchableOpacity key={item.data.id} style={UserProfileStyleScreen.cardContentHistory} onPress={() => handleMoveToDetail(item.data.orderCode)}>
                    <View style={{ padding: 10, flexDirection: 'row' }} >
                      <View style={[UserProfileStyleScreen.cardContentStatus, { backgroundColor: item.data.status === 'PAID' ? primaryColor : item.data.status === 'CANCELLED' ? fourthColor : thirthColor }]}>
                        <Text style={{ color: backgroundColor, fontWeight: 'bold' }}>
                          {item.data.status}
                        </Text>
                      </View>
                      <View style={UserProfileStyleScreen.cardContentDetail}>
                        <Text>ID: {item.data.orderCode}</Text>
                        <Text>Amount: {item.data.amount} VND</Text>
                        <Text>AmountPaid: {item.data.amountPaid} VND</Text>
                        <Text>CreatedAt: {item.data.createdAt}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                contentContainerStyle={{ paddingRight: 0 }}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
              />
            )
            : (
              <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', marginTop: 10, marginBottom: 10 }}>
                <Text style={{ fontSize: 17, fontWeight: 'bold', color: primaryColor }}>Do not have any transaction.</Text>
              </View>
            )
            : (
              <View></View>
            )
          }

          {selectedTag === 'menu' && userStorage?.userID === currentUser?.userID && (
            <View>
              <Button
                mode='outlined'
                contentStyle={Platform.OS === 'ios' ? { height: height * 0.05 } : { height: height * 0.04 }}
                style={[UserProfileStyleScreen.buttonGroup_button, { backgroundColor: primaryColor, marginTop: 20 }]}
                labelStyle={[UserProfileStyleScreen.buttonGroup_button_lable,]}
                onPress={() => navigation.navigate('UserProfileSetting')}
              >
                <Text style={{ fontWeight: '500', fontSize: 12 }}>Change info</Text>
              </Button>

              <Button
                mode='outlined'
                contentStyle={Platform.OS === 'ios' ? { height: height * 0.05 } : { height: height * 0.04 }}
                style={[UserProfileStyleScreen.buttonGroup_button, { backgroundColor: primaryColor, marginTop: 20 }]}
                labelStyle={[UserProfileStyleScreen.buttonGroup_button_lable,]}
                onPress={() => navigation.navigate('BasicInformationScreen')}
              >
                <Text style={{ fontWeight: '500', fontSize: 12 }}>Change style</Text>
              </Button>

              <Button
                mode='outlined'
                contentStyle={Platform.OS === 'ios' ? { height: height * 0.05 } : { height: height * 0.04 }}
                style={[UserProfileStyleScreen.buttonGroup_button, { backgroundColor: grayBackgroundColor, marginTop: 20 }]}
                labelStyle={[UserProfileStyleScreen.buttonGroup_button_lable,]}
                onPress={() => handleLogout()}
              >
                <Text style={{ fontWeight: '500', fontSize: 12 }}>Log out</Text>
              </Button>

            </View>
          )}

          <PostingDialogComponent></PostingDialogComponent>
        </View>
      </ScrollView >

      {/* FLOLLOWING USER LIST */}
      <Portal>
        <Dialog
          visible={visibleFollowingDialog}
          onDismiss={handleHideDialog}
          style={{ width: width * 0.85, height: height * 0.8, backgroundColor: backgroundColor }}
        >
          <Dialog.Content>
            {flollowing.length > 0 ? (
              <FlatList
                style={{ backgroundColor: backgroundColor }}
                data={flollowing}
                keyExtractor={(item: any) => item.userResponse.userID}
                renderItem={({ item }) => (
                  <View>
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                      <Image source={{ uri: item.userResponse.imgUrl }} style={{ width: 40, height: 40, borderRadius: 90 }}></Image>
                      <Text style={{ marginLeft: 10, marginTop: 40 * 0.3, fontSize: 13 }}> {item.userResponse.username.slice(0, 10)}...</Text>
                      <Button
                        mode='outlined'
                        contentStyle={Platform.OS === 'ios' ? { height: height * 0.045 } : { height: height * 0.04 }}
                        style={[UserProfileStyleScreen.buttonGroup_button, { backgroundColor: !item.followed || !isFollowedInFollowingUser ? grayBackgroundColor : primaryColor, width: 100, marginLeft: 5, marginRight: 5, marginTop: 30 * 0.25, position: 'absolute', right: 0 }]}
                        labelStyle={[UserProfileStyleScreen.buttonGroup_button_lable,]}
                        onPress={() => handleFollowInDialog(item.userResponse.userID)}
                      >
                        <Text style={{ fontWeight: '500', fontSize: 10, color: !item.followed || !isFollowedInFollowingUser ? "black" : "white" }}>{!item.followed || !isFollowedInFollowingUser ? "Follow" : "Following"}</Text>
                      </Button>
                    </View>
                  </View>
                )}
              >
              </FlatList>
            ) : (
              <View style={{ alignContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 12, fontWeight: '300', color: 'black' }}>You do not follow any user</Text>
              </View>
            )}
          </Dialog.Content>
        </Dialog>
      </Portal>

      {/* FOLLOWER USER LIST */}
      {currentUser?.userID === userStorage?.userID && (
        <Portal>
          <Dialog
            visible={visibleFollowerDialog}
            onDismiss={handleHideDialog}
            style={{ width: width * 0.85, height: height * 0.8, backgroundColor: backgroundColor }}
          >
            <Dialog.Content>
              {follower.length > 0 ? (
                <FlatList
                  style={{ backgroundColor: backgroundColor }}
                  data={follower}
                  keyExtractor={(item: any) => item.userID}
                  renderItem={({ item }) => (
                    <View>
                      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <Image source={{ uri: item.imgUrl }} style={{ width: 40, height: 40, borderRadius: 90 }}></Image>
                        <Text style={{ marginLeft: 10, marginTop: 40 * 0.3, fontSize: 13 }}> {item.username}</Text>
                        <Button
                          mode='outlined'
                          contentStyle={Platform.OS === 'ios' ? { height: height * 0.045 } : { height: height * 0.04 }}
                          style={[UserProfileStyleScreen.buttonGroup_button, { backgroundColor: !isFolowed ? grayBackgroundColor : primaryColor, width: 100, marginLeft: 5, marginRight: 5, marginTop: 30 * 0.25, position: 'absolute', right: 0 }]}
                          labelStyle={[UserProfileStyleScreen.buttonGroup_button_lable,]}
                        >
                          <Text style={{ fontWeight: '500', fontSize: 10 }}>{isFolowed ? ' Following' : 'Follow'}</Text>
                        </Button>
                      </View>
                    </View>
                  )}
                >
                </FlatList>

              ) : (
                <View style={{ alignContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 12, fontWeight: '300', color: 'black' }}>Do not have any user follow you</Text>
                </View>
              )
              }


            </Dialog.Content>
          </Dialog>
        </Portal>
      )}
      <AppBarFooterComponents isHide={scrollUp} centerIcon={require('../../assets/img/logo/logo.png')}></AppBarFooterComponents>
      <LoadingComponent spinner={isLoading} ></LoadingComponent>
      <UpgradeRoleDialogComponent></UpgradeRoleDialogComponent>
    </View >


  );
};

export default UserProfileScreen;
