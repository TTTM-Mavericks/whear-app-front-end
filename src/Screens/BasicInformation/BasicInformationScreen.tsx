import React, { useEffect, useState } from "react";
import { Platform, View, Image, ScrollView } from "react-native";
import {
  IconButton,
  Card,
  RadioButton,
  Text,
  Button,
} from "react-native-paper";
import BasicInformationStyle from "./BasicInformationStyleScreen";
import Icon from "react-native-vector-icons/MaterialIcons";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { fourthColor, grayBackgroundColor, grayColor, primaryColor, secondaryColor } from "../../root/Colors";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../root/RootStackParams";
import { height, width } from "../../root/ResponsiveSize";
import AppBarFooterComponents from "../../components/Common/AppBarFooter/AppBarFooterComponents";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserInterFace } from "../../models/ObjectInterface";
import Toast from "react-native-toast-message";

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;

const bodyShape = [
  { label: 'Hourglass', value: 'HOURGLASS_SHAPE', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FHOURGLASS_SHAPE.jpg?alt=media&token=e6b15e6f-7831-4ed8-b047-bada54a956e7' },
  { label: 'Pear', value: 'PEAR_SHAPE', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FPEAR_SHAPE.jpg?alt=media&token=9950b853-fedc-4a70-8641-5cfbcf07a354' },
  { label: 'Apple', value: 'APPLE_SHAPE', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FAPPLE_SHAPE.jpg?alt=media&token=56a568fc-68a3-4d42-9a09-2db6564a2ed6' },
  { label: 'Reactangle', value: 'RECTANGLE_SHAPE', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FRECTANGLE_SHAPE.jpg?alt=media&token=a3110c03-6ff0-41aa-8704-76f72b7a5921' },
  { label: 'Inverted triangle', value: 'INVERTED_TRIANGLE_SHAPE', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FINVERTED_TRIANGLE_SHAPE.jpg?alt=media&token=12481c09-e880-431c-a9dc-84e16b7ca81e' },
  { label: 'Lean or slim', value: 'LEAN_OR_SLIM_SHAPE', imgUrl: 'https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2FHOURGLASS_SHAPE.jpg?alt=media&token=e6b15e6f-7831-4ed8-b047-bada54a956e7' },
]
export default function BasicInformationScreen() {
  const [checked, setChecked] = React.useState("first");
  const [selectedBodyShape, setSelectedTypeOfClothes] = useState('');
  const [userStorage, setUserStorage] = useState<UserInterFace>();


  const navigation = useNavigation<ScreenNavigationProp>();


  useEffect(() => {
    const fetchData = async () => {
      const user = await AsyncStorage.getItem('userData');
      if (user) {
        const userParse = JSON.parse(user);
        setUserStorage(userParse);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const asyncFunc = async () => {
      if (userStorage) {
        try {
          const bodyShape = {
            userID: userStorage.userID,
            bodyShapeName: selectedBodyShape,
            listStyles: []
          }
          console.log('bodyShape: ', bodyShape);
          await AsyncStorage.setItem('styleDefault', JSON.stringify(bodyShape));
        } catch (error) {
          console.log("AsyncStorage error: ", error);
        }

      }
    }
    asyncFunc();
  }, [selectedBodyShape])


  const handleMoveToChooseStyleYouLoveScreen = () => {
    if (selectedBodyShape) {

      navigation.navigate('ChooseStyleYouLove')
    } else {
      // Toast.show({
      //   type: 'error',
      //   text1: 'Body shape is required',
      //   position: 'top',

      // });
    }
  }

  const handleTypeOfClothChange = (typeValue: any) => {
    setSelectedTypeOfClothes((prevSelectedType) => (prevSelectedType === typeValue ? null : typeValue));
  };

  // const hanldeChooseBodyShape

  return (
    <View style={BasicInformationStyle.container}>
      {/* <Toast
        position='top'
        topOffset={90}
      /> */}
      {/* <View style={BasicInformationStyle.headerText}>
        <MaskedView
          maskElement={
            <Text variant="displayMedium">Your basic information</Text>
          }
        >
          <LinearGradient colors={[secondaryColor, primaryColor]}>
            <Text variant="displayMedium" style={{ opacity: 0 }}>
              Your basic information
            </Text>
          </LinearGradient>
        </MaskedView>
      </View> */}
      <View style={BasicInformationStyle.titleView}>
        <MaskedView
          maskElement={
            <Text style={BasicInformationStyle.title}>
              Your basic information
            </Text>
          }
        >
          <LinearGradient
            colors={[secondaryColor, primaryColor]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={BasicInformationStyle.linearBackground}
          >
            <Text style={{ opacity: 0 }}>Your basic information</Text>
          </LinearGradient>
        </MaskedView>

      </View>
      <Text style={BasicInformationStyle.textDescription}>
        WHEAR will suggest the right style for you based on the information you
        provide.
      </Text>
      <Text style={[BasicInformationStyle.subTitle, {color: selectedBodyShape ? primaryColor : fourthColor}]}>
        {selectedBodyShape ? 'Selected your body shape' : 'Body shape is required'}
      </Text>
      {/* <View style={BasicInformationStyle.cardContainer}>
        <View>
          <Card style={BasicInformationStyle.card}>
            <Card.Cover
              style={BasicInformationStyle.cardImg}
              source={require("../../assets/img/basicInformationNu.png")}
            />
          </Card>
          <Card.Content style={BasicInformationStyle.cardContent}>
            <Text
              variant="titleLarge"
              style={BasicInformationStyle.titleContent}
            >
              Female
            </Text>
            <RadioButton
              color="black"
              value="first"
              status={checked === "first" ? "checked" : "unchecked"}
              onPress={() => setChecked("first")}
            />
          </Card.Content>
        </View>
        <View>
          <Card style={BasicInformationStyle.card}>
            <Card.Cover
              style={BasicInformationStyle.cardImg}
              source={require("../../assets/img/basicInformationNam.png")}
            />
          </Card>
          <Card.Content style={BasicInformationStyle.cardContent}>
            <Text
              variant="titleLarge"
              style={BasicInformationStyle.titleContent}
            >
              Male
            </Text>
            <RadioButton
              color="black"
              value="first"
              status={checked === "first" ? "checked" : "unchecked"}
              onPress={() => setChecked("first")}
            />
          </Card.Content>
        </View>
      </View> */}
      <ScrollView style={{ height: 400, marginBottom: 20, width: '100%', left: 0 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center', alignItems: 'center', marginLeft: 10, marginBottom: 20, marginTop: 20 }}>
          {bodyShape.map((type, key) => (
            <View key={key} style={{ flexDirection: 'row', marginBottom: 50, alignItems: 'center' }}>
              {/* <RadioButton
                    key={key}
                    value={type.label}
                    color={primaryColor}
                    status={selectedBodyShape === type.value ? 'checked' : 'unchecked'}
                    onPress={() => handleTypeOfClothChange(type.value)}
                  /> */}
              <View style={{ width: width * 0.40, height: 150, alignItems: 'center' }}>
                <View style={{ width: width * 0.3, height: 150, borderRadius: 20 }} >
                  <Image source={{ uri: type.imgUrl }} style={{ width: width * 0.3, height: 150, borderRadius: 20 }} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, alignContent: 'flex-start' }}>
                  <RadioButton
                    key={key}
                    value={type.label}
                    color={primaryColor}
                    status={selectedBodyShape === type.value ? 'checked' : 'unchecked'}
                    onPress={() => handleTypeOfClothChange(type.value)}
                  />
                  <Text style={{ fontSize: 14 }}>{type.label}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton
          icon={() => <Icon name="chevron-left" size={30} color="black" />}
          onPress={() => navigation.goBack()}
        />
        <IconButton
          icon={() => <Icon name="chevron-right" size={30} color="black" />}
          onPress={() => handleMoveToChooseStyleYouLoveScreen()}
        />
      </View>
      {/* <Button style={BasicInformationStyle.buttonCSS} >
        <Text style={BasicInformationStyle.textButton}>Next</Text>
      </Button> */}
      {/* <View style={BasicInformationStyle.buttonArea}>
        <Button
          mode={'outlined'}
          contentStyle={Platform.OS === 'ios' ? { height: height * 0.045 } : { height: height * 0.04 }}
          style={[BasicInformationStyle.buttonGroup_button, { backgroundColor: selectedBodyShape ? primaryColor : grayColor, marginBottom: 20 }]}
          labelStyle={[BasicInformationStyle.buttonGroup_button_lable,]}
          onPress={handleMoveToChooseStyleYouLoveScreen}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 13, color: 'black' }}>Next</Text>
        </Button>
      </View> */}
    </View>
  );
}
