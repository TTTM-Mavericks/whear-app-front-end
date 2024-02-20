
import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../root/RootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';
import CarouselComponent from '../../components/Common/Carousel/CarouselComponent';
import IntroduceStylesComponent from './IntroduceStyleComponent';

import { IconButton } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialIcons";
import { dataSliderIntro } from '../../components/Common/Carousel/Data';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { primaryColor, secondaryColor } from '../../root/Colors';
import { UserInterFace } from '../../models/ObjectInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';




type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;
const IntroduceScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  /*-----------------UseState variable-----------------*/
  const [userStorage, setUserStorage] = useState<UserInterFace>();




  useEffect(() => {
    const fetchData = async () => {
      const user = await AsyncStorage.getItem('userData');
      if (user) {
        const userParse = JSON.parse(user);
        setUserStorage(userParse);
      }
    }
    fetchData();
  }, []);

  /*-----------------Usable variable-----------------*/

  /*-----------------UseEffect-----------------*/

  /*-----------------Function handler-----------------*/
  const handleMoveToBasicInforScreen = () => {
    navigation.navigate('BasicInformationScreen')
  }

  return (
    <View style={IntroduceStylesComponent.container}>
      <View style={{ alignContent: 'center', alignItems: 'center', width: '100%' }}>
        <Image source={require('../../assets/img/logo/logo.png')}></Image>
      </View>
      <View style={{ position: 'absolute' }}>
        <View style={IntroduceStylesComponent.titleView}>
          <MaskedView
            maskElement={
              <Text style={IntroduceStylesComponent.title2}>
                Welcome to Whear app
              </Text>
            }
          >
            <LinearGradient
              colors={[secondaryColor, primaryColor]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={IntroduceStylesComponent.linearBackground}
            >
              <Text style={{ opacity: 0 }}>Welcome to Whear app</Text>
            </LinearGradient>
          </MaskedView>



        </View>
        <CarouselComponent dataObj={dataSliderIntro}
          child={
            <View style={IntroduceStylesComponent.buttonView}>
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
                  onPress={() => handleMoveToBasicInforScreen()}
                />
              </View>
            </View>
          }
        >

        </CarouselComponent>
      </View>

    </View>
  );
};


export default IntroduceScreen;
