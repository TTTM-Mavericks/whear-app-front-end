
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Dimensions, Image, Platform, Keyboard } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../root/RootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';
import { ActivityIndicator, Appbar, Avatar, Button, Chip, Dialog, Divider, FAB, Icon, IconButton, MD2Colors, MD3Colors, Menu, RadioButton, TextInput } from 'react-native-paper';
import AppBarHeaderComponent from '../../components/Common/AppBarHeader/AppBarHeaderComponent';
import { height, width } from '../../root/ResponsiveSize';
import { useDispatch, useSelector } from 'react-redux';
import { iconAvatarPostingSize, iconAvatarSize } from '../../root/Icon';
import AddingClothesStyleScreen from './AddingClothesStyleScreen';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import Swiper from 'react-native-swiper';
import { backgroundColor, grayBackgroundColor, primaryColor, secondaryColor } from '../../root/Colors';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import AddImageButtonComponent from '../../components/ImagePicker/AddImageButtonComponent';
import SelectDropdown from 'react-native-select-dropdown';
import { saveImageCreatingUrl } from '../../redux/State/Actions';
import { clothesLogoUrlDefault } from '../../root/Texts';
import ImagePickerComponent from '../../components/ImagePicker/ImagePickersComponent';
import TouchabaleActiveActionButton from '../../components/Common/TouchableActive/TouchabaleActiveActionButton';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { ClothesInterface } from '../../models/ObjectInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioButtonAndroid from 'react-native-paper/lib/typescript/components/RadioButton/RadioButtonAndroid';
import api from '../../api/AxiosApiConfig';
import Toast from 'react-native-toast-message'


const colors = [
  'RED', 'ORANGE', 'YELLOW', 'GREEN', 'BLUE', 'PURPLE', 'PINK', 'BROWN',
  'BLACK', 'WHITE', 'GRAY', 'LIGHT_PINK', 'MINT_GREEN', 'DARK_RED', 'DARK_PINK',
  'SKY_BLUE', 'MAROON', 'BEIGE', 'DARK_BROWN', 'EARTH_BROWN', 'OLIVE_GREEN',
  'LIGHT_YELLOW', 'DARK_ORANGE', 'IVORY'
];

const colorsCode = [
  '#FF0000',
  '#FFA500',
  '#FFFF00',
  '#008000',
  '#0000FF',
  '#800080',
  '#FFC0CB',
  '#A52A2A',
  '#000000',
  '#FFFFFF',
  '#808080',
  '#FFB6C1',
  '#98FB98',
  '#8B0000',
  '#FF1493',
  '#87CEEB',
  '#800000',
  '#F5F5DC',
  '#654321',
  '#B5651D',
  '#808000',
  '#FFFFE0',
  '#FF8C00',
  '#FFFFF0',
];

