
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, FlatList, Animated, Platform, Image, SafeAreaView, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../root/RootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';
import ListViewComponent from '../../components/ListView/ListViewComponent';
import { ActivityIndicator, Appbar, Button, Card, Chip, Icon, IconButton, MD3Colors, SegmentedButtons } from 'react-native-paper';
import AppBarHeaderComponent from '../../components/Common/AppBarHeader/AppBarHeaderComponent';
import ChipGroupComponent from '../../components/Common/ChipGroup/ChipGroupComponent';
import { height, width } from '../../root/ResponsiveSize';
import { backgroundColor, grayBackgroundColor, primaryColor, secondaryColor } from '../../root/Colors';
import { useDispatch } from 'react-redux';
import { setOpenAddToCollectionsDialog, setOpenUpgradeRolesDialog } from '../../redux/State/Actions';
import AddingToCollectionComponent from '../../components/Dialog/AddingToCollectionComponent';
import RecommendOutfitStyleScreen from './RecommendOutfitStyleScreen';
import AppBarFooterComponents from '../../components/Common/AppBarFooter/AppBarFooterComponents';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import TouchabaleActiveActionButton from '../../components/Common/TouchableActive/TouchabaleActiveActionButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api/AxiosApiConfig';
import { clothesLogoUrlDefault } from '../../root/Texts';
import { UserInterFace } from '../../models/ObjectInterface';
import UpgradeRoleDialogComponent from '../../components/Dialog/UpgradeRoleDialogComponent';


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


