import React, { useEffect, useState } from 'react';
import { Image, Text, View, Animated, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../root/RootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';
import IntroduceStylesComponent from './IntroduceStyleComponent';
import { height, width } from '../../root/ResponsiveSize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;

const FirstLoadingPage = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const fadeAnim = new Animated.Value(0);
  const [isLogin, setIsLogin] = useState(false);
  const isLogined = useSelector((state: any) => state.store.isLogined);
  React.useEffect(() => {
    // if (isLogined) {
    //   setIsLogin(isLogined);
    //   console.log('isLogined: ', isLogined);
    // } else {
    //   setIsLogin(false);
    // }

  }, [isLogined]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const logined = await AsyncStorage.getItem('logined');
        if (logined === 'true') {
          setIsLogin(true);
          navigation.navigate('Home');
        } else {
          setIsLogin(false);
          navigation.navigate('SignIn');
        }
      } catch (error) {
        setIsLogin(false);
      }

    }
    fetchData();
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: true,
    }).start(() => {
      const fetchData = async () => {
        try {
          const logined = await AsyncStorage.getItem('logined');
          if (logined === 'true') {
            setIsLogin(true);
            navigation.navigate('Home');
          } else {
            setIsLogin(false);
            navigation.navigate('SignIn');
          }
        } catch (error) {
          setIsLogin(false);
        }

      }
      fetchData();
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
