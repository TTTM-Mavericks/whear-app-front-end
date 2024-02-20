import MaskedView from '@react-native-masked-view/masked-view';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import IconFA from 'react-native-vector-icons/FontAwesome';
import ListViewComponent from '../../components/ListView/ListViewComponent';
import HomeStylesComponent from '../Home/HomeStyleScreen';
import ChooseStyleYouLoveStyleScreen from './ChooseStyleYouLoveStyleScreen';
import ButtonComponent from '../../components/Button/ButtonDefaultComponent';
import {
  buttonHeight,
  buttonWidth,
} from '../../components/Button/ButtonDefaultData';
import { fourthColor, primaryColor, secondaryColor, thirthColor } from '../../root/Colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../root/RootStackParams';
import { useNavigation } from '@react-navigation/native';
import ButtonDefaultComponent from '../../components/Button/ButtonDefaultComponent';
import { width } from '../../root/ResponsiveSize';
import AppBarFooterComponents from '../../components/Common/AppBarFooter/AppBarFooterComponents';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/MaterialIcons";
import api from '../../api/AxiosApiConfig';
import Toast from 'react-native-toast-message';
import LoadingComponent from '../../components/Common/Loading/LoadingComponent';


const styleData = [
  {
    id: '1',
    title: 'Minimalism',
    description:
      'Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.',
    imgUrl: require('../../assets/img/introduce_background/introduce_background_1.png'),
  },
  {
    id: '2',
    title: 'Girly',
    description:
      'Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ',
    imgUrl: require('../../assets/img/introduce_background/introduce_background_2.png'),
  },
  {
    id: '3',
    title: 'Sporty',
    description:
      'Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.',
    imgUrl: require('../../assets/img/introduce_background/introduce_background_3.png'),
  },
  {
    id: '4',
    title: 'Vintage',
    description:
      'Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.',
    imgUrl: require('../../assets/img/introduce_background/introduce_background_4.png'),
  },
  {
    id: '5',
    title: 'Manly',
    description:
      'Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.',
    imgUrl: require('../../assets/img/introduce_background/introduce_background_4.png'),
  },
  {
    id: '6',
    title: 'Manly',
    description:
      'Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.',
    imgUrl: require('../../assets/img/introduce_background/introduce_background_4.png'),
  },
  {
    id: '7',
    title: 'Manly',
    description:
      'Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.',
    imgUrl: require('../../assets/img/introduce_background/introduce_background_4.png'),
  },
  {
    id: '8',
    title: 'Manly',
    description:
      'Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.',
    imgUrl: require('../../assets/img/introduce_background/introduce_background_4.png'),
  },
];

