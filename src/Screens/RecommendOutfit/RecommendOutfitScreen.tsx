
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, FlatList, Animated, Platform, Image, SafeAreaView, TouchableOpacity, ImageBackground } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../root/RootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';
import ListViewComponent from '../../components/ListView/ListViewComponent';
import { ActivityIndicator, Appbar, Button, Card, Chip, Icon, IconButton, MD3Colors, SegmentedButtons } from 'react-native-paper';
import AppBarHeaderComponent from '../../components/Common/AppBarHeader/AppBarHeaderComponent';
import ChipGroupComponent from '../../components/Common/ChipGroup/ChipGroupComponent';
import { height, width } from '../../root/ResponsiveSize';
import { backgroundColor, fourthColor, grayBackgroundColor, primaryColor, secondaryColor, thirthColor } from '../../root/Colors';
import { useDispatch } from 'react-redux';
import { setOpenAddToCollectionsDialog, setOpenUpgradeRolesDialog } from '../../redux/State/Actions';
import RecommendOutfitStyleScreen from './RecommendOutfitStyleScreen';
import AppBarFooterComponents from '../../components/Common/AppBarFooter/AppBarFooterComponents';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api/AxiosApiConfig';
import { UserInterFace } from '../../models/ObjectInterface';
import UpgradeRoleDialogComponent from '../../components/Dialog/UpgradeRoleDialogComponent';
import { getIconClothImage } from '../../components/Common/Functions/CommonFunctionComponents';


interface ListItem {
  id: string;
  title?: string;
  imgUrl?: any;
  description?: string;
}

const MAX_COLLECTIONS = 5;
const MAX_CLOTHES = 10;



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

interface ClothesResInterface {
  clothesID: any;
  nameOfProduct: string;
  typeOfClothes: string;
  shape: string;
  description: string;
  link: string;
  rating: number;
  materials: string;
  reactPerClothes: any; // You might want to replace 'any' with the actual type
  hashtag: string[];
  clothesSeasons: string[];
  clothesImages: string[];
  clothesSizes: string[];
  clothesColors: string[];
  clothesStyles: string[];
  react: any[]; // You might want to replace 'any' with the actual type
  comment: any[]; // You might want to replace 'any' with the actual type
  userResponseStylish: {
    userID: string;
    username: string;
    imgUrl: string;
  };
}



type AIStylistResponse = {
  styleName: string,
  bodyShapeName: string,
  outfits: ClothesResInterface[][];
  message: string,
}




type RouteNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;
const RecommendOutfitScreen = () => {
  const navigation = useNavigation<RouteNavigationProp>();

  /*-----------------UseState variable-----------------*/
  const [colorIconAdded, setColorIconAdded] = useState('#C90801');
  const [addItemToCollection, setAddItemToCollection] = useState(true);
  const [addedItems, setAddedItems] = useState<string[]>([]);
  const [scrollUp, setScrollUp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [aiStylistResponse, setAiStylistResponse] = useState<AIStylistResponse[]>([]);
  const [aiStylistResponseChild, setAiStylistResponseChild] = useState<AIStylistResponse>();
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [chipValue, setChipValue] = React.useState('');
  const [currentDay, setCurrentDay] = useState('1');
  const [oufitStyleName, setOutfitStyleName] = useState('')
  const [user, setUser] = useState<UserInterFace>();
  const [subrole, setSubrole] = useState('');
  const [premiumRole, setPremiumRole] = useState(false);
  const [data, setData] = useState<AIStylistResponse[]>();






  /*-----------------Usable variable-----------------*/
  const dispatch = useDispatch();
  const scrollY = useRef(new Animated.Value(0)).current;


  /*-----------------UseEffect-----------------*/
  useEffect(() => {
    const fetchData = async () => {
      const tokenStorage = await AsyncStorage.getItem('access_token');
      const userString = await AsyncStorage.getItem('userData');
      const subrole = await AsyncStorage.getItem('subrole');
      if (subrole) {
        setSubrole(JSON.parse(subrole));
      }
      if (tokenStorage && userString) {
        const tokenString = JSON.parse(tokenStorage);
        const user = JSON.parse(userString);
        const userID = user.userID;
        console.log('userParse: ', userID);
        const params = {}
        try {
          const getData = await api.get(`/api/v1/ai-stylish/get-suggest-clothes-for-user?userID=${userID}`, params, tokenString);

          if (getData.success === 200) {
            setData(getData.data)
            setIsLoading(false);
            setCurrentDay('2');
          }
          else {
            console.log(getData.message);
          }

        } catch (error) {
          console.error("An error occurred during data fetching:", error);
        }
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data[0].outfits[0]);
      setAiStylistResponse(data);
    }
  }, [data]);

  useEffect(() => {
    console.log('subrole: ', subrole);
    setSubrole(subrole);


  }, [subrole]);



  // useEffect(() => {
  //   if (currentDay === '2') {
  //     setAiStylistResponseChild(aiStylistResponse[0]);
  //     setOutfitStyleName(aiStylistResponse[0].styleName);

  //   } else
  //     if (currentDay === '3') {
  //       setAiStylistResponseChild(aiStylistResponse[1]);
  //       setOutfitStyleName(aiStylistResponse[1].styleName);

  //     } else
  //       if (currentDay === '3' && subrole !== 'LV1') {
  //         setAiStylistResponseChild(aiStylistResponse[2]);
  //         setOutfitStyleName(aiStylistResponse[2].styleName);

  //       } else
  //         if (currentDay === '4' && subrole !== 'LV1') {
  //           setAiStylistResponseChild(aiStylistResponse[3]);
  //           setOutfitStyleName(aiStylistResponse[3].styleName);

  //         } else
  //           if (currentDay === '5' && subrole !== 'LV1') {
  //             setAiStylistResponseChild(aiStylistResponse[4]);
  //             setOutfitStyleName(aiStylistResponse[4].styleName);

  //           } else
  //             if (currentDay === '6' && subrole !== 'LV1') {
  //               setAiStylistResponseChild(aiStylistResponse[5]);
  //               setOutfitStyleName(aiStylistResponse[5].styleName);

  //             } else
  //               if (currentDay === '7' && subrole !== 'LV1') {
  //                 setAiStylistResponseChild(aiStylistResponse[6]);
  //                 setOutfitStyleName(aiStylistResponse[6].styleName);

  //               }
  // }, [currentDay]);
  useEffect(() => {
    const dayIndex = parseInt(currentDay, 10) - 2;
    console.log('dayIndex: ', dayIndex);
    if (dayIndex >= 0 && dayIndex < aiStylistResponse.length) {
      console.log(1);
      const selectedResponse = aiStylistResponse[dayIndex];
      setAiStylistResponseChild(selectedResponse);
      setOutfitStyleName(selectedResponse.styleName);
    }
  }, [currentDay]);



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


  const hanldeMoveToDetail = (clothID: string) => {
    navigation.navigate('ClothesDetailScreen', { clothID });
  }

  const handleUpgradeRoleDialog = () => {
    if (subrole === 'LV1') {
      dispatch(setOpenUpgradeRolesDialog(true));
      setPremiumRole(false);
    } else {
      setPremiumRole(true);
    }
  }

  const handleImageLoad = (event: any) => {
    const { width, height } = event.nativeEvent.source;
    setImageDimensions({ width, height });
  };

  const handelChangeOutfit = async (cloth: ClothesResInterface[]) => {
    const tokenStorage = await AsyncStorage.getItem('access_token');
    const userString = await AsyncStorage.getItem('userData');
    const subrole = await AsyncStorage.getItem('subrole');
    const styleDefault = await AsyncStorage.getItem('styleDefault');
    if (subrole) {
      setSubrole(subrole);
    }
    if (tokenStorage && userString) {
      const tokenString = JSON.parse(tokenStorage);
      const user = JSON.parse(userString);
      const userID = user.userID;
      console.log('userParse: ', userID);
      const params = {}
      try {
        let styleDefaultParse: any
        if (styleDefault) {
          styleDefaultParse = JSON.parse(styleDefault);

        }
        const body = {
          userID: userID,
          styleName: oufitStyleName,
          bodyShapeName: styleDefaultParse.bodyShapeName,
          topInsideID: cloth[0].clothesID,
          topOutsideID: cloth[1].clothesID,
          bottomKindID: cloth[2].clothesID,
          shoesTypeID: cloth[3].clothesID,
          accessoryKindID: cloth[4].clothesID
        }

        console.log('0000000000000000000000000: ', body);

        const getData = await api.post(`/api/v1/ai-stylish/renew-clothes-after-reject-for-premium-user`, body, tokenString);

        if (getData.success === 200) {
          // setData(getData.data)
          console.log('3333333333333: ', getData.data);
          setIsLoading(false);
        }
        else {
          console.log(getData.message);
          if (subrole !== 'LV1') {
            dispatch(setOpenUpgradeRolesDialog(true));
            setPremiumRole(false);
          }
        }

      } catch (error) {
        console.error("An error occurred during data fetching:", error);
      }
    }
  }

  return (
    <View style={RecommendOutfitStyleScreen.container}>
      {/* {scrollUp && ( */}
      <AppBarHeaderComponent
        title={
          <View>
            <MaskedView
              maskElement={
                <Text style={RecommendOutfitStyleScreen.titlePage}>Outfit</Text>
              }
            >
              <LinearGradient
                colors={[secondaryColor, primaryColor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={RecommendOutfitStyleScreen.linearBackground}
              >
                <Text style={{ opacity: 0 }}>Outfit</Text>
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
        style={RecommendOutfitStyleScreen.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={RecommendOutfitStyleScreen.buttonGroup}>
          <Button
            mode='outlined'
            contentStyle={{ height: height * 0.04 }}
            style={[RecommendOutfitStyleScreen.buttonGroup_button, { backgroundColor: grayBackgroundColor }]}
            labelStyle={[RecommendOutfitStyleScreen.buttonGroup_button_lable]}
          >
            <Text style={{}}>Style</Text>
          </Button>

          <Button
            mode='outlined'
            contentStyle={{ height: height * 0.04 }}
            style={[RecommendOutfitStyleScreen.buttonGroup_button, { backgroundColor: primaryColor }]}
            labelStyle={[RecommendOutfitStyleScreen.buttonGroup_button_lable, { color: 'white' }]}
          >
            <Text style={{}}>Products</Text>
          </Button>


        </View>
        <View style={{ alignItems: 'flex-start', marginLeft: 10, marginTop: 10, marginBottom: 0 }}>
        </View>
        <View style={RecommendOutfitStyleScreen.scrollViewContent}>


          <FlatList
            horizontal={true}
            style={RecommendOutfitStyleScreen.homeSliderHorizotalContent}
            data={data1}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ListViewComponent cardStyleContent={{ width: width * 0.9, height: 500, borderRadius: 8 }} cardStyleContainer={{ margin: 5, alignContent: 'center', width: width * 0.9, height: 300, borderRadius: 8 }} data={[{ id: item.id, imgUrl: item.imgUrl, }]} />
            )}
            contentContainerStyle={{ paddingRight: 0 }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
          />



        </View>
        {/* <View style={{ alignItems: 'flex-start', marginLeft: 10, marginBottom: 0 }}>
          <Text style={{ fontSize: 13, color: 'black', fontWeight: '500', textAlign: 'left' }}>{data.length} / {MAX_CLOTHES} clothes</Text>
        </View> */}
        <View style={RecommendOutfitStyleScreen.scrollViewContent}>
          <ScrollView horizontal style={[RecommendOutfitStyleScreen.chipContainer]}>
            <SegmentedButtons
              style={[RecommendOutfitStyleScreen.segmentedButtons]}
              theme={{ roundness: 0 }}
              value={currentDay}
              onValueChange={setCurrentDay}
              buttons={[
                {
                  value: '2',
                  label: 'Day 1',
                  style: {
                    borderRadius: 0,
                    borderColor: 'transparent',
                    borderWidth: 0,
                    backgroundColor: backgroundColor,
                    width: 30,
                    marginLeft: -1,

                  },
                  labelStyle: {
                    fontWeight: 'bold',
                    fontSize: 15
                  },
                  checkedColor: thirthColor,
                  uncheckedColor: '#808991',

                },
                {
                  value: '3',
                  label: 'Day 2',
                  style: {
                    borderRadius: 0,
                    borderColor: 'transparent',
                    borderWidth: 0,
                    backgroundColor: backgroundColor,

                  },
                  labelStyle: {
                    fontWeight: 'bold',
                    fontSize: 15
                  },
                  checkedColor: thirthColor,
                  uncheckedColor: '#808991',
                },
                {
                  value: '4',
                  label: 'Day 3',
                  style: {
                    borderRadius: 0,
                    borderColor: 'transparent',
                    borderWidth: 0,
                    backgroundColor: backgroundColor,

                  },
                  labelStyle: {
                    fontWeight: 'bold',
                    fontSize: 15
                  },
                  checkedColor: thirthColor,
                  uncheckedColor: '#808991',
                  onPress: handleUpgradeRoleDialog

                }, {
                  value: '5',
                  label: 'Day 4',
                  style: {
                    borderRadius: 0,
                    borderColor: 'transparent',
                    borderWidth: 0,
                    backgroundColor: backgroundColor,

                  },
                  labelStyle: {
                    fontWeight: 'bold',
                    fontSize: 15
                  },
                  checkedColor: thirthColor,
                  uncheckedColor: '#808991',
                  onPress: handleUpgradeRoleDialog


                },
                {
                  value: '6',
                  label: 'Day 5',
                  style: {
                    borderRadius: 0,
                    borderColor: 'transparent',
                    borderWidth: 0,
                    backgroundColor: backgroundColor,

                  },
                  labelStyle: {
                    fontWeight: 'bold',
                    fontSize: 15
                  },
                  checkedColor: thirthColor,
                  uncheckedColor: '#808991',
                  onPress: handleUpgradeRoleDialog


                },
                {
                  value: '7',
                  label: 'Day 6',
                  style: {
                    borderRadius: 0,
                    borderColor: 'transparent',
                    borderWidth: 0,
                    backgroundColor: backgroundColor,

                  },
                  labelStyle: {
                    fontWeight: 'bold',
                    fontSize: 15
                  },
                  checkedColor: thirthColor,
                  uncheckedColor: '#808991',
                  onPress: handleUpgradeRoleDialog


                },
                {
                  value: '8',
                  label: 'Day 7',
                  style: {
                    borderRadius: 0,
                    borderColor: 'transparent',
                    borderWidth: 0,
                    backgroundColor: backgroundColor,
                  },
                  labelStyle: {
                    fontWeight: 'bold',
                    fontSize: 15
                  },
                  checkedColor: thirthColor,
                  uncheckedColor: '#808991',
                  onPress: handleUpgradeRoleDialog

                },
              ]}
            />
          </ScrollView>
          {/* Regular FlatList */}
          <View >
            <ImageBackground style={{
              width: width,
              height: height + 170,
              flex: 1,
              position: 'absolute',
              paddingBottom: 20
            }} source={require('../../assets/img/radian_background_color.png')} />
            <View style={{ flex: 1, }}>
              <View style={{ marginTop: 20, marginBottom: 20, flexDirection: 'row' }}>
                <View style={[RecommendOutfitStyleScreen.outfitTag, {width: 'auto', backgroundColor: fourthColor}]}>
                  <Text style={{ fontSize: 14, color: backgroundColor, paddingLeft: 15, paddingRight: 15, padding: 5, fontWeight: '500' }}>Style: {oufitStyleName}</Text>
                </View>
              </View>
              {aiStylistResponseChild && aiStylistResponseChild.outfits.map((clothesData, key: number) => (
                <View key={key} style={{ marginTop: 0, marginBottom: 10, backgroundColor: 'transparent' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={RecommendOutfitStyleScreen.outfitTag}>
                      <Text style={{ fontSize: 14, color: backgroundColor, paddingLeft: 15, paddingRight: 15, padding: 5, fontWeight: '500' }}>Outfit {key + 1}</Text>
                    </View>
                    <IconButton icon={'reload'} size={20} style={{ paddingRight: 0, height: 18 }} onPress={() => handelChangeOutfit(aiStylistResponseChild.outfits[key])}></IconButton>
                  </View>
                  <FlatList
                    key={key}
                    style={RecommendOutfitStyleScreen.flatlist}
                    data={clothesData}
                    horizontal={true}
                    keyExtractor={(item) => item.clothesID}
                    renderItem={({ item }) => (
                      <Card key={item.clothesID} style={[RecommendOutfitStyleScreen.cardContainer]} >
                        {!premiumRole
                          ? (
                            <>
                              {currentDay === '2' || currentDay === '3' ? (
                                <>
                                </>
                              ) : (
                                <View
                                  style={[RecommendOutfitStyleScreen.hiddenElement]}
                                >
                                  <Icon source={require('../../assets/icon/hidden.png')} size={50}></Icon>
                                </View>
                              )}
                            </>
                          )
                          : (
                            <></>
                          )
                        }
                        {/* {!subrole && (currentDay !== '2' && currentDay !== '3') && (
                        <View
                          style={[RecommendOutfitStyleScreen.hiddenElement]}
                        >
                          <Icon source={require('../../assets/icon/hidden.png')} size={50}></Icon>
                        </View>
                      )} */}
                        <TouchableOpacity onPress={() => hanldeMoveToDetail(item.clothesID)}>
                          <Image
                            source={{ uri: item.clothesImages[0] }}
                            style={[RecommendOutfitStyleScreen.cardContainer, { marginBottom: 0, marginTop: 0 }]}
                            onLoad={handleImageLoad}
                            resizeMode='cover'
                          />
                        </TouchableOpacity>
                        <View style={{ position: 'absolute', top: 0, right: 10, backgroundColor: primaryColor, borderTopEndRadius: 8, borderBottomStartRadius: 8 }}>
                          <Text style={{ fontSize: 13, color: backgroundColor, paddingLeft: 15, paddingRight: 15, padding: 5 }}>{item.typeOfClothes}</Text>
                        </View>
                        <View style={{ position: 'absolute', top: 0, left: -5, width: 30, height: 30, backgroundColor: primaryColor, alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginLeft: 15, marginRight: 15, borderTopStartRadius: 8, borderBottomEndRadius: 8 }}>
                          <Icon source={getIconClothImage(item.typeOfClothes)} size={20} color={backgroundColor}>

                          </Icon>
                        </View>

                      </Card>
                    )}
                  />
                </View>
              ))}
            </View>
          </View>


          {/* {!isLoading ? (
            <FlatList
              style={RecommendOutfitStyleScreen.flatlist}
              data={clothesData1}
              keyExtractor={(item) => item.clothesID}
              numColumns={2}
              renderItem={({ item }) => (
                <ListViewComponent data={[{ id: item.clothesID, imgUrl: item.clothesImages ? item.clothesImages[0] : clothesLogoUrlDefault, }]}
                  onPress={() => hanldeMoveToDetail(item.clothesID)}
                  child={
                    <IconButton
                      mode='outlined'
                      icon={'heart'}
                      style={[RecommendOutfitStyleScreen.iconCard, {}]}
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
          <ActivityIndicator animating={true} color={primaryColor} style={{marginTop: 50, marginBottom: 50}} />
        )} */}
          {isLoading
            && (
              <ActivityIndicator animating={true} color={primaryColor} style={{ marginTop: 50, marginBottom: 50 }} />
            )}
          <View style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
            <Button icon={require('../../assets/img/logo/logo.png')} mode='outlined' style={{ width: width * 0.8, margin: 20, borderRadius: 8, backgroundColor: primaryColor, borderWidth: 0 }} textColor='black' >
              <Text style={{ fontSize: 12.5, fontWeight: '500' }}>
                Upgrade to add more
              </Text>
            </Button>
          </View>

        </View>
        {Platform.OS === 'ios' && (
          <View style={{ width: width, height: height * 0.05 }}>

          </View>
        )}
      </ScrollView >

      {(<AppBarFooterComponents centerIcon='plus' isHide={scrollUp} ></AppBarFooterComponents>)}
      <View>

      </View>
      <UpgradeRoleDialogComponent></UpgradeRoleDialogComponent>

    </View >

  );
};


export default RecommendOutfitScreen;
