import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon2 from "react-native-vector-icons/SimpleLineIcons";
import ChatInput from "./chatInput";
import AppBarHeaderComponent from "../../components/Common/AppBarHeader/AppBarHeaderComponent";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { IconButton } from "react-native-paper";
import { primaryColor, secondaryColor } from "../../root/Colors";
import {
  ITEM_HEIGHT,
  ITEM_WIDTH,
} from "../../components/Common/AppBarHeader/AppBarHeaderStyleComponent";
import MessagesList from "./MessageList";

interface ChatScreenProps {
  navigation: any;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ navigation }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (message: string) => {
    console.log("Received message:", message);
    setNewMessage(message);
  };
  return (
    <View style={{ flex: 1 }}>
      <AppBarHeaderComponent
        title={
          <View>
            <MaskedView
              maskElement={<Text style={styles.titleTopBar}>A.I.B</Text>}
            >
              <LinearGradient
                colors={[secondaryColor, primaryColor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.linearBackground}
              >
                <Text style={{ opacity: 0 }}>A.I.B</Text>
              </LinearGradient>
            </MaskedView>
          </View>
        }
        isHideIcon1={true}
        isHideIcon2={true}
        iconChild={
          <View>
            <IconButton
              icon={() => <Icon2 name="note" size={25} color="#212121" />}
            />
          </View>
        }
        backAction={() => navigation.goBack()}
      ></AppBarHeaderComponent>
      <MessagesList newMessage={newMessage} />
      <ChatInput onSendMessage={handleSendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  titleTopBar: {
    fontSize: 20,
    fontWeight: "700",
    alignSelf: "center",
    height: ITEM_HEIGHT,
    paddingTop: 8,
  },
  linearBackground: {
    height: ITEM_HEIGHT,
    width: ITEM_WIDTH,
  },
});

export default ChatScreen;
