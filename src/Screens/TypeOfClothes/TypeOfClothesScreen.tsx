
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, FlatList, Animated, Platform, TouchableOpacity } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../root/RootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';
import ListViewComponent from '../../components/ListView/ListViewComponent';
import { Appbar, Button, Chip, Icon, IconButton, MD3Colors } from 'react-native-paper';
import AppBarHeaderComponent from '../../components/Common/AppBarHeader/AppBarHeaderComponent';
import ChipGroupComponent from '../../components/Common/ChipGroup/ChipGroupComponent';
import { height, width } from '../../root/ResponsiveSize';
import { backgroundColor, grayBackgroundColor, primaryColor, secondaryColor } from '../../root/Colors';
import { useDispatch } from 'react-redux';
import { setOpenAddToCollectionsDialog } from '../../redux/State/Actions';
import AddingToCollectionComponent from '../../components/Dialog/AddingToCollectionComponent';
import TypeOfClothesStyleScreen from './TypeOfClothesStyleScreen';
import AppBarFooterComponents from '../../components/Common/AppBarFooter/AppBarFooterComponents';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import TouchabaleActiveActionButton from '../../components/Common/TouchableActive/TouchabaleActiveActionButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ClothesInterface, CollectionInterface, UserInterFace } from '../../models/ObjectInterface';
import api from '../../api/AxiosApiConfig';
import { clothesLogoUrlDefault } from '../../root/Texts';



