import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

interface Message {
  sender: string;
  content: string;
  type: string;
}

const colors = ['#2196F3', '#32c787', '#00BCD4', '#ff5652', '#ffc107', '#ff85af', '#FF9800', '#39bbb0'];

const ConnectStomp: React.FC = () => {
  const [notifications, setNotifications] = useState<string[]>([]);
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const socket = new SockJS('https://whear-app.azurewebsites.net/ws');
    const stomp = new Client({
      brokerURL: 'https://whear-app.azurewebsites.net/ws',
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stomp.activate();

    stomp.onConnect = (frame) => {
      setStompClient(stomp);
      stomp.subscribe('/topic/public', onMessageReceived);

      // Tell your username to the server
      stomp.publish({
        destination: '/app/chat.addUser',
        headers: {},
        body: JSON.stringify({ sender: username, type: 'JOIN' }),
      });
    };

    return () => {
      if (stomp.connected) {
        stomp.deactivate();
      }
    };
  }, [username]);

  const onMessageReceived = (payload: any) => {
    const message: Message = JSON.parse(payload.body);
    console.log('THIS IS MESSAGE', message);
    // Handle message received in React Native
    setNotifications((prevNotifications) => [...prevNotifications, message.content]);
  };

  const getAvatarColor = (messageSender: string): string => {
    let hash = 0;
    for (let i = 0; i < messageSender.length; i++) {
      hash = 31 * hash + messageSender.charCodeAt(i);
    }
    const index = Math.abs(hash % colors.length);
    return colors[index];
  };

  const connect = () => {
    // Handle username connection in React Native
    console.log('Username:', username);
  };

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Notifications:</Text>
      <View>
        {notifications.map((notification, index) => (
          <Text key={index}>{notification}</Text>
        ))}
      </View>

      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Type your username</Text>
        <TextInput
          value={username}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
        />
        <TouchableOpacity onPress={connect}>
          <Text style={{ fontSize: 20, color: 'blue' }}>Start Chatting</Text>
        </TouchableOpacity>
      </View>

      {/* The rest of your components go here */}
    </View>
  );
};

export default ConnectStomp;