const fashionStyles = [
  { title: 'CYBERPUNK', id: 'CYBERPUNK', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSPRING.jpg?alt=media&token=3e486b7d-0fd8-4188-861c-f18aa4a3d81c' },
  { title: 'CLASSIC', id: 'CLASSIC', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSPRING.jpg?alt=media&token=3e486b7d-0fd8-4188-861c-f18aa4a3d81c' },
  { title: 'ROCK', id: 'ROCK', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSPRING.jpg?alt=media&token=3e486b7d-0fd8-4188-861c-f18aa4a3d81c' },
  { title: 'PREPPY', id: 'PREPPY', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSPRING.jpg?alt=media&token=3e486b7d-0fd8-4188-861c-f18aa4a3d81c' },
  { title: 'NORMCORE', id: 'NORMCORE', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSPRING.jpg?alt=media&token=3e486b7d-0fd8-4188-861c-f18aa4a3d81c' },
  { title: 'MINIMALISM', id: 'MINIMALISM', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSPRING.jpg?alt=media&token=3e486b7d-0fd8-4188-861c-f18aa4a3d81c' },
  { title: 'BASIC', id: 'BASIC', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSPRING.jpg?alt=media&token=3e486b7d-0fd8-4188-861c-f18aa4a3d81c' },
  { title: 'SPORTY', id: 'SPORTY', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSPRING.jpg?alt=media&token=3e486b7d-0fd8-4188-861c-f18aa4a3d81c' },
  { title: 'PARISIAN', id: 'PARISIAN', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSPRING.jpg?alt=media&token=3e486b7d-0fd8-4188-861c-f18aa4a3d81c' },
  { title: 'GOTHIC', id: 'GOTHIC', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSPRING.jpg?alt=media&token=3e486b7d-0fd8-4188-861c-f18aa4a3d81c' },
  { title: 'BOHEMIAN', id: 'BOHEMIAN', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSPRING.jpg?alt=media&token=3e486b7d-0fd8-4188-861c-f18aa4a3d81c' },
  { title: 'Y2K', id: 'Y2K', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSPRING.jpg?alt=media&token=3e486b7d-0fd8-4188-861c-f18aa4a3d81c' },
  { title: 'OLD_MONEY', id: 'OLD_MONEY', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSPRING.jpg?alt=media&token=3e486b7d-0fd8-4188-861c-f18aa4a3d81c' },
  { title: 'HIPPIE', id: 'HIPPIE', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSPRING.jpg?alt=media&token=3e486b7d-0fd8-4188-861c-f18aa4a3d81c' },
  { title: 'VINTAGE', id: 'VINTAGE', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSPRING.jpg?alt=media&token=3e486b7d-0fd8-4188-861c-f18aa4a3d81c' },
  { title: 'INDIE', id: 'INDIE', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSPRING.jpg?alt=media&token=3e486b7d-0fd8-4188-861c-f18aa4a3d81c' },
  { title: 'E-GIRL', id: 'E_GIRL', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSPRING.jpg?alt=media&token=3e486b7d-0fd8-4188-861c-f18aa4a3d81c' },
]

type bodyShape = {
  userID: string,
  bodyShapeName: string,
  listStyles: string[];
}
type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;

const ChooseStyleYouLoveScreen = () => {
  const [selectedItems, setSelectedItems] = useState([] as string[]);
  const navigation = useNavigation<ScreenNavigationProp>();
  const [styleDefault, setstyleDefault] = useState<bodyShape>();
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      const styleDefault = await AsyncStorage.getItem('styleDefault');
      if (styleDefault) {
        const styleDefaultParse = JSON.parse(styleDefault);
        setstyleDefault(styleDefaultParse);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const asyncFunc = async () => {
      if (styleDefault) {
        try {
          const bodyShape = {
            userID: styleDefault.userID,
            bodyShapeName: styleDefault.bodyShapeName,
            listStyles: selectedItems,
          }
          console.log('bodyShape: ', bodyShape);
          setstyleDefault(bodyShape);
          await AsyncStorage.setItem('styleDefault', JSON.stringify(bodyShape));


        } catch (error) {
          console.log("AsyncStorage error: ", error);
        }

      }
    }
    asyncFunc();
  }, [selectedItems])

  const handleMoveToHomeScreen = async () => {
    console.log('styleDefault: ', styleDefault);
    if (selectedItems.length >= 2) {
          navigation.navigate('Home');
      // const response = await api.post('/api/v1/user-style/create-style-and-body-shape', styleDefault);
      // if (response.success === 200) {
      //   setIsLoading(true);
      //   setTimeout(() => {
      //     setIsLoading(false);
      //     navigation.navigate('Home');

      //   }, 3000)
      // } else {
      //   Toast.show({
      //     type: 'error',
      //     text1: JSON.stringify(response.message),
      //     position: 'top'
      //   });
      //   setIsLoading(false);

      // }
    }
  }
  const handleSetSelectedItems = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  function hanldeGoBack(): void {
    navigation.goBack();
  }

  const handleNext = () => {
    alert('next');
  };

  return (
    <SafeAreaView style={ChooseStyleYouLoveStyleScreen.container}>
      <LoadingComponent spinner={isLoading} title='Waiting for setting up'></LoadingComponent>
      <View style={ChooseStyleYouLoveStyleScreen.titleView}>
        <MaskedView
          maskElement={
            <Text style={ChooseStyleYouLoveStyleScreen.title}>
              Choose the style you love
            </Text>
          }
        >
          <LinearGradient
            colors={[secondaryColor, primaryColor]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={ChooseStyleYouLoveStyleScreen.linearBackground}
          >
            <Text style={{ opacity: 0 }}>Choose the style you love</Text>
          </LinearGradient>
        </MaskedView>

        <Text style={ChooseStyleYouLoveStyleScreen.textDescription}>
          WHEAR will suggest the right style for you based on the information you
          provide.
        </Text>

        <Text style={[ChooseStyleYouLoveStyleScreen.subTitle, { color: selectedItems.length >= 2 ? primaryColor : fourthColor }]}>
          At least 2 pieces
        </Text>
      </View>
      <ScrollView
        persistentScrollbar={false}
        style={ChooseStyleYouLoveStyleScreen.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <View style={ChooseStyleYouLoveStyleScreen.scrollViewContent}>


          <FlatList
            style={HomeStylesComponent.flatlist}
            data={fashionStyles}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => (
              <ListViewComponent
                data={[{ id: item.id, imgUrl: item.imgUrl }]}
                cardStyleContent={
                  ChooseStyleYouLoveStyleScreen.cardStyleContainer
                }
                child={
                  <View>
                    <View style={ChooseStyleYouLoveStyleScreen.cardTextView}>
                      <Text style={ChooseStyleYouLoveStyleScreen.cardText}>
                        {item.title}
                      </Text>
                    </View>
                    <IconFA
                      name={
                        selectedItems.includes(item.id)
                          ? 'check-circle'
                          : 'circle-thin'
                      }
                      size={30}
                      color={primaryColor}
                      onPress={() => handleSetSelectedItems(item.id)}
                      style={[ChooseStyleYouLoveStyleScreen.iconCard, {}]}
                    />
                  </View>
                }
              />
            )}
            contentContainerStyle={{ paddingRight: 0 }}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />


        </View>
      </ScrollView>
      <View style={ChooseStyleYouLoveStyleScreen.buttonView}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            icon={() => <Icon name="chevron-left" size={30} color="black" />}
            onPress={() => navigation.goBack()}
          />
          <IconButton
            icon={() => <Icon name="chevron-right" size={30} color="black" />}
            onPress={() => handleMoveToHomeScreen()}
          />
        </View>
        {/* <ButtonDefaultComponent title='Next' onPress={handleMoveToHomeScreen} style={{ width: width * 0.5 }}></ButtonDefaultComponent> */}
      </View>
    </SafeAreaView>
  );
};
export default ChooseStyleYouLoveScreen;
