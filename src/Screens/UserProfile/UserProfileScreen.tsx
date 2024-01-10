
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image, Platform } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../root/RootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';
import ListViewComponent from '../../components/ListView/ListViewComponent';
import { Appbar, Avatar, Button, Chip, Icon, IconButton, MD3Colors, SegmentedButtons, TextInput } from 'react-native-paper';
import { height, width } from '../../root/ResponsiveSize';
import { backgroundColor, grayBackgroundColor, grayBorderColor, primaryColor } from '../../root/Colors';
import { useDispatch, useSelector } from 'react-redux';
import PostingDialogComponent from '../../components/Dialog/PostingDialogComponent';
import UserProfileStyleScreen from './UserProfileStyleScreen';
import AppBarFooterComponents from '../../components/Common/AppBarFooter/AppBarFooterComponents';
import ImagePickerComponent from '../../components/ImagePicker/ImagePickersComponent';

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



type NavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;
const UserProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  /*-----------------UseState variable-----------------*/
  const [selectedItem, setSelectedItem] = useState({});
  const [value, setValue] = React.useState('');
  const [scrollUp, setScrollUp] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [avatrImgUrl, setAvatarImgUrl] = useState('avatrImgUrl');



  /*-----------------Usable variable-----------------*/
  const dispatch = useDispatch();
  const imageUrl = useSelector((state: any) => state.store.imageUrl);


  /*-----------------UseEffect-----------------*/
  useEffect(() => {
    setAvatarImgUrl(imageUrl);
  }, [imageUrl])

  /*-----------------Function handler-----------------*/



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







  return (
    <View style={UserProfileStyleScreen.container}>
      <View style={UserProfileStyleScreen.header}>
        <IconButton icon={require('../../assets/icon/previous.png')}></IconButton>
        <View style={UserProfileStyleScreen.upgradeBanner} >
          <Icon source={require('../../assets/img/logo/logo.png')} size={40}></Icon>
          <Text style={{ fontSize: 12, fontWeight: 'bold', marginRight: 10 }}>Upgrade to Store</Text>
        </View>
      </View>
      <View style={[UserProfileStyleScreen.backGroundImg, Platform.OS === 'ios' ? { marginTop: -width * 0.88 } : { marginTop: -width * 1.05 }]}>
        <View style={UserProfileStyleScreen.avatarImg}>
          <Image source={avatrImgUrl != '../../assets/icon/user.png' ? { uri: avatrImgUrl } : require('../../assets/icon/user.png')} style={UserProfileStyleScreen.img}></Image>
          {/* <IconButton
            icon={'camera'}
            size={25}
            style={UserProfileStyleScreen.iconImg}
            iconColor='black' ></IconButton> */}
          <ImagePickerComponent style={UserProfileStyleScreen.iconImg} cutWidth={3} cutHeight={3} iconButton={require('../../assets/icon/photo-camera.png')}></ImagePickerComponent>
        </View>


      </View>

      <View
        style={UserProfileStyleScreen.information}
      >
        <View style={{
          flexDirection: 'row',
          alignContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={UserProfileStyleScreen.fullname}>Nguyễn Minh Tú</Text>
          <IconButton icon={require('../../assets/icon/upgrade.png')} iconColor={'black'} size={25} style={{ position: 'absolute', right: -50 }}></IconButton>

        </View>

        <Text style={UserProfileStyleScreen.levelUp}>Lv.1</Text>

        <View style={UserProfileStyleScreen.buttonGroup}>
          <Button
            mode='outlined'
            contentStyle={Platform.OS === 'ios' ? { height: height * 0.045 } : { height: height * 0.04 }}
            style={[UserProfileStyleScreen.buttonGroup_button, { backgroundColor: primaryColor }]}
            labelStyle={[UserProfileStyleScreen.buttonGroup_button_lable, { color: 'white' }]}
          >
            <Text style={{ fontWeight: '500', fontSize: 12 }}>227 Follower</Text>
          </Button>

          <Button
            mode='outlined'
            contentStyle={Platform.OS === 'ios' ? { height: height * 0.045 } : { height: height * 0.04 }}
            style={[UserProfileStyleScreen.buttonGroup_button, { backgroundColor: grayBackgroundColor }]}
            labelStyle={[UserProfileStyleScreen.buttonGroup_button_lable,]}
          >
            <Text style={{ fontWeight: '500', fontSize: 12 }}>126 Following</Text>
          </Button>


        </View>

        <View
          style={[UserProfileStyleScreen.segmentedButtons,]}
        >
          <IconButton icon={'facebook'} size={15} onPress={() => navigation.navigate('Home')} style={UserProfileStyleScreen.button} />
          <IconButton icon={'instagram'} size={15} onPress={() => navigation.navigate('Home')} style={UserProfileStyleScreen.button} />
          <IconButton icon={'information'} size={15} onPress={() => navigation.navigate('UserProfileSetting')} style={UserProfileStyleScreen.button} />

        </View>

      </View>

      {/* <View
        style={[UserProfileStyleScreen.segmentedButtonsNavbar,]}
      >
        <IconButton icon={'image'} size={15} style={UserProfileStyleScreen.navbarButton} />
        <IconButton icon={'heart'} size={15} style={UserProfileStyleScreen.navbarButton} />
        <IconButton icon={'history'} size={15} style={UserProfileStyleScreen.navbarButton} />
        <IconButton icon={'menu'} size={15} style={UserProfileStyleScreen.navbarButton} />


      </View> */}
      <SegmentedButtons
        style={[UserProfileStyleScreen.segmentedButtonsNavbar]}
        theme={{ roundness: 2 }}
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: 'all',
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
            checkedColor: 'black',
            uncheckedColor: '#808991',
          },
          {
            value: 'hotStore',
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
            checkedColor: 'black',
            uncheckedColor: '#808991',
          },
          {
            value: 'events',
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
            checkedColor: 'black',
            uncheckedColor: '#808991',
          },
          {
            value: 'news',
            icon: 'menu',
            style: {
              borderRadius: 0,
              borderColor: grayBorderColor,
              borderTopWidth: 0,
              borderBottomWidth: 0,
              borderRightWidth: 0,
              borderLeftWidth: 0,
              backgroundColor: backgroundColor,
            },
            checkedColor: 'black',
            uncheckedColor: '#808991',
          },
        ]}
      />


      <ScrollView
        persistentScrollbar={false}
        style={UserProfileStyleScreen.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => handleScroll(event)}
        scrollEventThrottle={16} // Adjust as needed
      >
        <View style={UserProfileStyleScreen.scrollViewContent}>


          <FlatList
            style={UserProfileStyleScreen.flatlist}
            data={data.slice(0, 10)}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => (
              <ListViewComponent data={[{ id: item.id, imgUrl: item.imgUrl, }]} />
            )}
            contentContainerStyle={{ paddingRight: 0 }}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />


          <PostingDialogComponent></PostingDialogComponent>


        </View>
      </ScrollView >
      <AppBarFooterComponents isHide={scrollUp} centerIcon={require('../../assets/img/logo/logo.png')}></AppBarFooterComponents>
    </View >

  );
};



export default UserProfileScreen;
