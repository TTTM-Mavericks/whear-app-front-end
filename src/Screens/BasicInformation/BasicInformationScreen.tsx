import React from "react";
import { View } from "react-native";
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
import { primaryColor, secondaryColor } from "../../root/Colors";

export default function BasicInformationScreen() {
  const [checked, setChecked] = React.useState("first");
  return (
    <View style={BasicInformationStyle.container}>
      <View style={BasicInformationStyle.headerText}>
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
      </View>
      <Text style={BasicInformationStyle.textDescription}>
        WHEAR will suggest the right style for you based on the information you
        provide.
      </Text>
      <View style={BasicInformationStyle.cardContainer}>
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
      </View>
      <View>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 12 }}>
          Born in
        </Text>
      </View>
      <View style={{ marginTop: -20 }}>
        <Text style={{ textAlign: "center", fontSize: 50, color: "#BAF667" }}>
          ...
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton
          icon={() => <Icon name="chevron-left" size={30} color="black" />}
          onPress={() => console.log("Left pressed")}
        />
        <IconButton
          icon={() => <Icon name="chevron-right" size={30} color="black" />}
          onPress={() => console.log("Right pressed")}
        />
      </View>
      <Button style={BasicInformationStyle.buttonCSS}>
        <Text style={BasicInformationStyle.textButton}>Next</Text>
      </Button>
    </View>
  );
}
