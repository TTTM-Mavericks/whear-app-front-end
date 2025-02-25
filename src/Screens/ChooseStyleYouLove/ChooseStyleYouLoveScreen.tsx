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
import { UserInterFace } from '../../models/ObjectInterface';




// const fashionStyles = [
//   { title: 'CYBERPUNK', id: 'CYBERPUNK', imgUrl: 'https://i.pinimg.com/564x/be/6e/92/be6e928031d63b318a3e40838d1a521e.jpg' },
//   { title: 'CLASSIC', id: 'CLASSIC', imgUrl: 'https://i.pinimg.com/564x/d6/69/b0/d669b095aa8b030c97593d40c8994b34.jpg' },
//   { title: 'VINTAGE', id: 'VINTAGE', imgUrl: 'https://i.pinimg.com/564x/c3/8f/47/c38f47fc4cf06e4d17c819514774fa73.jpg' },
//   { title: 'INDIE', id: 'INDIE', imgUrl: 'https://i.pinimg.com/564x/80/5b/ae/805baeac4224f42620c2bc9e9f52e5a6.jpg' },
//   { title: 'E-GIRL', id: 'E_GIRL', imgUrl: 'https://i.pinimg.com/564x/17/0f/0d/170f0d0758e164f07057e9c834c791f0.jpg' },
//   { title: 'BASIC', id: 'BASIC', imgUrl: 'https://i.pinimg.com/564x/2d/58/2a/2d582a49179cdb48d1d211dd491cbd2b.jpg' },
//   { title: 'SPORTY', id: 'SPORTY', imgUrl: 'https://i.pinimg.com/564x/77/8d/ba/778dba980001dc562591a0becd05fe72.jpg' },
//   { title: 'PREPPY', id: 'PREPPY', imgUrl: 'https://i.pinimg.com/564x/a9/07/77/a907778666f533fa2a9455b3456fcded.jpg' },
//   { title: 'NORMCORE', id: 'NORMCORE', imgUrl: 'https://i.pinimg.com/564x/11/d7/0b/11d70b5f83ab1bd452dc13309191c770.jpg' },
//   { title: 'MINIMALISM', id: 'MINIMALISM', imgUrl: 'https://i.pinimg.com/564x/36/98/8c/36988c3ceee413259404a8483a49d062.jpg' },
//   { title: 'ROCK', id: 'ROCK', imgUrl: 'https://i.pinimg.com/564x/c7/55/d1/c755d189d35933d71de13d8f9f08d6d0.jpg' },
//   { title: 'PARISIAN', id: 'PARISIAN', imgUrl: 'https://i.pinimg.com/564x/16/72/44/167244265a52d1593d0eb4ba3565c9e7.jpg' },
//   { title: 'GOTHIC', id: 'GOTHIC', imgUrl: 'https://i.pinimg.com/564x/e5/2b/c7/e52bc7563942dda4f1ebfc4a693c884f.jpg' },
//   { title: 'BOHEMIAN', id: 'BOHEMIAN', imgUrl: 'https://i.pinimg.com/564x/77/48/72/7748721dc1e1bde0cb4bf455ab08a18d.jpg' },
//   { title: 'Y2K', id: 'Y2K', imgUrl: 'https://i.pinimg.com/564x/39/9e/ab/399eabdaa3a2623c3c510b54b246992a.jpg' },
//   { title: 'OLD_MONEY', id: 'OLD_MONEY', imgUrl: 'https://i.pinimg.com/564x/5a/07/f1/5a07f1cd4d31432eeadbdb52c1920927.jpg' },
//   { title: 'HIPPIE', id: 'HIPPIE', imgUrl: 'https://i.pinimg.com/564x/af/d9/4f/afd94f56dbe3bfe3913000483f1eba5e.jpg' },
// ]

