import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AppBarHeaderComponent from '../../components/Common/AppBarHeader/AppBarHeaderComponent';
import { LinearGradient } from 'expo-linear-gradient';
import { backgroundColor, primaryColor, secondaryColor } from '../../root/Colors';
import { width } from '../../root/ResponsiveSize';
import NewsStyle from './NewsStyleScreen';
import MaskedView from '@react-native-masked-view/masked-view';
import { Ionicons } from '@expo/vector-icons';
import AppBarFooterComponents from '../../components/Common/AppBarFooter/AppBarFooterComponents';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../root/RootStackParams';

interface NewsItem {
    newsID: number,
    title: string;
    typeOfNews: string;
    content: string;
    image: string[];
    date: string,
    brandItems: BrandItems
}

interface BrandItems {
    brandID: number,
    brandName: string,
    description: string,
    address: string,
    link: string
}

type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;

const NewsDetailScreen = () => {
    const navigation = useNavigation<SignInScreenNavigationProp>();
    // const navigation = useNavigation();
    const route = useRoute();
    const newsItem = (route.params as { newsItem?: any })?.newsItem || null;

    // HANDLER FUNCTION
    function handleGoBack(): void {
        navigation.goBack();
    }

    // NAVIGATE TO EDIT SCREEN
    const editNews = (newsItem: NewsItem) => {
        navigation.navigate("EditNewsScreen", { newsItem })
    };

    return (
        <View style={NewsStyle.container}>
            <AppBarHeaderComponent
                title={
                    <View style={NewsStyle.titlePage}>
                        <MaskedView
                            maskElement={
                                <Text style={NewsStyle.titlePage}>Hot News Details</Text>
                            }
                        >
                            <LinearGradient
                                colors={[secondaryColor, primaryColor]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }}
                                style={NewsStyle.linearBackground}
                            >
                                <Text style={{ opacity: 0 }}>Hot News Details</Text>
                            </LinearGradient>
                        </MaskedView>
                    </View>
                }
                backAction={handleGoBack}
            />
            <ScrollView
                persistentScrollbar={false}
                style={NewsStyle.scrollView}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
            >
                <View style={{ padding: 10 }}>
                    <Text style={styles.title}>{newsItem.title}</Text>
                    <Text style={styles.typeOfNews}>Style: {newsItem.typeOfNews}</Text>
                    <View style={{}}>
                        <Text style={styles.createBy}>Create by: {newsItem.brand.brandName}</Text>
                        <Text style={{ paddingBottom: 20 }}>{newsItem.date}</Text>

                    </View>
                    <FlatList
                        data={newsItem.image}
                        renderItem={({ item }) => (
                            <Image source={{ uri: item }} style={styles.image} />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                    <Text style={styles.content}>{newsItem.content}</Text>
                </View>
            </ScrollView>
            <TouchableOpacity onPress={() => editNews(newsItem)} style={NewsStyle.addNewsButton}>
                <Ionicons name="pencil" size={24} color="white" />
            </TouchableOpacity>
            <AppBarFooterComponents isHide={false} centerIcon="plus" />
        </View>
    );
}

const styles = StyleSheet.create({

    contentContainer: {
        flexGrow: 1,
        width: width,
        backgroundColor: 'white',
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    typeOfNews: {
        fontSize: 18,
        color: 'gray',
        marginBottom: 10,
    },
    createBy: {
        fontSize: 18,
        color: 'black',
        marginBottom: 10,
    },
    content: {
        fontSize: 20,
        marginBottom: 20,
        paddingTop: 30
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 10,
        marginRight: 10
    },
});

export default NewsDetailScreen;
