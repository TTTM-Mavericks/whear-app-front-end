import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import SignInComponent from './src/components/auth/SinIn/SignInComponent';
import HomeScreen from './src/Screens/Home/HomeScreen';
import ForgotPasswordComponent from './src/components/auth/ForgotPassword/ForgotPasswordComponent';
import { backgroundColor } from './src/root/Colors';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { Provider } from 'react-redux'; // Import Provider
import store from './src/components/auth/AuthState/AuthStore';
import SignUpComponent from './src/components/auth/SignUp/SignUpComponent';
import { PaperProvider } from 'react-native-paper';
import IntroduceScreen from './src/Screens/Introduce/IntroduceComponent';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <View style={styles.container}>
            <Stack.Navigator>

              <Stack.Screen
                name="SignIn"
                component={SignInComponent}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="SignUp"
                component={SignUpComponent}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Introduce"
                component={IntroduceScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPasswordComponent}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </View>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
  },
});
