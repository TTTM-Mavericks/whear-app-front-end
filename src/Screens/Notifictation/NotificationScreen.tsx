
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, FlatList, Alert, TouchableOpacity } from 'react-native';
import NotificationStyleScreen from './NotificationStyleScreen';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../root/RootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';
import AppBarHeaderComponent from '../../components/Common/AppBarHeader/AppBarHeaderComponent';
import { width } from '../../root/ResponsiveSize';
import { primaryColor, secondaryColor } from '../../root/Colors';
import { useDispatch } from 'react-redux';
import { setOpenCreateClothesDialog } from '../../redux/State/Actions';
import AppBarFooterComponents from '../../components/Common/AppBarFooter/AppBarFooterComponents';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';


type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;
const NotificationScreen = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>();

  /*-----------------UseState variable-----------------*/
  const [colorIconAdded, setColorIconAdded] = useState('#C90801');
  const [addItemToCollection, setAddItemToCollection] = useState(true);
  const [addedItems, setAddedItems] = useState<string[]>([]);
  const [scrollUp, setScrollUp] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);


  /*-----------------Usable variable-----------------*/
  const dispatch = useDispatch();

  /*-----------------UseEffect-----------------*/

  /*-----------------Function handler-----------------*/
  function hanldeGoBack(): void {
    navigation.goBack();
  }



  const handleScroll = (event: any) => {
    const currentScrollPos = event.nativeEvent.contentOffset.y;

    if (currentScrollPos > prevScrollPos) {
      setScrollUp(false);
    } else if (currentScrollPos < prevScrollPos) {
      setScrollUp(true);

    }

    setPrevScrollPos(currentScrollPos);
  };

  const handleOpenCreateClothesDialog = () => {
    dispatch(setOpenCreateClothesDialog(true));
  }

  const handleConfirmClearAll = () => {
    Alert.alert(
      'Confirm Clear All',
      'Are you sure you want to clear all?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: handleClearAll,
        },
      ],
      { cancelable: false }
    );
  };

  const handleClearAll = () => {

    Alert.alert('Cleared All', 'All items have been cleared.');
  };

  const handleMarkIsRead = () => {
    
  }


  return (
    <View style={NotificationStyleScreen.container}>
      <AppBarHeaderComponent
        title={
          <View>
            <MaskedView
              maskElement={
                <Text style={NotificationStyleScreen.titlePage}>Notification</Text>
              }
            >
              <LinearGradient
                colors={[secondaryColor, primaryColor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={NotificationStyleScreen.linearBackground}
              >
                <Text style={{ opacity: 0 }}>Home</Text>
              </LinearGradient>
            </MaskedView>
          </View>
        }
        backAction={() => hanldeGoBack()}
      >
      </AppBarHeaderComponent>

      <ScrollView
        persistentScrollbar={false}
        style={NotificationStyleScreen.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => handleScroll(event)}
        scrollEventThrottle={16}
      >
        <View style={NotificationStyleScreen.scrollViewContent}>
          <View style={{ width: width * 0.9, display: 'flex', flexDirection: 'row' }}>
            <View style={{ alignItems: 'flex-start' }}>
              <TouchableOpacity onPress={handleMarkIsRead}>
                <Text style={{ fontSize: 13, color: '#808991' }}>Mark is read</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <TouchableOpacity onPress={handleConfirmClearAll}>
                <Text style={{ fontSize: 13, color: '#808991' }}>Clear all</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </ScrollView >
      <AppBarFooterComponents isHide={scrollUp} centerIcon={'plus'} centerOnPress={handleOpenCreateClothesDialog}></AppBarFooterComponents>
    </View >

  );
};


export default NotificationScreen;
