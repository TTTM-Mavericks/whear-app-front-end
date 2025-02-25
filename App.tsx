import { ScrollView, StyleSheet, Text, View } from "react-native";
import HomeScreen from "./src/Screens/Home/HomeScreen";
import ForgotPasswordComponent from "./src/components/auth/ForgotPassword/ForgotPasswordComponent";
import { backgroundColor } from "./src/root/Colors";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { Provider, useSelector } from "react-redux"; // Import Provider
import store from "./src/redux/State/Store";
import SignUpComponent from "./src/components/auth/SignUp/SignUpComponent";
import { PaperProvider } from "react-native-paper";
import IntroduceScreen from "./src/Screens/Introduce/IntroduceComponent";
import SocialScreen from "./src/Screens/Social/SocialScreen";
import PostingDetailScreen from "./src/Screens/PostingDetail/PostingDetailScreen";
import CollectionsScreen from "./src/Screens/Collections/CollectionsScreen";
import UserProfileScreen from "./src/Screens/UserProfile/UserProfileScreen";
import UserProfileSettingScreen from "./src/Screens/UserProfile/UserProfileSettingScreen";
import BasicInformationScreen from "./src/Screens/BasicInformation/BasicInformationScreen";
import ChooseStyleYouLoveScreen from "./src/Screens/ChooseStyleYouLove/ChooseStyleYouLoveScreen";
import React, { useEffect, useState } from "react";
import NewsScreen from "./src/Screens/News/NewsScreen";
import SignInComponent from "./src/components/auth/SinIn/SignInComponent";
import HotStoreScreen from "./src/Screens/HotStore/HotStoreScreen";
import SearchScreen from "./src/Screens/Search/SearchScreen";
import NotificationScreen from "./src/Screens/Notifictation/NotificationScreen";
import ConnectStomp from "./src/Screens/Notifictation/Config";
import MessageScreen from "./src/Screens/Message/MessageScreen";
import AddingClothesScreen from "./src/Screens/AddingClothes/AddingClothesScreen";
import ClothesDetailScreen from "./src/Screens/ClothesDetail/ClothesDetailScreen";
import AddingPostingsScreen from "./src/Screens/AddingPostings/AddingPostingsScreen";
import EventScreen from "./src/Screens/Event/EventScreen";
import RecommendOutfitScreen from "./src/Screens/RecommendOutfit/RecommendOutfitScreen";
import FirstLoadingPage from "./src/Screens/Introduce/FirstLoadingPage";
import ChatScreen from "./src/Screens/Chat/chatScreen";
import OnboardingScreen from "./src/Screens/Onboarding/OnboardingPage";
import UpgradeScreen from "./src/Screens/Upgrade/UpgradeScreen";
import UpgardeDetailScreen from "./src/Screens/Upgrade/UpgardeDetailScreen";
import TypeOfClothesScreen from "./src/Screens/TypeOfClothes/TypeOfClothesScreen";
import TransactionDetailScreen from "./src/Screens/TransactionDetail/TransactionDetailScreen";
import StyleOfClothesScreen from "./src/Screens/StyleOfClothes/StyleOfClothesScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ListUserScreen from "./src/Screens/ListUser/ListUserScreen";
import EditNewsScreen from "./src/Screens/News/EditNewsScreen";
import NewsDetailScreen from "./src/Screens/News/NewsDetailScreen";
import AddNewsScreen from "./src/Screens/News/AddNewsScreen";

const Stack = createStackNavigator();

export default function App() {

  // const [isLogin, setIsLogin] = useState(false);
  // const isLogined = useSelector((state: any) => state.store.isLogined);
  // React.useEffect(() => {
  //   if (isLogined) {
  //     setIsLogin(isLogined);
  //     console.log('isLogined: ', isLogined);
  //   } else {

  //   }
  // }, [isLogined]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const tokenStorage = await AsyncStorage.getItem('access_token');
  //       const userString = await AsyncStorage.getItem('userData');
  //       if (tokenStorage && userString) {
  //         setIsLogin(true);
  //       } else {
  //         setIsLogin(false);
  //       }
  //     } catch (error) {
  //       setIsLogin(false);
  //     }

  //   }
  //   fetchData();
  // }, []);

  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <View style={styles.container}>
            <Stack.Navigator>
              <Stack.Screen
                name="Onboarding"
                component={OnboardingScreen}
                options={{ headerShown: false }}
              />
               {/*
              <Stack.Screen
                name='FirstLoadingPage'
                component={FirstLoadingPage}
                options={{ headerShown: false }}
              /> */}

              <Stack.Screen
                name='SignIn'
                component={SignInComponent}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="Collections"
                component={CollectionsScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="UserProfile"
                component={UserProfileScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="UserProfileSetting"
                component={UserProfileSettingScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="SignUp"
                component={SignUpComponent}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="OnboardingScreen"
                component={OnboardingScreen}
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

              <Stack.Screen
                name="Social"
                component={SocialScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="PostingDetail"
                component={PostingDetailScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="BasicInformationScreen"
                component={BasicInformationScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="ChooseStyleYouLove"
                component={ChooseStyleYouLoveScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="NewsScreen"
                component={NewsScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="HotStore"
                component={HotStoreScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="NotificationScreen"
                component={NotificationScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Event"
                component={EventScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="AddingClothesScreen"
                component={AddingClothesScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="ClothesDetailScreen"
                component={ClothesDetailScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="AddingPostingsScreen"
                component={AddingPostingsScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="RecommendOutfitScreen"
                component={RecommendOutfitScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="MessageScreen"
                component={MessageScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="HotStoreScreen"
                component={HotStoreScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="ChatScreen"
                component={ChatScreen}
                options={{ headerShown: false }}
              />


              <Stack.Screen
                name="UpgradeScreen"
                component={UpgradeScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="UpgardeDetailScreen"
                component={UpgardeDetailScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="TypeOfClothesScreen"
                component={TypeOfClothesScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="TransactionDetailScreen"
                component={TransactionDetailScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="StyleOfClothesScreen"
                component={StyleOfClothesScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="ListUserScreen"
                component={ListUserScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="EditNewsScreen"
                component={EditNewsScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="NewsDetailScreen"
                component={NewsDetailScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="AddNewsScreen"
                component={AddNewsScreen}
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
