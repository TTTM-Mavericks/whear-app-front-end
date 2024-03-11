
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, FlatList } from 'react-native';
import HomeStylesComponent from './HomeStyleScreen';
import { useNavigation } from '@react-navigation/native';
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
import { ClothesInterface } from '../../models/ObjectInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api/AxiosApiConfig';
import axios from 'axios';
import { clothesLogoUrlDefault } from '../../root/Texts';
import UpgradeRoleDialogComponent from '../../components/Dialog/UpgradeRoleDialogComponent';
import { dataSlider } from '../../components/Common/Carousel/Data';


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


  /*-----------------Usable variable-----------------*/
  const dispatch = useDispatch();

  /*-----------------UseEffect-----------------*/
  useEffect(() => {
    const fetchData = async () => {
      const tokenStorage = await AsyncStorage.getItem('access_token');
      const userString = await AsyncStorage.getItem('userData');
      if (tokenStorage && userString) {
        const tokenString = JSON.parse(tokenStorage);
        const user = JSON.parse(userString);
        const userID = user.userID;
        console.log('userParse: ', tokenString);
        const params = {}
        try {
          const getData = await api.get(`/api/v1/recommedation/get-list-recommendation-by-user-history-items?userID=${userID}`, params, tokenString);

          if (getData.success === 200) {
            console.log('recommend');
            setDataPaging(getData.data);
            setIsLoading(false);
            // setClothesData(getData.data.slice(0.20));
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
  // useEffect(() => {

  //   handleFetchDataPaging(0);
  // }, [dataPaging]);

  useEffect(() => {
      handleFetchDataPaging(pageNumber);
  }, [dataPaging]);








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
          setClothesData((prev)=>[...prev,...data]);
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
    }
  }

  const handleChangeIconAdded = (id: any, reacted: boolean | undefined) => {
    setAddItemToCollection(!addItemToCollection);
    if (!reacted) {
      handleAddToCollection(id);
    }

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
          <HorizontalCarouselComponent data={dataSlider}></HorizontalCarouselComponent>
          <ChipGroupComponent></ChipGroupComponent>

          {/* Horizontal FlatList */}
          <FlatList
            horizontal={true}
            style={HomeStylesComponent.homeSliderHorizotalContent}
            data={data1}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ListViewComponent cardStyleContent={{ width: (width + 55) * 0.4, height: 300, borderRadius: 8 }} cardStyleContainer={{ margin: 5, alignContent: 'center', width: (width + 55) * 0.4, height: 300, borderRadius: 8 }} data={[{ id: item.id, imgUrl: item.imgUrl, }]} />
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
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000000' }}>New Style</Text>
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
                    key={item.clothesID}
                    mode='contained'
                    icon={'heart'}
                    underlayColor='transparent'
                    containerColor='transparent'
                    style={[HomeStylesComponent.iconCard, {}]}
                    size={20}
                    iconColor={addedItems.includes(item.clothesID) && item.reacted ? '#C90801' : 'black'}
                    // iconColor={item.reacted ? fourthColor : '#C3C3C3'}
                    // iconColor={fourthColor}

                    onPress={() => {
                      handleChangeIconAdded(item.clothesID, item.reacted);
                    }}

                  />
                } />
            )}
            contentContainerStyle={{ paddingRight: 0 }}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            // onEndReached={handleLoadMore}
            // onEndReachedThreshold={0.9}
          // ListFooterComponent={isFetchingMore && <ActivityIndicator size="large" color="#0000ff" />}
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
