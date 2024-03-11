import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { Appbar, Avatar, Divider, Text } from 'react-native-paper';
import IconFA from 'react-native-vector-icons/FontAwesome';
import AppBarFooterComponents from '../../components/Common/AppBarFooter/AppBarFooterComponents';
import AppBarHeaderComponent from '../../components/Common/AppBarHeader/AppBarHeaderComponent';
import ListViewComponent from '../../components/ListView/ListViewComponent';
import { primaryColor, secondaryColor } from '../../root/Colors';
import HotStoreStyleScreen from './HotStoreStyleScreen';
import TouchabaleActiveActionButton from '../../components/Common/TouchableActive/TouchabaleActiveActionButton';
import { RootStackParamList } from '../../root/RootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

interface Clothes {
  clothesId: string;
  clothesImgUrl: string;
}
interface HotStore {
  brandId: string;
  brandImgUrl: string;
  brandName: string;
  clothes: Clothes[];
}
interface StoreData {
  data: HotStore[];
}
const HOST_STORE_DATA: HotStore[] = [
  {
    brandId: '1',
    brandImgUrl: require('../../assets/img/introduce_background/introducebackground1.png'),
    brandName: 'Zara',
    clothes: [
      {
        clothesId: '1.1',
        clothesImgUrl: require('../../assets/img/introduce_background/introducebackground2.png'),
      },
      {
        clothesId: '1.2',
        clothesImgUrl: require('../../assets/img/introduce_background/introducebackground3.png'),
      },
      {
        clothesId: '1.3',
        clothesImgUrl: require('../../assets/img/introduce_background/introducebackground4.png'),
      },
      {
        clothesId: '1.4',
        clothesImgUrl: require('../../assets/img/introduce_background/introducebackground4.png'),
      },
      {
        clothesId: '1.5',
        clothesImgUrl: require('../../assets/img/introduce_background/introducebackground4.png'),
      },
    ],
  },
  {
    brandId: '2',
    brandImgUrl: require('../../assets/img/introduce_background/introducebackground2.png'),
    brandName: 'Zara',
    clothes: [
      {
        clothesId: '1.1',
        clothesImgUrl: require('../../assets/img/introduce_background/introducebackground1.png'),
      },
      {
        clothesId: '1.2',
        clothesImgUrl: require('../../assets/img/introduce_background/introducebackground1.png'),
      },
      {
        clothesId: '1.3',
        clothesImgUrl: require('../../assets/img/introduce_background/introducebackground4.png'),
      },
      {
        clothesId: '1.4',
        clothesImgUrl: require('../../assets/img/introduce_background/introducebackground4.png'),
      },
      {
        clothesId: '1.5',
        clothesImgUrl: require('../../assets/img/introduce_background/introducebackground4.png'),
      },
    ],
  },
  {
    brandId: '3',
    brandImgUrl: require('../../assets/img/introduce_background/introducebackground3.png'),
    brandName: 'Zara',
    clothes: [
      {
        clothesId: '1.1',
        clothesImgUrl: require('../../assets/img/introduce_background/introducebackground1.png'),
      },
      {
        clothesId: '1.2',
        clothesImgUrl: require('../../assets/img/introduce_background/introducebackground1.png'),
      },
      {
        clothesId: '1.3',
        clothesImgUrl: require('../../assets/img/introduce_background/introducebackground4.png'),
      },
      {
        clothesId: '1.4',
        clothesImgUrl: require('../../assets/img/introduce_background/introducebackground4.png'),
      },
      {
        clothesId: '1.5',
        clothesImgUrl: require('../../assets/img/introduce_background/introducebackground4.png'),
      },
    ],
  },
];
type RouteNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;

const HotStoreScreen = () => {
  const [scrollUp, setScrollUp] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const navigation = useNavigation<RouteNavigationProp>();


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

  const handleSearch = () => {
    alert('search');
  };

  const handleMore = () => {
    alert('handleMore');
  };
  return (
    <View style={HotStoreStyleScreen.container}>
      <AppBarHeaderComponent
        backAction={() => hanldeGoBack()}
        title={
          <View>
            <MaskedView
              maskElement={
                <Text style={HotStoreStyleScreen.title}>HOT STORE</Text>
              }
            >
              <LinearGradient
                colors={[secondaryColor, primaryColor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={HotStoreStyleScreen.linearBackground}
              >
                <Text style={{ opacity: 0 }}>HOT STORE </Text>
              </LinearGradient>
            </MaskedView>
          </View>
        }
        
      ></AppBarHeaderComponent>

      <View style={HotStoreStyleScreen.scrollView}>
        <FlatList
          data={HOST_STORE_DATA}
          style={[HotStoreStyleScreen.flatListColumn]}
          keyExtractor={(store) => store.brandId}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          persistentScrollbar={false}
          onScroll={(event) => handleScroll(event)}
          scrollEventThrottle={16}
          renderItem={({ item }) => (
            <View>
              <View style={HotStoreStyleScreen.flatListRow}>
                <Avatar.Image
                  size={50}
                  style={HotStoreStyleScreen.brandAvatar}
                  source={require('../../assets/img/twitter_logo.png')}
                />
                <View style={HotStoreStyleScreen.star}>
                  <IconFA name='star-o' size={25} color='black' />
                  <Text style={HotStoreStyleScreen.numberOfStar}>200</Text>
                </View>

                <ListViewComponent
                  data={item.clothes.map((clt) => {
                    return {
                      id: clt.clothesId,
                      imgUrl: clt.clothesImgUrl,
                    };
                  })}
                  isHorizontal={true}
                  cardStyleContainer={HotStoreStyleScreen.card}
                  cardStyleContent={HotStoreStyleScreen.cardImage}
                />
              </View>

              <Divider style={HotStoreStyleScreen.divider} bold />
            </View>
          )}
        />
      </View>
      <AppBarFooterComponents isHide={scrollUp} centerIcon={'plus'} />
    </View>
  );
};
export default HotStoreScreen;
