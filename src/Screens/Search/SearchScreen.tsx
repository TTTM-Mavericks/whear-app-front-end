
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Animated, TouchableOpacity, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../root/RootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';
import CarouselComponent from '../../components/Common/Carousel/CarouselComponent';
import ListViewComponent from '../../components/ListView/ListViewComponent';
import { Appbar, Button, Chip, Icon, IconButton, MD3Colors, SegmentedButtons, TextInput } from 'react-native-paper';
import AppBarHeaderComponent from '../../components/Common/AppBarHeader/AppBarHeaderComponent';
import AppBarHeaderStylesComponent from '../../components/Common/AppBarHeader/AppBarHeaderStyleComponent';
import HorizontalCarouselComponent from '../../components/Common/Carousel/HorizontalCarouselComponent';
import ChipGroupComponent from '../../components/Common/ChipGroup/ChipGroupComponent';
import { height, width } from '../../root/ResponsiveSize';
import SmallChipGroupComponent from '../../components/Common/ChipGroup/SmallChipGroupComponent';
import { backgroundColor, grayBorderColor, primaryColor, secondaryColor } from '../../root/Colors';
import { useDispatch } from 'react-redux';
import { setOpenAddToCollectionsDialog, setOpenCreateClothesDialog } from '../../redux/State/Actions';
import AddingToCollectionComponent from '../../components/Dialog/AddingToCollectionComponent';
import AppBarFooterComponents from '../../components/Common/AppBarFooter/AppBarFooterComponents';
import CreateClothesDialogComponent from '../../components/Dialog/CreateClothesDialogComponent';
import dataSlider from '../../components/Common/Carousel/Data';
import SearchStyleScreen from './SearchStyleScreen';
import { spanTextSize } from '../../root/Texts';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import TouchabaleActiveActionButton from '../../components/Common/TouchableActive/TouchabaleActiveActionButton';

interface ListItem {
  id: string;
  title?: string;
  imgUrl?: any;
  description?: string;
}
const data = [
  {
    id: '1',
    title: "Aenean leo",
    description: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    imgUrl: require('../../assets/img/introduce_background/introduce_background_1.png'),
  },
  {
    id: '4',
    title: "In turpis",
    description: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
    imgUrl: require('../../assets/img/introduce_background/introduce_background_2.png'),

  },
  {
    id: '2',
    title: "Lorem Ipsum",
    description: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
    imgUrl: require('../../assets/img/introduce_background/introduce_background_3.png'),

  },
  {
    id: '3',
    title: "Lorem Ipsum",
    description: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
    imgUrl: require('../../assets/img/introduce_background/introduce_background_4.png'),

  },
  {
    id: '5',
    title: "Lorem Ipsum",
    description: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
    imgUrl: require('../../assets/img/introduce_background/introduce_background_4.png'),

  },
  {
    id: '6',
    title: "Lorem Ipsum",
    description: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
    imgUrl: require('../../assets/img/introduce_background/introduce_background_4.png'),

  },
  {
    id: '7',
    title: "Lorem Ipsum",
    description: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
    imgUrl: require('../../assets/img/introduce_background/introduce_background_4.png'),

  },
  {
    id: '10',
    title: "Aenean leo",
    description: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    imgUrl: require('../../assets/img/introduce_background/introduce_background_1.png'),
  },
  {
    id: '11',
    title: "In turpis",
    description: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
    imgUrl: require('../../assets/img/introduce_background/introduce_background_2.png'),

  },
  {
    id: '12',
    title: "Lorem Ipsum",
    description: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
    imgUrl: require('../../assets/img/introduce_background/introduce_background_3.png'),

  },
  {
    id: '13',
    title: "Lorem Ipsum",
    description: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
    imgUrl: require('../../assets/img/introduce_background/introduce_background_4.png'),

  },
  {
    id: '14',
    title: "Lorem Ipsum",
    description: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
    imgUrl: require('../../assets/img/introduce_background/introduce_background_4.png'),

  },
];

const data1 = [
  {
    id: '1a',
    title: "Aenean leo",
    description: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    imgUrl: require('../../assets/img/introduce_background/introduce_background_1.png'),
  },
  {
    id: '4a',
    title: "In turpis",
    description: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
    imgUrl: require('../../assets/img/introduce_background/introduce_background_2.png'),

  },
  {
    id: '2a',
    title: "Lorem Ipsum",
    description: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
    imgUrl: require('../../assets/img/introduce_background/introduce_background_3.png'),

  },
  {
    id: '3a',
    title: "Lorem Ipsum",
    description: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
    imgUrl: require('../../assets/img/introduce_background/introduce_background_4.png'),

  },
];

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
  const [keyWordSearch, setKeyWordSearch] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isHideSearch, setIsHideSearch] = useState(true);




  /*-----------------Usable variable-----------------*/
  const dispatch = useDispatch();
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const translateY = new Animated.Value(0);







  /*-----------------UseEffect-----------------*/
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
  }, [keyWordSearch])


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

  function hanldeGoBack(): void {
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
  const mockSuggestions: string[] = ['Keyword 1', 'Keyword 2', 'Keyword 3'];

  const handleSearch = (text: string) => {

  };

  const handleSelectSuggestion = (selectedKeyword: string) => {
    // Set the selected keyword in the search input
    setKeyWordSearch(selectedKeyword);
    // Clear the suggestions
    setSuggestions([]);
  };



  return (
    <View style={SearchStyleScreen.container}>
      <TouchabaleActiveActionButton ></TouchabaleActiveActionButton>

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
        isHideIcon1={true}
        backAction={() => hanldeGoBack()}
      >
      </AppBarHeaderComponent>
      <View>
        <View style={{ marginTop: 20, alignItems: 'center', alignContent: 'center', position: 'relative' }}>
          <TextInput
            mode='outlined'
            style={SearchStyleScreen.postingInput}
            onChangeText={setKeyWordSearch}
            activeOutlineColor={'black'}
            outlineStyle={{ borderWidth: 0.5 }}
            right={
              (
                <TextInput.Icon icon={require('../../assets/icon/loupe.png')} color={primaryColor}>

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
                    <TouchableOpacity onPress={() => handleSelectSuggestion(item)}>
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
                    style={{position: 'absolute', zIndex: 50, height: height*0.2}}
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
          <FlatList
            style={SearchStyleScreen.flatlist}
            data={data.slice(0, 10)}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => (
              <ListViewComponent data={[{ id: item.id, imgUrl: item.imgUrl, }]} child={
                <IconButton
                  mode='outlined'
                  icon={'heart'}
                  style={[SearchStyleScreen.iconCard, {}]}
                  size={15}
                  iconColor={addedItems.includes(item.id) ? '#C90801' : '#C3C3C3'}
                  onPress={() => {
                    handleChangeIconAdded(item.id);
                  }}

                />
              } />
            )}
            contentContainerStyle={{ paddingRight: 0 }}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />

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
