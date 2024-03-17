import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, View, Text, ScrollView, TouchableOpacity, LogBox } from "react-native";
import { Chip } from "react-native-paper";
import NewsStyle from "./NewsStyleScreen";
import AppBarHeaderComponent from "../../components/Common/AppBarHeader/AppBarHeaderComponent";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { primaryColor, secondaryColor } from "../../root/Colors";
import { RootStackParamList } from "../../root/RootStackParams";
import { StackNavigationProp } from "@react-navigation/stack";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import HorizontalCarouselComponent from "../../components/Common/Carousel/HorizontalCarouselComponent";
import AppBarFooterComponents from "../../components/Common/AppBarFooter/AppBarFooterComponents";
import { Ionicons } from '@expo/vector-icons';
import api from "../../api/AxiosApiConfig";

interface NewsItem {
  newsID: number;
  title: string;
  content: string;
  typeOfNews: string;
  image: string[];
  status: string;
  date: string;
  brandItems: BrandItems
}

interface BrandItems {
  brandID: number,
  brandName: string,
  description: string,
  address: string,
  link: string
}

type RouteNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;

const NewsScreen: React.FC = () => {
  const { height, width } = Dimensions.get("window");
  const navigation = useNavigation<RouteNavigationProp>();
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [chipItems, setChipItems] = useState<string[]>(['All']);
  const [seperateData, setSeperateData] = useState<NewsItem[]>([])
  const [filteredItems, setFilteredItems] = useState<NewsItem[]>([]);

  // USEEFFECT
  useEffect(() => {
    fetchData();
    // UNSHOW THE ERROR IN THE UI
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
  }, []);

  // RELOAD THE DATA WHEN NAVIGATE  BACK TO THIS SCREEN FROM ANOTHER SCREEN
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      LogBox.ignoreLogs(["VirtualizedLists should never be nested", "source.uri should not be an empty string"])
    }, [])
  );

  const fetchData = async () => {
    try {
      const response = await api.get('/api/v1/news/get-all-news')
      if (response.success === 200) {
        // SLIDE DATA TO TAKE 5 FIRST DATA TO SHOW TO THE CAROUSEL
        const firstFiveItems = response.data.slice(0, 5);

        // TAKE THE typeOfNews to show to the chip Items
        const uniqueTypeOfNews: string[] = Array.from(new Set(response.data.map((item: NewsItem) => item.typeOfNews)));
        const allChipItems = ['All', ...uniqueTypeOfNews];

        // Show only one image in the Screen
        const formattedData = firstFiveItems.map((item: NewsItem) => ({
          title: item.title,
          body: item.content,
          imgUrl: item.image.length > 0 ? item.image[0] : ""
        }));

        // Set the Data
        setSeperateData(formattedData);
        setNewsItems(response.data);
        setChipItems(allChipItems);
        setFilteredItems(response.data);
      } else {
        console.error('Error');
      }
    } catch (error) {
      console.log("Error fetching news data:", error);
    }
  };

  // Render Item FUNCTION
  const renderItem = ({ item }: { item: NewsItem }) => (
    <TouchableOpacity onPress={() => handleNewsItemClick(item)}>
      <View style={NewsStyle.itemContainer}>
        {Array.isArray(item.image) && item.image.length > 0 ? (
          item.image.map((uri, index) => (
            <Image key={index} source={{ uri }} style={NewsStyle.itemImage} />
          )).slice(0, 1)
        ) : (
          <Text>No Image Available</Text>
        )}
        <Text style={NewsStyle.itemTitle}>
          {item.title.length > 30 ? item.title.slice(0, 30) + ' ...' : item.title}
        </Text>
        <Text style={NewsStyle.itemTitle}>{item.content.length > 50 ? item.content.slice(0, 50) + ' ...' : item.content}</Text>
      </View>
    </TouchableOpacity>
  );


  // NAVIGATE TO THE NewsDetailScreen
  const handleNewsItemClick = (item: NewsItem): void => {
    navigation.navigate('NewsDetailScreen', { newsItem: item });
  };

  // NAVIGATE BACK TO HOME SCREEN
  const hanldeGoBack = (): void => {
    navigation.goBack();
  };

  // NAVIGATE TO AddNewsScreen
  const addNews = () => {
    navigation.navigate('AddNewsScreen');
  };

  // Filter  the list of items based on search input value
  const handleChipPress = (typeOfNews: string): void => {
    if (typeOfNews === "All") {
      setFilteredItems(newsItems);
    } else {
      const filtered = newsItems.filter(item => item.typeOfNews === typeOfNews);
      setFilteredItems(filtered);
    }
  };

  return (
    <View style={NewsStyle.container}>
      <AppBarHeaderComponent
        title={
          <View style={NewsStyle.titlePage}>
            <MaskedView
              maskElement={
                <Text style={NewsStyle.titlePage}>Hot News</Text>
              }
            >
              <LinearGradient
                colors={[secondaryColor, primaryColor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={NewsStyle.linearBackground}
              >
                <Text style={{ opacity: 0 }}>Hot News</Text>
              </LinearGradient>
            </MaskedView>
          </View>
        }
        backAction={hanldeGoBack}
      />
      <ScrollView
        persistentScrollbar={false}
        style={NewsStyle.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <View style={NewsStyle.scrollViewContent}>
          <HorizontalCarouselComponent data={seperateData}></HorizontalCarouselComponent>
          <View style={NewsStyle.chipButton}>
            {chipItems.map((typeOfNews, index) => (
              <Chip
                key={index}
                mode="outlined"
                onPress={() => handleChipPress(typeOfNews)}
                textStyle={{
                  opacity: 0.8,
                  fontWeight: "400",
                  fontSize: 10,
                }}
                style={NewsStyle.chipStyles}
              >
                {typeOfNews}
              </Chip>
            ))}
          </View>

          <FlatList
            data={filteredItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.newsID.toString()}
            numColumns={2}
            columnWrapperStyle={NewsStyle.row}
          />

        </View>
      </ScrollView>
      <TouchableOpacity onPress={addNews} style={NewsStyle.addNewsButton}>
        <Ionicons name="add-circle-outline" size={24} color="white" />
      </TouchableOpacity>
      <AppBarFooterComponents isHide={true} centerIcon="plus" />
    </View>
  );

};

export default NewsScreen;
