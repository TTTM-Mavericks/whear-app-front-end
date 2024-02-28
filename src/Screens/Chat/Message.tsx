import { View, Text, StyleSheet, TextStyle } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Avatar } from "react-native-paper";

interface MessageProps {
  time: string;
  isLeft: boolean;
  message: string;
  imageUrl: string;
}

const Message: React.FC<MessageProps> = ({
  time,
  message,
  isLeft,
  imageUrl,
}) => {
  const isOnLeft = (type: string): TextStyle => {
    if (isLeft && type === "container") {
      return {
        alignSelf: "flex-start",
        flexDirection: "row",
      };
    } else if (isLeft && type === "messageContainer") {
      return {
        alignSelf: "flex-start",
      };
    } else if (isLeft && type === "message") {
      return {
        color: "#000",
      };
    } else if (isLeft && type === "time") {
      return {
        color: "darkgray",
        justifyContent: "flex-end",
      };
    } else {
      return {};
    }
  };

  return (
    <View style={[styles.container, isOnLeft("container")]}>
      <View style={styles.blockImage}>
        <Avatar.Image size={45} source={{ uri: imageUrl }} />
      </View>

      <LinearGradient
        colors={isLeft ? ["#CAFA89", "#ffffff"] : ["#BFC1F3", "#ffffff"]} // Mảng màu từ xanh đến trắng
        style={[styles.messageContainer, isOnLeft("messageContainer")]}
      >
        <View style={styles.messageView}>
          <Text style={[styles.message, isOnLeft("message")]}>{message}</Text>
        </View>
        <View style={styles.timeView}>
          <Text style={[styles.time, isOnLeft("time")]}>{time}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginVertical: 10,
    flexDirection: "row-reverse",
    alignSelf: "flex-end",
  },
  messageContainer: {
    maxWidth: "80%",
    minWidth: "35%",
    flexDirection: "column",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  blockImage: { justifyContent: "flex-end" },
  messageView: { backgroundColor: "transparent", maxWidth: "80%" },
  timeView: {
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },
  message: { color: "black", alignSelf: "flex-start", fontSize: 15 },
  time: {
    color: "gray",
    alignSelf: "flex-end",
    fontWeight: "bold",
    fontSize: 10,
    marginTop: 10,
  },
});

export default Message;
