
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
import StyleOfClothesStyleScreen from './StyleOfClothesStyleScreen';
import AppBarFooterComponents from '../../components/Common/AppBarFooter/AppBarFooterComponents';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import TouchabaleActiveActionButton from '../../components/Common/TouchableActive/TouchabaleActiveActionButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ClothesInterface, CollectionInterface, UserInterFace } from '../../models/ObjectInterface';
import api from '../../api/AxiosApiConfig';
import { clothesLogoUrlDefault } from '../../root/Texts';
import LoadingComponent from '../../components/Common/Loading/LoadingComponent';



const dropdownData = {
  fashionStyles: [
    { label: 'CYBERPUNK', value: 'CYBERPUNK', imgUrl: 'https://i.pinimg.com/564x/be/6e/92/be6e928031d63b318a3e40838d1a521e.jpg' },
    { label: 'CLASSIC', value: 'CLASSIC', imgUrl: 'https://i.pinimg.com/564x/6b/53/4b/6b534b415ac978d559b388dfc775227a.jpg' },
    { label: 'VINTAGE', value: 'VINTAGE', imgUrl: 'https://i.pinimg.com/564x/c3/8f/47/c38f47fc4cf06e4d17c819514774fa73.jpg' },
    { label: 'INDIE', value: 'INDIE', imgUrl: 'https://i.pinimg.com/564x/80/5b/ae/805baeac4224f42620c2bc9e9f52e5a6.jpg' },
    { label: 'E-GIRL', value: 'E_GIRL', imgUrl: 'https://i.pinimg.com/564x/17/0f/0d/170f0d0758e164f07057e9c834c791f0.jpg' },
    { label: 'BASIC', value: 'BASIC', imgUrl: 'https://i.pinimg.com/564x/72/77/37/727737a7495fd4a32b2dec882b1b166f.jpg' },
    { label: 'SPORTY', value: 'SPORTY', imgUrl: 'https://i.pinimg.com/564x/2c/e8/42/2ce8421ce88a1ebdc551b3ea6fca4087.jpg' },
    { label: 'NORMCORE', value: 'NORMCORE', imgUrl: 'https://i.pinimg.com/564x/66/e3/dc/66e3dc2b5f6fefe2f16051108a436786.jpg' },
    { label: 'MINIMALISM', value: 'MINIMALISM', imgUrl: 'https://i.pinimg.com/564x/0e/12/ff/0e12ff14baf962358b43485383b54e5c.jpg' },
    { label: 'ROCK', value: 'ROCK', imgUrl: 'https://i.pinimg.com/564x/c7/55/d1/c755d189d35933d71de13d8f9f08d6d0.jpg' },
    { label: 'PARISIAN', value: 'PARISIAN', imgUrl: 'https://i.pinimg.com/564x/f8/b9/e8/f8b9e80d1c1a5265d1c1baa02a22176b.jpg' },
    { label: 'GOTHIC', value: 'GOTHIC', imgUrl: 'https://i.pinimg.com/564x/e5/2b/c7/e52bc7563942dda4f1ebfc4a693c884f.jpg' },
    { label: 'BOHEMIAN', value: 'BOHEMIAN', imgUrl: 'https://i.pinimg.com/564x/77/48/72/7748721dc1e1bde0cb4bf455ab08a18d.jpg' },
    { label: 'Y2K', value: 'Y2K', imgUrl: 'https://i.pinimg.com/564x/ea/59/7d/ea597d014e36d29dc6c10a40d3d4c6b0.jpg' },
    { label: 'OLD_MONEY', value: 'OLD_MONEY', imgUrl: 'https://i.pinimg.com/564x/5a/07/f1/5a07f1cd4d31432eeadbdb52c1920927.jpg' },
    { label: 'HIPPIE', value: 'HIPPIE', imgUrl: 'https://i.pinimg.com/564x/f2/77/b1/f277b128b6371d0d12f3c08211012417.jpg' },

  ],
  fashionStylesFemale: [
    { label: 'CYBERPUNK', value: 'CYBERPUNK', imgUrl: 'https://i.pinimg.com/736x/6e/2a/39/6e2a39ebe676df56b93ae2321342bc6c.jpg' },
    { label: 'CLASSIC', value: 'CLASSIC', imgUrl: 'https://i.pinimg.com/564x/d6/69/b0/d669b095aa8b030c97593d40c8994b34.jpg' },
    { label: 'VINTAGE', value: 'VINTAGE', imgUrl: 'https://i.pinimg.com/236x/12/db/55/12db550be8169c8bef37c65d0628a269.jpg' },
    { label: 'INDIE', value: 'INDIE', imgUrl: 'https://i.pinimg.com/736x/45/79/16/457916cdb8a86dabd73c6051075a7276.jpg' },
    { label: 'E-GIRL', value: 'E_GIRL', imgUrl: 'https://i.pinimg.com/564x/17/0f/0d/170f0d0758e164f07057e9c834c791f0.jpg' },
    { label: 'BASIC', value: 'BASIC', imgUrl: 'https://i.pinimg.com/564x/2d/58/2a/2d582a49179cdb48d1d211dd491cbd2b.jpg' },
    { label: 'SPORTY', value: 'SPORTY', imgUrl: 'https://i.pinimg.com/564x/77/8d/ba/778dba980001dc562591a0becd05fe72.jpg' },
    { label: 'PREPPY', value: 'PREPPY', imgUrl: 'https://i.pinimg.com/564x/a9/07/77/a907778666f533fa2a9455b3456fcded.jpg' },
    { label: 'NORMCORE', value: 'NORMCORE', imgUrl: 'https://i.pinimg.com/564x/11/d7/0b/11d70b5f83ab1bd452dc13309191c770.jpg' },
    { label: 'MINIMALISM', value: 'MINIMALISM', imgUrl: 'https://i.pinimg.com/564x/36/98/8c/36988c3ceee413259404a8483a49d062.jpg' },
    { label: 'ROCK', value: 'ROCK', imgUrl: 'https://i.pinimg.com/236x/c8/1b/05/c81b053cf70f2de9f7963ced7a7d04d8.jpg' },
    { label: 'PARISIAN', value: 'PARISIAN', imgUrl: 'https://i.pinimg.com/564x/16/72/44/167244265a52d1593d0eb4ba3565c9e7.jpg' },
    { label: 'GOTHIC', value: 'GOTHIC', imgUrl: 'https://i.pinimg.com/236x/44/5b/b9/445bb9e5ba33afff59ddc5423f7237ca.jpg' },
    { label: 'BOHEMIAN', value: 'BOHEMIAN', imgUrl: 'https://i.pinimg.com/474x/83/85/94/838594321fadcac3d829c51c555cce34.jpg' },
    { label: 'Y2K', value: 'Y2K', imgUrl: 'https://i.pinimg.com/564x/39/9e/ab/399eabdaa3a2623c3c510b54b246992a.jpg' },
    { label: 'OLD_MONEY', value: 'OLD_MONEY', imgUrl: 'https://i.pinimg.com/236x/aa/cb/8b/aacb8b92faa15ee8d3a716cbefb91759.jpg' },
    { label: 'HIPPIE', value: 'HIPPIE', imgUrl: 'https://i.pinimg.com/564x/af/d9/4f/afd94f56dbe3bfe3913000483f1eba5e.jpg' },

  ],

}


