
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, FlatList, Image, Platform, TouchableOpacity } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../root/RootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';
import ListViewComponent from '../../components/ListView/ListViewComponent';
import { Button, Dialog, Icon, IconButton, Portal, SegmentedButtons } from 'react-native-paper';
import { height, width } from '../../root/ResponsiveSize';
import { backgroundColor, grayBackgroundColor, grayBorderColor, primaryColor } from '../../root/Colors';
import { useDispatch, useSelector } from 'react-redux';
import PostingDialogComponent from '../../components/Dialog/PostingDialogComponent';
import UserProfileStyleScreen from './UserProfileStyleScreen';
import AppBarFooterComponents from '../../components/Common/AppBarFooter/AppBarFooterComponents';
import AddImageButtonComponent from '../../components/ImagePicker/AddImageButtonComponent';
import api from '../../api/AxiosApiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ClothesInterface, CollectionInterface, UserInterFace } from '../../models/ObjectInterface';
import { setUploadToFireBase } from '../../redux/State/Actions';
import { clothesLogoUrlDefault, spanTextSize } from '../../root/Texts';
import Toast from 'react-native-toast-message';

interface ListItem {
  id: string;
  title?: string;
  imgUrl?: any;
  description?: string;
}


// const data = [
//   {
//     id: '1',
//     title: "Aenean leo",
//     description: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
//     imgUrl: require('../../assets/img/introduce_background/introduce_background_1.png'),
//   },
//   {
//     id: '4',
//     title: "In turpis",
//     description: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
//     imgUrl: require('../../assets/img/introduce_background/introduce_background_2.png'),

//   },
//   {
//     id: '2',
//     title: "Lorem Ipsum",
//     description: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
//     imgUrl: require('../../assets/img/introduce_background/introduce_background_3.png'),

//   },
//   {
//     id: '3',
//     title: "Lorem Ipsum",
//     description: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
//     imgUrl: require('../../assets/img/introduce_background/introduce_background_4.png'),

//   },
//   {
//     id: '5',
//     title: "Lorem Ipsum",
//     description: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
//     imgUrl: require('../../assets/img/introduce_background/introduce_background_4.png'),

//   },
//   {
//     id: '6',
//     title: "Lorem Ipsum",
//     description: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
//     imgUrl: require('../../assets/img/introduce_background/introduce_background_4.png'),

//   },
//   {
//     id: '7',
//     title: "Lorem Ipsum",
//     description: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
//     imgUrl: require('../../assets/img/introduce_background/introduce_background_4.png'),

//   },
//   {
//     id: '10',
//     title: "Aenean leo",
//     description: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
//     imgUrl: require('../../assets/img/introduce_background/introduce_background_1.png'),
//   },
//   {
//     id: '11',
//     title: "In turpis",
//     description: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
//     imgUrl: require('../../assets/img/introduce_background/introduce_background_2.png'),

//   },
//   {
//     id: '12',
//     title: "Lorem Ipsum",
//     description: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
//     imgUrl: require('../../assets/img/introduce_background/introduce_background_3.png'),

//   },
//   {
//     id: '13',
//     title: "Lorem Ipsum",
//     description: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
//     imgUrl: require('../../assets/img/introduce_background/introduce_background_4.png'),

//   },
//   {
//     id: '14',
//     title: "Lorem Ipsum",
//     description: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
//     imgUrl: require('../../assets/img/introduce_background/introduce_background_4.png'),

//   },
// ];


interface UserProps {
  userID?: string,
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
  const [selectedTag, setSelectedTag] = useState('clothes');
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState('');
  const [userClothes, setUserColthes] = useState<ClothesInterface[]>([]);
  const [userCollection, setUserCollection] = useState<CollectionInterface[]>([]);
  const [data, setData] = useState<CollectionInterface[] | ClothesInterface[]>([]);







  /*-----------------Usable variable-----------------*/
  const dispatch = useDispatch();
  const imageUrl = useSelector((state: any) => state.store.imageUrl);
  const isUploadedImage = useSelector((state: any) => state.store.isUploadedImageToFireBase);


  /*-----------------UseEffect-----------------*/

