
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import HomeStylesComponent from './HomeStyleScreen';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../root/RootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';
import CarouselComponent from '../../components/Common/Carousel/CarouselComponent';


type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;
const HomeScreen = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>();


  return (
    <View style={HomeStylesComponent.container}>
      <Text style={HomeStylesComponent.title}>Home Screen</Text>
      <Button
        title="Go to Sign In"
        onPress={() => {
          navigation.navigate('SignIn');
        }}
      />
  
    </View>
  );
};


export default HomeScreen;
