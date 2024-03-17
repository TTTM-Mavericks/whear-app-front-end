
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


const topKeyWord = ['Minimalism', 'Girly', 'Sporty', 'Vintage', 'Manly'];

const PAGE_SIZE = 20;

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
  const [pageNumber, setPageNumber] = useState(0);
  const [isFetchingMore, setIsFetchingMore] = useState(true);
  const [dataPaging, setDataPaging] = useState<ClothesInterface[]>([]);
  const [countSearch, setCountSearch] = useState(0);
  const [chipTag, setChipTag] = useState('');
  const [curentCollectionId, setCurrentCollectionId] = useState();
  const [clothesOfCollection, setClothesOfCollection] = React.useState<ClothesInterface[]>([]);
  const [addedClothId, setAddedClothId] = useState();
  const [typesShow, setTypesShows] = useState<{
    label: string,
    value: string,
    imgUrl: string

  }[]>([]);

  const [stylesShow, setStyleShows] = useState<{
    label: string,
    value: string,
    imgUrl: string

  }[]>([]);




  /*-----------------Usable variable-----------------*/
  const dispatch = useDispatch();
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const translateY = new Animated.Value(0);







  /*-----------------UseEffect-----------------*/

  useEffect(() => {
    setChipTag('clothes');
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

        // try {
        //   const getData = await api.get(`/api/v1/histories/get-all-history-items-by-customer-id?customerID=${userID}`, params, tokenString);
        //   // const getData = await api.get(`/api/v1/clothes/get-clothes-by-id?clothes_id=1&based_userid=1`, params, tokenString);
        //   if (getData.success === 200) {
        //     setmockSuggestions(getData.data.historyItems);
        //     console.log('getData.data: ', getData.data.historyItems);

        //   }
        //   else {
        //     console.log(getData.message);
        //     setTimeout(() => {
        //       setIsLoading(false);
        //     }, 1000)
        //   }
        // } catch (error) {
        //   console.error("An error occurred during data fetching:", error);
        // }
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

  useEffect(() => {
    handleFetchDataPaging(pageNumber);
  }, [countSearch]);

  useEffect(() => {
    if(user?.gender) {
      setStyleShows(dropdownData.fashionStyles);
    } else {
      setStyleShows(dropdownData.fashionStylesFemale);
    }
  }, [user]);


  useEffect(() => {
    // Filter clothesData to get only items with reacted set to true
    const reactedItems = searchResult.filter((item) => item.reacted);
    // Extract the clothesID from filtered items
    const reactedItemIds = reactedItems.map((item) => item.clothesID);
    // Update addedItems state with reacted item IDs
    console.log('reactedItemIds: ', reactedItemIds);
    setAddedItems(reactedItemIds);
  }, [searchResult]);





  /*-----------------Function handler-----------------*/



  /*-----------------Function handler-----------------*/


  const handleFetchDataPaging = async (page: any) => {
    try {
      const tokenStorage = await AsyncStorage.getItem('access_token');
      const userString = await AsyncStorage.getItem('userData');

      if (tokenStorage && userString) {
        const tokenString = JSON.parse(tokenStorage);
        const user = JSON.parse(userString);
        const userID = user.userID;

        const params = {
        };

        const body = dataPaging

        const getData = await api.post(`/api/v1/paging/get-page?page=${page}&pageSize=${PAGE_SIZE}`, body, tokenString);

        if (getData.success === 200) {
          console.log('handleFetchDataPaging');
          const data: ClothesInterface[] = getData.data;
          setSearchResult((prev) => [...prev, ...data]);
          // setClothesData(getData.data);
          setIsLoading(false);


        } else {
          console.log(getData.data);
        }
      }
    } catch (error) {
      console.error("An error occurred during data fetching:", error);
    } finally {
      setIsFetchingMore(false);
    }
  };

  const handleLoadMore = () => {
    console.log('paging');
    if (!isFetchingMore) {
      setIsFetchingMore(true);
      setPageNumber((prevPage) => prevPage + 1);
      handleFetchDataPaging(pageNumber + 1);
      setIsLoading(true);
    }
  };
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
      const selectedItem = searchResult.find((item) => item.clothesID !== id);
      if (selectedItem) {
        if (addedItems.includes(id)) {
          const selectedItem = searchResult.find((item) => item.clothesID === id);
          if (selectedItem) {
            setAddedItems([...addedItems, id]);
          }
        } else {
          handleAddToCollection(id);

        }
      } else {
        const selectedItem = searchResult.find((item) => item.clothesID === id);
        if (selectedItem) {
          setAddedItems([...addedItems, id]);
        }
      }
    }
    else {
      const selectedItem = searchResult.find((item) => item.clothesID === id);
      if (selectedItem) {
        setAddedItems([...addedItems, id]);
      }
    }
    // if (!reacted) {
    //   handleAddToCollection(id);
    // }

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
        // setSearchResult(getData.data);
        setSearchResult([]);
        setDataPaging(getData.data);
        setCountSearch(countSearch + 1);
        setChipTag('clothes');
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

  const hanldeMoveToDetail = (typesValue: string) => {
    if (chipTag === 'styles') {
      navigation.navigate('StyleOfClothesScreen', { stylesOfClothes: typesValue });
    }
    if (chipTag === 'types') {
      navigation.navigate('TypeOfClothesScreen', { typeOfClothes: typesValue });
    }
    if(chipTag === 'clothes') {
      navigation.navigate('ClothesDetailScreen', { clothID: typesValue });
    }
  }

  const handleSelectSuggestion = (selectedKeyword: string) => {
    // Set the selected keyword in the search input
    setKeyWordSearch(selectedKeyword);
    // Clear the suggestions
    setSuggestions([]);
  };

  const handleChangeChipTag = (tagName: string) => {
    setChipTag(tagName);
    if (tagName === 'clothes') {

    }

    if (tagName === 'types') {
      handleShowTypes();
    }

    if (tagName === 'styles') {
      if(user?.gender) {
        setStyleShows(dropdownData.fashionStyles);
      } else {
        setStyleShows(dropdownData.fashionStylesFemale);
      }
    }
  }

  const handleShowTypes = () => {
    setTypesShows(dropdownData.typeOfClothes);

  }



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
                value: 'clothes',
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
                onPress: () => handleChangeChipTag('clothes'),
              },
              {
                value: 'types',
                label: 'Types',
                icon: require('../../assets/icon/photo-camera.png'),
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
                onPress: () => handleChangeChipTag('types'),
              },
              {
                value: 'styles',
                label: 'Styles',
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
                onPress: () => handleChangeChipTag('styles'),
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
          {chipTag === 'clothes'
            ? searchResult.length > 0 ? (
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
                <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', marginTop: 10, marginBottom: 10 }}>
                  <Text style={{ fontSize: 17, fontWeight: 'bold', color: primaryColor }}>Do not have any Cloth.</Text>
                </View>
              )
            : chipTag === 'types' ? (
              <FlatList
                style={SearchStyleScreen.flatlist}
                data={typesShow}
                keyExtractor={(item) => item.value}
                numColumns={2}
                renderItem={({ item }) => (
                  <ListViewComponent
                    cardStyleContainer={{ height: 200, marginBottom: 20 }}
                    cardStyleContent={{ height: 200, position: 'relative' }}
                    onPress={() => hanldeMoveToDetail(item.value)}
                    data={[{ id: item.value, imgUrl: item.imgUrl ? item.imgUrl : clothesLogoUrlDefault, }]}
                    child={
                      <View style={SearchStyleScreen.cardTextView}>
                        <Text style={SearchStyleScreen.cardText}>
                          {item.label}
                        </Text>
                      </View>
                    }
                  
                  />
                )}

                contentContainerStyle={{ paddingRight: 0 }}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
              />
            )
              : chipTag === 'styles' && (
                <FlatList
                  style={SearchStyleScreen.flatlist}
                  data={stylesShow}
                  keyExtractor={(item) => item.value}
                  numColumns={2}
                  renderItem={({ item }) => (
                    <ListViewComponent
                      cardStyleContainer={{ height: 200, marginBottom: 20 }}
                      cardStyleContent={{ height: 200, position: 'relative' }}
                      onPress={() => hanldeMoveToDetail(item.value)}
                      data={[{ id: item.value, imgUrl: item.imgUrl ? item.imgUrl : clothesLogoUrlDefault, }]}
                      child={
                        <View style={SearchStyleScreen.cardTextView}>
                          <Text style={SearchStyleScreen.cardText}>
                            {item.label}
                          </Text>
                        </View>
                      }
                    />
                  )}

                  contentContainerStyle={{ paddingRight: 0 }}
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={false}
                />
              )
          }



          <Button mode='outlined' style={{ width: width * 0.8, margin: 20, borderRadius: 8 }} textColor='black' onPress={handleLoadMore} >
            <Text style={{ fontSize: 12.5, fontWeight: '500' }}>
              Do you want to see more?
            </Text>
          </Button>

          <CreateClothesDialogComponent></CreateClothesDialogComponent>
        </View>
      </ScrollView >
      <AddingToCollectionComponent clothID={addedClothId}></AddingToCollectionComponent>
      <AppBarFooterComponents isHide={scrollUp} centerIcon={'plus'} ></AppBarFooterComponents>
    </View >

  );
};


export default SearchScreen;