  /**
   * Fetch data to get user by ID
   */
  useEffect(() => {

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
            AsyncStorage.setItem('userData', JSON.stringify(data));
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
    const fetchData = async () => {
      const userStorage = await AsyncStorage.getItem("userData");
      if (userStorage) {
        const userParse: UserInterFace = JSON.parse(userStorage);
        setUserStorage(userParse);

        try {
          const userIDParam = (route.params as { userID?: string })?.userID;
          const response = await api.get(`/api/v1/follow/get-all-following-user?userid=${userIDParam}&base_userid=${userParse?.userID}`);
          if (response.success === 200) {
            setFollowing(response.data);
            // console.log(response.data);
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
        if (selectedTag === 'collection') {
          const getData = await api.get(`/api/v1/collection/get-all-by-userid?user_id=${userStorage?.userID}`, params, token);

          if (getData.success === 200) {
            setUserCollection(getData.data);
            setData(getData.data);
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


      } catch (error) {
        console.error("An error occurred during data fetching:", error);
      }
    }
    fetchData();
  }, [selectedTag])


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


  return (
    <View style={UserProfileStyleScreen.container}>
      <Toast
        position='top'
        bottomOffset={20}

      />
      <View style={UserProfileStyleScreen.header}>
        <IconButton icon={require('../../assets/icon/backarrow.png')} onPress={() => navigation.goBack()}></IconButton>
        <View style={UserProfileStyleScreen.upgradeBanner} >
          <Icon source={require('../../assets/img/logo/logo.png')} size={40}></Icon>
          <Text style={{ fontSize: 12, fontWeight: 'bold', marginRight: 10 }}>Upgrade to Store</Text>
        </View>
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
          <IconButton icon={require('../../assets/icon/upgrade.png')} iconColor={'black'} size={25} style={{ position: 'absolute', right: -50 }}></IconButton>

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
            value: 'collection',
            icon: 'heart',
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
            value: 'events',
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
            value: 'news',
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
          {selectedTag === 'collection' &&
            (
              <FlatList
                style={UserProfileStyleScreen.flatlist}
                data={userCollection}
                keyExtractor={(item) => item.collectionID}
                numColumns={2}
                renderItem={({ item }) => (
                  <TouchableOpacity>
                    <ListViewComponent data={[{ id: item.collectionID, imgUrl: item.imgUrl ? item.imgUrl : clothesLogoUrlDefault, }]} />
                    <View style={{ position: 'absolute', backgroundColor: 'rgba(216,216,216, 0.3)', width: width * 0.9, height: 300, justifyContent: 'center', alignItems: 'center', borderRadius: 8, top: 10, left: 10 }}>
                      <Text style={{ color: backgroundColor, fontSize: 40, fontWeight: 'bold' }}>{item.nameOfCollection}</Text>
                    </View>
                  </TouchableOpacity>
                )}
                contentContainerStyle={{ paddingRight: 0 }}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
              />
            )}

          {selectedTag === 'clothes' &&
            (
              <FlatList
                style={UserProfileStyleScreen.flatlist}
                data={userClothes}
                keyExtractor={(item) => item.clothesID}
                numColumns={2}
                renderItem={({ item }) => (
                  <TouchableOpacity>
                    <ListViewComponent data={[{ id: item.clothesID, imgUrl: item.clothesImages ? item.clothesImages[0] : clothesLogoUrlDefault, }]} />
                  </TouchableOpacity>
                )}
                contentContainerStyle={{ paddingRight: 0 }}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
              />
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
            {follower.length > 0 ? (
              <FlatList
                style={{ backgroundColor: backgroundColor }}
                data={flollowing}
                keyExtractor={(item: any) => item.userResponse.userID}
                renderItem={({ item }) => (
                  <View>
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                      <Image source={{ uri: item.userResponse.imgUrl }} style={{ width: 40, height: 40, borderRadius: 90 }}></Image>
                      <Text style={{ marginLeft: 10, marginTop: 40 * 0.3, fontSize: 13 }}> {item.userResponse.username}</Text>
                      <Button
                        mode='outlined'
                        contentStyle={Platform.OS === 'ios' ? { height: height * 0.045 } : { height: height * 0.04 }}
                        style={[UserProfileStyleScreen.buttonGroup_button, { backgroundColor: !item.followed || !isFollowedInFollowingUser ? grayBackgroundColor : primaryColor, width: 100, marginLeft: 5, marginRight: 5, marginTop: 30 * 0.25, position: 'absolute', right: 0 }]}
                        labelStyle={[UserProfileStyleScreen.buttonGroup_button_lable,]}
                        onPress={() => handleFollowInDialog(item.userResponse.userID)}
                      >
                        <Text style={{ fontWeight: '500', fontSize: 12, color: !item.followed || !isFollowedInFollowingUser ? "black" : "white" }}>{!item.followed || !isFollowedInFollowingUser ? "Follow" : "Following"}</Text>
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
                          <Text style={{ fontWeight: '500', fontSize: 12 }}>{isFolowed ? ' Following' : 'Follow'}</Text>
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
    </View >

  );
};

export default UserProfileScreen;
