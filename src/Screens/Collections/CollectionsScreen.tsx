
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, FlatList, Animated, Platform, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
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
import CollectionsStyleScreen from './CollectionsStyleScreen';
import AppBarFooterComponents from '../../components/Common/AppBarFooter/AppBarFooterComponents';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import TouchabaleActiveActionButton from '../../components/Common/TouchableActive/TouchabaleActiveActionButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ClothesInterface, CollectionInterface, UserInterFace } from '../../models/ObjectInterface';
import api from '../../api/AxiosApiConfig';
import { clothesLogoUrlDefault } from '../../root/Texts';


interface ListItem {
  id: string;
  title?: string;
  imgUrl?: any;
  description?: string;
}

const MAX_COLLECTIONS = 5;
const MAX_CLOTHES = 20;

const data1 = [
  {
    id: '1a',
    title: "Aenean leo",
    description: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    imgUrl: require('../../assets/img/introduce_background/introducebackground1.png'),
  },
  {
    id: '4a',
    title: "In turpis",
    description: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
    imgUrl: require('../../assets/img/introduce_background/introducebackground2.png'),

  },
  {
    id: '2a',
    title: "Lorem Ipsum",
    description: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
    imgUrl: require('../../assets/img/introduce_background/introducebackground3.png'),

  },
  {
    id: '3a',
    title: "Lorem Ipsum",
    description: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
    imgUrl: require('../../assets/img/introduce_background/introducebackground4.png'),

  },
];

const chipData = ['#Minimalism', '#Girly', '#Sporty', '#Vintage', '#Manly'];



type RouteNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;
const CollectionsScreen = () => {
  const navigation = useNavigation<RouteNavigationProp>();

  /*-----------------UseState variable-----------------*/
  const [colorIconAdded, setColorIconAdded] = useState('#C90801');
  const [addItemToCollection, setAddItemToCollection] = useState(true);
  const [addedItems, setAddedItems] = useState<string[]>([]);
  const [scrollUp, setScrollUp] = useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [userCollection, setUserCollection] = React.useState<CollectionInterface[]>([]);
  const [token, setToken] = React.useState('');
  const [curentCollectionId, setCurrentCollectionId] = useState();
  const [user, setUser] = React.useState<UserInterFace>();
  const [clothesOfCollection, setClothesOfCollection] = React.useState<ClothesInterface[]>([]);




  /*-----------------Usable variable-----------------*/
  const dispatch = useDispatch();
  const scrollY = useRef(new Animated.Value(0)).current;


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
          try {
            const getData = await api.get(`/api/v1/collection/get-all-by-userid?user_id=${userParse.userID}`, params, tokenString);
            // const getData = await api.get(`/api/v1/clothes/get-clothes-by-id?clothes_id=1&based_userid=1`, params, tokenString);

            if (getData.success === 200) {
              setUserCollection(getData.data);
              setCurrentCollectionId(getData.data[0].collectionID);
              console.log('getData.data: ', getData.data);
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
          }
        }
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const params = {}
      try {
        const getData = await api.get(`/api/v1/collection/get-collection-by-id?collection_id=${curentCollectionId}`, params, token);
        // const getData = await api.get(`/api/v1/clothes/get-clothes-by-id?clothes_id=1&based_userid=1`, params, tokenString);
        if (getData.success === 200) {
          setClothesOfCollection(getData.data.clothesList);
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
      }
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
    <View style={CollectionsStyleScreen.container}>
      {/* {scrollUp && ( */}
      <AppBarHeaderComponent
        title={
          <View>
            <MaskedView
              maskElement={
                <Text style={CollectionsStyleScreen.titlePage}>Your collections</Text>
              }
            >
              <LinearGradient
                colors={[secondaryColor, primaryColor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={CollectionsStyleScreen.linearBackground}
              >
                <Text style={{ opacity: 0 }}>Your collections</Text>
              </LinearGradient>
            </MaskedView>
          </View>
        }
        isLogo={true}
        backAction={() => hanldeGoBack()}
      >
      </AppBarHeaderComponent>
      {/* )} */}


      <ScrollView
        onScroll={(event) => handleScroll(event)}
        scrollEventThrottle={16} // Adjust as needed
        // onMomentumScrollEnd={handleScrollDirection}
        persistentScrollbar={false}
        style={CollectionsStyleScreen.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={CollectionsStyleScreen.buttonGroup}>
          <Button
            mode='outlined'
            contentStyle={{ height: height * 0.04 }}
            style={[CollectionsStyleScreen.buttonGroup_button, { backgroundColor: grayBackgroundColor }]}
            labelStyle={[CollectionsStyleScreen.buttonGroup_button_lable]}
          >
            <Text style={{}}>Style</Text>
          </Button>

          <Button
            mode='outlined'
            contentStyle={{ height: height * 0.04 }}
            style={[CollectionsStyleScreen.buttonGroup_button, { backgroundColor: primaryColor }]}
            labelStyle={[CollectionsStyleScreen.buttonGroup_button_lable, { color: 'white' }]}
          >
            <Text style={{}}>Products</Text>
          </Button>


        </View>
        <View style={{ alignItems: 'flex-start', marginLeft: 10, marginTop: 10, marginBottom: 0 }}>
          <Text style={{ fontSize: 13, color: 'black', fontWeight: '500' }}>{userCollection.length} / {MAX_COLLECTIONS} collections</Text>
        </View>
        <View style={CollectionsStyleScreen.scrollViewContent}>


          <FlatList
            horizontal={true}
            style={CollectionsStyleScreen.homeSliderHorizotalContent}
            data={userCollection}
            keyExtractor={(item) => item.collectionID}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setCurrentCollectionId(item.collectionID)}>
                <ListViewComponent cardStyleContent={{ width: width * 0.9, height: 300, borderRadius: 8 }} cardStyleContainer={{ margin: 5, alignContent: 'center', width: width * 0.9, height: 300, borderRadius: 8 }} data={[{ id: item.collectionID, imgUrl: item.imgUrl ? item.imgUrl : clothesLogoUrlDefault, }]} />
                <View style={{ position: 'absolute', backgroundColor: 'rgba(216,216,216, 0.3)', width: width * 0.9, height: 300, justifyContent: 'center', alignItems: 'center', borderRadius: 8, top: 10, left: 10 }}>
                  <Text style={{ color: backgroundColor, fontSize: 40, fontWeight: 'bold' }}>{item.nameOfCollection}</Text>
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
        <View style={{ alignItems: 'flex-start', marginLeft: 10, marginBottom: 0 }}>
          <Text style={{ fontSize: 13, color: 'black', fontWeight: '500', textAlign: 'left' }}>{clothesOfCollection.length} / {MAX_CLOTHES} clothes</Text>
        </View>
        <View style={CollectionsStyleScreen.scrollViewContent}>
          {/* Regular FlatList */}

          {clothesOfCollection.length > 0
            ? (
              <FlatList
                style={CollectionsStyleScreen.flatlist}
                data={clothesOfCollection}
                keyExtractor={(item) => item.clothesID}
                numColumns={2}
                renderItem={({ item }) => (
                  <ListViewComponent data={[{ id: item.clothesID, imgUrl: item.clothesImages ? item.clothesImages[0] : clothesLogoUrlDefault, }]} child={
                    <IconButton
                      mode='outlined'
                      icon={'heart'}
                      style={[CollectionsStyleScreen.iconCard, {}]}
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


export default CollectionsScreen;
