
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import SocailStyleScreen from './SocailStyleScreen';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../root/RootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';
import CarouselComponent from '../../components/Common/Carousel/CarouselComponent';
import ListViewComponent from '../../components/ListView/ListViewComponent';
import { Appbar, Button, Chip, Icon, IconButton, MD3Colors, TextInput } from 'react-native-paper';
import AppBarHeaderComponent from '../../components/Common/AppBarHeader/AppBarHeaderComponent';
import AppBarHeaderStylesComponent from '../../components/Common/AppBarHeader/AppBarHeaderStyleComponent';
import HorizontalCarouselComponent from '../../components/Common/Carousel/HorizontalCarouselComponent';
import ChipGroupComponent from '../../components/Common/ChipGroup/ChipGroupComponent';
import { width } from '../../root/ResponsiveSize';
import SmallChipGroupComponent from '../../components/Common/ChipGroup/SmallChipGroupComponent';
import { backgroundColor, primaryColor } from '../../root/Colors';
import { useDispatch } from 'react-redux';
import { setOpenAddToCollectionsDialog, setOpenUpPostingDialog } from '../../redux/State/Actions';
import AddingToCollectionComponent from '../../components/Dialog/AddingToCollectionComponent';
import PostingDialogComponent from '../../components/Dialog/PostingDialogComponent';

interface ListItem {
  id: string;
  title?: string;
  imgUrl?: any;
  description?: string;
}


const data = ['#Minimalism', '#Girly', '#Sporty', '#Vintage', '#Manly'];



type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;
const SocialScreen = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>();

  /*-----------------UseState variable-----------------*/
  const [colorIconAdded, setColorIconAdded] = useState('#C90801');
  const [addItemToCollection, setAddItemToCollection] = useState(true);
  const [addedItems, setAddedItems] = useState<string[]>([]);
  const [postingContent, setPostingContent] = useState('What are you thinking?')


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

  const handleOpenPostingForm = () => {
    dispatch(setOpenUpPostingDialog(true));
  }



  return (
    <View style={SocailStyleScreen.container}>
      <AppBarHeaderComponent
        title='Social'
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
        style={SocailStyleScreen.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={SocailStyleScreen.scrollViewContent}>
          <View style={SocailStyleScreen.postingEditorContainer}>
            <View>
              <TextInput
                value='what are you thinking? '
                mode='outlined'
                
                style={SocailStyleScreen.postingInput}
                contentStyle={{}}
                onPressIn={handleOpenPostingForm}
                right={
                  (
                    <TextInput.Icon icon={'image'} color={primaryColor}>

                    </TextInput.Icon>
                  )
                }
              />
            </View>
          </View>
          {/* Regular FlatList */}
          <FlatList
            style={SocailStyleScreen.flatlist}
            data={data.slice(0, 10)}
            numColumns={2}
            renderItem={({ item }) => (
              <></>
            )}
            contentContainerStyle={{ paddingRight: 0 }}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />


          <PostingDialogComponent></PostingDialogComponent>


        </View>
      </ScrollView >
    </View >

  );
};


export default SocialScreen;
