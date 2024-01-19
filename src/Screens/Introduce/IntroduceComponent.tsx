
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../root/RootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';
import CarouselComponent from '../../components/Common/Carousel/CarouselComponent';
import IntroduceStylesComponent from './IntroduceStyleComponent';
import ButtonComponent from '../../components/Button/ButtonDefaultComponent';
import { buttonHeightDefault, buttonWidthDefault } from '../../components/Button/ButtonDefaultData';
import { primaryColor } from '../../root/Colors';
import dataSlider from '../../components/Common/Carousel/Data';



type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;
const IntroduceScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  /*-----------------UseState variable-----------------*/

  /*-----------------Usable variable-----------------*/

  /*-----------------UseEffect-----------------*/

  /*-----------------Function handler-----------------*/
  const handleMoveToBasicInforScreen = () => {
    navigation.navigate('BasicInformationScreen')
  }

  return (
    <View style={IntroduceStylesComponent.container}>
      <View>
        <CarouselComponent dataObj={dataSlider} child={
          <ButtonComponent
            title="Press me"
            onPress={() => {
              handleMoveToBasicInforScreen();
            }}
            width={buttonWidthDefault}
            height={buttonHeightDefault}
            backgroundColor={primaryColor}
            textColor='black'
            mode="contained"
            style={{ marginBottom: 0, color: 'black' }}
          />
        }>

        </CarouselComponent>
        {/* <View style={IntroduceStylesComponent.overlay}>
        <View style={IntroduceStylesComponent.circle} />
      </View> */}
      </View>
    </View>
  );
};


export default IntroduceScreen;
