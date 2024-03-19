import * as React from 'react';
import { Appbar, Badge, Icon } from 'react-native-paper';
import AppBarHeaderStylesComponent from './AppBarHeaderStyleComponent';
import { useNavigation } from '@react-navigation/native';
import { StyleProp, View, ViewStyle } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../root/RootStackParams';
import { primaryColor } from '../../../root/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotificationInterface, UserInterFace } from '../../../models/ObjectInterface';
import api from '../../../api/AxiosApiConfig';
import * as Notifications from 'expo-notifications';


interface appBarProps {
  backAction?: () => void;
  title?: string | React.ReactNode;
  icon?: string;
  iconChild?: React.ReactNode;
  styles?: StyleProp<ViewStyle>;
  isHideIcon1?: boolean;
  isHideIcon2?: boolean;
  isLogo?: boolean;

}
type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;
const notificationCount = 3;

const AppBarHeaderComponent: React.FC<appBarProps> = (
  {
    backAction,
    title,
    icon,
    iconChild,
    styles,
    isHideIcon1,
    isHideIcon2,
    isLogo
  }) => {

  const navigation = useNavigation<ScreenNavigationProp>();

  const [numberOfNotification, setNumberOfNotification] = React.useState(0);
  const [data, setData] = React.useState<NotificationInterface[]>([]);
  const [numOfNoti, setNumOfNoti] = React.useState(0);


  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const tokenStorage = await AsyncStorage.getItem('access_token');
  //       const userStorage = await AsyncStorage.getItem('userData');
  //       if (userStorage && tokenStorage) {
  //         const userParse = JSON.parse(userStorage);
  //         const tokenString = JSON.parse(tokenStorage);
  //         const params = {};

  //         const getData = await api.get(`/api/v1/notification/get-all-notification?userid=${userParse.userID}`, params, tokenString);

  //         if (getData.success === 200) {
  //           const notifications = getData.data;
  //           setData(notifications);

  //           const unreadNotifications = notifications.filter(notification => !notification.status);
  //           setNumberOfNotification(unreadNotifications.length);

  //           // Schedule a notification if there are unread notifications
  //           if (unreadNotifications.length > 0) {
  //             await scheduleNotification();
  //           }
  //         } else {
  //           console.log(getData.data);
  //         }
  //       }
  //     } catch (error) {
  //       console.error("An error occurred during data fetching:", error);
  //     }
  //   };

  //   fetchData();
  // }, [numberOfNotification]);
  React.useEffect(() => {
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

              const num: NotificationInterface[] = getData.data.filter((item: NotificationInterface) => item.status !== true);
              if (num) {
                setNumberOfNotification(num.length);
               await scheduleNotification();
              }
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
  }, [numberOfNotification]);

  const scheduleNotification = async () => {
    console.log('Scheduling notification');
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'New Notification',
          body: 'You have unread notifications.',
        },
        trigger: {
          seconds: 1, // Example trigger in 1 second
        },
      });
      console.log('Notification scheduled successfully');
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  };


  const _handleSearch = () => {
    const keyWord: string = ''
    navigation.navigate('SearchScreen', { keyWord });
  };

  const _handleNotification = () => {
    navigation.navigate('NotificationScreen');
  };

  return (
    <Appbar.Header style={[AppBarHeaderStylesComponent.container, styles]}>
      {isLogo ? (
        <View>
          <Appbar.BackAction color='transparent' onPress={() => { backAction; setNumberOfNotification(numberOfNotification + 1) }} style={styles} />
          <Appbar.Action onPress={()=> navigation.navigate('Home')} size={45} style={{ position: 'absolute', top: -10 }} color={primaryColor} icon={require('../../../assets/img/logo/logo.png')} />
        </View>
      ) : (

        <Appbar.BackAction onPress={backAction} style={styles} />
      )}
      <Appbar.Action iconColor='transparent' icon={require('../../../assets/icon/bell.png')} />
      <Appbar.Content style={{ alignItems: 'center', alignContent: 'center' }} title={title} />
      {isHideIcon1 ? (
        <Appbar.Action iconColor='transparent' icon={require('../../../assets/icon/bell.png')} />
      ) : (
        <Appbar.Action onPress={_handleSearch} style={isHideIcon1 && { display: 'none' }} icon={require('../../../assets/icon/loupe.png')} />
      )}
      <View style={{ position: 'relative' }}>
        <Appbar.Action onPress={_handleNotification} style={isHideIcon2 && { display: 'none' }} icon={require('../../../assets/icon/bell.png')} />
        {numberOfNotification > 0 && (
          <Badge style={{ position: 'absolute', top: 5, right: 5, display: isHideIcon2 ? 'none' : 'flex' }}>{numberOfNotification}</Badge>
        )}
      </View>
      {iconChild}
    </Appbar.Header>
  );
};

export default AppBarHeaderComponent;