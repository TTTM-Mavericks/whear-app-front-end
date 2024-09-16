import React, { useEffect, useState } from 'react';
import { Animated, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { dataSliderOnboarding } from './Data';
import { OnboardingStyle } from './OnboadingStyle';
import VerticalMotion from './VerticalMotion';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../root/RootStackParams';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
type NavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;

const OnboardingPage = () => {
  const fadeAnim = new Animated.Value(0);
  const navigation = useNavigation<NavigationProp>();
  const [isLogin, setIsLogin] = useState(false);

  const handleGetStarted = () => {
    navigation.navigate('Introduce');
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(
      () => {
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
      }
    );
  }, [fadeAnim]);

  return (
    <View style={OnboardingStyle.container}>
      <View style={OnboardingStyle.verticalMotion}>

        {/* firstColumn */}
        <View style={OnboardingStyle.motionColumn}>
          <VerticalMotion
            value={0}
            toValue={-1500}
            duration={12000}
            imagesProps={dataSliderOnboarding[0]}
          />
        </View>

        {/* secondColumn */}
        <View style={[OnboardingStyle.motionColumn, { position: 'relative' }]}>
          <View style={OnboardingStyle.logoContainer}>
            <Animated.Image
              style={[OnboardingStyle.logo, { opacity: fadeAnim }]}
              source={require('../../assets/img/logo/logo.png')}
            />
          </View>
          <View>
            <VerticalMotion
              value={-1500}
              toValue={0}
              duration={12000}
              imagesProps={dataSliderOnboarding[1]}
            />
          </View>
        </View>

        {/* thirdColumn */}
        <View style={OnboardingStyle.motionColumn}>
          <VerticalMotion
            value={0}
            toValue={-1500}
            duration={12000}
            imagesProps={dataSliderOnboarding[2]}
          />
        </View>
      </View>

      <View style={OnboardingStyle.textContainer}>
        <Text variant='headlineLarge' style={{fontSize: 16, justifyContent: 'center', alignContent: 'center', alignItems: 'center', textAlign: 'center'}}>
          Start discorvering your unique fashion style
        </Text>
        {isLogin && (
          <Button
            labelStyle={{ color: 'black', fontSize: 18 }}
            style={OnboardingStyle.getStartedBtn}
            onPress={handleGetStarted}
          >
            Get Started
          </Button>
        )}
      </View>

    </View>
  );
};

export default OnboardingPage;
