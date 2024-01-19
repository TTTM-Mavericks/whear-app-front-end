import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SigInStylesComponent from './SignInStyleComponent';
import { useNavigation } from '@react-navigation/native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../root/RootStackParams';
import { ActivityIndicator, IconButton, MD2Colors, MD3Colors, TextInput, Icon, Button } from 'react-native-paper';
import { ButtonGroup, Image, Input } from '@rneui/base';
import { backgroundColor, primaryColor } from '../../../root/Colors';
import {
  signIn as signInAction,
  moveToForgotPassword as moveToForgotPasswordAction,
  setEmailSignIned as setEmailSignInedAction
} from '../AuthState/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { validateEmail, validatePassword } from '../../Common/Functions/CommonFunctionComponents';
import { inputTextSize } from '../../../root/Texts';
import ButtonComponent from '../../Button/ButtonDefaultComponent';
import { buttonHeightDefault, buttonWidth, buttonWidthDefault } from '../../Button/ButtonDefaultData';
import api from '../../../api/AxiosApiConfig';
import { UserInterFace } from '../../../models/ObjectInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Image Url
 */
const FACBOOK_LOGO = require('../../../assets/img/facebook_logo.png');
const GOOGLE_LOGO = require('../../../assets/img/google_logo.png');
const TWITTER_LOGO = require('../../../assets/img/twitter_logo.png');

type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;

interface SignInProps {
  email: string;
  password: string;
  signIn: (email: string, password: string) => void;
  clearInput: () => void;
  moveToForgotPassword: (email: string) => void;
}

const SignInComponent = () => {

  /*-----------------Declear variable-----------------*/
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorEmailValidate, setEmailErrorValidate] = useState('');
  const [isEmailValidate, setIsEmailValidate] = useState(true);
  const [errorPasswordValidate, setPasswordErrorValidate] = useState('');
  const [isPasswordValidate, setIsPasswordValidate] = useState(true);
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [userResponse, setUserResponse] = useState<UserInterFace>();
  const dispatch = useDispatch();
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const [isLoading, setIsLoading] = useState(false);

  /*-----------------UseEffect-----------------*/

  useEffect(() => {

  }, [])

  /**
   * Validate Email
   */
  useEffect(() => {
    const error = validateEmail(email);
    if (!error.isValid && error.error) {
      setEmailErrorValidate(error.error);
      setIsEmailValidate(false);
    } else {
      setEmail(email);
      setIsEmailValidate(true);
    }
  }, [email]);

  /**
   * Validate Password
   */
  useEffect(() => {
    const error = validatePassword(password);
    if (!error.isValid && error.error) {
      setPasswordErrorValidate(error.error);
      setIsPasswordValidate(false);
    } else {
      setPassword(password);
      setIsPasswordValidate(true);
    }
  }, [password]);



  /*-----------------Function handler----------------- */

  /**
   * SignIn
   */
  const handleSignIn = async () => {
    if (isEmailValidate && isPasswordValidate) {
      setIsLoading(true);
      try {
        const requestData = {
          email: email,
          password: password
        };

        const response = await api.post('/api/v1/user/get-user-by-email-and-password', requestData);
        if (response.success === 200) {
          setUserResponse(response.data);
          console.log("Login");
          AsyncStorage.setItem('userData', JSON.stringify(response.data));
          setIsLoading(false);
          navigation.navigate('Home');
        } else {
          console.log(response.message);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error posting data:', error);
      }
    } else {
      setEmailErrorValidate(errorEmailValidate);
      setPasswordErrorValidate(errorPasswordValidate);
      navigation.navigate('SignIn'); // Navigate to SignIn screen after validation failure
    }
  };


  /**
   * Clear input
   */
  const handleClearInput = () => {
    setEmail('');
  };

  /**
   * Move to forgot password screen
   * @param email 
   */
  const handleMoveToForgotPassword = (email: string) => {
    dispatch(moveToForgotPasswordAction({ email }));
    navigation.navigate('ForgotPassword', { email });
  };

  /**
   * Un/Hide password
   */
  const handleHidePassword = () => {
    setIsHidePassword(!isHidePassword);
  }



  return (
    <View style={SigInStylesComponent.container}>
      <View style={{ marginTop: 100 }}>
        <Text style={SigInStylesComponent.title}>Sign In</Text>
        <TextInput
          label="Email"
          value={email}
          style={SigInStylesComponent.input}
          onChangeText={text => setEmail(text)}
          mode='outlined'
          right={
            <TextInput.Icon icon="close" onPress={handleClearInput} />
          }
        />
        {!isEmailValidate && (
          <Text style={SigInStylesComponent.errorValidate}>{errorEmailValidate}</Text>
        )}

        <TextInput
          label="Password"
          value={password}
          style={SigInStylesComponent.input}
          secureTextEntry={isHidePassword}
          mode='outlined'
          onChangeText={(text) => setPassword(text)}
          right={
            <TextInput.Icon icon="eye"
              onPress={handleHidePassword}
            />
          }
        />
        {!isPasswordValidate && (
          <Text style={SigInStylesComponent.errorValidate}>{errorPasswordValidate}</Text>
        )}
        <TouchableOpacity onPress={() => handleMoveToForgotPassword(email)}>
          <Text style={SigInStylesComponent.content}>Forgot password?</Text>
        </TouchableOpacity>
        <View style={SigInStylesComponent.button}>
          <ButtonComponent
            title="Sign In"
            onPress={() => {
              handleSignIn();
            }}
            width={buttonWidth}
            height={buttonHeightDefault}
            backgroundColor={primaryColor}
            textColor='black'
            mode="contained"
            style={[{
              marginBottom: 0, color: 'black', textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }]}
          />
        </View>
        <View style={SigInStylesComponent.optionSignIn}>
          <Text style={SigInStylesComponent.optionSignIn}>Sign in with</Text>
        </View>
        <View style={{ backgroundColor: backgroundColor, alignItems: 'center', justifyContent: 'center' }}>
          <ButtonGroup
            containerStyle={SigInStylesComponent.buttonGroupOption}
            innerBorderStyle={{ color: 'none', width: 0 }}
            buttons={[
              <Image
                source={FACBOOK_LOGO}
                style={[SigInStylesComponent.buttonOption, { marginLeft: 0, marginRight: 0 }]}
                PlaceholderContent={<ActivityIndicator />}
              />,
              <Image
                source={GOOGLE_LOGO}
                style={[SigInStylesComponent.buttonOption, { marginLeft: 6, marginRight: 6.5 }]}
                PlaceholderContent={<ActivityIndicator />}
              />,
              <Image
                source={TWITTER_LOGO}
                style={[SigInStylesComponent.buttonOption, { marginLeft: 6, marginRight: 6.5 }]}
                PlaceholderContent={<ActivityIndicator />}
              />
            ]}
          />
        </View>
        <View style={SigInStylesComponent.inlineContainer}>
          <Text style={SigInStylesComponent.optionSignIn}>You don't have an account?</Text>
          <TouchableOpacity style={{ width: 70 }}>
            <Text onPress={() => navigation.navigate('SignUp')} style={{ textDecorationLine: 'underline', fontSize: 15, marginLeft: 10 }}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <ActivityIndicator animating={isLoading} color={MD2Colors.red800} />
      </View>
    </View >
  );
};


export default SignInComponent;
