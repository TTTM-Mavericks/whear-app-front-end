import React from "react";
import { FlatList, View, Text, Dimensions } from "react-native";
import moment from "moment";
import MessageStyle from "./MessageStylesScreen";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/SimpleLineIcons";
import { Avatar, IconButton } from "react-native-paper";
import AppBarHeaderComponent from "../../components/Common/AppBarHeader/AppBarHeaderComponent";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { primaryColor, secondaryColor } from "../../root/Colors";

interface MessageItems {
  id: number;
  name: string;
  avatarImage: string;
  description: string;
}

function MessageScreen() {
  const { width, height } = Dimensions.get("window");
  // fake data 2 phút trước

  let twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);
  let timeAgo = moment(twoMinutesAgo).fromNow();

  const messageItems: MessageItems[] = [
    {
      id: 1,
      name: "Quốc Anh",
      avatarImage:
        "https://bloganchoi.com/wp-content/uploads/2022/05/hinh-avatar-doi-dep-2022-6-696x696.jpg",
      description: "Hello, I really like your photo about...",
    },
    {
      id: 2,
      name: "Văn Mai",
      avatarImage:
        "https://demoda.vn/wp-content/uploads/2022/08/hinh-anh-avatar-nu-de-thuong.jpg",
      description: "Hello, I really like your photo about...",
    },
    {
      id: 3,
      name: "Miss cherry",
      avatarImage:
        "https://shopbanphim.com/wp-content/uploads/2023/10/19_anh-avatar-dep-cho-con-gai.jpg",
      description: "Hello, I really like your photo about...",
    },
    {
      id: 4,
      name: "Anh Tú",
      avatarImage:
        "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg",
      description: "Hello, I really like your photo about...",
    },
    {
      id: 5,
      name: "Minh Tâm",
      avatarImage:
        "https://cdn.alongwalk.info/vn/wp-content/uploads/2022/11/16190847/99-hinh-avatar-cute-ngau-ca-tinh-de-thuong-nhat-cho-nam-nu1668575327.jpg",
      description: "Hello, I really like your photo about...",
    },
  ];

  const renderItem = ({ item }: { item: MessageItems }) => (
    <View style={MessageStyle.itemContainer}>
      <Avatar.Image
        size={45}
        source={{ uri: item.avatarImage }}
        style={MessageStyle.itemImage}
      />
      <View style={MessageStyle.rightBody}>
        <Text style={MessageStyle.itemName} onPress={() => alert("Read more")}>
          {item.name}
        </Text>
        <Text
          style={MessageStyle.itemDescription}
          onPress={() => alert("Read more")}
        >
          {item.description}
        </Text>

        <View style={MessageStyle.underBox}>
          <Text style={MessageStyle.itemTimeAgo}>{timeAgo}</Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              marginLeft: width * 0.26,
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "400" }}>20</Text>
            <IconButton
              icon={() => (
                <Icon
                  name="chatbubble-ellipses-outline"
                  size={25}
                  color="#828282"
                />
              )}
            />
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={MessageStyle.mainContainer}>
      <AppBarHeaderComponent
        title={
          <View>
            <MaskedView
              maskElement={
                <Text style={MessageStyle.titleTopBar}>Message</Text>
              }
            >
              <LinearGradient
                colors={[secondaryColor, primaryColor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={MessageStyle.linearBackground}
              >
                <Text style={{ opacity: 0 }}>Message</Text>
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
      ></AppBarHeaderComponent>
      <View>
        <FlatList
          data={messageItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
}

export default MessageScreen;
