import * as React from 'react';
import { Appbar, Badge, Icon, IconButton } from 'react-native-paper';
import UserListHoriziableStyleComponent from './UserListHoriziableStyleComponent';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Image, StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../root/RootStackParams';
import { grayBackgroundColor, primaryColor } from '../../../root/Colors';
import { UserInterFace } from '../../../models/ObjectInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../../api/AxiosApiConfig';

interface appBarProps {


}
type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;
const notificationCount = 3;

const UserListHoriziableComponent: React.FC<appBarProps> = (
  {

  }) => {

  const navigation = useNavigation<ScreenNavigationProp>();

  const [userFetch, setUserFetch] = React.useState<UserInterFace[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const tokenStorage = await AsyncStorage.getItem('access_token');
      const userStorage = await AsyncStorage.getItem('userData');
      if (userStorage) {
        const userParse: UserInterFace = JSON.parse(userStorage);
        if (tokenStorage) {
          const tokenString = JSON.parse(tokenStorage);
          console.log('userParse: ', tokenString);
          const params = {}
          try {
            const getData = await api.get(`/api/v1/follow/get-all-notyet-following-user?userid=${userParse.userID}`, params, tokenString);
            // const getData = await api.get(`/api/v1/clothes/get-clothes-by-id?clothes_id=1&based_userid=1`, params, tokenString);

            if (getData.success === 200) {
              setUserFetch(getData.data.filter((user: UserInterFace) => user.userID !== userParse.userID));
            }
            else {
              console.log(getData.data);
            }
          } catch (error) {
            console.error("An error occurred during data fetching:", error);
          }
        }
      }
    }
    fetchData();
  }, []);

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
            setUserFetch(prevUsers => prevUsers.filter(user => user.userID !== tagertUserID));

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

  const handleMoveToUserProfile = (userID: any) => {
    navigation.replace('UserProfile', { userID });
  };

  return (
    <View style={UserListHoriziableStyleComponent.container}>
      <View style={UserListHoriziableStyleComponent.friendsTag} >
        <IconButton icon={require('../../../assets/icon/user.png')} 
        size={20} 
        mode='contained' 
        iconColor={primaryColor} 
        containerColor={grayBackgroundColor}
        onPress={()=> navigation.navigate('ListUserScreen')}
        ></IconButton>
      </View>
      <FlatList
        style={UserListHoriziableStyleComponent.flatlist}
        data={userFetch}
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item: any) => item.userID}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleMoveToUserProfile(item.userID )}>
            <View style={UserListHoriziableStyleComponent.avatar}>
              <IconButton onPress={() => handleFollow(item.userID)} style={UserListHoriziableStyleComponent.addBtn} icon={'plus'} size={20} iconColor={primaryColor} containerColor={grayBackgroundColor} ></IconButton>
              <Image source={{ uri: item.imgUrl }} style={UserListHoriziableStyleComponent.avatar}>

              </Image>
            </View>
            <View style={UserListHoriziableStyleComponent.username} >
              <Text style={UserListHoriziableStyleComponent.usernameTxt}>
                {item.username?.slice(0, 10)}...
              </Text>
            </View>
          </TouchableOpacity>
        )}


      />

    </View>
  );
};

export default UserListHoriziableComponent;