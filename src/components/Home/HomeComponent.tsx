
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import SigInStylesComponent from './HomeStyleComponent';
import HomeStylesComponent from './HomeStyleComponent';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../root/RootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';


type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;
const HomeComponent = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>();


  return (
    <View style={SigInStylesComponent.container}>
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


export default HomeComponent;
