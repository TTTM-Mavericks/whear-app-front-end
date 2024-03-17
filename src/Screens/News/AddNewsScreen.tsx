import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, Platform, StyleSheet, Modal, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';
import AppBarHeaderComponent from '../../components/Common/AppBarHeader/AppBarHeaderComponent';
import NewsStyle from './NewsStyleScreen';
import { backgroundColor, primaryColor, secondaryColor } from '../../root/Colors';
import MaskedView from '@react-native-masked-view/masked-view';
import { height, width } from '../../root/ResponsiveSize';
import api from '../../api/AxiosApiConfig';
import Toast from 'react-native-toast-message';
import { ALERT_TYPE, Dialog, AlertNotificationRoot } from 'react-native-alert-notification';
import AddImageButtonComponent from '../../components/ImagePicker/AddImageButtonComponent';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';


const AddNewsScreen = () => {
    const navigation = useNavigation();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [typeOfNews, setTypeOfNews] = useState([
        'ARTICLE',
        'DESIGNER',
        'MODEL',
        'STYLE',
        'HOT_TREND'
    ]);
    const [isLoadingImage, setIsLoadingImage] = useState(false);
    const [image, setImages] = useState<string[]>([]);
    const brandID = 1

    const [openShape, setOpenShape] = useState(false);
    const [selectedTypeOfNews, setSelectedTypeOfNews] = useState<string>('');
    const isUploadedImage = useSelector((state: any) => state.store.isUploadedImageToFireBase);
    const imageUrlState = useSelector((state: any) => state.store.imageCreatingUrl);

    console.log(title);
    console.log(content);
    console.log("typeOfNews " + typeOfNews);
    console.log(image);
    console.log(selectedTypeOfNews);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleOpenShape = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleSelectTypeOfNews = (type: string) => { // Specify the type of 'type' parameter
        setSelectedTypeOfNews(type);
        setIsModalVisible(false);
    };

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                    'Permission required',
                    'Please grant access to your photo library to pick an image.'
                );
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            const selectedImages = result.assets.map(asset => asset.uri);
            setImages(selectedImages);
        }
    };

    // Show the Success Box Dialog
    const showDialogSuccess = () => {
        Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Success',
            textBody: 'Congrats! Add news successfully',
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

    const handleAddNews = async () => {
        try {
            const newsRequestBody = {
                brandID: brandID,
                title: title,
                content: content,
                typeOfNews: selectedTypeOfNews,
                image: [imageUrlState]
            };
            console.log(newsRequestBody);

            const response = await api.post('/api/v1/news/create-news', newsRequestBody);

            if (response.success === 200) {
                Toast.show({
                    type: 'success',
                    text1: 'Payment successful',
                    position: 'top'
                });
                if (response.success === 200) {
                    showDialogSuccess();
                } else {
                    showDialogFail();
                }
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


    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <AlertNotificationRoot >
            <View style={NewsStyle.container}>
                <ScrollView
                    persistentScrollbar={false}
                    style={NewsStyle.scrollView}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                >
                    <View style={NewsStyle.container}>
                        <AppBarHeaderComponent
                            title={
                                <View style={NewsStyle.titlePage}>
                                    <MaskedView
                                        maskElement={
                                            <Text style={NewsStyle.titlePage}>Add News</Text>
                                        }
                                    >
                                        <LinearGradient
                                            colors={[secondaryColor, primaryColor]}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 0, y: 1 }}
                                            style={NewsStyle.linearBackground}
                                        >
                                            <Text style={{ opacity: 0 }}>Add News</Text>
                                        </LinearGradient>
                                    </MaskedView>
                                </View>
                            }
                            backAction={handleGoBack}
                        />
                        <View style={{ backgroundColor: backgroundColor, width: width, flex: 1 }}>
                            <View style={{ marginTop: 40, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, }}>
                                <TextInput
                                    label="Title"
                                    activeOutlineColor={primaryColor}
                                    value={title}
                                    onChangeText={text => setTitle(text)}
                                    style={NewsStyle.input}
                                    mode='outlined'

                                />
                                <TextInput
                                    label="Content"
                                    activeOutlineColor={primaryColor}
                                    value={content}
                                    onChangeText={text => setContent(text)}
                                    style={NewsStyle.input}
                                    mode='outlined'

                                />
                            </View>
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

                            {/* Upload Aray Of Image in Local Device */}
                            {/* <View style={styles.imagePickerContainer}>
                                <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
                                    <Text style={styles.imagePickerButtonText}>Upload Image</Text>
                                </TouchableOpacity>
                                <View style={styles.imageListContainer}>
                                    {image.map((imageUri, index) => (
                                        <Image key={index} source={{ uri: imageUri }} style={styles.image} />
                                    ))}
                                </View>
                            </View> */}

                            {/* With FIREBASE */}
                            <View style={NewsStyle.pictureArea} >
                                <Image source={{ uri: imageUrlState }} style={NewsStyle.picture}></Image>
                                <ActivityIndicator animating={isLoadingImage && isUploadedImage} color={primaryColor} style={{ position: 'absolute', top: width * 0.4, left: width * 0.23 }} />
                                <View style={NewsStyle.iconUploadPicture}>
                                    <AddImageButtonComponent width={12} height={16} isAddNewImage={true} iconColor={primaryColor}></AddImageButtonComponent>
                                </View>
                            </View>

                            <Button
                                mode='outlined'
                                contentStyle={Platform.OS === 'ios' ? { height: height * 0.045 } : { height: height * 0.04 }}
                                style={[NewsStyle.buttonGroup_button01, { backgroundColor: primaryColor }]}
                                labelStyle={[NewsStyle.buttonGroup_button_lable,]}
                                onPress={handleAddNews}
                            >
                                <Text style={{ fontWeight: '500', fontSize: 15 }}>Add News</Text>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </AlertNotificationRoot >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
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
    imageListContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 30
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 5,
        marginRight: 10,
        marginBottom: 10,
    },
});

export default AddNewsScreen;
