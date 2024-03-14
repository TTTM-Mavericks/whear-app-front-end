import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native'; 
import { ListUserStyleScreen } from './ListUserStyleScreen';
import { UserInterFace } from '../../models/ObjectInterface'; 
import api from '../../api/AxiosApiConfig';
import { List, Button, Avatar } from 'react-native-paper'; 
import AppBarHeaderComponent from '../../components/Common/AppBarHeader/AppBarHeaderComponent';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import {primaryColor, secondaryColor } from '../../root/Colors';

const ListUserScreen: React.FC = () => {
  const [users, setUsers] = useState<UserInterFace[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/api/v1/user/get-all-user');
        if (response.success === 200) {
          setUsers(response.data);
        } else {
          console.error('Failed to fetch users:', response.message);
        }
      } catch (error) {
        console.error('An error occurred while fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };

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
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Avatar.Image size={80} source={{ uri: item.imgUrl }} style={{ marginRight: 30 }} /> 
      <View style={{ flex: 1 }}>
        <List.Item
          title={item.username}
        />
        <View style={{ flexDirection: 'row' }}>
          <Button mode="elevated"  style={[ListUserStyleScreen.acceptButton, { width: 125 }]} onPress={() => handleAccept(item.userID)}>
            Accept
          </Button>
          <Button mode="elevated" style={[ListUserStyleScreen.rejectButton, { width: 125 }]} onPress={() => handleReject(item.userID)}>
            Reject
          </Button>
        </View>
      </View>
    </View>
  );

  return (
    <View>
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
        isLogo={true}
        // backAction={() => hanldeGoBack()}
      >
      </AppBarHeaderComponent>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" /> 
      ) : (
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item) => item.userID?.toString() ?? ''} 
          ItemSeparatorComponent={() => <View style={ListUserStyleScreen.separator} />}
          contentContainerStyle={ListUserStyleScreen.flatListContent}
          ListHeaderComponent={() => (
            <Text style={{ fontSize: 30, marginBottom: 10 }}>
              Friends Request List
            </Text>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default ListUserScreen;
