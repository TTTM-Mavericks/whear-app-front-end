import React, { useEffect, useState } from 'react';
import { Image, Text, View, Animated, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../root/RootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';
import IntroduceStylesComponent from './IntroduceStyleComponent';
import { height, width } from '../../root/ResponsiveSize';

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;

const FirstLoadingPage = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate('SignIn');
    });
  }, [fadeAnim, navigation]);

  return (
    <SafeAreaView style={IntroduceStylesComponent.container}>
        <Animated.Image
          style={{ width: width, height: height, opacity: fadeAnim }}
          source={require('../../assets/img/logo/background_logo.png')}
        />
    </SafeAreaView>
  );
};

export default FirstLoadingPage;
