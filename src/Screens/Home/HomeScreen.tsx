
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, FlatList } from 'react-native';
import HomeStylesComponent from './HomeStyleScreen';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../root/RootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';
import CarouselComponent from '../../components/Common/Carousel/CarouselComponent';
import ListViewComponent from '../../components/ListView/ListViewComponent';
import { Appbar, Button, Chip, Icon, IconButton, MD3Colors } from 'react-native-paper';
import AppBarHeaderComponent from '../../components/Common/AppBarHeader/AppBarHeaderComponent';
import AppBarHeaderStylesComponent from '../../components/Common/AppBarHeader/AppBarHeaderStyleComponent';
import HorizontalCarouselComponent from '../../components/Common/Carousel/HorizontalCarouselComponent';
import ChipGroupComponent from '../../components/Common/ChipGroup/ChipGroupComponent';
import { width } from '../../root/ResponsiveSize';
import SmallChipGroupComponent from '../../components/Common/ChipGroup/SmallChipGroupComponent';
import { backgroundColor, primaryColor } from '../../root/Colors';
import { useDispatch } from 'react-redux';
import { setOpenAddToCollectionsDialog } from '../../redux/State/Actions';
import AddingToCollectionComponent from '../../components/Dialog/AddingToCollectionComponent';

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

const chipData = ['#Minimalism', '#Girly', '#Sporty', '#Vintage', '#Manly'];



type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;
const HomeScreen = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>();

  /*-----------------UseState variable-----------------*/
  const [colorIconAdded, setColorIconAdded] = useState('#C90801');
  const [addItemToCollection, setAddItemToCollection] = useState(true);
  const [addedItems, setAddedItems] = useState<string[]>([]);


  /*-----------------Usable variable-----------------*/
  const dispatch = useDispatch();

  /*-----------------UseEffect-----------------*/

  /*-----------------Function handler-----------------*/
  function hanldeGoBack(): void {
    alert('back')
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

    // console.log(!addItemToCollection);
    // if (addItemToCollection) {
    //   setAddItemToCollection(true);
    //   handleAddToCollection(id);
    //   setAddedItems((prevItems) => prevItems.filter((itemId) => itemId !== id));
    //   // setColorIconAdded('#C3C3C3');
    //   setColorIconAdded('#C90801')
    // } else {
    //   setColorIconAdded('#C3C3C3')
    //   setAddItemToCollection(false);

    // }
  }



  return (
    <View style={HomeStylesComponent.container}>
      <AppBarHeaderComponent
        title='Home'
        backAction={() => hanldeGoBack()}
        iconChild={
          <>
            <Appbar.Action icon={'magnify'} onPress={handleSearch} />
            <Appbar.Action icon="dots-vertical" onPress={handleMore} />
          </>
        }
      >
      </AppBarHeaderComponent>

      <ScrollView
        persistentScrollbar={false}
        style={HomeStylesComponent.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={HomeStylesComponent.scrollViewContent}>
          <HorizontalCarouselComponent></HorizontalCarouselComponent>
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
            data={data.slice(0, 10)}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => (
              <ListViewComponent data={[{ id: item.id, imgUrl: item.imgUrl, }]} child={
                <IconButton
                  mode='outlined'
                  icon={'heart'}
                  style={[HomeStylesComponent.iconCard, {}]}
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

          <View style={{ width: width * 0.9, display: 'flex', flexDirection: 'row', }}>
            <View style={{ alignItems: 'flex-start' }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000000' }}>Store Recommendation</Text>
            </View>
          </View>


          <AddingToCollectionComponent></AddingToCollectionComponent>
        </View>
      </ScrollView >
    </View >

  );
};


export default HomeScreen;
