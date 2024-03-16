import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { ListUserStyleScreen } from './ListUserStyleScreen';
import { UserInterFace } from '../../models/ObjectInterface';
import api from '../../api/AxiosApiConfig';
import { List, Button, Avatar } from 'react-native-paper';
import AppBarHeaderComponent from '../../components/Common/AppBarHeader/AppBarHeaderComponent';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { primaryColor, secondaryColor } from '../../root/Colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../root/RootStackParams';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingComponent from '../../components/Common/Loading/LoadingComponent';

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;

const ListUserScreen: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProp>();

  const [users, setUsers] = useState<UserInterFace[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
              setUsers(getData.data.filter((user: UserInterFace) => user.userID !== userParse.userID));
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

  const handleAccept = (userID: number | undefined) => {
    if (userID) {
      console.log('Accepted user with ID:', userID);
    }
  };

  const handleReject = (userID: number | undefined) => {
    if (userID) {
      console.log('Rejected user with ID:', userID);
    }
  };

  const renderItem = ({ item }: { item: UserInterFace }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', justifyContent: 'center', marginLeft: 20 }}>
      <Avatar.Image size={60} source={{ uri: item.imgUrl }} style={{ marginRight: 20 }} />
      <View style={{ flex: 1 }}>
        <List.Item
          title={item.username}
        />
        <View style={{ flexDirection: 'row' }}>
          <Button mode="elevated" style={[ListUserStyleScreen.acceptButton, { width: 110 }]} onPress={() => handleAccept(item.userID)}>
            Follow
          </Button>
          <Button mode="elevated" style={[ListUserStyleScreen.rejectButton, { width: 110 }]} onPress={() => handleReject(item.userID)}>
            Remove
          </Button>
        </View>
      </View>
    </View>
  );

  return (
    <View style={ListUserStyleScreen.container}>
      <AppBarHeaderComponent
        title={
          <View>
            <MaskedView
              maskElement={
                <Text style={ListUserStyleScreen.titlePage}>Friends</Text>
              }
            >
              <LinearGradient
                colors={[secondaryColor, primaryColor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={ListUserStyleScreen.linearBackground}
              >
                <Text style={{ opacity: 0 }}>Friends</Text>
              </LinearGradient>
            </MaskedView>
          </View>
        }
        // isLogo={true}
        backAction={() => navigation.goBack()}
      >
      </AppBarHeaderComponent>
      {isLoading ? (
        <LoadingComponent spinner={isLoading}></LoadingComponent>
      ) : (
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item) => item.userID?.toString() ?? ''}
          ItemSeparatorComponent={() => <View style={ListUserStyleScreen.separator} />}
          contentContainerStyle={ListUserStyleScreen.flatListContent}
          ListHeaderComponent={() => (
            <Text style={ListUserStyleScreen.textDescription}>
              Someone you can know. Let follow them to see their status
            </Text>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default ListUserScreen;
