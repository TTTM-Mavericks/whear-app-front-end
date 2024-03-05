
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, FlatList, Animated, TouchableOpacity, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../root/RootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';
import ListViewComponent from '../../components/ListView/ListViewComponent';
import { Button, Icon, IconButton, SegmentedButtons, TextInput } from 'react-native-paper';
import AppBarHeaderComponent from '../../components/Common/AppBarHeader/AppBarHeaderComponent';
import { height, width } from '../../root/ResponsiveSize';
import { backgroundColor, grayBorderColor, primaryColor, secondaryColor } from '../../root/Colors';
import { useDispatch } from 'react-redux';
import { setOpenAddToCollectionsDialog, setOpenCreateClothesDialog } from '../../redux/State/Actions';
import AddingToCollectionComponent from '../../components/Dialog/AddingToCollectionComponent';
import AppBarFooterComponents from '../../components/Common/AppBarFooter/AppBarFooterComponents';
import CreateClothesDialogComponent from '../../components/Dialog/CreateClothesDialogComponent';
import SearchStyleScreen from './SearchStyleScreen';
import { clothesLogoUrlDefault, spanTextSize } from '../../root/Texts';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import api from '../../api/AxiosApiConfig';
import { ClothesInterface, UserInterFace } from '../../models/ObjectInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingComponent from '../../components/Common/Loading/LoadingComponent';

interface ListItem {
  id: string;
  title?: string;
  imgUrl?: any;
  description?: string;
}

const topKeyWord = ['Minimalism', 'Girly', 'Sporty', 'Vintage', 'Manly'];



