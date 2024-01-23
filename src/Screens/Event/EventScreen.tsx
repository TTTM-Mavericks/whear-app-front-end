import React from 'react';
import { View } from 'react-native';
import AppBarHeaderComponent from '../../components/Common/AppBarHeader/AppBarHeaderComponent';
import MaskedView from '@react-native-masked-view/masked-view';
import HotStoreStyleScreen from '../HotStore/HotStoreStyleScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { primaryColor, secondaryColor } from '../../root/Colors';
import { useState } from 'react';
import { Appbar, Text } from 'react-native-paper';

const EventScreen = () => {
  const [scrollUp, setScrollUp] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  function hanldeGoBack(): void {
    alert('back');
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
                <Text style={{ opacity: 0 }}>EVENT </Text>
              </LinearGradient>
            </MaskedView>
          </View>
        }
        iconChild={
          <>
            <Appbar.Action icon={'magnify'} onPress={handleSearch} />
            {/* <Appbar.Action icon='dots-vertical' onPress={handleMore} /> */}
          </>
        }
      ></AppBarHeaderComponent>

      <View style={HotStoreStyleScreen.scrollView}>

        
      </View>
    </View>
  );
};
export default EventScreen;
