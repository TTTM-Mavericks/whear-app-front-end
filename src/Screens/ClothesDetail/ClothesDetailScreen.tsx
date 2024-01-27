
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
import { grayBackgroundColor, primaryColor } from '../../root/Colors';



interface ListItem {
  id: string;
  title?: string;
  imgUrl?: any;
  description?: string;
}


const data =

{
  clothesID: '1',
  nameOfProduct: "Áo thun con Thỏ",
  userID: {
    id: '1',
    imgUrl: 'https://dntt.mediacdn.vn/197608888129458176/2020/10/9/dsj7695xssw-1602235317180-16022353176351525365665.jpg',
    userName: 'Nguyễn Minh Tú'
  },
  typeOfClothes: "Áo thun",
  shape: "Regular Fit",
  seasons: "Mùa đông",
  description: "Áo thun với chất liệu 100% cotton thiên nhiên gì gì đó, xuất sứ từ Việt Nam sẽ đem lại cảm giác blabla,.....",
  link: "dán link shopee vào đây nếu có",
  rating: 0,
  materials: "Cotton",
  clothesImages: ["https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2F1705425025030?alt=media&token=726d6aee-d0b7-4798-abd0-76d81d2060a7", "https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2F1705387327562?alt=media&token=fb48d7ba-a875-468e-b8ca-4ce0ae8b6364", "https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2F1705425025030?alt=media&token=726d6aee-d0b7-4798-abd0-76d81d2060a7"],
  clothesSizes: ["S", "M", "L", "XL"],
  clothesColors: ["black", "white"]
}




type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;
const ClothesDetailScreen = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>();

  /*-----------------UseState variable-----------------*/
  const [showFullContent, setShowFullContent] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);


  /*-----------------Usable variable-----------------*/
  const dispatch = useDispatch();
  const openCommentsDialog = useSelector((state: any) => state.store.isOpenCommentsDialog);
  const route = useRoute();
  const clothesID = (route.params as { clothesID?: string })?.clothesID || '';

  /*-----------------UseEffect-----------------*/
  React.useEffect(() => {
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
        title='Results'
        backAction={() => hanldeGoBack()}
      >
      </AppBarHeaderComponent>



      <ScrollView
        persistentScrollbar={false}
        style={ClothesDetailStyleScreen.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >

        <View style={ClothesDetailStyleScreen.scrollViewContent}>

          <View style={[ClothesDetailStyleScreen.container_postingBar, { marginTop: 25 }]}>
            <View style={{ flexDirection: 'row', width: width * 0.8, height: 'auto', marginBottom: 20 }}>
              <Avatar.Image
                size={iconAvatarPostingSize}
                source={{ uri: data.userID.imgUrl }}
                style={{ marginLeft: 10 }} />
              <View style=
                {
                  {
                    marginLeft: 10,
                    marginTop: 5
                  }
                }
              >
                <Text
                  style=
                  {
                    {
                      fontWeight: 'bold',
                      paddingTop: iconAvatarPostingSize * 0.05
                    }
                  }
                >
                  Nguyen Minh Tu
                </Text>
              </View>
            </View>

          </View>
          <View style={{ flex: 1, }}>
            <Swiper
              style={{ height: height * 0.65 }}
              showsButtons
              showsPagination
              loop
              index={currentIndex}
              onIndexChanged={(index: any) => setCurrentIndex(index)}
              dotColor={grayBackgroundColor}
              activeDotColor={primaryColor}
              nextButton={
                <IconButton style={{ marginLeft: -35 }} iconColor={primaryColor} icon={require('../../assets/icon/next.png')}></IconButton>
              }
              prevButton={
                <IconButton style={{ marginRight: -35, }} iconColor={primaryColor} icon={require('../../assets/icon/back.png')}></IconButton>
              }
            >
              {data.clothesImages.map((image, index) => (
                <View key={index}>
                  <Image
                    style={{ height: height * 0.65, borderRadius: 5 }}
                    resizeMode="cover"
                    source={{ uri: image }}
                  />
                </View>
              ))}
            </Swiper>

            <ScrollView horizontal>
              {data.clothesImages.map((image, index) => (
                <TouchableOpacity key={index} onPress={() => changeMainImage(index)}>
                  <View style={{ margin: 5 }}>
                    <Image
                      style={{ width: 80, height: 80, borderRadius: 5 }}
                      resizeMode="cover"
                      source={{ uri: image }}
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={{ flex: 1 }}>

            <View style={ClothesDetailStyleScreen.container_postingBar}>
              <View style={{ flexDirection: 'row', width: 80 }}>
                <IconButton
                  icon={'heart'}
                  iconColor={'black'}
                  size={25}
                  borderless
                ></IconButton>
                <View>
                  <Text style={{ color: 'black', fontSize: 15, marginLeft: -10, paddingTop: width * 0.04 }}>
                    {/* {item.react} */}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', width: 80 }}>
                <IconButton
                  icon={'share'}
                  iconColor={'black'}
                  size={25}
                  borderless></IconButton>
                <View>
                  <Text style={{ color: 'black', fontSize: 15, marginLeft: -10, paddingTop: width * 0.04 }}>
                    {/* {item.react} */}
                  </Text>
                </View>
              </View>
            </View>

            <View style={ClothesDetailStyleScreen.container_postingBar}>
              <View style={{ flexDirection: 'row', width: width * 0.8, height: 'auto', paddingTop: 10, paddingLeft: 10 }}>
                <View>
                  <Text style={{ color: 'black', fontSize: 15 }}>
                    {showFullContent ? data.description : data.description.substring(0, 150) + '...'}
                    {data.description.length > 150 && (
                      <Text
                        onPress={handleToggleContent}
                        style={{ color: 'black', fontSize: 13, }}
                      >
                        {showFullContent ? ' See less' : ' See more'}
                      </Text>
                    )}
                  </Text>
                </View>
              </View>
            </View>


          </View>



        </View>
      </ScrollView >
    </View >

  );
};

export default ClothesDetailScreen;
