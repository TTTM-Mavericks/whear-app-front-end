import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import Icon from "@expo/vector-icons/build/MaterialCommunityIcons";
import { theme } from "../../root/Colors";

interface ChatInputProps {
  onSendMessage: (newMessage: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;
    onSendMessage(inputMessage);
    setInputMessage("");
    console.log("Sent message:", inputMessage);
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.inputAndMicrophone}>
          {/* <TouchableOpacity style={styles.emotionIconButton}>
            <Icon
              name="emoticon-outline"
              size={23}
              color={theme.colors.description}
            />
          </TouchableOpacity> */}
          <TextInput
            multiline
            placeholder="Type something..."
            style={styles.input}
            value={inputMessage}
            onChangeText={(text) => setInputMessage(text)}
          />
          <TouchableOpacity style={styles.rightIconButtonStyle}>
            <Icon name="image-outline" size={23} color={theme.colors.description} />
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.rightIconButtonStyle}>
            <Icon name="camera" size={23} color={theme.colors.description} />
          </TouchableOpacity> */}
        </View>
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Icon name="send" size={23} color={theme.colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: theme.colors.white,
  },
  innerContainer: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 10,
  },
  inputAndMicrophone: {
    flexDirection: "row",
    backgroundColor: theme.colors.inputBackground,
    flex: 3,
    marginRight: 10,
    paddingVertical: Platform.OS === "ios" ? 10 : 0,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    backgroundColor: "transparent",
    paddingLeft: 20,
    color: theme.colors.inputText,
    flex: 3,
    fontSize: 15,
    height: 40,
    alignSelf: "center",
  },
  rightIconButtonStyle: {
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 15,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: "#fff",
  },
  emotionIconButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
  },
  sendButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 50,
    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ChatInput;