const MAX_COLLECTIONS = 5;
const MAX_CLOTHES = 20;


type RouteNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;
const StyleOfClothesScreen = () => {
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
  const [clothesOfCollection, setClothesOfCollection] = React.useState<ClothesInterface[]>([]);
  const [addedClothId, setAddedClothId] = useState();
  const [typesShow, setTypesShows] = useState<{
    label: string,
    value: string,
    imgUrl: string

  }[]>([]);
  const [stylesOfClothesFollowingGender, setStylesOfClothesFollowingGender] = useState<{
    label: string,
    value: string,
    imgUrl: string

  }[]>([]);




  /*-----------------Usable variable-----------------*/
  const dispatch = useDispatch();
  const scrollY = useRef(new Animated.Value(0)).current;
  const route = useRoute();
  const stylesOfClothes = (route.params as { stylesOfClothes?: string })?.stylesOfClothes || '';


  /*-----------------UseEffect-----------------*/
  React.useEffect(() => {
  
    setIsLoading(true);
    const fetchData = async () => {
      const tokenStorage = await AsyncStorage.getItem('access_token');
      const userStorage = await AsyncStorage.getItem('userData');
      setIsLoading(true);
      if (userStorage) {
        const userParse: UserInterFace = JSON.parse(userStorage);
        setUser(userParse);
        if(userParse.gender) {
          setStylesOfClothesFollowingGender(dropdownData.fashionStyles);
        } else {
          setStylesOfClothesFollowingGender(dropdownData.fashionStylesFemale);
        }
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
    const types = stylesOfClothesFollowingGender.filter((item) => item.value === stylesOfClothes);
    if (types) {
      setTypesShows(types);
    }

  }, [stylesOfClothesFollowingGender]);

  useEffect (()=> {
    const fetch = async () => {
      try {
        const params = {}
        const getData = await api.get(`/api/v1/clothes/get-clothes-by-style?style=${stylesOfClothes}`, params, token);
        console.log('asdasd: ', stylesOfClothes);
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
  }, [curentCollectionId]);

  useEffect(() => {
    // Filter clothesData to get only items with reacted set to true
    const reactedItems = clothesOfTypes.filter((item) => item.reacted);
    // Extract the clothesID from filtered items
    const reactedItemIds = reactedItems.map((item) => item.clothesID);
    // Update addedItems state with reacted item IDs
    console.log('reactedItemIds: ', reactedItemIds);
    setAddedItems(reactedItemIds);
  }, [clothesOfTypes]);

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
  const handleAddToCollection = (id: any) => {
    if (addItemToCollection) {
      dispatch(setOpenAddToCollectionsDialog(true));
      setAddedClothId(id);
      setAddedItems(addedItems.filter((item) => item !== id));
    }
  }

  const handleChangeIconAdded = async (id: any, reacted: boolean | undefined) => {
    if (!reacted) {
      console.log('reacted: ', reacted);
      const selectedItem = clothesOfTypes.find((item) => item.clothesID !== id);
      if (selectedItem) {
        if (addedItems.includes(id)) {
          const selectedItem = clothesOfTypes.find((item) => item.clothesID === id);
          if (selectedItem) {
            setAddedItems([...addedItems, id]);
          }
        } else {
          handleAddToCollection(id);

        }
      } else {
        const selectedItem = clothesOfTypes.find((item) => item.clothesID === id);
        if (selectedItem) {
          setAddedItems([...addedItems, id]);
        }
      }
    }
    else {
      const selectedItem = clothesOfTypes.find((item) => item.clothesID === id);
      if (selectedItem) {
        setAddedItems([...addedItems, id]);
      }
    }
    // if (!reacted) {
    //   handleAddToCollection(id);
    // }

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
    <View style={StyleOfClothesStyleScreen.container}>
      {/* {scrollUp && ( */}
      <AppBarHeaderComponent
        title={
          <View>
            <MaskedView
              maskElement={
                <Text style={StyleOfClothesStyleScreen.titlePage}>Styles</Text>
              }
            >
              <LinearGradient
                colors={[secondaryColor, primaryColor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={StyleOfClothesStyleScreen.linearBackground}
              >
                <Text style={{ opacity: 0 }}>Styles</Text>
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
        style={StyleOfClothesStyleScreen.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={StyleOfClothesStyleScreen.buttonGroup}>
          <Button
            mode='outlined'
            contentStyle={{ height: height * 0.04 }}
            style={[StyleOfClothesStyleScreen.buttonGroup_button, { backgroundColor: grayBackgroundColor }]}
            labelStyle={[StyleOfClothesStyleScreen.buttonGroup_button_lable]}
          >
            <Text style={{}}>Style</Text>
          </Button>

          <Button
            mode='outlined'
            contentStyle={{ height: height * 0.04 }}
            style={[StyleOfClothesStyleScreen.buttonGroup_button, { backgroundColor: primaryColor }]}
            labelStyle={[StyleOfClothesStyleScreen.buttonGroup_button_lable, { color: 'white' }]}
          >
            <Text style={{}}>Products</Text>
          </Button>


        </View>
       
        <View style={StyleOfClothesStyleScreen.scrollViewContent}>


          <FlatList
            horizontal={true}
            style={StyleOfClothesStyleScreen.homeSliderHorizotalContent}
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
        <View style={StyleOfClothesStyleScreen.scrollViewContent}>
          {/* Regular FlatList */}

          {clothesOfTypes.length > 0
            ? (
              <FlatList
                style={StyleOfClothesStyleScreen.flatlist}
                data={clothesOfTypes}
                keyExtractor={(item) => item.clothesID}
                numColumns={2}
                renderItem={({ item }) => (
                  <ListViewComponent data={[{ id: item.clothesID, imgUrl: item.clothesImages ? item.clothesImages[0] : clothesLogoUrlDefault, }]} child={
                    <IconButton
                    mode='outlined'
                    icon={'heart'}
                    style={[StyleOfClothesStyleScreen.iconCard, {}]}
                    size={15}
                    underlayColor='black'
                    iconColor={addedItems.includes(item.clothesID) ? '#C90801' : 'black'}
                    onPress={() => {
                      handleChangeIconAdded(item.clothesID, item.reacted);
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
      <LoadingComponent spinner={isLoading} ></LoadingComponent>

    </View >

  );
};


export default StyleOfClothesScreen;
