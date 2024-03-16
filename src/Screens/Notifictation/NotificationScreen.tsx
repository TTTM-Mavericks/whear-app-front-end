
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, FlatList, Alert, TouchableOpacity, Image } from 'react-native';
import NotificationStyleScreen from './NotificationStyleScreen';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../root/RootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';
import AppBarHeaderComponent from '../../components/Common/AppBarHeader/AppBarHeaderComponent';
import { width } from '../../root/ResponsiveSize';
import { primaryColor, secondaryColor } from '../../root/Colors';
import { useDispatch } from 'react-redux';
import { setOpenCreateClothesDialog } from '../../redux/State/Actions';
import AppBarFooterComponents from '../../components/Common/AppBarFooter/AppBarFooterComponents';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import ListViewComponent from '../../components/ListView/ListViewComponent';
import { IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotificationInterface, UserInterFace } from '../../models/ObjectInterface';
import api from '../../api/AxiosApiConfig';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
// import SockJS from 'sockjs-client';
// import StompWS from 'react-native-stomp-websocket';


type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;
const NotificationScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp>();

  /*-----------------UseState variable-----------------*/
  const [colorIconAdded, setColorIconAdded] = useState('#C90801');
  const [addItemToCollection, setAddItemToCollection] = useState(true);
  const [addedItems, setAddedItems] = useState<string[]>([]);
  const [scrollUp, setScrollUp] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [username, setUsername] = useState('');


  useEffect(() => {
    // var socket = new SockJS("http://localhost:6969/ws");
    // var stompClient = Stomp.over(socket);

    // stompClient.connect({}, onConnected, onError);

    // const headers = {
    //   'Access-Control-Allow-Origin': 'http://localhost:6969'
    // };
    // stompClient.connect(headers, () => {
    //   stompClient.send("/app/noti.addUser",
    //     {},
    //     JSON.stringify({ targetUserID: 2 })
    //   )
    // });

    // stomp.send("/app/noti.addUser",
    //   {},
    //   JSON.stringify({ targetUserID: 2 })
    // )
    // // }, onError);

    // return () => {
    //   // if (stomp.connected) {
    //   //   stomp.disconnect();
    //   // }
    // };
  });

  function onConnected() {
    console.log("onConnected");
    // // Subscribe to the Public Topic
    // stompClient.subscribe("/topic/public", this.onMessageReceived);

    // // Tell your username to the server
    // stompClient.send(
    //   "/api/chat/addUser/1",
    //   {},
    //   JSON.stringify({ sender: "Ali", type: "JOIN" })
    // );
  }

  function onMessageReceived(payload: any) {
    let message = payload.body;
    const messageElement = document.createElement('li');

    if (message.targetUserID !== username) {
      return;
    }
    message = JSON.parse(payload.body);
  }

  function onError(error: any) {
    console.error('Could not connect to WebSocket server. Please refresh this page to try again!', error);
  }
  /*-----------------Usable variable-----------------*/
  const dispatch = useDispatch();

  /*-----------------UseEffect-----------------*/

  /*-----------------Function handler-----------------*/
  function hanldeGoBack(): void {
    navigation.goBack();
  }



  const handleScroll = (event: any) => {
    const currentScrollPos = event.nativeEvent.contentOffset.y;

    if (currentScrollPos > prevScrollPos) {
      setScrollUp(false);
    } else if (currentScrollPos < prevScrollPos) {
      setScrollUp(true);

    }

    setPrevScrollPos(currentScrollPos);
  };

  const handleOpenCreateClothesDialog = () => {
    dispatch(setOpenCreateClothesDialog(true));
  }

  const handleConfirmClearAll = () => {
    Alert.alert(
      'Confirm Clear All',
      'Are you sure you want to clear all?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: handleClearAll,
        },
      ],
      { cancelable: false }
    );
  };

  const handleClearAll = () => {

    Alert.alert('Cleared All', 'All items have been cleared.');
  };

  const handleMarkAllRead = (event: NotificationInterface[]) => {
    const fetchData = async () => {
      const tokenStorage = await AsyncStorage.getItem('access_token');
      const userStorage = await AsyncStorage.getItem('userData');
      if (userStorage) {
        const userParse: UserInterFace = JSON.parse(userStorage);
        if (tokenStorage) {
          const tokenString = JSON.parse(tokenStorage);
          // console.log('userParse: ', tokenString);
          const params = {}
          try {
            event.forEach(async (noti) => {
              if (noti.status == false) {
                const getData = await api.put(`/api/v1/notification/un-read-notification?noti_id=${noti.notiID}`, params, tokenString);

                if (getData.success === 200) {
                  setData(getData.data)
                  // console.log(userParse.userID);
                }
                else {
                  console.log(getData.data);
                }
              }
            });
          } catch (error) {
            console.error("An error occurred during data fetching:", error);
          }
        }
      }
      await navigation.replace('NotificationScreen');
    }
    fetchData();
  }

  const handleMarkIsRead = (event: NotificationInterface) => {
    const fetchData = async () => {
      const tokenStorage = await AsyncStorage.getItem('access_token');
      const userStorage = await AsyncStorage.getItem('userData');
      if (userStorage) {
        const userParse: UserInterFace = JSON.parse(userStorage);
        if (tokenStorage) {
          const tokenString = JSON.parse(tokenStorage);
          // console.log('userParse: ', tokenString);
          const params = {}
          try {
            // const getData = await api.put(`/api/v1/notification/un-read-notification?noti_id=${event.notiID}`, params, tokenString);

            // if (getData.success === 200) {
            //   setData(getData.data)
            //   // console.log(userParse.userID);
            // }
            // else {
            //   console.log(getData.data);
            // }
          } catch (error) {
            console.error("An error occurred during data fetching:", error);
          }
        }
      }
    }
    fetchData();
    if (event.action == 'FOLLOW') {
      navigation.navigate('UserProfile', { userID: event.actionID })
    } else {
      navigation.navigate('PostingDetail', { postID: event.actionID })
    }
  }

  const [data, setData] = useState<NotificationInterface[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const tokenStorage = await AsyncStorage.getItem('access_token');
      const userStorage = await AsyncStorage.getItem('userData');
      if (userStorage) {
        const userParse: UserInterFace = JSON.parse(userStorage);
        if (tokenStorage) {
          const tokenString = JSON.parse(tokenStorage);
          // console.log('userParse: ', tokenString);
          const params = {}
          try {
            const getData = await api.get(`/api/v1/notification/get-all-notification?userid=${userParse.userID}`, params, tokenString);
            // const getData = await api.get(`/api/v1/clothes/get-clothes-by-id?clothes_id=1&based_userid=1`, params, tokenString);

            if (getData.success === 200) {
              setData(getData.data)
              console.log(userParse.userID);
            }
            else {
              console.log(getData.data);
            }
          } catch (error) {
            console.error("An error occurred during data fetching:", error);
          }
        }
        // return WebSocketComponent;
      }
    }
    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('https://be.mavericks-tttm.studio/api/v1/notification/get-all-notification?userid=1');
  //       const result = await response.json();

  //       if (result.success === 200) {
  //         setData(result.data);
  //       } else {
  //         console.error('Error fetching data:', result.message);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <View style={NotificationStyleScreen.container}>
      {/* <WebSocketComponent /> */}
      <AppBarHeaderComponent
        title={
          <View>
            <MaskedView
              maskElement={
                <Text style={NotificationStyleScreen.titlePage}>Notification</Text>
              }
            >
              <LinearGradient
                colors={[secondaryColor, primaryColor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={NotificationStyleScreen.linearBackground}
              >
                <Text style={{ opacity: 0 }}>Home</Text>
              </LinearGradient>
            </MaskedView>
          </View>
        }
        backAction={() => hanldeGoBack()}
      >
      </AppBarHeaderComponent>

      <ScrollView
        persistentScrollbar={false}
        style={NotificationStyleScreen.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => handleScroll(event)}
        scrollEventThrottle={16}
      >
        <View style={NotificationStyleScreen.scrollViewContent}>
          <View style={{ width: width * 0.9, display: 'flex', flexDirection: 'row' }}>
            <View style={{ alignItems: 'flex-start' }}>
              <TouchableOpacity onPress={() => handleMarkAllRead(data)}>
                <Text style={{ fontSize: 13, color: '#808991' }}>Mark is read</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <TouchableOpacity onPress={handleConfirmClearAll}>
                <Text style={{ fontSize: 13, color: '#808991' }}>Clear all</Text>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            style={NotificationStyleScreen.flatlist}
            data={data}
            keyExtractor={(item) => item.notiID}
            renderItem={({ item }) => (
              <View>
                <TouchableOpacity onPress={() => handleMarkIsRead(item)}
                  style={
                    [NotificationStyleScreen.notificationItem,
                    !item.status && {
                      backgroundColor: '#cccc',
                    }
                    ]
                  }
                >
                  <Image source={{ uri: 'https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-1/312005200_492156716285456_5576474209424169461_n.jpg?stp=dst-jpg_p240x240&_nc_cat=1&ccb=1-7&_nc_sid=596444&_nc_ohc=h1cHhnm1hlgAX8Vn6yS&_nc_pt=1&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfDTl7JJq-WWoGZsE0rpQgclB7x0aGj8o5d5fDLZqsbYyQ&oe=65D8D322' }} style={NotificationStyleScreen.circleImage} />
                  <View style={NotificationStyleScreen.content}>
                    <Text>{item.baseUserID}</Text>
                    <Text>{item.action} You</Text>
                    <Text>{item.dateTime}</Text>
                  </View>
                  <Image source={{ uri: 'https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-1/312005200_492156716285456_5576474209424169461_n.jpg?stp=dst-jpg_p240x240&_nc_cat=1&ccb=1-7&_nc_sid=596444&_nc_ohc=h1cHhnm1hlgAX8Vn6yS&_nc_pt=1&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfDTl7JJq-WWoGZsE0rpQgclB7x0aGj8o5d5fDLZqsbYyQ&oe=65D8D322' }} style={NotificationStyleScreen.image} />
                </TouchableOpacity>
              </View>
            )}
            contentContainerStyle={{ paddingRight: 0 }}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        </View>
      </ScrollView >
      <AppBarFooterComponents isHide={scrollUp} centerIcon={'plus'} ></AppBarFooterComponents>
    </View >

  );
};


export default NotificationScreen;