const dropdownData = {
  typeOfClothes: [
    { label: 'SHIRT', value: 'SHIRT', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSHIRT.jpg?alt=media&token=9e21cef8-a609-4496-a164-870c4ba03262' },
    { label: 'PANTS', value: 'PANTS', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FQuan-Baggy-Jean-nam-nu-2b-1-Quan-ong-rong-xanh-classic-ZiZoou-Store.png?alt=media&token=662336d2-4fe9-4df1-b8af-a9977dae31cb' },
    { label: 'DRESS', value: 'DRESS', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2Fvn-11134207-7r98o-lnjhbc5ry64a70.jpg?alt=media&token=edb7dfd4-0fc0-41e2-bc24-6ae63226b834' },
    { label: 'SKIRT', value: 'SKIRT', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2Fshopping.png?alt=media&token=278b7984-5157-4339-99a6-a5aa9ee315ae' },
    { label: 'JACKET', value: 'JACKET', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2Fshopping1.png?alt=media&token=cc55658f-ba42-41a5-9efb-1bf4b6592fa9' },
    { label: 'COAT', value: 'COAT', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2Fshopping2.png?alt=media&token=3ca69263-3cad-488d-93c8-9957ff639518' },
    { label: 'SHORTS', value: 'SHORTS', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSHORTS.png?alt=media&token=68ffc84e-5b1c-4b41-a8cc-e7b43b140976' },
    { label: 'SWEATER', value: 'SWEATER', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSWEATER.png?alt=media&token=d42e6a62-0287-4428-b674-e88090f1e770' },
    { label: 'HOODIE', value: 'HOODIE', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FHOODIE.png?alt=media&token=889e9fa8-3976-4661-8a9b-51f5e3d87646' },
    { label: 'T-SHIRT', value: 'T_SHIRT', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FT_SHIRT.jpg?alt=media&token=8920f6fd-318d-4bfb-b2de-df8cbeda90ef' },
    { label: 'BLAZER', value: 'BLAZER', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FBLAZER.jpg?alt=media&token=0da8e2a9-a955-4540-83d3-e2b61c79d198' },
    { label: 'JEANS', value: 'JEANS', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FJEANS.jpg?alt=media&token=56326f50-7c60-4203-9ffd-951a4512521f' },
    { label: 'TANK TOP', value: 'TANK_TOP', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FTANK%20TOP.jpg?alt=media&token=b9a94d8f-0e2a-4c4e-9046-1dbd83034eaa' },
    { label: 'SUIT', value: 'SUIT', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSUIT.jpg?alt=media&token=8afa2ef2-1ec8-46c7-a0c0-e11cb0e5ad96' },
    { label: 'POLO', value: 'POLO_SHIRT', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FPOLO_SHIRT.jpg?alt=media&token=8d9f6f4e-7ab6-474d-b37c-fc86c11dd4b5' },
    { label: 'FORMAL', value: 'FORMAL_WEAR', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FFORMAL_WEAR.jpg?alt=media&token=0ce12378-d7bc-4328-8049-eb7eef2952d8' },
    { label: 'ATHLETIC', value: 'ATHLETIC_WEAR', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FATHLETIC_WEAR.jpg?alt=media&token=08cc7f99-acce-42bf-ae4d-099bf892a8f8' },
  ],
  shape: [
    { label: 'CIRCLE', value: 'CIRCLE', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FCIRCLE.jpg?alt=media&token=67f213c8-bcd3-4bcb-9dbd-3ab116718eee' },
    { label: 'TRIANGLE', value: 'TRIANGLE', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FTRIANGLE%20clothes.jpg?alt=media&token=f5cbf233-ba17-4f4c-bcea-ec83d86438ea' },
    { label: 'RECTANGLE', value: 'RECTANGLE', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FRECTANGLE.jpg?alt=media&token=eb7198f6-d9df-492d-b443-51eb4f936aee' },
    { label: 'PENTAGON', value: 'PENTAGON', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FPENTAGON.jpg?alt=media&token=03a2039f-6fe4-4ecb-9917-cc7625aa072c' },
  ],
  seasons: [
    { label: 'SPRING', value: 'SPRING', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSPRING.jpg?alt=media&token=3e486b7d-0fd8-4188-861c-f18aa4a3d81c' },
    { label: 'SUMMER', value: 'SUMMER', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSUMMER.jpg?alt=media&token=2d392adb-f3aa-432f-a00d-7068a37ea91b' },
    { label: 'AUTUMN', value: 'AUTUMN', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FAUTUMN.jpg?alt=media&token=d6cc5559-a6cd-453a-bf4c-fd9d1cb9f7fe' },
    { label: 'WINTER', value: 'WINTER', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FWINTER.jpg?alt=media&token=4f581cd5-2e2c-43c7-9d97-0173d15b9499' },
  ],
  materials: [
    { label: 'COTTON', value: 'COTTON' },
    { label: 'POLYESTER', value: 'POLYESTER' },
    { label: 'WOOL', value: 'WOOL' },
    { label: 'SILK', value: 'SILK' },
    { label: 'LINEN', value: 'LINEN' },
    { label: 'NYLON', value: 'NYLON' },
    { label: 'DENIM', value: 'DENIM' },
    { label: 'VELVET', value: 'VELVET' },
    { label: 'LEATHER', value: 'LEATHER' },
    { label: 'SPANDEX', value: 'SPANDEX' },
    { label: 'RAYON', value: 'RAYON' },
    { label: 'FLEECE', value: 'FLEECE' },
    { label: 'CHIFFON', value: 'CHIFFON' },
    { label: 'SATIN', value: 'SATIN' },
    { label: 'KNIT', value: 'KNIT' },
    { label: 'JERSEY', value: 'JERSEY' },
    { label: 'TERRY CLOTH', value: 'TERRY_CLOTH' },
    { label: 'FLANNEL', value: 'FLANNEL' },
    { label: 'LACE', value: 'LACE' },
    { label: 'TWILL', value: 'TWILL' },
  ],
  clothesSizes: [
    { label: 'XS', value: 'XS' },
    { label: 'S', value: 'S' },
    { label: 'M', value: 'M' },
    { label: 'L', value: 'L' },
    { label: 'XL', value: 'XL' },
    { label: 'XXL', value: 'XXL' },
  ],
  colors: [
    { value: 'RED', label: '#FF0000' },
    { value: 'ORANGE', label: '#FFA500' },
    { value: 'YELLOW', label: '#FFFF00' },
    { value: 'GREEN', label: '#008000' },
    { value: 'BLUE', label: '#0000FF' },
    { value: 'PURPLE', label: '#800080' },
    { value: 'PINK', label: '#FFC0CB' },
    { value: 'BROWN', label: '#A52A2A' },
    { value: 'BLACK', label: '#000000' },
    { value: 'WHITE', label: '#FFFFFF' },
    { value: 'GRAY', label: '#808080' },
    { value: 'LIGHT_PINK', label: '#FFB6C1' },
    { value: 'MINT_GREEN', label: '#98FB98' },
    { value: 'DARK_RED', label: '#8B0000' },
    { value: 'DARK_PINK', label: '#FF1493' },
    { value: 'SKY_BLUE', label: '#87CEEB' },
    { value: 'MAROON', label: '#800000' },
    { value: 'BEIGE', label: '#F5F5DC' },
    { value: 'DARK_BROWN', label: '#654321' },
    { value: 'EARTH_BROWN', label: '#B5651D' },
    { value: 'OLIVE_GREEN', label: '#808000' },
    { value: 'LIGHT_YELLOW', label: '#FFFFE0' },
    { value: 'DARK_ORANGE', label: '#FF8C00' },
    { value: 'IVORY', label: '#FFFFF0' },
  ],

  fashionStyles: [
    { label: 'CYBERPUNK', value: 'CYBERPUNK', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSPRING.jpg?alt=media&token=3e486b7d-0fd8-4188-861c-f18aa4a3d81c' },
    { label: 'CLASSIC', value: 'CLASSIC', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSPRING.jpg?alt=media&token=3e486b7d-0fd8-4188-861c-f18aa4a3d81c' },
    { label: 'ROCK', value: 'ROCK', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSPRING.jpg?alt=media&token=3e486b7d-0fd8-4188-861c-f18aa4a3d81c' },
    { label: 'PREPPY', value: 'PREPPY', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSPRING.jpg?alt=media&token=3e486b7d-0fd8-4188-861c-f18aa4a3d81c' },
    { label: 'NORMCORE', value: 'NORMCORE', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSPRING.jpg?alt=media&token=3e486b7d-0fd8-4188-861c-f18aa4a3d81c' },
    { label: 'MINIMALISM', value: 'MINIMALISM', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSPRING.jpg?alt=media&token=3e486b7d-0fd8-4188-861c-f18aa4a3d81c' },
    { label: 'BASIC', value: 'BASIC', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSPRING.jpg?alt=media&token=3e486b7d-0fd8-4188-861c-f18aa4a3d81c' },
    { label: 'SPORTY', value: 'SPORTY', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSPRING.jpg?alt=media&token=3e486b7d-0fd8-4188-861c-f18aa4a3d81c' },
    { label: 'PARISIAN', value: 'PARISIAN', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSPRING.jpg?alt=media&token=3e486b7d-0fd8-4188-861c-f18aa4a3d81c' },
    { label: 'GOTHIC', value: 'GOTHIC', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSPRING.jpg?alt=media&token=3e486b7d-0fd8-4188-861c-f18aa4a3d81c' },
    { label: 'BOHEMIAN', value: 'BOHEMIAN', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSPRING.jpg?alt=media&token=3e486b7d-0fd8-4188-861c-f18aa4a3d81c' },
    { label: 'Y2K', value: 'Y2K', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSPRING.jpg?alt=media&token=3e486b7d-0fd8-4188-861c-f18aa4a3d81c' },
    { label: 'OLD_MONEY', value: 'OLD_MONEY', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSPRING.jpg?alt=media&token=3e486b7d-0fd8-4188-861c-f18aa4a3d81c' },
    { label: 'HIPPIE', value: 'HIPPIE', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSPRING.jpg?alt=media&token=3e486b7d-0fd8-4188-861c-f18aa4a3d81c' },
    { label: 'VINTAGE', value: 'VINTAGE', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSPRING.jpg?alt=media&token=3e486b7d-0fd8-4188-861c-f18aa4a3d81c' },
    { label: 'INDIE', value: 'INDIE', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSPRING.jpg?alt=media&token=3e486b7d-0fd8-4188-861c-f18aa4a3d81c' },
    { label: 'E-GIRL', value: 'E_GIRL', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FSPRING.jpg?alt=media&token=3e486b7d-0fd8-4188-861c-f18aa4a3d81c' },
  ],

  bodyShap: [
    { label: 'HOURGLASS SHAPE', value: 'HOURGLASS_SHAPE', imgUrl: 'URL_HERE' },
    { label: 'PEAR SHAPE', value: 'PEAR_SHAPE', imgUrl: 'URL_HERE' },
    { label: 'APPLE SHAPE', value: 'APPLE_SHAPE', imgUrl: 'URL_HERE' },
    { label: 'RECTANGLE SHAPE', value: 'RECTANGLE_SHAPE', imgUrl: 'URL_HERE' },
    { label: 'INVERTED TRIANGLE SHAPE', value: 'INVERTED_TRIANGLE_SHAPE', imgUrl: 'URL_HERE' },
    { label: 'ROUND SHAPE', value: 'ROUND_SHAPE', imgUrl: 'URL_HERE' },
    { label: 'LEAN OR SLIM SHAPE', value: 'LEAN_OR_SLIM_SHAPE', imgUrl: 'URL_HERE' },
  ]
  


};




type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;
const AddingClothesScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const imageUrlState = useSelector((state: any) => state.store.imageCreatingUrl);
  const isUploadedImage = useSelector((state: any) => state.store.isUploadedImageToFireBase);


  /*-----------------UseState variable-----------------*/
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [visible, setVisible] = useState(false);
  const [selectedTypeOfClothes, setSelectedTypeOfClothes] = useState('');
  const [selectedShape, setSelectedShape] = useState('');
  const [selectedSeason, setSelectedSeason] = useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedClothesSize, setSelectedClothesSize] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string[]>([]);
  const [nameOfProduct, setNameOfProduct] = useState('');
  const [customState, setCustomState] = useState(null);
  const [multilineText, setMultilineText] = useState('');
  const [clothesImageUrl, setClothesImageUrl] = useState<string[]>([]);
  const [clothDetail, setClothDetail] = useState('');
  const [shopLink, setShopLink] = useState('');
  const [hashtagTxt, setHashtagTxt] = useState('');
  const [hashtagArr, setHashtagArr] = useState<string[]>([]);
  const [newCloth, setNewCloth] = useState<ClothesInterface>();
  const [useID, setUserID] = useState();
  const [openColorPicker, setOpenColorPicker] = useState(false);
  const [openTypeOfCloth, setOpenTypeOfCloth] = useState(false);
  const [openShape, setOpenShape] = useState(false);
  const [openSeason, setOpenSeason] = useState(false);
  const [openStyle, setOpenStyle] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [canAdd, setCanAdd] = useState(false);
  const [isKeyBoardOpen, setIskeyboardOpen] = useState(false);
  const [heightOfKeyBoard, setHeightOfKeyBoard] = useState(0);



  const [colorCheck, setColorCheck] = useState(false);
  const [colorItemCheck, setColorItemCheck] = useState('');



  const handleInputChange = (text: string) => {
    setClothDetail(text);
  };

  const handleSubmit = () => {
    // Handle the submission logic here
    console.log('Multiline Text:', clothDetail);
  };

  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }: any) => setState({ open });

  const { open } = state;




  /*-----------------Usable variable-----------------*/
  const dispatch = useDispatch();
  const openCommentsDialog = useSelector((state: any) => state.store.isOpenCommentsDialog);
  const route = useRoute();
  const clothesID = (route.params as { clothesID?: string })?.clothesID || '';

  /*-----------------UseEffect-----------------*/


  React.useEffect(() => {
    const fetchData = async () => {
      const tokenStorage = await AsyncStorage.getItem('access_token');
      if (tokenStorage) {
        const tokenString = JSON.parse(tokenStorage);
        console.log('userParse: ', tokenString);
        setAccessToken(tokenString);
      }
    }
    fetchData();
  }, []);

  React.useEffect(() => {
    setIsLoadingImage(false);
    dispatch(saveImageCreatingUrl(clothesLogoUrlDefault));
    const getData = async () => {
      try {
        const userString = await AsyncStorage.getItem('userData');

        if (userString) {
          const user = JSON.parse(userString);
          const userID = user.userID;
          setUserID(userID);
        } else {
          console.warn('User data not found in AsyncStorage.');
        }
      } catch (error) {
        console.error('Error retrieving user data from AsyncStorage:', error);
      }
    };
    getData();
  }, [])

  React.useEffect(() => {
    if (isUploadedImage) {
      setIsLoadingImage(false);
      setClothesImageUrl((prev) => [imageUrlState]);
    } else {
      setIsLoadingImage(true);
    }
  }, [imageUrlState]);



  React.useEffect(() => {
    if (
      selectedTypeOfClothes &&
      selectedShape &&
      selectedSeason.length > 0 &&
      selectedMaterial &&
      selectedClothesSize.length > 0 &&
      selectedColor.length > 0 &&
      nameOfProduct
    ) {
      setCanAdd(true);
    }

    setCanAdd(false);
  }, [canAdd]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', e => {
      setHeightOfKeyBoard(e.endCoordinates.height)
      console.log(e.endCoordinates.height);
      setIskeyboardOpen(true);
    }
    );
    const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
      setIskeyboardOpen(false);
      setHeightOfKeyBoard(0);
    }
    );
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    }
  }, [heightOfKeyBoard]);



  /*-----------------Function handler-----------------*/
  function hanldeGoBack(): void {
    console.log('back');
  }

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const handleItemPress = (item: any) => {
    setSelectedItem(item);
    closeMenu();
  };






  const handleOpenColorPicker = () => {
    setOpenColorPicker(!openColorPicker)
  }

  const handleOpenTypeOfCloth = () => {
    setOpenTypeOfCloth(!openTypeOfCloth)
  }

  const handleOpenShape = () => {
    setOpenShape(!openShape)
  }

  const handleOpenSeason = () => {
    setOpenSeason(!openShape)
  }

  const handleOpenStyle = () => {
    setOpenStyle(!openStyle)
  }

  const handlePickColor = () => {

  }

  const handleColorChange = (color: any) => {
    if (selectedColor.includes(color)) {
      setSelectedColor(selectedColor.filter((c) => c !== color));
    } else {
      setSelectedColor([...selectedColor, color]);
    }
  };

  const handleTypeOfClothChange = (typeValue: any) => {
    setSelectedTypeOfClothes((prevSelectedType) => (prevSelectedType === typeValue ? null : typeValue));
  };

  const handlePickShape = (typeValue: any) => {
    setSelectedShape((prevSelectedType) => (prevSelectedType === typeValue ? null : typeValue));
  };

  const handleSeasonChange = (season: any) => {
    if (selectedSeason.includes(season)) {
      setSelectedSeason(selectedSeason.filter((c) => c !== season));
    } else {
      setSelectedSeason([...selectedSeason, season]);
    }
  };

  const handleStyleonChange = (style: any) => {
    if (selectedStyle.includes(style)) {
      setSelectedStyle(selectedStyle.filter((c) => c !== style));
    } else {
      setSelectedStyle([...selectedStyle, style]);
    }
  };
  /**
     * SignUp handler
     */
  const handleCreateCloth = async () => {
    setIsLoading(true);
    try {
      const hashtagArray = hashtagTxt.split(',');
      const clothRequest = {
        userID: useID,
        nameOfProduct: nameOfProduct,
        shape: selectedShape,
        materials: selectedMaterial,
        clothesSizes: selectedClothesSize,
        typeOfClothes: selectedTypeOfClothes,
        clothesImages: clothesImageUrl,
        clothesSeasons: selectedSeason,
        clothesColors: selectedColor,
        rating: 0,
        description: clothDetail,
        link: shopLink,
        hashtag: hashtagArray,
        clothesStyle: selectedStyle,

      }

      console.log('clothReq', clothRequest);

      setIsLoading(true);
      const response = await api.post('/api/v1/clothes/create-clothes', clothRequest, accessToken);
      if (response.success === 200) {
        Toast.show({
          type: 'success',
          text1: JSON.stringify(response.message),
          position: 'top'
        });
        setIsLoading(false);
        const clothID = response.data.clothesID
        setTimeout(() => {
          navigation.navigate('ClothesDetailScreen', { clothID });
        }, 1000)
      } else {
        Toast.show({
          type: 'error',
          text1: JSON.stringify(response.message),
          position: 'top'
        });
        setIsLoading(false);

      }
    } catch (error: any) {
      console.error('Error posting data:', error);
      Toast.show({
        type: 'error',
        text1: JSON.stringify(error.message),
        position: 'top'
      });
      setIsLoading(false);
    }


  };


  return (
    <View style={[AddingClothesStyleScreen.container,]}>
      <Toast
        position='top'
        topOffset={30}

      />
      <AppBarHeaderComponent
        title={
          <View>
            <MaskedView
              maskElement={
                <Text style={AddingClothesStyleScreen.titlePage}>Create new cloth</Text>
              }
            >
              <LinearGradient
                colors={[secondaryColor, primaryColor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={AddingClothesStyleScreen.linearBackground}
              >
                <Text style={{ opacity: 0 }}>Create new cloth</Text>
              </LinearGradient>
            </MaskedView>
          </View>
        }
        backAction={() => hanldeGoBack()}
      >
      </AppBarHeaderComponent>

      <ScrollView
        persistentScrollbar={false}
        style={[AddingClothesStyleScreen.scrollView, Platform.OS === 'ios' && isKeyBoardOpen && { position: 'absolute', bottom: heightOfKeyBoard, backgroundColor: backgroundColor }]}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={AddingClothesStyleScreen.scrollViewContent}>
          <View
            style={AddingClothesStyleScreen.postingDialogContainer}
          >
            <View style={{}}>
              <View style={{ marginLeft: width * 0.05, marginBottom: 10 }}>
                <Text style={[AddingClothesStyleScreen.lableDropDown, {}]}>Name of Cloth</Text>
                <TextInput
                  value={nameOfProduct}
                  onChangeText={text => setNameOfProduct(text)}
                  style={[AddingClothesStyleScreen.buttondropDownStyle, { width: width * 0.9 }]}
                  mode='outlined'
                  outlineStyle={{ display: 'none' }}
                  contentStyle={{ fontSize: 13 }}
                />
              </View>
              <View style={{ flexDirection: 'row', width: width * 0.8, height: 'auto', marginLeft: width * 0.05 }}>
                <Text style={[AddingClothesStyleScreen.lableDropDown]}>Upload image</Text>
              </View>
            </View>
            <View style={AddingClothesStyleScreen.clothesAddingArea}>
              <View style={AddingClothesStyleScreen.pictureArea} >
                <Image source={{ uri: imageUrlState }} style={AddingClothesStyleScreen.picture}></Image>
                <ActivityIndicator animating={isLoadingImage && isUploadedImage} color={primaryColor} style={{ position: 'absolute', top: width * 0.4, left: width * 0.23 }} />
                <View style={AddingClothesStyleScreen.iconUploadPicture}>
                  <AddImageButtonComponent width={9} height={16} isAddNewImage={true} iconColor={primaryColor}></AddImageButtonComponent>
                </View>
              </View>

              {/* --------clothes props---------- */}
              <View style={AddingClothesStyleScreen.clothesPropsArea}>
                <View style={{ alignItems: 'flex-end' }}>
                  {/* Style Of Cloth */}
                  <View style={AddingClothesStyleScreen.dropdownContainer}>
                    <Text style={AddingClothesStyleScreen.lableDropDown}>Style</Text>
                    <TouchableOpacity onPress={handleOpenStyle}>
                      <View
                        style={[
                          AddingClothesStyleScreen.buttondropDownStyle,
                          {
                            alignItems: 'center',
                            alignContent: 'center',
                            padding: '5%',
                          },
                        ]}
                      >
                        <Text style={[AddingClothesStyleScreen.buttonTextStyle, { paddingTop: 0 }]}>{selectedStyle.length > 0 ? selectedStyle + ', ' : 'Select options.'}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  {/* Type Of Cloth */}
                  <View style={AddingClothesStyleScreen.dropdownContainer}>
                    <Text style={AddingClothesStyleScreen.lableDropDown}>Type of Cloth</Text>
                    <TouchableOpacity onPress={handleOpenTypeOfCloth}>
                      <View
                        style={[
                          AddingClothesStyleScreen.buttondropDownStyle,
                          {
                            alignItems: 'center',
                            alignContent: 'center',
                            padding: '5%',
                          },
                        ]}
                      >
                        <Text style={[AddingClothesStyleScreen.buttonTextStyle, { paddingTop: 0 }]}>{selectedTypeOfClothes ? selectedTypeOfClothes : 'Select an option.'}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  {/* Shape */}
                  <View style={AddingClothesStyleScreen.dropdownContainer}>
                    <Text style={AddingClothesStyleScreen.lableDropDown}>Shape</Text>
                    <TouchableOpacity onPress={handleOpenShape}>
                      <View
                        style={[
                          AddingClothesStyleScreen.buttondropDownStyle,
                          {
                            alignItems: 'center',
                            alignContent: 'center',
                            padding: '5%',
                          },
                        ]}
                      >
                        <Text style={[AddingClothesStyleScreen.buttonTextStyle, { paddingTop: 0 }]}>{selectedShape ? selectedShape : 'Select an option.'}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  {/* Season */}
                  <View style={AddingClothesStyleScreen.dropdownContainer}>
                    <Text style={AddingClothesStyleScreen.lableDropDown}>Season</Text>
                    <TouchableOpacity onPress={handleOpenSeason}>
                      <View
                        style={[
                          AddingClothesStyleScreen.buttondropDownStyle,
                          {
                            alignItems: 'center',
                            alignContent: 'center',
                            padding: '5%',
                          },
                        ]}
                      >
                        <Text style={[AddingClothesStyleScreen.buttonTextStyle, { paddingTop: 0 }]}>{selectedSeason.length > 0 ? selectedSeason + ', ' : 'Select options.'}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>



                  {/* Color */}
                  <View style={AddingClothesStyleScreen.dropdownContainer}>
                    <Text style={AddingClothesStyleScreen.lableDropDown}>Main colors</Text>
                    <TouchableOpacity onPress={handleOpenColorPicker}>
                      <View
                        style={[
                          AddingClothesStyleScreen.buttondropDownStyle,
                          {
                            alignItems: 'center',
                            alignContent: 'center',
                            padding: '5%', // You can adjust the percentage as needed
                          },
                        ]}
                      >
                        <Text style={[AddingClothesStyleScreen.buttonTextStyle, { paddingTop: 0 }]}>{selectedColor.length > 0 ? selectedColor + ', ' : 'Select options.'}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View style={AddingClothesStyleScreen.dropdownContainer}>
                    <Text style={AddingClothesStyleScreen.lableDropDown}>Materials</Text>
                    <SelectDropdown
                      buttonStyle={AddingClothesStyleScreen.buttondropDownStyle}
                      dropdownStyle={AddingClothesStyleScreen.dropDownStyle}
                      buttonTextStyle={AddingClothesStyleScreen.buttonTextStyle}
                      rowTextStyle={AddingClothesStyleScreen.rowTextStyle}
                      rowStyle={AddingClothesStyleScreen.rowStyle}
                      data={dropdownData.materials}
                      onSelect={(selectedItem, index) => setSelectedMaterial(selectedItem.value)}
                      buttonTextAfterSelection={(selectedItem, index) => selectedItem.label}
                      rowTextForSelection={(item, index) => item.label}
                    />
                  </View>

                  <View style={AddingClothesStyleScreen.dropdownContainer}>
                    <Text style={AddingClothesStyleScreen.lableDropDown}>Clothes Sizes</Text>
                    <SelectDropdown
                      buttonStyle={AddingClothesStyleScreen.buttondropDownStyle}
                      dropdownStyle={AddingClothesStyleScreen.dropDownStyle}
                      buttonTextStyle={AddingClothesStyleScreen.buttonTextStyle}
                      rowTextStyle={AddingClothesStyleScreen.rowTextStyle}
                      rowStyle={AddingClothesStyleScreen.rowStyle}
                      data={dropdownData.clothesSizes}
                      onSelect={(selectedItem, index) => {
                        if (!selectedClothesSize.includes(selectedItem.value)) {
                          setSelectedClothesSize((prevSelectedClothesSize) => [...prevSelectedClothesSize, selectedItem.value]);
                        }
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => selectedItem.label}
                      rowTextForSelection={(item, index) => item.label}
                    />
                  </View>



                </View>
              </View>


            </View>

            <View style={[AddingClothesStyleScreen.multilineTextContainer, Platform.OS === 'android' && { marginTop: 20 }]}>
              <Text style={AddingClothesStyleScreen.lableDropDown}>Hashtag</Text>
              <TextInput
                value={hashtagTxt}
                label='#hashtag1, #hashtag2,...'
                mode='outlined'
                onChangeText={setHashtagTxt}
                outlineColor={primaryColor}
                outlineStyle={{ borderWidth: 1 }}
                activeOutlineColor={primaryColor}
                style={[AddingClothesStyleScreen.multilineText, { height: 30 }]}

              />

            </View>

            <View style={AddingClothesStyleScreen.multilineTextContainer}>
              <Text style={AddingClothesStyleScreen.lableDropDown}>Clothes Detail</Text>
              <TextInput
                value={clothDetail}
                mode='outlined'
                onChangeText={handleInputChange}
                multiline
                outlineColor={primaryColor}
                outlineStyle={{ borderWidth: 1 }}
                activeOutlineColor={primaryColor}
                style={AddingClothesStyleScreen.multilineText}
                textAlignVertical="top"

              />
            </View>

            <View style={[AddingClothesStyleScreen.multilineTextContainer]}>
              <Text style={AddingClothesStyleScreen.lableDropDown}>Link to outside</Text>
              <TextInput
                value={shopLink}
                mode='outlined'
                label='https://'
                onChangeText={setShopLink}
                outlineColor={primaryColor}
                outlineStyle={{ borderWidth: 1 }}
                activeOutlineColor={primaryColor}
                style={[AddingClothesStyleScreen.multilineText, { height: 30 }]}

              />

            </View>

            <View style={[AddingClothesStyleScreen.multilineTextContainer, { marginTop: 10 }]}>

              <Button
                mode='outlined'
                contentStyle={Platform.OS === 'ios' ? { height: height * 0.045 } : { height: height * 0.04 }}
                style={[AddingClothesStyleScreen.buttonGroup_button, { backgroundColor: primaryColor }]}
                labelStyle={[AddingClothesStyleScreen.buttonGroup_button_lable,]}
                onPress={handleCreateCloth}
              >
                <Text style={{ fontWeight: '500', fontSize: 12 }}>Create</Text>
              </Button>
            </View>
          </View>



        </View>


      </ScrollView >
      {/* Type of cloth */}
      <Dialog visible={openTypeOfCloth} onDismiss={() => setOpenTypeOfCloth(false)} style={{ backgroundColor: backgroundColor }}>
        <Dialog.Title style={{ fontSize: 15 }}>Type of Cloth</Dialog.Title>
        <ScrollView style={{ height: 400, marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center', alignItems: 'center', marginLeft: 10, marginBottom: 20 }}>
            {dropdownData.typeOfClothes.map((type, key) => (
              <View key={key} style={{ flexDirection: 'row', marginBottom: 50, alignItems: 'center' }}>
                {/* <RadioButton
                    key={key}
                    value={type.label}
                    color={primaryColor}
                    status={selectedTypeOfClothes === type.value ? 'checked' : 'unchecked'}
                    onPress={() => handleTypeOfClothChange(type.value)}
                  /> */}
                <View style={{ width: width * 0.40, height: 150, alignItems: 'center' }}>
                  <View style={{ width: width * 0.3, height: 150, borderRadius: 20 }} >
                    <Image source={{ uri: type.imgUrl }} style={{ width: width * 0.3, height: 150, borderRadius: 20 }} />
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, alignContent: 'flex-start' }}>
                    <RadioButton
                      key={key}
                      value={type.label}
                      color={primaryColor}
                      status={selectedTypeOfClothes === type.value ? 'checked' : 'unchecked'}
                      onPress={() => handleTypeOfClothChange(type.value)}
                    />
                    <Text style={{ fontSize: 13 }}>{type.label}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
        <Dialog.Actions>
          <TouchableOpacity onPress={() => setOpenTypeOfCloth(false)}>
            <Text>Done</Text>
          </TouchableOpacity>
        </Dialog.Actions>
      </Dialog>

      {/* Shape */}
      <Dialog visible={openShape} onDismiss={() => setOpenShape(false)} style={{ backgroundColor: backgroundColor }}>
        <Dialog.Title style={{ fontSize: 15 }}>Shape</Dialog.Title>
        <ScrollView style={{ height: 400 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center', alignItems: 'center', marginLeft: 10, marginBottom: 20 }}>
            {dropdownData.shape.map((type, key) => (
              <View key={type.value} style={{ flexDirection: 'row', marginBottom: 50, alignItems: 'center' }}>
                <View key={type.value} style={{ width: width * 0.40, height: 150, alignItems: 'center' }}>
                  <View style={{ width: width * 0.3, height: 150, borderRadius: 20 }} >
                    <Image source={{ uri: type.imgUrl }} style={{ width: width * 0.3, height: 150, borderRadius: 20 }} />
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, alignContent: 'flex-start' }}>
                    <RadioButton
                      key={type.value}
                      value={type.label}
                      color={primaryColor}
                      status={selectedShape === type.value ? 'checked' : 'unchecked'}
                      onPress={() => handlePickShape(type.value)}
                    />
                    <Text style={{ fontSize: 13 }}>{type.label}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
        <Dialog.Actions>
          <TouchableOpacity onPress={() => setOpenShape(false)}>
            <Text>Done</Text>
          </TouchableOpacity>
        </Dialog.Actions>
      </Dialog>

      {/* Season */}
      <Dialog visible={openSeason} onDismiss={() => setOpenSeason(false)} style={{ backgroundColor: backgroundColor, width: width * 0.85 }}>
        <Dialog.Title style={{ fontSize: 15 }}>Season</Dialog.Title>
        <ScrollView style={{ height: 400 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center', alignItems: 'center', marginLeft: 10, marginBottom: 20 }}>
            {dropdownData.seasons.map((season, key1) => (
              <View key={season.value} style={{ flexDirection: 'row', marginBottom: 50, alignItems: 'center' }}>
                <View key={season.value} style={{ width: width * 0.40, height: 150, alignItems: 'center' }}>
                  <View style={{ width: width * 0.3, height: 150, borderRadius: 20 }} >
                    <Image source={{ uri: season.imgUrl }} style={{ width: width * 0.3, height: 150, borderRadius: 20 }} />
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, alignContent: 'flex-start' }}>
                    {Platform.OS === 'ios' ? (
                      <RadioButton.IOS
                        key={season.value}
                        value={season.label}
                        color={primaryColor}
                        status={selectedSeason.includes(season.value) ? 'checked' : 'unchecked'}
                        onPress={() => handleSeasonChange(season.value)}
                      />
                    ) : (
                      <RadioButton.Android
                        key={season.value}
                        value={season.label}
                        color={primaryColor}
                        status={selectedSeason.includes(season.value) ? 'checked' : 'unchecked'}
                        onPress={() => handleSeasonChange(season.value)}

                      />
                    )}

                    <Text style={{ fontSize: 13 }}>{season.label}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
        <Dialog.Actions>
          <TouchableOpacity onPress={() => setOpenSeason(false)}>
            <Text>Done</Text>
          </TouchableOpacity>
        </Dialog.Actions>
      </Dialog>

      {/* Style */}
      <Dialog visible={openStyle} onDismiss={() => setOpenStyle(false)} style={{ backgroundColor: backgroundColor, width: width * 0.85 }}>
        <Dialog.Title style={{ fontSize: 15 }}>Style</Dialog.Title>
        <ScrollView style={{ height: 400 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center', alignItems: 'center', marginLeft: 10, marginBottom: 20 }}>
            {dropdownData.fashionStyles.map((style, key1) => (
              <View key={style.value} style={{ flexDirection: 'row', marginBottom: 50, alignItems: 'center' }}>
                <View key={style.value} style={{ width: width * 0.40, height: 150, alignItems: 'center' }}>
                  <View style={{ width: width * 0.3, height: 150, borderRadius: 20 }} >
                    <Image source={{ uri: style.imgUrl }} style={{ width: width * 0.3, height: 150, borderRadius: 20 }} />
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, alignContent: 'flex-start' }}>
                    {Platform.OS === 'ios' ? (
                      <RadioButton.IOS
                        key={style.value}
                        value={style.label}
                        color={primaryColor}
                        status={selectedStyle.includes(style.value) ? 'checked' : 'unchecked'}
                        onPress={() => handleStyleonChange(style.value)}
                      />
                    ) : (
                      <RadioButton.Android
                        key={style.value}
                        value={style.label}
                        color={primaryColor}
                        status={selectedStyle.includes(style.value) ? 'checked' : 'unchecked'}
                        onPress={() => handleStyleonChange(style.value)}

                      />
                    )}

                    <Text style={{ fontSize: 13 }}>{style.label}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
        <Dialog.Actions>
          <TouchableOpacity onPress={() => setOpenStyle(false)}>
            <Text>Done</Text>
          </TouchableOpacity>
        </Dialog.Actions>
      </Dialog>


      {/* color */}
      <Dialog visible={openColorPicker} onDismiss={() => setOpenColorPicker(false)} style={{ backgroundColor: backgroundColor, width: width * 0.85 }}>
        <Dialog.Content>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', maxWidth: width }}>
            {dropdownData.colors.map((color, key) => (
              <View key={key} style={{ marginRight: 3.2, marginBottom: 10, marginLeft: 3.2 }}>
                <View key={key} style={{ marginRight: 6, marginBottom: 10, marginLeft: 6, backgroundColor: color.label, borderRadius: 90, borderWidth: 0.5, borderColor: 'black', alignContent: 'center', alignItems: 'center' }}>
                  <RadioButton
                    value={color.value}
                    color={primaryColor}
                    uncheckedColor={color.label}
                    status={selectedColor.includes(color.value) ? 'checked' : 'unchecked'}
                    onPress={() => handleColorChange(color.value)}
                  />
                </View>

                <Text>{color.label}</Text>
              </View>
            ))}
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <TouchableOpacity onPress={() => setOpenColorPicker(false)}>
            <Text>Done</Text>
          </TouchableOpacity>
        </Dialog.Actions>
      </Dialog>


    </View >
  );
};

export default AddingClothesScreen;
