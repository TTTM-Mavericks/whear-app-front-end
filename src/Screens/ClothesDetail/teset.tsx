
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../root/RootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';
import { Appbar, Avatar, Button, Chip, Icon, IconButton, MD3Colors, TextInput } from 'react-native-paper';
import AppBarHeaderComponent from '../../components/Common/AppBarHeader/AppBarHeaderComponent';
import { height, width } from '../../root/ResponsiveSize';
import { useDispatch, useSelector } from 'react-redux';
import { iconAvatarPostingSize, iconAvatarSize } from '../../root/Icon';
import ClothesDetailStyleScreen from './ClothesDetailStyleScreen';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import Swiper from 'react-native-swiper';
import { grayBackgroundColor, primaryColor, secondaryColor } from '../../root/Colors';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import TouchabaleActiveActionButton from '../../components/Common/TouchableActive/TouchabaleActiveActionButton';
import { ClothesInterface, UserInterFace } from '../../models/ObjectInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api/AxiosApiConfig';




type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;
const ClothesDetailScreen11 = () => {
  const navigation = useNavigation<ScreenNavigationProp>();

  /*-----------------UseState variable-----------------*/
  const [showFullContent, setShowFullContent] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [clothData, setClothData] = useState<ClothesInterface>();


  /*-----------------Usable variable-----------------*/
  const dispatch = useDispatch();
  const openCommentsDialog = useSelector((state: any) => state.store.isOpenCommentsDialog);


  /*-----------------UseEffect-----------------*/
  useEffect(() => {

    const fetchData = async () => {
      const tokenStorage = await AsyncStorage.getItem('access_token');
      const userStorage = await AsyncStorage.getItem('userData');

      if (userStorage) {
        const userParse: UserInterFace = JSON.parse(userStorage);
        if (tokenStorage) {
            const tokenString = JSON.parse(tokenStorage);
          const params = {}
          try {
            const getData = await api.get(`/api/v1/clothes/get-clothes-by-id?clothes_id=2&based_userid=2`, params, tokenString);
            if (getData.success === 200) {
              console.log(getData.data);
              setClothData(getData.data);
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

  /*-----------------Function handler-----------------*/
  function hanldeGoBack(): void {
    navigation.navigate('Social');
  }

  const handleSearch = () => {
    alert('search')
  }

  const handleMore = () => {
    alert('handleMore')
  }


  const handleToggleContent = () => {
    setShowFullContent(!showFullContent);
  };


  const changeMainImage = (index: any) => {
    setCurrentIndex(index);
  };


  return (
    <View style={ClothesDetailStyleScreen.container}>

      <AppBarHeaderComponent
        title={
          <View>
            <MaskedView
              maskElement={
                <Text style={ClothesDetailStyleScreen.titlePage}>Details</Text>
              }
            >
              <LinearGradient
                colors={[secondaryColor, primaryColor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={ClothesDetailStyleScreen.linearBackground}
              >
                <Text style={{ opacity: 0 }}>Details</Text>
              </LinearGradient>
            </MaskedView>
          </View>
        }
        backAction={() => hanldeGoBack()}
      >
      </AppBarHeaderComponent>



      <ScrollView
        persistentScrollbar={false}
        style={ClothesDetailStyleScreen.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >

        
      </ScrollView >
    </View >

  );
};

export default ClothesDetailScreen11;
