
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, FlatList, LogBox } from 'react-native';
import HomeStylesComponent from './HomeStyleScreen';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../root/RootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';
import CarouselComponent from '../../components/Common/Carousel/CarouselComponent';
import ListViewComponent from '../../components/ListView/ListViewComponent';
import { ActivityIndicator, Appbar, Button, Chip, Icon, IconButton, MD3Colors } from 'react-native-paper';
import AppBarHeaderComponent from '../../components/Common/AppBarHeader/AppBarHeaderComponent';
import AppBarHeaderStylesComponent from '../../components/Common/AppBarHeader/AppBarHeaderStyleComponent';
import HorizontalCarouselComponent from '../../components/Common/Carousel/HorizontalCarouselComponent';
import ChipGroupComponent from '../../components/Common/ChipGroup/ChipGroupComponent';
import { width } from '../../root/ResponsiveSize';
import SmallChipGroupComponent from '../../components/Common/ChipGroup/SmallChipGroupComponent';
import { backgroundColor, fourthColor, primaryColor, secondaryColor } from '../../root/Colors';
import { useDispatch } from 'react-redux';
import { setOpenAddToCollectionsDialog, setOpenCreateClothesDialog, setOpenUpgradeRolesDialog } from '../../redux/State/Actions';
import AddingToCollectionComponent from '../../components/Dialog/AddingToCollectionComponent';
import AppBarFooterComponents from '../../components/Common/AppBarFooter/AppBarFooterComponents';
import CreateClothesDialogComponent from '../../components/Dialog/CreateClothesDialogComponent';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import TouchabaleActiveActionButton from '../../components/Common/TouchableActive/TouchabaleActiveActionButton';
import { ClothesInterface, NewsItem, UserInterFace } from '../../models/ObjectInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api/AxiosApiConfig';
import axios from 'axios';
import { clothesLogoUrlDefault } from '../../root/Texts';
import UpgradeRoleDialogComponent from '../../components/Dialog/UpgradeRoleDialogComponent';
import { dataSlider, dataSliderIntro } from '../../components/Common/Carousel/Data';


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

const chipData = ['#Minimalism', '#Girly', '#Sporty', '#Vintage', '#Manly'];

const PAGE_SIZE = 16;