type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;
const SearchScreen = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const route = useRoute();
  const keyWord = (route.params as { keyWord?: string })?.keyWord || '';


  /*-----------------UseState variable-----------------*/
  const [colorIconAdded, setColorIconAdded] = useState('#C90801');
  const [addItemToCollection, setAddItemToCollection] = useState(true);
  const [addedItems, setAddedItems] = useState<string[]>([]);
  const [scrollUp, setScrollUp] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [value, setValue] = React.useState('');
  const [currentScrollPos, setCurrentScrollPos] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const [keyWordSearch, setKeyWordSearch] = useState(keyWord);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isHideSearch, setIsHideSearch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<ClothesInterface[]>([]);
  const [user, setUser] = React.useState<UserInterFace>();
  const [subrole, setSubRole] = React.useState('');
  const [token, setToken] = React.useState('');
  const [mockSuggestions, setmockSuggestions] = useState<string[]>([]);




  /*-----------------Usable variable-----------------*/
  const dispatch = useDispatch();
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const translateY = new Animated.Value(0);







  /*-----------------UseEffect-----------------*/

  useEffect(() => {
    const fetchData = async () => {
      const tokenStorage = await AsyncStorage.getItem('access_token');
      const userString = await AsyncStorage.getItem('userData');
      const subrole = await AsyncStorage.getItem('subrole');
      if (subrole) {
        setSubRole(subrole);
      }
      if (tokenStorage && userString) {
        const tokenString = JSON.parse(tokenStorage);
        const user = JSON.parse(userString);
        const userID = user.userID;
        setUser(user);
        setToken(tokenString);
        console.log('userParse: ', user);
        const params = {}

        try {
          const getData = await api.get(`/api/v1/histories/get-all-history-items-by-customer-id?customerID=${userID}`, params, tokenString);
          // const getData = await api.get(`/api/v1/clothes/get-clothes-by-id?clothes_id=1&based_userid=1`, params, tokenString);
          if (getData.success === 200) {
            setmockSuggestions(getData.data.historyItems);
            console.log('getData.data: ', getData.data.historyItems);

          }
          else {
            console.log(getData.message);
            setTimeout(() => {
              setIsLoading(false);
            }, 1000)
          }
        } catch (error) {
          console.error("An error occurred during data fetching:", error);
        }
      }
    }
    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const tokenStorage = await AsyncStorage.getItem('access_token');
  //     const userString = await AsyncStorage.getItem('userData');
  //     const subrole = await AsyncStorage.getItem('subrole');
  //     if (subrole) {
  //       setSubRole(subrole);
  //     }
  //     if (tokenStorage && userString) {
  //       const tokenString = JSON.parse(tokenStorage);
  //       const user = JSON.parse(userString);
  //       const userID = user.userID;
  //       setUser(user);
  //       setToken(tokenString);
  //       console.log('userParse: ', user);
  //     }
  //   }
  //   fetchData();
  //   handleSearch(keyWord);
  // }, [keyWord]);

  useEffect(() => {
    if (currentScrollPos === 0) {
      hideElement();
      setIsHidden(true);
    } else {
      const timeout = setTimeout(() => {
        unhideElement();
        setIsHidden(false);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentScrollPos]);

  useEffect(() => {
    setIsHideSearch(false);
    const filteredSuggestions = mockSuggestions.filter(
      (item) => item.toLowerCase().includes(keyWordSearch.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  }, [keyWordSearch]);


  /*-----------------Function handler-----------------*/
  const hideElement = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const unhideElement = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hanldeGoBack = () => {
    navigation.goBack();
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


  const handleScroll = (event: any) => {
    const currentScrollPos = event.nativeEvent.contentOffset.y;
    setCurrentScrollPos(currentScrollPos);
    if ((currentScrollPos > prevScrollPos) && (currentScrollPos > 0)) {
      setScrollUp(false);
    } else if ((currentScrollPos < prevScrollPos) && (currentScrollPos > 0)) {
      setScrollUp(true);

    }

    // Update the previous scroll position
    setPrevScrollPos(currentScrollPos);
  };

  const handleOpenCreateClothesDialog = () => {
    dispatch(setOpenCreateClothesDialog(true));
  }



  // Mock data for suggestions

  const handleSearch = async (text: string) => {
    setIsLoading(true);
    const params = {}
    try {
      const getData = await api.get(`/api/v1/recommedation/get-list-recommendation-by-keyword?userID=${user?.userID}&keyword=${text}`, params, token);
      // const getData = await api.get(`/api/v1/clothes/get-clothes-by-id?clothes_id=1&based_userid=1`, params, tokenString);
      if (getData.success === 200) {
        setSearchResult(getData.data);
        console.log('getData.data: ', getData.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000)
      }
      else {
        console.log(getData.message);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000)
      }
    } catch (error) {
      console.error("An error occurred during data fetching:", error);
    }
  }

  const hanldeMoveToDetail = (clothID: string) => {
    navigation.navigate('ClothesDetailScreen', { clothID });
  }

  const handleSelectSuggestion = (selectedKeyword: string) => {
    // Set the selected keyword in the search input
    setKeyWordSearch(selectedKeyword);
    // Clear the suggestions
    setSuggestions([]);
  };



  return (
    <View style={SearchStyleScreen.container}>
      <LoadingComponent spinner={isLoading}></LoadingComponent>
      <AppBarHeaderComponent
        title={
          <View>
            <MaskedView
              maskElement={
                <Text style={SearchStyleScreen.titlePage}>Search</Text>
              }
            >
              <LinearGradient
                colors={[secondaryColor, primaryColor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={SearchStyleScreen.linearBackground}
              >
                <Text style={{ opacity: 0 }}>Search</Text>
              </LinearGradient>
            </MaskedView>
          </View>
        }
        isLogo={false}
        backAction={() => hanldeGoBack()}
      >
      </AppBarHeaderComponent>
      <View>
        <View style={{ marginTop: 20, alignItems: 'center', alignContent: 'center', position: 'relative' }}>
          <TextInput
            mode='outlined'
            value={keyWordSearch}
            style={SearchStyleScreen.postingInput}
            onChangeText={setKeyWordSearch}
            activeOutlineColor={'black'}
            outlineStyle={{ borderWidth: 0.5 }}
            right={
              (
                <TextInput.Icon icon={require('../../assets/icon/loupe.png')} color={primaryColor} onPress={() => handleSearch(keyWordSearch)}>

                </TextInput.Icon>
              )
            }
          />
          {Platform.OS === 'android' ? (
            <View
              style={[
                {
                  position: 'absolute',
                  top: 30,
                  width: '100%',
                  backgroundColor: 'white',
                  elevation: 5,
                  zIndex: 99,
                  borderBottomRightRadius: 8,
                  borderBottomLeftRadius: 8,
                },

                isHideSearch && {
                  display: 'none',
                },
              ]}
            >
              {suggestions.length > 0 && keyWordSearch.length > 0 && (
                <FlatList
                  data={suggestions}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity key={item} onPress={() => handleSelectSuggestion(item)}>
                      <Text style={{ padding: 10 }}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>
          )
            :
            (
              <View style={{}}>
                {suggestions.length > 0 && keyWordSearch.length > 0 && (
                  <FlatList
                    data={suggestions}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <TouchableOpacity onPress={() => handleSelectSuggestion(item)}>
                        <Text style={{ padding: 10 }}>{item}</Text>
                      </TouchableOpacity>
                    )}
                    style={{ position: 'absolute', zIndex: 50, height: height * 0.2 }}
                  />
                )}
              </View>
            )
          }

        </View>
        <View style={SearchStyleScreen.mostSearchKeyword}>
          {currentScrollPos === 0 && (
            <Animated.View style={{ transform: [{ translateY }] }}>
              <View>
                <Text style={{ fontSize: spanTextSize + 0.5, fontWeight: '400' }}>Most searched keyword</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: width * 0.9, marginTop: 10 }}>
                  {topKeyWord.map((item: any, key: number) => (
                    <View key={key} style={{ marginRight: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                      <Text style={{ fontSize: 14, fontWeight: '300' }}>{key + 1}. {item}</Text>
                      <Icon source={require('../../assets/icon/right-up.png')} size={13} color={primaryColor}></Icon>
                    </View>
                  ))}
                </View>
              </View>
            </Animated.View>
          )}
          <SegmentedButtons
            style={[SearchStyleScreen.segmentedButtonsNavbar]}
            theme={{ roundness: 2 }}
            value={value}
            onValueChange={setValue}
            buttons={[
              {
                value: 'all',
                label: 'Clothes',
                icon: 'image',
                style: {
                  marginTop: 0,
                  borderRadius: 0,
                  borderColor: grayBorderColor,
                  borderTopWidth: 0,
                  borderBottomWidth: 0,
                  borderRightWidth: 0,
                  borderLeftWidth: 0,
                  backgroundColor: backgroundColor,
                },
                checkedColor: primaryColor,
                uncheckedColor: 'black',
              },
              {
                value: 'hotStore',
                label: 'Collections',
                icon: 'heart',
                style: {
                  borderRadius: 0,
                  borderColor: grayBorderColor,
                  borderTopWidth: 0,
                  borderBottomWidth: 0,
                  borderRightWidth: 0,
                  borderLeftWidth: 0,
                  backgroundColor: backgroundColor,
                },
                checkedColor: primaryColor,
                uncheckedColor: 'black',
              },
              {
                value: 'events',
                label: 'History',
                icon: 'history',
                style: {
                  borderRadius: 0,
                  borderColor: grayBorderColor,
                  borderTopWidth: 0,
                  borderBottomWidth: 0,
                  borderRightWidth: 0,
                  borderLeftWidth: 0,
                  backgroundColor: backgroundColor,
                },
                checkedColor: primaryColor,
                uncheckedColor: 'black',
              },

            ]}
          />

        </View>

      </View>

      <ScrollView
        persistentScrollbar={false}
        style={SearchStyleScreen.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => handleScroll(event)}
        scrollEventThrottle={30}
      >

        <View style={SearchStyleScreen.scrollViewContent}>



          {/* Regular FlatList */}
          {searchResult.length > 0
            ? (
              <FlatList
                style={SearchStyleScreen.flatlist}
                data={searchResult}
                keyExtractor={(item) => item.clothesID}
                numColumns={2}
                renderItem={({ item }) => (
                  <ListViewComponent onPress={() => hanldeMoveToDetail(item.clothesID)} data={[{ id: item.clothesID, imgUrl: item.clothesImages ? item.clothesImages[0] : clothesLogoUrlDefault, }]} child={
                    <IconButton
                      mode='outlined'
                      icon={'heart'}
                      style={[SearchStyleScreen.iconCard, {}]}
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
              <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', marginTop: 10, marginBottom: 10 }}>
                <Text style={{ fontSize: 17, fontWeight: 'bold', color: primaryColor }}>Do not have any Cloth.</Text>
              </View>
            )
          }


          <Button mode='outlined' style={{ width: width * 0.8, margin: 20, borderRadius: 8 }} textColor='black' >
            <Text style={{ fontSize: 12.5, fontWeight: '500' }}>
              Do you want to see more?
            </Text>
          </Button>

          <AddingToCollectionComponent></AddingToCollectionComponent>
          <CreateClothesDialogComponent></CreateClothesDialogComponent>
        </View>
      </ScrollView >
      <AppBarFooterComponents isHide={scrollUp} centerIcon={'plus'} ></AppBarFooterComponents>
    </View >

  );
};


export default SearchScreen;
