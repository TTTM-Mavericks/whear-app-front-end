import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AppBarHeaderComponent from '../../components/Common/AppBarHeader/AppBarHeaderComponent';
import { backgroundColor, primaryColor, secondaryColor } from '../../root/Colors';
import NewsStyle from './NewsStyleScreen';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { height, width } from '../../root/ResponsiveSize';
import { Button } from 'react-native-paper';
import { ALERT_TYPE, AlertNotificationRoot, Dialog } from 'react-native-alert-notification';
import api from '../../api/AxiosApiConfig';
import Toast from 'react-native-toast-message';
import { Picker } from '@react-native-picker/picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../root/RootStackParams';


interface NewsItem {
    newsID: number,
    title: string;
    typeOfNews: string;
    status: string,
    content: string;
    image: string[];
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
const EditNewsScreen = () => {

    const navigation = useNavigation<SignInScreenNavigationProp>();
    const route = useRoute();
    const newsItem = (route.params as { newsItem?: any })?.newsItem || null;

    const [title, setTitle] = useState(newsItem.title);
    const [content, setContent] = useState(newsItem.content);
    const [typeOfNews, setTypeOfNews] = useState([
        'ARTICLE',
        'DESIGNER',
        'MODEL',
        'STYLE',
        'HOT_TREND'
    ]);
    const [statusNews, setStatusNews] = useState([
        'ACTIVE',
        'INACTIVE'
    ])

    const [isLoadingImage, setIsLoadingImage] = useState(false);
    const [image, setImages] = useState<string[]>([]);

    // Get in localstorage or pass in props
    const brandID = newsItem.brand.brandID
    const newsID = newsItem.newsID

    const [openShape, setOpenShape] = useState(false);
    const [selectedTypeOfNews, setSelectedTypeOfNews] = useState<string>(newsItem.typeOfNews);
    const [selectedStatus, setSelectedStatus] = useState<string>(newsItem.status);

    // Show the Success Box Dialog
    const showDialogSuccess = () => {
        Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Success',
            textBody: 'Congrats! Edit news successfully',
            onPressButton() {
                navigation.goBack();
                Dialog.hide();
            },
            button: 'OK',
        });
    };

    // Show the Danger Box Dialog
    const showDialogFail = () => {
        Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Fail!',
            textBody: 'Some Arguments are missing or empty',
            button: 'Try Again',
        })
    }

    // Update by calling API
    const handlesaveNews = async () => {
        try {
            const newsRequestBody = {
                brandID: brandID,
                newsID: newsID,
                title: title,
                content: content,
                typeOfNews: selectedTypeOfNews,
                statusNews: selectedStatus
            };

            const response = await api.put('/api/v1/news/update-news', newsRequestBody);

            if (response.success === 200) {
                showDialogSuccess();
            } else {
                showDialogFail();
            }
            console.log(response);
        } catch (error) {
            console.error('Error posting data:', error);
            Toast.show({
                type: 'error',
                text1: 'Failed. Please try again.',
                position: 'top'
            });
        }
    };

    // HANDLER BACK TO HOME SCREEN
    const handleGoBack = () => {
        navigation.goBack();
    }

    return (
        <AlertNotificationRoot>
            <View style={NewsStyle.container}>
                <AppBarHeaderComponent
                    title={
                        <View style={NewsStyle.titlePage}>
                            <MaskedView
                                maskElement={
                                    <Text style={NewsStyle.titlePage}>Edit News</Text>
                                }
                            >
                                <LinearGradient
                                    colors={[secondaryColor, primaryColor]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 0, y: 1 }}
                                    style={NewsStyle.linearBackground}
                                >
                                    <Text style={{ opacity: 0 }}>Edit News</Text>
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
                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            value={title}
                            onChangeText={setTitle}
                        />

                        <TextInput
                            style={[styles.input, styles.multilineInput]}
                            placeholder="Content"
                            value={content}
                            onChangeText={setContent}
                            multiline
                        />

                        <View style={styles.dropdownContainer}>
                            <Text style={styles.label}>Type Of News</Text>
                            <Picker
                                selectedValue={selectedTypeOfNews}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedTypeOfNews(itemValue)
                                }
                                style={styles.picker}
                            >
                                {typeOfNews.map((option, index) => (
                                    <Picker.Item label={option} value={option} key={index} />
                                ))}
                            </Picker>
                        </View>

                        <View style={styles.dropdownContainer}>
                            <Text style={styles.label}>STATUS</Text>
                            <Picker
                                selectedValue={selectedStatus}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedStatus(itemValue)
                                }
                                style={styles.picker}
                            >
                                {statusNews.map((option, index) => (
                                    <Picker.Item label={option} value={option} key={index} />
                                ))}
                            </Picker>
                        </View>

                        <Button
                            mode='outlined'
                            contentStyle={Platform.OS === 'ios' ? { height: height * 0.045 } : { height: height * 0.04 }}
                            style={[NewsStyle.buttonGroup_button, { backgroundColor: primaryColor }]}
                            labelStyle={[NewsStyle.buttonGroup_button_lable,]}
                            onPress={handlesaveNews}
                        >
                            <Text style={{ fontWeight: '500', fontSize: 15 }}>Edit News</Text>
                        </Button>
                    </View>
                </ScrollView>
            </View>
        </AlertNotificationRoot>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        marginBottom: 20,
        width: width
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    multilineInput: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    dropdownContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    picker: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    imagePickerContainer: {
        marginBottom: 20,
    },
    imagePickerButton: {
        backgroundColor: primaryColor,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
    },
    imagePickerButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default EditNewsScreen;
