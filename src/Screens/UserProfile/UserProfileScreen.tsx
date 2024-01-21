
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image, Platform } from 'react-native';

import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../root/RootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';
import ListViewComponent from '../../components/ListView/ListViewComponent';
import { Appbar, Avatar, Button, Chip, Icon, IconButton, MD3Colors, SegmentedButtons, TextInput } from 'react-native-paper';
import { height, width } from '../../root/ResponsiveSize';
import { backgroundColor, grayBackgroundColor, grayBorderColor, primaryColor } from '../../root/Colors';
import { useDispatch, useSelector } from 'react-redux';
import PostingDialogComponent from '../../components/Dialog/PostingDialogComponent';
import UserProfileStyleScreen from './UserProfileStyleScreen';
import AppBarFooterComponents from '../../components/Common/AppBarFooter/AppBarFooterComponents';
import ImagePickerComponent from '../../components/ImagePicker/ImagePickersComponent';
import AddImageButtonComponent from '../../components/ImagePicker/AddImageButtonComponent';
import api from '../../api/AxiosApiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserInterFace } from '../../models/ObjectInterface';
import { convertDateFormat, formatDate, parseDateString } from '../../components/Common/Functions/CommonFunctionComponents';
import { setUploadToFireBase } from '../../redux/State/Actions';
import { useFocus } from '../../hooks/UseFocusHookCustom';

interface ListItem {
  id: string;
  title?: string;
  imgUrl?: any;
  description?: string;
}


const data = [
  {
    id: '1',
    title: "Aenean leo",
    description: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    imgUrl: require('../../assets/img/introduce_background/introduce_background_1.png'),
  },
  {
    id: '4',
    title: "In turpis",
    description: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
    imgUrl: require('../../assets/img/introduce_background/introduce_background_2.png'),

  },
  {
    id: '2',
    title: "Lorem Ipsum",
    description: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
    imgUrl: require('../../assets/img/introduce_background/introduce_background_3.png'),

  },
  {
    id: '3',
    title: "Lorem Ipsum",
    description: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
    imgUrl: require('../../assets/img/introduce_background/introduce_background_4.png'),

  },
  {
    id: '5',
    title: "Lorem Ipsum",
    description: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
    imgUrl: require('../../assets/img/introduce_background/introduce_background_4.png'),

  },
  {
    id: '6',
    title: "Lorem Ipsum",
    description: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
    imgUrl: require('../../assets/img/introduce_background/introduce_background_4.png'),

  },
  {
    id: '7',
    title: "Lorem Ipsum",
    description: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
    imgUrl: require('../../assets/img/introduce_background/introduce_background_4.png'),

  },
  {
    id: '10',
    title: "Aenean leo",
    description: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    imgUrl: require('../../assets/img/introduce_background/introduce_background_1.png'),
  },
  {
    id: '11',
    title: "In turpis",
    description: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
    imgUrl: require('../../assets/img/introduce_background/introduce_background_2.png'),

  },
  {
    id: '12',
    title: "Lorem Ipsum",
    description: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
    imgUrl: require('../../assets/img/introduce_background/introduce_background_3.png'),

  },
  {
    id: '13',
    title: "Lorem Ipsum",
    description: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
    imgUrl: require('../../assets/img/introduce_background/introduce_background_4.png'),

  },
  {
    id: '14',
    title: "Lorem Ipsum",
    description: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
    imgUrl: require('../../assets/img/introduce_background/introduce_background_4.png'),

  },
];


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
  const [flollowing, setFollowing] = useState<UserInterFace[]>([]);
  const [userParam, setUserParam] = useState(userIDParam);
  const [refresh, setRefresh] = React.useState(false);
  const [isFolowed, setIsFollowed] = useState(false);
  const [countFollower, setCountFollower] = useState(0);


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
      if (userStorage) {
        const userParse: UserInterFace = JSON.parse(userStorage);
        setUserStorage(userParse);

        if (userParam !== 0) {
          try {
            const userIDParam = (route.params as { userID?: any })?.userID
            const response = await api.get(`/api/v1/user/get-user-by-userid?userid=${userIDParam}&base_userid=${userParse?.userID}`);
            if (response.success === 200) {
              setCurrentUser(response.data);
              if (response.followed) {
                setIsFollowed(true);
              } else {
                setIsFollowed(false);
              }
            } else {
              console.log(response.message);
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
          } else {
            console.log(response.message);
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
          console.log(response.message);
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
      try {
        const userIDParam = (route.params as { userID?: string })?.userID;
        const response = await api.get(`/api/v1/follow/get-all-following-user?userid=${userIDParam}`);
        if (response.success === 200) {
          setFollowing(response.data);
        } else {
          console.log(response.message);
        }

      } catch (error) {
        console.error("An error occurred during data fetching:", error);
      }
    };

    fetchData();
  }, []);



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



  return (
    <View style={UserProfileStyleScreen.container}>
      <View style={UserProfileStyleScreen.header}>
        <IconButton icon={require('../../assets/icon/backarrow.png')}></IconButton>
        <View style={UserProfileStyleScreen.upgradeBanner} >
          <Icon source={require('../../assets/img/logo/logo.png')} size={40}></Icon>
          <Text style={{ fontSize: 12, fontWeight: 'bold', marginRight: 10 }}>Upgrade to Store</Text>
        </View>
      </View>
      <View style={[UserProfileStyleScreen.backGroundImg, Platform.OS === 'ios' ? { marginTop: -width * 0.88 } : { marginTop: -width * 1.05 }]}>
        <View style={UserProfileStyleScreen.avatarImg}>
          <Image source={currentUser?.imgUrl !== '' ? { uri: currentUser?.imgUrl } : require('../../assets/icon/user.png')} style={UserProfileStyleScreen.img}></Image>
          {/* <IconButton
            icon={'camera'}
            size={25}
            style={UserProfileStyleScreen.iconImg}
            iconColor='black' ></IconButton> */}
          {currentUser?.userID === userStorage?.userID && (

            <AddImageButtonComponent icon={require('../../assets/icon/photo-camera.png')} style={UserProfileStyleScreen.iconImg} iconColor='black' isUserAvatar={true}></AddImageButtonComponent>
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
              }
            }}
          >
            <Text style={{ fontWeight: '500', fontSize: 12 }}>{countFollower} Follower</Text>
          </Button>

          <Button
            mode='outlined'
            contentStyle={Platform.OS === 'ios' ? { height: height * 0.045 } : { height: height * 0.04 }}
            style={[UserProfileStyleScreen.buttonGroup_button, { backgroundColor: grayBackgroundColor }]}
            labelStyle={[UserProfileStyleScreen.buttonGroup_button_lable,]}
          >
            <Text style={{ fontWeight: '500', fontSize: 12 }}>{countFollower} Following</Text>
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
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: 'all',
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
            value: 'hotStore',
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
        scrollEventThrottle={16} // Adjust as needed
      >
        <View style={UserProfileStyleScreen.scrollViewContent}>


          <FlatList
            style={UserProfileStyleScreen.flatlist}
            data={data.slice(0, 10)}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => (
              <ListViewComponent data={[{ id: item.id, imgUrl: item.imgUrl, }]} />
            )}
            contentContainerStyle={{ paddingRight: 0 }}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />

          <PostingDialogComponent></PostingDialogComponent>

        </View>
      </ScrollView >
      <AppBarFooterComponents isHide={scrollUp} centerIcon={require('../../assets/img/logo/logo.png')}></AppBarFooterComponents>
    </View >

  );
};

export default UserProfileScreen;