// const data: AIStylistResponse[] = [
//   {
//     styleName: "CYBERPUNK",
//     bodyShapeName: "PEAR_SHAPE",
//     outfits: [
//       [
//         {
//           clothesID: 69,
//           nameOfProduct: "CouleurStudio Gray T-Shirt",
//           typeOfClothes: "T_SHIRT",
//           shape: "CIRCLE",
//           description: "Bảng size áo thun Couleur: M: Dài 70 Rộng 53 | 1m45 – 1m60, Dưới 55kg, L: Dài 72 Rộng 55 | 1m55 – 1m70, Dưới 65kg, XL: Dài 74 Rộng 57 | 1m65 – 1m80, Dưới 75kg",
//           link: "https://shopee.vn/CouleurStudio-Gray-T-Shirt-%C3%81o-Thun-X%C3%A1m-Local-Brand-Couleur-TS06-i.806308123.19563599859?sp_atk=15c022e9-7679-4d52-aa80-297405199d79&xptdk=15c022e9-7679-4d52-aa80-297405199d79",
//           rating: 0,
//           materials: "COTTON",
//           reactPerClothes: null,
//           hashtag: [
//             "COULEUR"
//           ],
//           clothesSeasons: [
//             "SPRING",
//             "AUTUMN",
//             "WINTER"
//           ],
//           clothesImages: [
//             "https://down-vn.img.susercontent.com/file/sg-11134201-23010-n9dfd7i9hwmved",
//             "https://down-vn.img.susercontent.com/file/sg-11134201-23010-5bz65ok7ktmv54_tn"
//           ],
//           clothesSizes: [
//             "S",
//             "M",
//             "L",
//             "XL",
//             "XXL",
//             "XXXL"
//           ],
//           clothesColors: [
//             "GRAY"
//           ],
//           clothesStyles: [
//             "CYBERPUNK"
//           ],
//           react: [],
//           comment: [],
//           userResponseStylish: {
//             userID: "8",
//             username: "hoangha1@gmail.com",
//             imgUrl: "https://i.pinimg.com/736x/9a/df/06/9adf06f9e30223c13f1a5685bd38ac89.jpg"
//           }
//         },
//         {
//           clothesID: 75,
//           "nameOfProduct": "Áo hoodie dáng rộng",
//           typeOfClothes: "HOODIE",
//           shape: "PENTAGON",
//           "description": "Chất lượng là hàng đầu với dịch vụ tốt nhất . Khách hàng đều là bạn của chúng tôi. Thiết kế thời trang,100",
//           link: "https://shopee.vn/%C3%81o-hoodie-d%C3%A1ng-r%E1%BB%99ng-th%E1%BB%9Di-trang-cho-nam-size-M-8XL-%C3%81o-Hoodie-Tay-D%C3%A0i-In-Ch%E1%BB%AF-%C4%90%C6%A1n-Gi%E1%BA%A3n-Th%E1%BB%9Di-Trang-D%C3%A0nh-Cho-Nam-N%E1%BB%AF-i.82095709.17997985106?sp_atk=a343dd84-ecff-4b61-ae13-a5369342452b&xptdk=a343dd84-ecff-4b61-ae13-a5369342452b",
//           rating: 0,
//           materials: "FLEECE",
//           reactPerClothes: null,
//           hashtag: [
//             "Shineess"
//           ],
//           clothesSeasons: [
//             "SPRING",
//             "AUTUMN",
//             "WINTER"
//           ],
//           clothesImages: [
//             "https://down-vn.img.susercontent.com/file/sg-11134201-7qver-lio8j55tolc038"
//           ],
//           clothesSizes: [
//             "S",
//             "M",
//             "L",
//             "XL",
//             "XXL",
//             "XXXL"
//           ],
//           clothesColors: [
//             "BLACK"
//           ],
//           clothesStyles: [
//             "CYBERPUNK"
//           ],
//           react: [],
//           comment: [],
//           userResponseStylish: {
//             userID: "8",
//             username: "hoangha1@gmail.com",
//             imgUrl: "https://i.pinimg.com/736x/9a/df/06/9adf06f9e30223c13f1a5685bd38ac89.jpg"
//           }
//         },
//         {
//           clothesID: 77,
//           "nameOfProduct": "Jogger GymSharks LoGo Thêu",
//           typeOfClothes: "JOGGER",
//           shape: "TRIANGLE",
//           "description": "Jogger Gymshark Logo Thêu. Mặc Tập gym, chơi các môn thể thao đều ok. Chất liệu thun poly CỰC MÁT, co giãn 4 chiều, co giãn thoải mái.",
//           link: "https://shopee.vn/Jogger-GymSharks-LoGo-Th%C3%AAu-ch%E1%BA%A5t-Thun-Poly-2-Da-T%C3%BAi-Kh%C3%B3a-i.1003032.20807396973?sp_atk=ee76d7ef-66d2-4d9a-a508-bd72b390c277&xptdk=ee76d7ef-66d2-4d9a-a508-bd72b390c277",
//           rating: 0,
//           materials: "POLYESTER",
//           reactPerClothes: null,
//           hashtag: [
//             "#quần_tập #quần_đùi #quần_gym #thể_thao #quần_short"
//           ],
//           clothesSeasons: [
//             "SPRING",
//             "AUTUMN",
//             "WINTER"
//           ],
//           clothesImages: [
//             "https://down-vn.img.susercontent.com/file/ea57db9c3ed4eea198e3c4b90bfeb707",
//             "https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lhbhhr094s8jb5"
//           ],
//           clothesSizes: [
//             "S",
//             "M",
//             "L",
//             "XL",
//             "XXL",
//             "XXXL"
//           ],
//           clothesColors: [
//             "BLACK"
//           ],
//           clothesStyles: [
//             "CYBERPUNK"
//           ],
//           react: [],
//           comment: [],
//           userResponseStylish: {
//             userID: "8",
//             username: "hoangha1@gmail.com",
//             imgUrl: "https://i.pinimg.com/736x/9a/df/06/9adf06f9e30223c13f1a5685bd38ac89.jpg"
//           }
//         },
//         {
//           clothesID: 104,
//           "nameOfProduct": "Đèn led neon hình giày Neonchill",
//           typeOfClothes: "SNEAKER",
//           shape: "PENTAGON",
//           "description": "Đèn led neon hình giày. Sử dụng để trang trí, decor phòng siêu đẹp. Với ánh sáng sang trọng ấm áp, quý khách có thể lựa chọn màu sắc theo yêu cầu. Ngoài ra, quý khách có thể yêu cầu size khác nhau để phù hợp với căn phòng của mình",
//           link: "https://shopee.vn/%C4%90%C3%A8n-led-neon-h%C3%ACnh-gi%C3%A0y-Neonchill97-35-x-20-cm-sneaker-neon-sign-trang-tr%C3%AD-c%E1%BB%ADa-h%C3%A0ng-i.291415124.18745429854?sp_atk=9c991f4b-7961-4d40-925a-19b3a0c95900&xptdk=9c991f4b-7961-4d40-925a-19b3a0c95900",
//           rating: 0,
//           materials: "CHIFFON",
//           reactPerClothes: null,
//           hashtag: [
//             "NEONCHILL97"
//           ],
//           clothesSeasons: [
//             "SPRING",
//             "AUTUMN",
//             "WINTER"
//           ],
//           clothesImages: [
//             "https://down-vn.img.susercontent.com/file/12a198dddf146dc53e081b95e197db26"
//           ],
//           clothesSizes: [
//             "S",
//             "M",
//             "L",
//             "XL",
//             "XXL",
//             "XXXL"
//           ],
//           clothesColors: [
//             "XANH_NEON"
//           ],
//           clothesStyles: [
//             "CLASSIC"
//           ],
//           react: [],
//           comment: [],
//           userResponseStylish: {
//             userID: "8",
//             username: "hoangha1@gmail.com",
//             imgUrl: "https://i.pinimg.com/736x/9a/df/06/9adf06f9e30223c13f1a5685bd38ac89.jpg"
//           }
//         },
//         {
//           clothesID: 89,
//           "nameOfProduct": "Mũ lưỡi trai LOULI SAIGON ",
//           typeOfClothes: "CAP",
//           shape: "RECTANGLE",
//           "description": "THÔNG TIN CHI TIẾT SẢN PHẨM MŨ LƯỠI TRAI VINTAGE: Chất liệu vải: Mũ được dệt từ vải kaki cao cấp. Kích thước nón: từ 53-60 cm. Màu sắc: Đen, kem, nâu coffee, xanh đen, xám, xanh lá, hồng. Khóa chỉnh size: Được làm bằng inox chống gỉ. Form mềm Nam Nữ đều được, phong cách Unisex.",
//           link: "https://shopee.vn/M%C5%A9-l%C6%B0%E1%BB%A1i-trai-LOULI-SAIGON-VINTAGE-v%E1%BA%A3i-kaki-cao-c%E1%BA%A5p-form-m%E1%BB%81m-i.906790672.22642852825?sp_atk=b197c335-43c6-4182-89c1-f751c491ea22&xptdk=b197c335-43c6-4182-89c1-f751c491ea22",
//           rating: 0,
//           materials: "FABRIC",
//           reactPerClothes: null,
//           hashtag: [
//             "Louli Saigon Official Store"
//           ],
//           clothesSeasons: [
//             "SPRING",
//             "AUTUMN",
//             "WINTER"
//           ],
//           clothesImages: [
//             "https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lgymjtu17uur25"
//           ],
//           clothesSizes: [
//             "S",
//             "M",
//             "L",
//             "XL",
//             "XXL",
//             "XXXL"
//           ],
//           clothesColors: [
//             "BLACK",
//             "WHITE"
//           ],
//           clothesStyles: [
//             "CYBERPUNK"
//           ],
//           react: [],
//           comment: [],
//           userResponseStylish: {
//             userID: "8",
//             username: "hoangha1@gmail.com",
//             imgUrl: "https://i.pinimg.com/736x/9a/df/06/9adf06f9e30223c13f1a5685bd38ac89.jpg"
//           }
//         }
//       ],
//       [
//         {
//           clothesID: 69,
//           "nameOfProduct": "CouleurStudio Gray T-Shirt",
//           typeOfClothes: "T_SHIRT",
//           shape: "CIRCLE",
//           "description": "Bảng size áo thun Couleur: M: Dài 70 Rộng 53 | 1m45 – 1m60, Dưới 55kg, L: Dài 72 Rộng 55 | 1m55 – 1m70, Dưới 65kg, XL: Dài 74 Rộng 57 | 1m65 – 1m80, Dưới 75kg",
//           link: "https://shopee.vn/CouleurStudio-Gray-T-Shirt-%C3%81o-Thun-X%C3%A1m-Local-Brand-Couleur-TS06-i.806308123.19563599859?sp_atk=15c022e9-7679-4d52-aa80-297405199d79&xptdk=15c022e9-7679-4d52-aa80-297405199d79",
//           rating: 0,
//           materials: "COTTON",
//           reactPerClothes: null,
//           hashtag: [
//             "COULEUR"
//           ],
//           clothesSeasons: [
//             "SPRING",
//             "AUTUMN",
//             "WINTER"
//           ],
//           clothesImages: [
//             "https://down-vn.img.susercontent.com/file/sg-11134201-23010-n9dfd7i9hwmved",
//             "https://down-vn.img.susercontent.com/file/sg-11134201-23010-5bz65ok7ktmv54_tn"
//           ],
//           clothesSizes: [
//             "S",
//             "M",
//             "L",
//             "XL",
//             "XXL",
//             "XXXL"
//           ],
//           clothesColors: [
//             "GRAY"
//           ],
//           clothesStyles: [
//             "CYBERPUNK"
//           ],
//           react: [],
//           comment: [],
//           userResponseStylish: {
//             userID: "8",
//             username: "hoangha1@gmail.com",
//             imgUrl: "https://i.pinimg.com/736x/9a/df/06/9adf06f9e30223c13f1a5685bd38ac89.jpg"
//           }
//         },
//         {
//           clothesID: 75,
//           "nameOfProduct": "Áo hoodie dáng rộng",
//           typeOfClothes: "HOODIE",
//           shape: "PENTAGON",
//           "description": "Chất lượng là hàng đầu với dịch vụ tốt nhất . Khách hàng đều là bạn của chúng tôi. Thiết kế thời trang,100",
//           link: "https://shopee.vn/%C3%81o-hoodie-d%C3%A1ng-r%E1%BB%99ng-th%E1%BB%9Di-trang-cho-nam-size-M-8XL-%C3%81o-Hoodie-Tay-D%C3%A0i-In-Ch%E1%BB%AF-%C4%90%C6%A1n-Gi%E1%BA%A3n-Th%E1%BB%9Di-Trang-D%C3%A0nh-Cho-Nam-N%E1%BB%AF-i.82095709.17997985106?sp_atk=a343dd84-ecff-4b61-ae13-a5369342452b&xptdk=a343dd84-ecff-4b61-ae13-a5369342452b",
//           rating: 0,
//           materials: "FLEECE",
//           reactPerClothes: null,
//           hashtag: [
//             "Shineess"
//           ],
//           clothesSeasons: [
//             "SPRING",
//             "AUTUMN",
//             "WINTER"
//           ],
//           clothesImages: [
//             "https://down-vn.img.susercontent.com/file/sg-11134201-7qver-lio8j55tolc038"
//           ],
//           clothesSizes: [
//             "S",
//             "M",
//             "L",
//             "XL",
//             "XXL",
//             "XXXL"
//           ],
//           clothesColors: [
//             "BLACK"
//           ],
//           clothesStyles: [
//             "CYBERPUNK"
//           ],
//           react: [],
//           comment: [],
//           userResponseStylish: {
//             userID: "8",
//             username: "hoangha1@gmail.com",
//             imgUrl: "https://i.pinimg.com/736x/9a/df/06/9adf06f9e30223c13f1a5685bd38ac89.jpg"
//           }
//         },
//         {
//           clothesID: 77,
//           "nameOfProduct": "Jogger GymSharks LoGo Thêu",
//           typeOfClothes: "JOGGER",
//           shape: "TRIANGLE",
//           "description": "Jogger Gymshark Logo Thêu. Mặc Tập gym, chơi các môn thể thao đều ok. Chất liệu thun poly CỰC MÁT, co giãn 4 chiều, co giãn thoải mái.",
//           link: "https://shopee.vn/Jogger-GymSharks-LoGo-Th%C3%AAu-ch%E1%BA%A5t-Thun-Poly-2-Da-T%C3%BAi-Kh%C3%B3a-i.1003032.20807396973?sp_atk=ee76d7ef-66d2-4d9a-a508-bd72b390c277&xptdk=ee76d7ef-66d2-4d9a-a508-bd72b390c277",
//           rating: 0,
//           materials: "POLYESTER",
//           reactPerClothes: null,
//           hashtag: [
//             "#quần_tập #quần_đùi #quần_gym #thể_thao #quần_short"
//           ],
//           clothesSeasons: [
//             "SPRING",
//             "AUTUMN",
//             "WINTER"
//           ],
//           clothesImages: [
//             "https://down-vn.img.susercontent.com/file/ea57db9c3ed4eea198e3c4b90bfeb707",
//             "https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lhbhhr094s8jb5"
//           ],
//           clothesSizes: [
//             "S",
//             "M",
//             "L",
//             "XL",
//             "XXL",
//             "XXXL"
//           ],
//           clothesColors: [
//             "BLACK"
//           ],
//           clothesStyles: [
//             "CYBERPUNK"
//           ],
//           react: [],
//           comment: [],
//           userResponseStylish: {
//             userID: "8",
//             username: "hoangha1@gmail.com",
//             imgUrl: "https://i.pinimg.com/736x/9a/df/06/9adf06f9e30223c13f1a5685bd38ac89.jpg"
//           }
//         },
//         {
//           clothesID: 83,
//           "nameOfProduct": "Đèn led neon hình giày",
//           typeOfClothes: "SNEAKER",
//           shape: "TRIANGLE",
//           "description": "Đèn led neon hình giày. Sử dụng để trang trí, decor phòng siêu đẹp. Với ánh sáng sang trọng ấm áp, quý khách có thể lựa chọn màu sắc theo yêu cầu. Ngoài ra, quý khách có thể yêu cầu size khác nhau để phù hợp với căn phòng của mình",
//           link: "https://shopee.vn/%C4%90%C3%A8n-led-neon-h%C3%ACnh-gi%C3%A0y-Neonchill97-35-x-20-cm-sneaker-neon-sign-trang-tr%C3%AD-c%E1%BB%ADa-h%C3%A0ng-i.291415124.18745429854?sp_atk=fb45e9cd-f899-4015-9268-77809bf72257&xptdk=fb45e9cd-f899-4015-9268-77809bf72257",
//           rating: 0,
//           materials: "POLYESTER",
//           reactPerClothes: null,
//           hashtag: [
//             "NEONCHILL97"
//           ],
//           clothesSeasons: [
//             "SPRING",
//             "AUTUMN",
//             "WINTER"
//           ],
//           clothesImages: [
//             "https://down-vn.img.susercontent.com/file/12a198dddf146dc53e081b95e197db26",
//             "https://down-vn.img.susercontent.com/file/8a40c0e9a8818ebce6d052edf361c4f4"
//           ],
//           clothesSizes: [
//             "S",
//             "M",
//             "L",
//             "XL",
//             "XXL",
//             "XXXL"
//           ],
//           clothesColors: [
//             "XANH_NEON"
//           ],
//           clothesStyles: [
//             "CYBERPUNK"
//           ],
//           react: [],
//           comment: [],
//           userResponseStylish: {
//             userID: "8",
//             username: "hoangha1@gmail.com",
//             imgUrl: "https://i.pinimg.com/736x/9a/df/06/9adf06f9e30223c13f1a5685bd38ac89.jpg"
//           }
//         },
//         {
//           clothesID: 89,
//           "nameOfProduct": "Mũ lưỡi trai LOULI SAIGON ",
//           typeOfClothes: "CAP",
//           shape: "RECTANGLE",
//           "description": "THÔNG TIN CHI TIẾT SẢN PHẨM MŨ LƯỠI TRAI VINTAGE: Chất liệu vải: Mũ được dệt từ vải kaki cao cấp. Kích thước nón: từ 53-60 cm. Màu sắc: Đen, kem, nâu coffee, xanh đen, xám, xanh lá, hồng. Khóa chỉnh size: Được làm bằng inox chống gỉ. Form mềm Nam Nữ đều được, phong cách Unisex.",
//           link: "https://shopee.vn/M%C5%A9-l%C6%B0%E1%BB%A1i-trai-LOULI-SAIGON-VINTAGE-v%E1%BA%A3i-kaki-cao-c%E1%BA%A5p-form-m%E1%BB%81m-i.906790672.22642852825?sp_atk=b197c335-43c6-4182-89c1-f751c491ea22&xptdk=b197c335-43c6-4182-89c1-f751c491ea22",
//           rating: 0,
//           materials: "FABRIC",
//           reactPerClothes: null,
//           hashtag: [
//             "Louli Saigon Official Store"
//           ],
//           clothesSeasons: [
//             "SPRING",
//             "AUTUMN",
//             "WINTER"
//           ],
//           clothesImages: [
//             "https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lgymjtu17uur25"
//           ],
//           clothesSizes: [
//             "S",
//             "M",
//             "L",
//             "XL",
//             "XXL",
//             "XXXL"
//           ],
//           clothesColors: [
//             "BLACK",
//             "WHITE"
//           ],
//           clothesStyles: [
//             "CYBERPUNK"
//           ],
//           react: [],
//           comment: [],
//           userResponseStylish: {
//             userID: "8",
//             username: "hoangha1@gmail.com",
//             imgUrl: "https://i.pinimg.com/736x/9a/df/06/9adf06f9e30223c13f1a5685bd38ac89.jpg"
//           }
//         }
//       ]
//     ],
//     message: "Suggest full clothes for free user"
//   },
//   {
//     styleName: "MINIMALISM",
//     bodyShapeName: "PEAR_SHAPE",
//     outfits: [
//       [
//         {
//           clothesID: 68,
//           nameOfProduct: "Machine Age T-shirt",
//           typeOfClothes: "T_SHIRT",
//           shape: "CIRCLE",
//           description: "Machine Age T-shirt MA-29, Black n Neon/ White n Red, Unisex nam nữ đều mặc được",
//           link: "https://shopee.vn/Machine-Age-T-shirt-%C3%A1o-ph%C3%B4ng-unisex-phong-c%C3%A1ch-streetwear-trendy-i.68926569.19728660724?sp_atk=b89d73b4-2486-449c-be81-a4607b078ce6&xptdk=b89d73b4-2486-449c-be81-a4607b078ce6",
//           rating: 0,
//           materials: "POLYESTER",
//           reactPerClothes: null,
//           hashtag: [
//             "Carpediem.2k"
//           ],
//           clothesSeasons: [
//             "SPRING",
//             "AUTUMN",
//             "WINTER"
//           ],
//           clothesImages: [
//             "https://down-vn.img.susercontent.com/file/e0f1ea7e73468ae951486cadb462b8c9",
//             "https://down-vn.img.susercontent.com/file/c857497b21a79c883a9a4c9f5018aa36"
//           ],
//           clothesSizes: [
//             "S",
//             "M",
//             "L",
//             "XL",
//             "XXL",
//             "XXXL"
//           ],
//           clothesColors: [
//             "BLACK",
//             "WHITE"
//           ],
//           clothesStyles: [
//             "CYBERPUNK"
//           ],
//           react: [],
//           comment: [],
//           userResponseStylish: {
//             userID: "8",
//             username: "hoangha1@gmail.com",
//             imgUrl: "https://i.pinimg.com/736x/9a/df/06/9adf06f9e30223c13f1a5685bd38ac89.jpg"
//           }
//         },
//         {
//           "clothesID": 106,
//           nameOfProduct: "Giày Oxford Tăng Chiều Cao",
//           "typeOfClothes": "OXFORD",
//           shape: "RECTANGLE",
//           description: "Giày Oxford Tăng Chiều Cao 6cm Đế Phíp Cao Cấp SIGOURNEY Da Bò Nhập Khẩu Màu Đen Trơn SCC08 Bảo Hành 18 Tháng. Giày nam tăng chiều cao 6cm Sigourney có thiết kế dáng Oxford cổ điển với màu đen bóng sang trọng, dễ mang, dễ phối đồ, mang đến vẻ sang trọng và chỉn chu cho người mang. Với thiết kế TĂNG CHIỀU CAO, không khó để SCC08 “giấu” một miếng độn đế dày 3cm, cộng với phần đế giày cao 3cm, tổng thể tăng thêm 6cm cho người mang, hoàn toàn bí mật, cực kì dễ mang và không hề chông chênh.",
//           "link": "https://shopee.vn/Gi%C3%A0y-Oxford-T%C4%83ng-Chi%E1%BB%81u-Cao-6cm-%C4%90%E1%BA%BF-Ph%C3%ADp-Cao-C%E1%BA%A5p-SIGOURNEY-Da-B%C3%B2-Nh%E1%BA%ADp-Kh%E1%BA%A9u-M%C3%A0u-%C4%90en-Tr%C6%A1n-SCC08-B%E1%BA%A3o-H%C3%A0nh-18-Th%C3%A1ng-i.119959072.25857963895?sp_atk=c4e5b1f8-9e19-42f7-9a37-477ed51f3249&xptdk=c4e5b1f8-9e19-42f7-9a37-477ed51f3249",
//           rating: 0,
//           materials: "COTTON",
//           reactPerClothes: null,
//           hashtag: [
//             "SIGOURNEY OFFICIAL STORE"
//           ],
//           clothesSeasons: [
//             "SPRING",
//             "AUTUMN",
//             "WINTER"
//           ],
//           clothesImages: [
//             "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lqe62jcypmwnfd"
//           ],
//           clothesSizes: [
//             "S",
//             "M",
//             "L",
//             "XL",
//             "XXL",
//             "XXXL"
//           ],
//           clothesColors: [
//             "BLACK"
//           ],
//           clothesStyles: [
//             "CLASSIC"
//           ],
//           react: [],
//           comment: [],
//           userResponseStylish: {
//             userID: "8",
//             username: "hoangha1@gmail.com",
//             imgUrl: "https://i.pinimg.com/736x/9a/df/06/9adf06f9e30223c13f1a5685bd38ac89.jpg"
//           }
//         },
//         {
//           "clothesID": 87,
//           nameOfProduct: "GUDETU Giày Sneaker Thời Trang Cho Nam Vớ Và Giày Kéo Dài. Giày Lười Đen",
//           "typeOfClothes": "SNEAKER",
//           shape: "HEXAGON",
//           description: "Một vài lý do để chọn chúng tôiChúng tôi đã chuẩn bị một phiếu giảm giá bất ngờ cho bạn, bạn có thể tự nhận hoặc trò chuyện riêng với bộ phận chăm sóc khách hàng của chúng tôi để nhận hàng. Đó là một trải nghiệm thú vị từ khi nhìn thấy sản phẩm đến khi nhận sản phẩm, bạn sẽ thích shop của tôi",
//           "link": "https://shopee.vn/GUDETU-Gi%C3%A0y-Sneaker-Th%E1%BB%9Di-Trang-Cho-Nam-V%E1%BB%9B-V%C3%A0-Gi%C3%A0y-K%C3%A9o-D%C3%A0i.-Gi%C3%A0y-L%C6%B0%E1%BB%9Di-%C4%90en.-Gi%C3%A0y-Th%E1%BB%83-Thao-%C4%90%E1%BA%BF-D%C3%A0y-Th%E1%BB%9Di-Trang-N%C4%83ng-%C4%90%E1%BB%99ng-Cho-Nam-Gi%C3%A0y-%C4%90%C6%A1n-Tr%C3%AAn-B%C3%A0n-V%E1%BB%ABa.-Gi%C3%A0y-Th%E1%BB%83-Thao-Nam-Th%E1%BB%9Di-Trang-N%C4%83ng-%C4%90%E1%BB%99ng-i.946067865.22155314921?sp_atk=36a0146d-57eb-478f-99f8-5b0b28efdbc0&xptdk=36a0146d-57eb-478f-99f8-5b0b28efdbc0",
//           rating: 0,
//           materials: "DENIM",
//           reactPerClothes: null,
//           hashtag: [
//             "GUDETU"
//           ],
//           clothesSeasons: [
//             "SPRING",
//             "AUTUMN",
//             "WINTER"
//           ],
//           clothesImages: [
//             "https://down-vn.img.susercontent.com/file/cn-11134207-7r98o-lpj557gadqpr05"
//           ],
//           clothesSizes: [
//             "S",
//             "M",
//             "L",
//             "XL",
//             "XXL",
//             "XXXL"
//           ],
//           clothesColors: [
//             "BLACK"
//           ],
//           clothesStyles: [
//             "CYBERPUNK"
//           ],
//           react: [],
//           comment: [],
//           userResponseStylish: {
//             userID: "8",
//             username: "hoangha1@gmail.com",
//             imgUrl: "https://i.pinimg.com/736x/9a/df/06/9adf06f9e30223c13f1a5685bd38ac89.jpg"
//           }
//         }
//       ],
//       [
//         {
//           "clothesID": 125,
//           nameOfProduct: "Basic Crew Neck Cotton T-shirts",
//           "typeOfClothes": "T_SHIRT",
//           shape: "RECTANGLE",
//           description: "Stay comfortable and stylish with our Basic Crew Neck Cotton T-shirts. Made with soft, breathable cotton, these lightweight tees are perfect for lounging, running errands, or a night on the town. You'll always look your best.",
//           "link": "https://watereverysunday.com/products/basic-crew-neck-cotton-t-shirts?variant=44231846527195",
//           rating: 0,
//           materials: "COTTON",
//           reactPerClothes: null,
//           hashtag: [
//             "#casualstyle",
//             "#CottonTShirt"
//           ],
//           clothesSeasons: [
//             "SUMMER"
//           ],
//           clothesImages: [
//             "https://watereverysunday.com/cdn/shop/files/Basic-Crew-Neck-Cotton-T-shirts-watereverysunday-6060_large.jpg?v=1698322745",
//             "https://watereverysunday.com/cdn/shop/files/Basic-Crew-Neck-Cotton-T-shirts-watereverysunday-6121_1024x1024.jpg?v=1698322574",
//             "https://watereverysunday.com/cdn/shop/files/Basic-Crew-Neck-Cotton-T-shirts-watereverysunday-4732_1024x1024.jpg?v=1698322750",
//             "https://watereverysunday.com/cdn/shop/files/Basic-Crew-Neck-Cotton-T-shirts-watereverysunday-534_1024x1024.jpg?v=1698322865"
//           ],
//           clothesSizes: [
//             "XS",
//             "S",
//             "M",
//             "L",
//             "XL"
//           ],
//           clothesColors: [
//             "PURPLE",
//             "PINK",
//             "BLACK",
//             "WHITE"
//           ],
//           clothesStyles: [
//             "NORMCORE"
//           ],
//           react: [],
//           comment: [],
//           userResponseStylish: {
//             userID: "8",
//             username: "hoangha1@gmail.com",
//             imgUrl: "https://i.pinimg.com/736x/9a/df/06/9adf06f9e30223c13f1a5685bd38ac89.jpg"
//           }
//         },
//         {
//           "clothesID": 106,
//           nameOfProduct: "Giày Oxford Tăng Chiều Cao",
//           "typeOfClothes": "OXFORD",
//           shape: "RECTANGLE",
//           description: "Giày Oxford Tăng Chiều Cao 6cm Đế Phíp Cao Cấp SIGOURNEY Da Bò Nhập Khẩu Màu Đen Trơn SCC08 Bảo Hành 18 Tháng. Giày nam tăng chiều cao 6cm Sigourney có thiết kế dáng Oxford cổ điển với màu đen bóng sang trọng, dễ mang, dễ phối đồ, mang đến vẻ sang trọng và chỉn chu cho người mang. Với thiết kế TĂNG CHIỀU CAO, không khó để SCC08 “giấu” một miếng độn đế dày 3cm, cộng với phần đế giày cao 3cm, tổng thể tăng thêm 6cm cho người mang, hoàn toàn bí mật, cực kì dễ mang và không hề chông chênh.",
//           "link": "https://shopee.vn/Gi%C3%A0y-Oxford-T%C4%83ng-Chi%E1%BB%81u-Cao-6cm-%C4%90%E1%BA%BF-Ph%C3%ADp-Cao-C%E1%BA%A5p-SIGOURNEY-Da-B%C3%B2-Nh%E1%BA%ADp-Kh%E1%BA%A9u-M%C3%A0u-%C4%90en-Tr%C6%A1n-SCC08-B%E1%BA%A3o-H%C3%A0nh-18-Th%C3%A1ng-i.119959072.25857963895?sp_atk=c4e5b1f8-9e19-42f7-9a37-477ed51f3249&xptdk=c4e5b1f8-9e19-42f7-9a37-477ed51f3249",
//           rating: 0,
//           materials: "COTTON",
//           reactPerClothes: null,
//           hashtag: [
//             "SIGOURNEY OFFICIAL STORE"
//           ],
//           clothesSeasons: [
//             "SPRING",
//             "AUTUMN",
//             "WINTER"
//           ],
//           clothesImages: [
//             "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lqe62jcypmwnfd"
//           ],
//           clothesSizes: [
//             "S",
//             "M",
//             "L",
//             "XL",
//             "XXL",
//             "XXXL"
//           ],
//           clothesColors: [
//             "BLACK"
//           ],
//           clothesStyles: [
//             "CLASSIC"
//           ],
//           react: [],
//           comment: [],
//           userResponseStylish: {
//             userID: "8",
//             username: "hoangha1@gmail.com",
//             imgUrl: "https://i.pinimg.com/736x/9a/df/06/9adf06f9e30223c13f1a5685bd38ac89.jpg"
//           }
//         },
//         {
//           "clothesID": 84,
//           nameOfProduct: "Giày Sneaker Vải Canvas",
//           "typeOfClothes": "SNEAKER",
//           shape: "OCTAGON",
//           description: "Giày Sneaker Vải Canvas Nữ E18 Black Chính Hãng Dincox trẻ trung, thời thượng với thiết kế đẹp, chất da bền bỉ và đặt biệt độ bền cực cao phù hợp với mọi hoạt động thường ngày như đi chơi, đi làm và cả dự tiệc. Lót giày sử dụng công nghệ Memory Foam mang rất êm và nhẹ chân, phù hợp sử dụng để đi chơi, đi làm hoặc dự tiệc. Chất liệu Vải canvas với đặc tính là độ bền, kháng nấm mốc ngoài ra còn có khả năng chống tia UV",
//           "link": "https://shopee.vn/Gi%C3%A0y-Sneaker-V%E1%BA%A3i-Canvas-Nam-N%E1%BB%AF-E18-Black-DIncox-i.151338284.18393116525?sp_atk=5bfc19fe-97d8-4f8f-8891-4bfb8031520d&xptdk=5bfc19fe-97d8-4f8f-8891-4bfb8031520d",
//           rating: 0,
//           materials: "COTTON",
//           reactPerClothes: null,
//           hashtag: [
//             "DINCOX SHOES OFFICIAL STORE"
//           ],
//           clothesSeasons: [
//             "SPRING",
//             "AUTUMN",
//             "WINTER"
//           ],
//           clothesImages: [
//             "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llnrfkwbj3cs5d"
//           ],
//           clothesSizes: [
//             "S",
//             "M",
//             "L",
//             "XL",
//             "XXL",
//             "XXXL"
//           ],
//           clothesColors: [
//             "BLACK"
//           ],
//           clothesStyles: [
//             "CYBERPUNK"
//           ],
//           react: [],
//           comment: [],
//           userResponseStylish: {
//             userID: "8",
//             username: "hoangha1@gmail.com",
//             imgUrl: "https://i.pinimg.com/736x/9a/df/06/9adf06f9e30223c13f1a5685bd38ac89.jpg"
//           }
//         }
//       ]
//     ],
//     message: "Suggest full clothes for free user"
//   }
// ]

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
  const [currentDay, setCurrentDay] = useState('');
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
        setSubrole(subrole);
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
            console.log('1111111111111111111111111111111', getData.data);
            setIsLoading(false);
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
    if(data) {
      console.log(data[0].outfits[0]);
      setAiStylistResponse(data);
    }


  }, [aiStylistResponse]);

  useEffect(() => {
    console.log('subrole: ', subrole);
    setSubrole(subrole);


  }, [subrole]);

  useEffect(() => {
    setCurrentDay('2');
  }, [])

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
    console.log('day: ', currentDay);
    const dayIndex = parseInt(currentDay, 10) - 2;
    if (dayIndex >= 0 && dayIndex < aiStylistResponse.length) {
      const selectedResponse = aiStylistResponse[dayIndex];
      setAiStylistResponseChild(selectedResponse);
      setOutfitStyleName(selectedResponse.styleName);
    }
  }, [currentDay, aiStylistResponse]);



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
    if (subrole !== 'LV1') {
      dispatch(setOpenUpgradeRolesDialog(true));
      setPremiumRole(false);
    }
  }

  const handleImageLoad = (event: any) => {
    const { width, height } = event.nativeEvent.source;
    setImageDimensions({ width, height });
  };
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
                  label: 'Mo',
                  style: {
                    borderRadius: 0,
                    borderColor: 'transparent',
                    borderWidth: 0,
                    backgroundColor: backgroundColor,
                    width: 30,
                    marginLeft: -1
                  },
                  checkedColor: 'black',
                  uncheckedColor: '#808991',

                },
                {
                  value: '3',
                  label: 'Tu',
                  style: {
                    borderRadius: 0,
                    borderColor: 'transparent',
                    borderWidth: 0,
                    backgroundColor: backgroundColor,

                  },
                  checkedColor: 'black',
                  uncheckedColor: '#808991',
                },
                {
                  value: '4',
                  label: 'We',
                  style: {
                    borderRadius: 0,
                    borderColor: 'transparent',
                    borderWidth: 0,
                    backgroundColor: backgroundColor,

                  },
                  checkedColor: 'black',
                  uncheckedColor: '#808991',
                  onPress: handleUpgradeRoleDialog

                }, {
                  value: '5',
                  label: 'Th',
                  style: {
                    borderRadius: 0,
                    borderColor: 'transparent',
                    borderWidth: 0,
                    backgroundColor: backgroundColor,

                  },
                  checkedColor: 'black',
                  uncheckedColor: '#808991',
                  onPress: handleUpgradeRoleDialog


                },
                {
                  value: '6',
                  label: 'Fr',
                  style: {
                    borderRadius: 0,
                    borderColor: 'transparent',
                    borderWidth: 0,
                    backgroundColor: backgroundColor,

                  },
                  checkedColor: 'black',
                  uncheckedColor: '#808991',
                  onPress: handleUpgradeRoleDialog


                },
                {
                  value: '7',
                  label: 'Sa',
                  style: {
                    borderRadius: 0,
                    borderColor: 'transparent',
                    borderWidth: 0,
                    backgroundColor: backgroundColor,

                  },
                  checkedColor: 'black',
                  uncheckedColor: '#808991',
                  onPress: handleUpgradeRoleDialog


                },
                {
                  value: '8',
                  label: 'Su',
                  style: {
                    borderRadius: 0,
                    borderColor: 'transparent',
                    borderWidth: 0,
                    backgroundColor: backgroundColor,

                  },
                  checkedColor: 'black',
                  uncheckedColor: '#808991',

                },
              ]}
            />
          </ScrollView>
          {/* Regular FlatList */}
          <View >
            <View style={{ margin: 20 }}>
              <Text>Style: {oufitStyleName}</Text>
            </View>
            {aiStylistResponseChild && aiStylistResponseChild.outfits.map((clothesData, key: number) => (
              <View key={key} style={{ marginTop: 0, marginBottom: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={RecommendOutfitStyleScreen.outfitTag}>
                    <Text style={{ fontSize: 14, color: backgroundColor, paddingLeft: 15, paddingRight: 15, padding: 5, fontWeight: '500' }}>Outfit {key + 1}</Text>
                  </View>
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

                    </Card>
                  )}
                />
              </View>
            ))}
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
      <UpgradeRoleDialogComponent></UpgradeRoleDialogComponent>

    </View >

  );
};


export default RecommendOutfitScreen;
