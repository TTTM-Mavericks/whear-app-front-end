import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import SigInStylesComponent from './SignInStyleComponent';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/themed';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../root/RootStackParams';
import { ActivityIndicator, IconButton, MD2Colors, MD3Colors } from 'react-native-paper';
import { Icon, Input } from '@rneui/base';


interface SignInComponentProps {
  onSignIn: (username: string, password: string) => void;
}

type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;


const SignInComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const input = React.createRef();


  const handleSignIn = () => {

    if (username === '1' && password === 'a') {
      // setTimeout(() => {
      <ActivityIndicator animating={true} color={MD2Colors.red800} />
      // }, 1000)
      // navigation.navigate('Home');
    } else {
      alert('wrog');
    }
  };

  const handleClearInput = () => {
    if (username) {
      setUsername('');
    }

    if (password) {
      setPassword('');
    }
  }


  return (
    <View style={SigInStylesComponent.container}>
      <Text style={SigInStylesComponent.title}>Sign In</Text>
        <Input
          style={SigInStylesComponent.input}
          value={username}
          onChangeText={(text) => setUsername(text)}
          placeholder='User name'
          rightIcon={
            <IconButton
              icon="close"
              iconColor={MD3Colors.error50}
              size={30}
              onPress={handleClearInput}
            />
          }
        />
        <Input
          style={SigInStylesComponent.input}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder='Password'
          rightIcon={
            <IconButton
              icon="camera"
              iconColor={MD3Colors.error50}
              size={30}
              onPress={() => console.log('Pressed')}
            />
          }
        />
        <Button
          linearGradientProps={{
            colors: ["#FF9800", "#F44336"],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 },
          }}
          onPress={() => navigation.navigate('Home')}
        >
          Sign In
        </Button>
      </View>
  );
};


export default SignInComponent;