type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;
const HomeScreen = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>();

  /*-----------------UseState variable-----------------*/
  const [colorIconAdded, setColorIconAdded] = useState('#C90801');
  const [addItemToCollection, setAddItemToCollection] = useState(true);
  const [addedItems, setAddedItems] = useState<string[]>([]);
  const [scrollUp, setScrollUp] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [clothesData, setClothesData] = useState<ClothesInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addedClothId, setAddedClothId] = useState();
  const [pageNumber, setPageNumber] = useState(0);
  const [isFetchingMore, setIsFetchingMore] = useState(true);
  const [dataPaging, setDataPaging] = useState<ClothesInterface[]>([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [chipItems, setChipItems] = useState<string[]>(['All']);
  const [seperateData, setSeperateData] = useState<NewsItem[]>([])
  const [filteredItems, setFilteredItems] = useState<NewsItem[]>([]);
  const [user, setUser] = useState<UserInterFace>();

  const [listStyle, setListStyle] = useState<{ label: string, value: string, imgUrl: string }[]>([])


  /*-----------------Usable variable-----------------*/
  const dispatch = useDispatch();

  /*-----------------UseEffect-----------------*/
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const tokenStorage = await AsyncStorage.getItem('access_token');
      const userString = await AsyncStorage.getItem('userData');
      if (tokenStorage && userString) {
        const tokenString = JSON.parse(tokenStorage);
        const user = JSON.parse(userString);
        const userID = user.userID;
        setUser(user);
        console.log('userParse: ', tokenString);
        const params = {}
        try {
          const getData = await api.get(`/api/v1/recommedation/get-list-recommendation-by-user-history-items?userID=${userID}`, params, tokenString);

          if (getData.success === 200) {
            console.log('recommend');
            setDataPaging(getData.data);
            // setClothesData(getData.data.slice(0.20));
            setIsLoading(true);
          }
          else {
            console.log(getData.data);
          }

        } catch (error) {
          console.error("An error occurred during data fetching:", error);
        }
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    if (user?.gender) {
      setListStyle(dropdownData.fashionStyles)
    } else {
      setListStyle(dropdownData.fashionStylesFemale);
    }

  }, [user]);

  useEffect(() => {
    handleFetchDataPaging(pageNumber);
  }, [dataPaging]);

  // useEffect(() => {
  //   clothesData.map((items) => {
  //     if(items.reacted) {
  //       setAddedItems(addedItems.filter((item)=> item !== items.userID));

  //     } else {
  //       // setAddedItems([...addedItems, items.clothesID])
  //     }
  //   })

  // }, [clothesData])
  useEffect(() => {
    // Filter clothesData to get only items with reacted set to true
    const reactedItems = clothesData.filter((item) => item.reacted);
    // Extract the clothesID from filtered items
    const reactedItemIds = reactedItems.map((item) => item.clothesID);
    // Update addedItems state with reacted item IDs
    setAddedItems(reactedItemIds);
  }, [clothesData]);


  useFocusEffect(
    React.useCallback(() => {
      fetchDataNew();
      LogBox.ignoreLogs(["VirtualizedLists should never be nested", "source.uri should not be an empty string"])
    }, [])
  );



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
          setClothesData((prev) => [...prev, ...data]);
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
      const selectedItem = clothesData.find((item) => item.clothesID !== id);
      if (selectedItem) {
        if (addedItems.includes(id)) {
          const selectedItem = clothesData.find((item) => item.clothesID === id);
          if (selectedItem) {
            setAddedItems([...addedItems, id]);
          }
        } else {
          handleAddToCollection(id);

        }
      } else {
        const selectedItem = clothesData.find((item) => item.clothesID === id);
        if (selectedItem) {
          setAddedItems([...addedItems, id]);
        }
      }


    }
    else {
      const selectedItem = clothesData.find((item) => item.clothesID === id);
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

    if (currentScrollPos > prevScrollPos) {
      setScrollUp(false);
    } else if (currentScrollPos < prevScrollPos) {
      setScrollUp(true);

    }

    // Update the previous scroll position
    setPrevScrollPos(currentScrollPos);
  };

  const handleOpenCreateClothesDialog = () => {
    // dispatch(setOpenCreateClothesDialog(true));
    navigation.navigate('AddingClothesScreen')
  }

  const hanldeMoveToDetail = (clothID: string) => {
    navigation.navigate('ClothesDetailScreen', { clothID });
  }

  const handleOpenUpgradeDialog = () => {
    dispatch(setOpenUpgradeRolesDialog(true));
  }

  const fetchDataNew = async () => {
    try {
      const response = await api.get('/api/v1/news/get-all-news')
      if (response.success === 200) {
        // SLIDE DATA TO TAKE 5 FIRST DATA TO SHOW TO THE CAROUSEL
        const firstFiveItems = response.data.slice(0, 5);

        // TAKE THE typeOfNews to show to the chip Items
        const uniqueTypeOfNews: string[] = Array.from(new Set(response.data.map((item: NewsItem) => item.typeOfNews)));
        const allChipItems = ['All', ...uniqueTypeOfNews];

        // Show only one image in the Screen
        const formattedData = firstFiveItems.map((item: NewsItem) => ({
          title: item.title,
          body: item.content,
          imgUrl: item.image.length > 0 ? item.image[0] : ""
        }));

        // Set the Data
        setSeperateData(formattedData);
        setNewsItems(response.data);
        setChipItems(allChipItems);
        setFilteredItems(response.data);
      } else {
        console.error('Error');
      }
    } catch (error) {
      console.log("Error fetching news data:", error);
    }
  };


  return (
    <View style={HomeStylesComponent.container}>
      <AppBarHeaderComponent
        title={
          <View>
            <MaskedView
              maskElement={
                <Text style={HomeStylesComponent.titlePage}>Home</Text>
              }
            >
              <LinearGradient
                colors={[secondaryColor, primaryColor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={HomeStylesComponent.linearBackground}
              >
                <Text style={{ opacity: 0 }}>Home</Text>
              </LinearGradient>
            </MaskedView>
          </View>
        }
        isLogo={true}
        backAction={() => hanldeGoBack()}
      >
      </AppBarHeaderComponent>

      <ScrollView
        persistentScrollbar={false}
        style={HomeStylesComponent.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => handleScroll(event)}
        scrollEventThrottle={16}
      >
        <View style={HomeStylesComponent.scrollViewContent}>
          <HorizontalCarouselComponent data={seperateData.length>0 ? seperateData : dataSliderIntro}></HorizontalCarouselComponent>
          <ChipGroupComponent></ChipGroupComponent>

          {/* Horizontal FlatList */}
          <FlatList
            horizontal={true}
            style={HomeStylesComponent.homeSliderHorizotalContent}
            data={listStyle.slice(0,5)}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <ListViewComponent onPress={()=> navigation.navigate('StyleOfClothesScreen', {stylesOfClothes: item.value})} cardStyleContent={{ width: (width + 55) * 0.4, height: 300, borderRadius: 8 }} cardStyleContainer={{ margin: 5, alignContent: 'center', width: (width + 55) * 0.4, height: 300, borderRadius: 8 }} data={[{ id: item.value, imgUrl: item.imgUrl, }]} />
            )}
            contentContainerStyle={{ paddingRight: 0 }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
          />

          <View style={{ alignItems: 'center', justifyContent: 'center', margin: 15 }}>
            <Text style={{ textDecorationLine: 'underline', fontSize: 18 }}>Explore More</Text>
          </View>
          <View style={HomeStylesComponent.filterGroup}>
            <View style={{ paddingTop: 10, marginRight: 5, flexDirection: 'row' }}>
              <Icon
                source={'filter'}
                color={primaryColor}
                size={20}
              >
              </Icon>
              <Text style={{ fontSize: 16, fontWeight: 'bold', }}>Filter</Text>
            </View>
            <SmallChipGroupComponent chipData={chipData} />
          </View>

          <View style={{ width: width * 0.9, display: 'flex', flexDirection: 'row' }}>
            <View style={{ alignItems: 'flex-start' }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000000' }}>New Clothes</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#808991' }}>Sponsor</Text>
            </View>
          </View>


          {/* Regular FlatList */}

          <FlatList
            style={HomeStylesComponent.flatlist}
            data={clothesData}
            keyExtractor={(item) => item.clothesID}
            numColumns={2}
            renderItem={({ item }) => (
              <ListViewComponent key={item.clothesID} data={[{ id: item.clothesID, imgUrl: item.clothesImages ? item.clothesImages[0] : clothesLogoUrlDefault, }]}
                onPress={() => hanldeMoveToDetail(item.clothesID)}
                child={
                  <IconButton
                    mode='outlined'
                    icon={'heart'}
                    style={[HomeStylesComponent.iconCard, {}]}
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
          {isLoading
            && (
              <ActivityIndicator animating={true} color={primaryColor} style={{ marginTop: 50, marginBottom: 50 }} />
            )}

          <Button mode='outlined' style={{ width: width * 0.8, margin: 20, borderRadius: 8 }} textColor='black' onPress={handleLoadMore} >
            <Text style={{ fontSize: 12.5, fontWeight: '500' }}>
              Do you want to see more?
            </Text>
          </Button>

          <View style={{ width: width * 0.9, display: 'flex', flexDirection: 'row', }}>
            <View style={{ alignItems: 'flex-start' }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000000' }}>Store Recommendation</Text>
            </View>
          </View>


          <AddingToCollectionComponent clothID={addedClothId}></AddingToCollectionComponent>
          <CreateClothesDialogComponent></CreateClothesDialogComponent>
        </View>
      </ScrollView >
      <UpgradeRoleDialogComponent></UpgradeRoleDialogComponent>
      <AppBarFooterComponents isHide={scrollUp} centerIcon={'plus'} ></AppBarFooterComponents>
    </View >

  );
};


export default HomeScreen;
