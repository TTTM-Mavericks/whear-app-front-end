import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button, Input } from '@rneui/base';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../root/RootStackParams';
import { IconButton, MD3Colors } from 'react-native-paper';
import SigInStylesComponent from './ForgotPasswordStyleComponent';
import { useSelector } from 'react-redux';

type ForgotPasswordScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;

interface ForgotPasswordComponentProps {
  route: {
    params: {
      emailParam: string;
    };
  };
}

const ForgotPasswordComponent = () => {

  /*-----------------UseState variable-----------------*/
  const route = useRoute();
  const { femail } = useSelector((state: any) => state.auth.email);
  const emailParam = (route.params as { email?: string })?.email || '';
  const [email, setEmail] = useState(emailParam);
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();

  /*-----------------Function handler-----------------*/
  const handleForgotPassword = () => {
    alert(femail)
  };

  const handleClearInput = () => {
    if (email) {
      setEmail('');
    }
  };

  return (
    <View style={SigInStylesComponent.container}>
      <Text style={SigInStylesComponent.title}>Reset Password</Text>
      <Input
        style={SigInStylesComponent.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder='Email'
        rightIcon={
          <IconButton
            icon="close"
            iconColor={MD3Colors.error50}
            size={30}
            onPress={handleClearInput}
          />
        }
      />

      <Button
        linearGradientProps={{
          colors: ["#FF9800", "#F44336"],
          start: { x: 0, y: 0.5 },
          end: { x: 1, y: 0.5 },
        }}
        onPress={handleForgotPassword}
      >
        Reset Password
      </Button>

      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text>Go back to Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordComponent;
