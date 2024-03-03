import React, { useState, useRef, MutableRefObject, useEffect } from "react";
import { ScrollView } from "react-native";

import Message from "./Message";

import { theme } from "../../root/Colors";

interface MessagesListProps {
  newMessage: string;
}

const getCurrentTime = (): string => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};

const MessagesList: React.FC<MessagesListProps> = ({ newMessage }) => {
  const [messages, setMessages] = useState([
    {
      user: 0,
      imageUrl:
        "https://png.pngtree.com/png-vector/20230323/ourlarge/pngtree-girl-sofa-3d-cartoon-png-image_6664094.png",
      time: "12:00",
      content: "Hey",
    },
    {
      user: 1,
      imageUrl:
        "https://png.pngtree.com/png-vector/20230323/ourlarge/pngtree-3d-boy-cartoon-png-image_6664092.png",
      time: "12:05",
      content: "What's up",
    },
    {
      user: 1,
      imageUrl:
        "https://png.pngtree.com/png-vector/20230323/ourlarge/pngtree-3d-boy-cartoon-png-image_6664092.png",
      time: "12:07",
      content: "How is it going?",
    },
    {
      user: 0,
      imageUrl:
        "https://png.pngtree.com/png-vector/20230323/ourlarge/pngtree-girl-sofa-3d-cartoon-png-image_6664094.png",
      time: "12:09",
      content: "things are going great",
    },
    {
      user: 0,
      imageUrl:
        "https://png.pngtree.com/png-vector/20230323/ourlarge/pngtree-girl-sofa-3d-cartoon-png-image_6664094.png",
      time: "12:00",
      content: "Good :)",
    },
    {
      user: 1,
      imageUrl:
        "https://png.pngtree.com/png-vector/20230323/ourlarge/pngtree-3d-boy-cartoon-png-image_6664092.png",
      time: "12:05",
      content:
        "Should we hang out tomorrow? I was thinking of going somewhere which has drinks",
    },
    {
      user: 0,
      imageUrl:
        "https://png.pngtree.com/png-vector/20230323/ourlarge/pngtree-girl-sofa-3d-cartoon-png-image_6664094.png",
      time: "12:07",
      content: "Sure",
    },
    {
      user: 1,
      imageUrl:
        "https://png.pngtree.com/png-vector/20230323/ourlarge/pngtree-3d-boy-cartoon-png-image_6664092.png",
      time: "12:09",
      content: "Great",
    },
    {
      user: 0,
      imageUrl:
        "https://png.pngtree.com/png-vector/20230323/ourlarge/pngtree-girl-sofa-3d-cartoon-png-image_6664094.png",
      time: "12:07",
      content: "7 o'clock?",
    },
    {
      user: 1,
      imageUrl:
        "https://png.pngtree.com/png-vector/20230323/ourlarge/pngtree-3d-boy-cartoon-png-image_6664092.png",
      time: "12:09",
      content: "Sounds good",
    },
  ]);

  const user = useRef<number>(0);
  const scrollView = useRef<ScrollView>(null);

  useEffect(() => {
    if (newMessage.trim() !== "") {
      // Thêm tin nhắn mới vào danh sách
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          user: user.current,
          imageUrl:
            "https://png.pngtree.com/png-vector/20230323/ourlarge/pngtree-girl-sofa-3d-cartoon-png-image_6664094.png",
          time: getCurrentTime(),
          content: newMessage,
        },
      ]);
      console.log("data mới: ", user.current);

      // Cuộn tới cuối ScrollView để hiển thị tin nhắn mới
      scrollView.current?.scrollToEnd({ animated: true });
    }
  }, [newMessage]);

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.white, flex: 1 }}
      ref={scrollView}
      onContentSizeChange={() => {
        scrollView.current?.scrollToEnd({ animated: true });
      }}
    >
      {messages.map((message, index) => (
        <Message
          key={index}
          imageUrl={message.imageUrl}
          time={message.time}
          isLeft={message.user !== user.current}
          message={message.content}
        />
      ))}
    </ScrollView>
  );
};

export default MessagesList;
