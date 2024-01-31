import React from "react";
import { Dimensions, FlatList, Image, View, Text } from "react-native";
import { Appbar, Chip } from "react-native-paper";
import NewsStyle from "./NewsStyleScreen";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";
import AppBarHeaderComponent from "../../components/Common/AppBarHeader/AppBarHeaderComponent";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { primaryColor, secondaryColor } from "../../root/Colors";
import TouchabaleActiveActionButton from "../../components/Common/TouchableActive/TouchabaleActiveActionButton";

interface NewsItems {
  id: number;
  image: string;
  title: string;
  description: string;
}

export default function NewsScreen() {
  const { height, width } = Dimensions.get("window");

  const chipItems = [
    {
      id: 1,
      title: "Fashion",
    },
    {
      id: 2,
      title: "Viet Nam",
    },
    {
      id: 3,
      title: "International",
    },
    {
      id: 4,
      title: "Beauty",
    },
    {
      id: 5,
      title: "Art",
    },
    {
      id: 6,
      title: "Design",
    },
    {
      id: 7,
      title: "History of Fashion",
    },
  ];
  const newsItems: NewsItems[] = [
    {
      id: 1,
      image:
        "https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2Fa29ad4155f997fd8fdbed2172d114254.jpg?alt=media&token=3d8f906e-f4f7-4b4d-b533-e6b38d891611",
      title: "behind the pages",
      description: "A Rummage Through Gucci's Archive, As Seen in AnOther",
    },
    {
      id: 2,
      image:
        "https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2F366972237_619089963697280_9065720426821190201_n.jpg?alt=media&token=6af1d30c-8fb0-4e27-8104-8add7378c34e",
      title: "ANOTHER THING I WANTED TO TELL YOU",
      description:
        "Designer Duran Lantink on the 'Extreme Energy' of Walter Van Beirendonck",
    },
    {
      id: 3,
      image:
        "https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2F380438459_847206396710593_1080732157510625571_n.jpg?alt=media&token=961c3244-5235-44bd-b55e-97e27192e033",
      title: "behind the pages",
      description: "Alice Neale's Sultry Portrait of Dior A/W23",
    },
    {
      id: 4,
      image:
        "https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2F380438459_847206396710593_1080732157510625571_n.jpg?alt=media&token=961c3244-5235-44bd-b55e-97e27192e033",
      title: "behind the pages",
      description: "Alice Neale's Sultry Portrait of Dior A/W23",
    },
    {
      id: 5,
      image:
        "https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2F380438459_847206396710593_1080732157510625571_n.jpg?alt=media&token=961c3244-5235-44bd-b55e-97e27192e033",
      title: "behind the pages",
      description: "Alice Neale's Sultry Portrait of Dior A/W23",
    },
    {
      id: 6,
      image:
        "https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2F380438459_847206396710593_1080732157510625571_n.jpg?alt=media&token=961c3244-5235-44bd-b55e-97e27192e033",
      title: "behind the pages",
      description: "Alice Neale's Sultry Portrait of Dior A/W23",
    },
    {
      id: 7,
      image:
        "https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2F380438459_847206396710593_1080732157510625571_n.jpg?alt=media&token=961c3244-5235-44bd-b55e-97e27192e033",
      title: "behind the pages",
      description: "Alice Neale's Sultry Portrait of Dior A/W23",
    },
    {
      id: 8,
      image:
        "https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2F380438459_847206396710593_1080732157510625571_n.jpg?alt=media&token=961c3244-5235-44bd-b55e-97e27192e033",
      title: "behind the pages",
      description: "Alice Neale's Sultry Portrait of Dior A/W23",
    },
    {
      id: 9,
      image:
        "https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2F380438459_847206396710593_1080732157510625571_n.jpg?alt=media&token=961c3244-5235-44bd-b55e-97e27192e033",
      title: "Title 9",
      description: "Alice Neale's Sultry Portrait of Dior A/W23",
    },
    {
      id: 10,
      image:
        "https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2F380438459_847206396710593_1080732157510625571_n.jpg?alt=media&token=961c3244-5235-44bd-b55e-97e27192e033",
      title: "Title 10",
      description: "Alice Neale's Sultry Portrait of Dior A/W23",
    },
    {
      id: 11,
      image:
        "https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2F380438459_847206396710593_1080732157510625571_n.jpg?alt=media&token=961c3244-5235-44bd-b55e-97e27192e033",
      title: "Title 11",
      description: "Alice Neale's Sultry Portrait of Dior A/W23",
    },
    {
      id: 12,
      image:
        "https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2F380438459_847206396710593_1080732157510625571_n.jpg?alt=media&token=961c3244-5235-44bd-b55e-97e27192e033",
      title: "Title 12",
      description: "Alice Neale's Sultry Portrait of Dior A/W23",
    },
    {
      id: 13,
      image:
        "https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2F380438459_847206396710593_1080732157510625571_n.jpg?alt=media&token=961c3244-5235-44bd-b55e-97e27192e033",
      title: "Title 13",
      description: "Alice Neale's Sultry Portrait of Dior A/W23",
    },
    {
      id: 14,
      image:
        "https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2F380438459_847206396710593_1080732157510625571_n.jpg?alt=media&token=961c3244-5235-44bd-b55e-97e27192e033",
      title: "Title 14",
      description: "Alice Neale's Sultry Portrait of Dior A/W23",
    },
    {
      id: 15,
      image:
        "https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2F380438459_847206396710593_1080732157510625571_n.jpg?alt=media&token=961c3244-5235-44bd-b55e-97e27192e033",
      title: "Title 15",
      description: "Alice Neale's Sultry Portrait of Dior A/W23",
    },
    {
      id: 16,
      image:
        "https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2F380438459_847206396710593_1080732157510625571_n.jpg?alt=media&token=961c3244-5235-44bd-b55e-97e27192e033",
      title: "Title 16",
      description: "Alice Neale's Sultry Portrait of Dior A/W23",
    },
  ];

  const renderItem = ({ item }: { item: NewsItems }) => (
    <View style={NewsStyle.itemContainer}>
      <Image source={{ uri: item.image }} style={NewsStyle.itemImage} />
      <Text style={NewsStyle.itemTitle} onPress={() => alert("Read more")}>
        {item.title}
      </Text>
      <Text
        style={NewsStyle.itemDescription}
        onPress={() => alert("Read more")}
      >
        {item.description}
      </Text>
    </View>
  );

  function hanldeGoBack(): void {

  }

  return (
    <View style={NewsStyle.container}>
      <TouchabaleActiveActionButton ></TouchabaleActiveActionButton>

      <AppBarHeaderComponent
        title={
          <View>
            <MaskedView
              maskElement={
                <Text style={NewsStyle.titlePage}>News</Text>
              }
            >
              <LinearGradient
                colors={[secondaryColor, primaryColor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={NewsStyle.linearBackground}
              >
                <Text style={{ opacity: 0 }}>News</Text>
              </LinearGradient>
            </MaskedView>
          </View>
        }
        isHideIcon1 = {true}
        backAction={() => hanldeGoBack()}
      >
      </AppBarHeaderComponent>
      <View style={NewsStyle.chipButton}>
        {chipItems.map((i) => (
          <Chip
            key={i.id}
            mode="outlined"
            onPress={() => alert("Handle filter")}
            textStyle={{
              opacity: 0.8,
              fontWeight: "400",
              fontSize: 10,
            }}
            style={NewsStyle.chipStyles}
          >
            {i.title}
          </Chip>
        ))}
      </View>

      <FlatList
        data={newsItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={NewsStyle.row}
      />

      <View style={NewsStyle.loadMoreArticle}>
        <Text style={NewsStyle.loadMore} onPress={() => alert("Loading....")}>
          Load More Article
        </Text>
      </View>
    </View>
  );
}
