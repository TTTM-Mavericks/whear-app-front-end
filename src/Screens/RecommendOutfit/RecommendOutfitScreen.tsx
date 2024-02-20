
import React, { useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, FlatList, Animated, Platform } from 'react-native';

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
import RecommendOutfitStyleScreen from './RecommendOutfitStyleScreen';
import AppBarFooterComponents from '../../components/Common/AppBarFooter/AppBarFooterComponents';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import TouchabaleActiveActionButton from '../../components/Common/TouchableActive/TouchabaleActiveActionButton';


interface ListItem {
  id: string;
  title?: string;
  imgUrl?: any;
  description?: string;
}

const MAX_COLLECTIONS = 5;
const MAX_CLOTHES = 10;
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

const chipData = ['#Minimalism', '#Girly', '#Sporty', '#Vintage', '#Manly'];



type RouteNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;
const RecommendOutfitScreen = () => {
  const navigation = useNavigation<RouteNavigationProp>();

  /*-----------------UseState variable-----------------*/
  const [colorIconAdded, setColorIconAdded] = useState('#C90801');
  const [addItemToCollection, setAddItemToCollection] = useState(true);
  const [addedItems, setAddedItems] = useState<string[]>([]);
  const [scrollUp, setScrollUp] = useState(false);


  /*-----------------Usable variable-----------------*/
  const dispatch = useDispatch();
  const scrollY = useRef(new Animated.Value(0)).current;


  /*-----------------UseEffect-----------------*/

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



  return (
    <View style={RecommendOutfitStyleScreen.container}>
      {/* {scrollUp && ( */}
      <AppBarHeaderComponent
        title={
          <View>
            <MaskedView
              maskElement={
                <Text style={RecommendOutfitStyleScreen.titlePage}>Recommendation</Text>
              }
            >
              <LinearGradient
                colors={[secondaryColor, primaryColor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={RecommendOutfitStyleScreen.linearBackground}
              >
                <Text style={{ opacity: 0 }}>Recommendation</Text>
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
          <Text style={{ fontSize: 13, color: 'black', fontWeight: '500' }}>{data1.length} / {MAX_COLLECTIONS} collections</Text>
        </View>
        <View style={RecommendOutfitStyleScreen.scrollViewContent}>


          <FlatList
            horizontal={true}
            style={RecommendOutfitStyleScreen.homeSliderHorizotalContent}
            data={data1}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ListViewComponent cardStyleContent={{ width: width * 0.9, height: 150, borderRadius: 8 }} cardStyleContainer={{ margin: 5, alignContent: 'center', width: width * 0.9, height: 150, borderRadius: 8 }} data={[{ id: item.id, imgUrl: item.imgUrl, }]} />
            )}
            contentContainerStyle={{ paddingRight: 0 }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
          />


          <ChipGroupComponent style={{ width: width }}></ChipGroupComponent>

        </View>
        <View style={{ alignItems: 'flex-start', marginLeft: 10, marginBottom: 0 }}>
          <Text style={{ fontSize: 13, color: 'black', fontWeight: '500', textAlign: 'left' }}>{data.length} / {MAX_CLOTHES} clothes</Text>
        </View>
        <View style={RecommendOutfitStyleScreen.scrollViewContent}>
          {/* Regular FlatList */}


          <FlatList
            style={RecommendOutfitStyleScreen.flatlist}
            data={data.slice(0, 10)}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => (
              <ListViewComponent data={[{ id: item.id, imgUrl: item.imgUrl, }]} child={
                <IconButton
                  mode='outlined'
                  icon={'heart'}
                  style={[RecommendOutfitStyleScreen.iconCard, {}]}
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


export default RecommendOutfitScreen;