const fashionStylesMale = [
  { label: 'CYBERPUNK', isHide: false, value: 'CYBERPUNK', imgUrl: 'https://i.pinimg.com/564x/be/6e/92/be6e928031d63b318a3e40838d1a521e.jpg' },
  { label: 'CLASSIC', isHide: false, value: 'CLASSIC', imgUrl: 'https://i.pinimg.com/564x/6b/53/4b/6b534b415ac978d559b388dfc775227a.jpg' },
  { label: 'ROCK', isHide: false, value: 'ROCK', imgUrl: 'https://i.pinimg.com/564x/c7/55/d1/c755d189d35933d71de13d8f9f08d6d0.jpg' },
  { label: 'NORMCORE', isHide: false, value: 'NORMCORE', imgUrl: 'https://i.pinimg.com/564x/66/e3/dc/66e3dc2b5f6fefe2f16051108a436786.jpg' },
  { label: 'MINIMALISM', isHide: false, value: 'MINIMALISM', imgUrl: 'https://i.pinimg.com/564x/0e/12/ff/0e12ff14baf962358b43485383b54e5c.jpg' },
  { label: 'BASIC', isHide: false, value: 'BASIC', imgUrl: 'https://i.pinimg.com/564x/72/77/37/727737a7495fd4a32b2dec882b1b166f.jpg' },
  { label: 'VINTAGE', isHide: true, value: 'VINTAGE', imgUrl: 'https://i.pinimg.com/564x/c3/8f/47/c38f47fc4cf06e4d17c819514774fa73.jpg' },
  { label: 'INDIE', isHide: true, value: 'INDIE', imgUrl: 'https://i.pinimg.com/564x/80/5b/ae/805baeac4224f42620c2bc9e9f52e5a6.jpg' },
  { label: 'SPORTY', isHide: true, value: 'SPORTY', imgUrl: 'https://i.pinimg.com/564x/2c/e8/42/2ce8421ce88a1ebdc551b3ea6fca4087.jpg' },
  { label: 'PARISIAN', isHide: true, value: 'PARISIAN', imgUrl: 'https://i.pinimg.com/564x/f8/b9/e8/f8b9e80d1c1a5265d1c1baa02a22176b.jpg' },
  { label: 'GOTHIC', isHide: true, value: 'GOTHIC', imgUrl: 'https://i.pinimg.com/564x/e5/2b/c7/e52bc7563942dda4f1ebfc4a693c884f.jpg' },
  { label: 'BOHEMIAN', isHide: true, value: 'BOHEMIAN', imgUrl: 'https://i.pinimg.com/564x/77/48/72/7748721dc1e1bde0cb4bf455ab08a18d.jpg' },
  { label: 'Y2K', isHide: true, value: 'Y2K', imgUrl: 'https://i.pinimg.com/564x/ea/59/7d/ea597d014e36d29dc6c10a40d3d4c6b0.jpg' },
  { label: 'OLD_MONEY', isHide: true, value: 'OLD_MONEY', imgUrl: 'https://i.pinimg.com/564x/5a/07/f1/5a07f1cd4d31432eeadbdb52c1920927.jpg' },
  { label: 'HIPPIE', isHide: true, value: 'HIPPIE', imgUrl: 'https://i.pinimg.com/564x/f2/77/b1/f277b128b6371d0d12f3c08211012417.jpg' },

]
const fashionStylesFemale = [
  { label: 'CYBERPUNK', isHide: false, value: 'CYBERPUNK', imgUrl: 'https://i.pinimg.com/736x/6e/2a/39/6e2a39ebe676df56b93ae2321342bc6c.jpg' },
  { label: 'CLASSIC', isHide: false, value: 'CLASSIC', imgUrl: 'https://i.pinimg.com/564x/d6/69/b0/d669b095aa8b030c97593d40c8994b34.jpg' },
  { label: 'ROCK', isHide: false, value: 'ROCK', imgUrl: 'https://i.pinimg.com/236x/c8/1b/05/c81b053cf70f2de9f7963ced7a7d04d8.jpg' },
  { label: 'PREPPY', isHide: false, value: 'PREPPY', imgUrl: 'https://i.pinimg.com/564x/a9/07/77/a907778666f533fa2a9455b3456fcded.jpg' },
  { label: 'NORMCORE', isHide: false, value: 'NORMCORE', imgUrl: 'https://i.pinimg.com/564x/11/d7/0b/11d70b5f83ab1bd452dc13309191c770.jpg' },
  { label: 'MINIMALISM', isHide: false, value: 'MINIMALISM', imgUrl: 'https://i.pinimg.com/564x/36/98/8c/36988c3ceee413259404a8483a49d062.jpg' },
  { label: 'BASIC', isHide: false, value: 'BASIC', imgUrl: 'https://i.pinimg.com/564x/2d/58/2a/2d582a49179cdb48d1d211dd491cbd2b.jpg' },
  { label: 'VINTAGE', isHide: true, value: 'VINTAGE', imgUrl: 'https://i.pinimg.com/236x/12/db/55/12db550be8169c8bef37c65d0628a269.jpg' },
  { label: 'INDIE', isHide: true, value: 'INDIE', imgUrl: 'https://i.pinimg.com/736x/45/79/16/457916cdb8a86dabd73c6051075a7276.jpg' },
  { label: 'E-GIRL', isHide: true, value: 'E_GIRL', imgUrl: 'https://i.pinimg.com/564x/17/0f/0d/170f0d0758e164f07057e9c834c791f0.jpg' },
  { label: 'SPORTY', isHide: true, value: 'SPORTY', imgUrl: 'https://i.pinimg.com/564x/77/8d/ba/778dba980001dc562591a0becd05fe72.jpg' },
  { label: 'PARISIAN', isHide: true, value: 'PARISIAN', imgUrl: 'https://i.pinimg.com/564x/16/72/44/167244265a52d1593d0eb4ba3565c9e7.jpg' },
  { label: 'GOTHIC', isHide: true, value: 'GOTHIC', imgUrl: 'https://i.pinimg.com/236x/44/5b/b9/445bb9e5ba33afff59ddc5423f7237ca.jpg' },
  { label: 'BOHEMIAN', isHide: true, value: 'BOHEMIAN', imgUrl: 'https://i.pinimg.com/474x/83/85/94/838594321fadcac3d829c51c555cce34.jpg' },
  { label: 'Y2K', isHide: true, value: 'Y2K', imgUrl: 'https://i.pinimg.com/564x/39/9e/ab/399eabdaa3a2623c3c510b54b246992a.jpg' },
  { label: 'OLD_MONEY', isHide: true, value: 'OLD_MONEY', imgUrl: 'https://i.pinimg.com/236x/aa/cb/8b/aacb8b92faa15ee8d3a716cbefb91759.jpg' },
  { label: 'HIPPIE', isHide: true, value: 'HIPPIE', imgUrl: 'https://i.pinimg.com/564x/af/d9/4f/afd94f56dbe3bfe3913000483f1eba5e.jpg' },

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
  const [fashionStyles, setFashionStyles] = useState<{ label: string, value: string, imgUrl: string, isHide?: boolean }[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      const styleDefault = await AsyncStorage.getItem('styleDefault');
      const userString = await AsyncStorage.getItem('userData');

      if (userString) {
        const user: UserInterFace = JSON.parse(userString);
        if (user) {
          if (user.gender) {
            setFashionStyles(fashionStylesMale);
          } else {
            setFashionStyles(fashionStylesFemale);
          }
        }
      }
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
    if (selectedItems.length >= 3) {
      navigation.navigate('Home');
      const response = await api.post('/api/v1/user-style/create-style-and-body-shape', styleDefault);
      if (response.success === 200) {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          navigation.navigate('Home');

        }, 3000)
      } else {
        Toast.show({
          type: 'error',
          text1: JSON.stringify(response.message),
          position: 'top'
        });
        setIsLoading(false);

      }
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

        <Text style={[ChooseStyleYouLoveStyleScreen.subTitle, { color: selectedItems.length >= 3 ? primaryColor : fourthColor }]}>
          At least 3 pieces
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
            keyExtractor={(item) => item.value}
            numColumns={2}
            renderItem={({ item }) => (
              <ListViewComponent
                data={[{ id: item.value, imgUrl: item.imgUrl }]}
                onPress={() => handleSetSelectedItems(item.value)}
                cardStyleContent={
                  ChooseStyleYouLoveStyleScreen.cardStyleContainer
                }
                child={
                  <View>
                    {!item.isHide ? (
                      <View>
                        <View style={ChooseStyleYouLoveStyleScreen.cardTextView}>
                          <Text style={ChooseStyleYouLoveStyleScreen.cardText}>
                            {item.label}
                          </Text>
                        </View>
                        <IconFA
                          name={
                            selectedItems.includes(item.value)
                              ? 'check-circle'
                              : 'circle-thin'
                          }
                          size={30}
                          color={primaryColor}
                          onPress={() => handleSetSelectedItems(item.value)}
                          style={[ChooseStyleYouLoveStyleScreen.iconCard, {}]}
                        />
                      </View>
                    ) : (
                      <View>
                        <View style={ChooseStyleYouLoveStyleScreen.cardTextView}>
                          <Text style={ChooseStyleYouLoveStyleScreen.cardText}>
                            Comming soon
                          </Text>
                        </View>
                      </View>
                    )}

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