const dropdownData = {
  typeOfClothes: [
    { label: 'SHIRT', value: 'SHIRT', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSHIRT.jpg?alt=media&token=9e21cef8-a609-4496-a164-870c4ba03262' },
    { label: 'PANTS', value: 'PANTS', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FQuan-Baggy-Jean-nam-nu-2b-1-Quan-ong-rong-xanh-classic-ZiZoou-Store.png?alt=media&token=662336d2-4fe9-4df1-b8af-a9977dae31cb' },
    { label: 'DRESS', value: 'DRESS', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2Fvn-11134207-7r98o-lnjhbc5ry64a70.jpg?alt=media&token=edb7dfd4-0fc0-41e2-bc24-6ae63226b834' },
    { label: 'SKIRT', value: 'SKIRT', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2Fshopping.png?alt=media&token=278b7984-5157-4339-99a6-a5aa9ee315ae' },
    { label: 'JACKET', value: 'JACKET', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2Fshopping1.png?alt=media&token=cc55658f-ba42-41a5-9efb-1bf4b6592fa9' },
    { label: 'COAT', value: 'COAT', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2Fshopping2.png?alt=media&token=3ca69263-3cad-488d-93c8-9957ff639518' },
    { label: 'SHORTS', value: 'SHORTS', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSHORTS.png?alt=media&token=68ffc84e-5b1c-4b41-a8cc-e7b43b140976' },
    { label: 'SWEATER', value: 'SWEATER', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSWEATER.png?alt=media&token=d42e6a62-0287-4428-b674-e88090f1e770' },
    { label: 'HOODIE', value: 'HOODIE', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FHOODIE.png?alt=media&token=889e9fa8-3976-4661-8a9b-51f5e3d87646' },
    { label: 'T-SHIRT', value: 'T_SHIRT', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FT_SHIRT.jpg?alt=media&token=8920f6fd-318d-4bfb-b2de-df8cbeda90ef' },
    { label: 'BLAZER', value: 'BLAZER', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FBLAZER.jpg?alt=media&token=0da8e2a9-a955-4540-83d3-e2b61c79d198' },
    { label: 'JEANS', value: 'JEANS', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FJEANS.jpg?alt=media&token=56326f50-7c60-4203-9ffd-951a4512521f' },
    { label: 'TANK TOP', value: 'TANK_TOP', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FTANK%20TOP.jpg?alt=media&token=b9a94d8f-0e2a-4c4e-9046-1dbd83034eaa' },
    { label: 'SUIT', value: 'SUIT', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSUIT.jpg?alt=media&token=8afa2ef2-1ec8-46c7-a0c0-e11cb0e5ad96' },
    { label: 'POLO', value: 'POLO_SHIRT', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FPOLO_SHIRT.jpg?alt=media&token=8d9f6f4e-7ab6-474d-b37c-fc86c11dd4b5' },
    { label: 'FORMAL', value: 'FORMAL_WEAR', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FFORMAL_WEAR.jpg?alt=media&token=0ce12378-d7bc-4328-8049-eb7eef2952d8' },
    { label: 'ATHLETIC', value: 'ATHLETIC_WEAR', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FATHLETIC_WEAR.jpg?alt=media&token=08cc7f99-acce-42bf-ae4d-099bf892a8f8' },
  ],

}


const MAX_COLLECTIONS = 5;
const MAX_CLOTHES = 20;


type RouteNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;
const TypeOfClothesScreen = () => {
  const navigation = useNavigation<RouteNavigationProp>();

  /*-----------------UseState variable-----------------*/
  const [colorIconAdded, setColorIconAdded] = useState('#C90801');
  const [addItemToCollection, setAddItemToCollection] = useState(true);
  const [addedItems, setAddedItems] = useState<string[]>([]);
  const [scrollUp, setScrollUp] = useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [userCollection, setUserCollection] = React.useState<CollectionInterface[]>([]);
  const [token, setToken] = React.useState('');
  const [curentCollectionId, setCurrentCollectionId] = useState('');
  const [user, setUser] = React.useState<UserInterFace>();
  const [clothesOfTypes, setClothesOfTypes] = React.useState<ClothesInterface[]>([]);
  const [typesShow, setTypesShows] = useState<{
    label: string,
    value: string,
    imgUrl: string

  }[]>([]);




  /*-----------------Usable variable-----------------*/
  const dispatch = useDispatch();
  const scrollY = useRef(new Animated.Value(0)).current;
  const route = useRoute();
  const typeOfClothes = (route.params as { typeOfClothes?: string })?.typeOfClothes || '';


  /*-----------------UseEffect-----------------*/
  React.useEffect(() => {
    const fetchData = async () => {
      const tokenStorage = await AsyncStorage.getItem('access_token');
      const userStorage = await AsyncStorage.getItem('userData');
      setIsLoading(true);
      if (userStorage) {
        const userParse: UserInterFace = JSON.parse(userStorage);
        setUser(userParse);
        if (tokenStorage) {
          const tokenString = JSON.parse(tokenStorage);
          setToken(tokenString);
          console.log('userParse: ', tokenString);
          const params = {}
          // try {
          //   const getData = await api.get(`/api/v1/collection/get-all-by-userid?user_id=${userParse.userID}`, params, tokenString);
          //   // const getData = await api.get(`/api/v1/clothes/get-clothes-by-id?clothes_id=1&based_userid=1`, params, tokenString);

          //   if (getData.success === 200) {
          //     setUserCollection(getData.data);
          //     setCurrentCollectionId(getData.data[0].collectionID);
          //     console.log('getData.data: ', getData.data);
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
          // } catch (error) {
          //   console.error("An error occurred during data fetching:", error);
          // }
        }
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const types = dropdownData.typeOfClothes.filter((item) => item.value === typeOfClothes);
    if (types) {
      setTypesShows(types);
    }

  }, [typeOfClothes]);

  useEffect (()=> {
    const fetch = async () => {
      try {
        const params = {}
        const getData = await api.get(`/api/v1/clothes/get-clothes-by-type_of_clothes?typeOfClothes=${typeOfClothes}`, params, token);
        console.log('asdasd: ', typeOfClothes);
        if (getData.success === 200) {
          console.log('------------------------------------1', getData.data);
          setClothesOfTypes(getData.data);
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
      } catch (error) {
        console.error("An error occurred during data fetching:", error);
        // }
      }
    }
    fetch();
  }, [typesShow])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const params = {}
      // try {
      //   const getData = await api.get(`/api/v1/collection/get-collection-by-id?collection_id=${curentCollectionId}`, params, token);
      //   // const getData = await api.get(`/api/v1/clothes/get-clothes-by-id?clothes_id=1&based_userid=1`, params, tokenString);
      //   if (getData.success === 200) {
      //     setClothesOfCollection(getData.data.clothesList);
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
      // } catch (error) {
      //   console.error("An error occurred during data fetching:", error);
      // }
    }
    fetchData();
  }, [curentCollectionId])

  /*-----------------Function handler-----------------*/
  function hanldeGoBack(): void {
    navigation.goBack();
  }

  const handleSearch = () => {
    alert('search')
  }

  const handleMore = () => {
    alert('handleMore')
  }

  const handleAddToCollection = (id: string) => {
    if (addItemToCollection) {
      dispatch(setOpenAddToCollectionsDialog(true));
    }
  }

  const handleChangeIconAdded = (id: string) => {
    setAddItemToCollection(!addItemToCollection);
    handleAddToCollection(id);
  }

  const [prevScrollPos, setPrevScrollPos] = useState(0);

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

  const handleOpenAddNewCollection = () => {
    alert('add')
  }

  const handleSetCurrentList = (collectionId: any) => {

  }



  return (
    <View style={TypeOfClothesStyleScreen.container}>
      {/* {scrollUp && ( */}
      <AppBarHeaderComponent
        title={
          <View>
            <MaskedView
              maskElement={
                <Text style={TypeOfClothesStyleScreen.titlePage}>Cloth types</Text>
              }
            >
              <LinearGradient
                colors={[secondaryColor, primaryColor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={TypeOfClothesStyleScreen.linearBackground}
              >
                <Text style={{ opacity: 0 }}>Cloth types</Text>
              </LinearGradient>
            </MaskedView>
          </View>
        }
        backAction={() => hanldeGoBack()}
      >
      </AppBarHeaderComponent>
      {/* )} */}


      <ScrollView
        onScroll={(event) => handleScroll(event)}
        scrollEventThrottle={16} // Adjust as needed
        // onMomentumScrollEnd={handleScrollDirection}
        persistentScrollbar={false}
        style={TypeOfClothesStyleScreen.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={TypeOfClothesStyleScreen.buttonGroup}>
          <Button
            mode='outlined'
            contentStyle={{ height: height * 0.04 }}
            style={[TypeOfClothesStyleScreen.buttonGroup_button, { backgroundColor: grayBackgroundColor }]}
            labelStyle={[TypeOfClothesStyleScreen.buttonGroup_button_lable]}
          >
            <Text style={{}}>Style</Text>
          </Button>

          <Button
            mode='outlined'
            contentStyle={{ height: height * 0.04 }}
            style={[TypeOfClothesStyleScreen.buttonGroup_button, { backgroundColor: primaryColor }]}
            labelStyle={[TypeOfClothesStyleScreen.buttonGroup_button_lable, { color: 'white' }]}
          >
            <Text style={{}}>Products</Text>
          </Button>


        </View>
       
        <View style={TypeOfClothesStyleScreen.scrollViewContent}>


          <FlatList
            horizontal={true}
            style={TypeOfClothesStyleScreen.homeSliderHorizotalContent}
            data={typesShow}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setCurrentCollectionId(item.value)}>
                <ListViewComponent cardStyleContent={{ width: width * 0.9, height: 300, borderRadius: 8 }} cardStyleContainer={{ margin: 5, alignContent: 'center', width: width * 0.9, height: 300, borderRadius: 8 }} data={[{ id: item.value, imgUrl: item.imgUrl ? item.imgUrl : clothesLogoUrlDefault, }]} />
                <View style={{ position: 'absolute', backgroundColor: 'rgba(216,216,216, 0.3)', width: width * 0.9, height: 300, justifyContent: 'center', alignItems: 'center', borderRadius: 8, top: 10, left: 10 }}>
                  <Text style={{ color: backgroundColor, fontSize: 40, fontWeight: 'bold' }}>{item.label}</Text>
                </View>
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingRight: 0 }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
          />


          <ChipGroupComponent style={{ width: width }}></ChipGroupComponent>

        </View>
        <View style={{ alignItems: 'flex-start', marginLeft: 20, marginBottom: 10, marginTop: 10 }}>
          <Text style={{ fontSize: 13, color: 'black', fontWeight: '500', textAlign: 'left' }}>{clothesOfTypes.length} clothes are found!</Text>
        </View>
        <View style={TypeOfClothesStyleScreen.scrollViewContent}>
          {/* Regular FlatList */}

          {clothesOfTypes.length > 0
            ? (
              <FlatList
                style={TypeOfClothesStyleScreen.flatlist}
                data={clothesOfTypes}
                keyExtractor={(item) => item.clothesID}
                numColumns={2}
                renderItem={({ item }) => (
                  <ListViewComponent data={[{ id: item.clothesID, imgUrl: item.clothesImages ? item.clothesImages[0] : clothesLogoUrlDefault, }]} child={
                    <IconButton
                      mode='outlined'
                      icon={'heart'}
                      style={[TypeOfClothesStyleScreen.iconCard, {}]}
                      size={15}
                      iconColor={addedItems.includes(item.clothesID) ? '#C90801' : '#C3C3C3'}
                      onPress={() => {
                        handleChangeIconAdded(item.clothesID);
                      }}

                    />
                  } />
                )}
                contentContainerStyle={{ paddingRight: 0 }}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
              />
            )

            : (
              <View style={{ flexDirection: 'row', marginTop: 30, marginBottom: 30 }}>
                <Text style={{ fontSize: 14, fontWeight: '400' }}>Do not have any Cloth</Text>
                <TouchableOpacity onPress={() => navigation.replace('Home')}>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', paddingLeft: 5 }}>Add now!</Text>
                </TouchableOpacity>
              </View>
            )}


          <AddingToCollectionComponent></AddingToCollectionComponent>
          <Button icon={require('../../assets/img/logo/logo.png')} mode='outlined' style={{ width: width * 0.8, margin: 20, borderRadius: 8, backgroundColor: primaryColor, borderWidth: 0 }} textColor='black' >
            <Text style={{ fontSize: 12.5, fontWeight: '500' }}>
              Upgrade to add more
            </Text>
          </Button>
        </View>
        {Platform.OS === 'ios' && (
          <View style={{ width: width, height: height * 0.05 }}>

          </View>
        )}
      </ScrollView >

      {(<AppBarFooterComponents centerIcon='plus' isHide={scrollUp} ></AppBarFooterComponents>)}
      <View>

      </View>

    </View >

  );
};


export default TypeOfClothesScreen;
