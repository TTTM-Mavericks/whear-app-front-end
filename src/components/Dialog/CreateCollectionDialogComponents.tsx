import * as React from 'react';
import { ScrollView, View, Image, TouchableOpacity, ImageBackground, Animated, Platform } from 'react-native';
import { Button, Card, Chip, Dialog, Icon, IconButton, MD3Colors, Portal, RadioButton, Text, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import DialogStylesComponent from './DialogStyleComponent';
import { backgroundColor, grayBackgroundColor, primaryColor, purpleColor } from '../../root/Colors';
import { setCreateCollectionDialog, setOpenAddToCollectionsDialog, setOpenUpgradeRolesDialog } from '../../redux/State/Actions';
import { LinearGradient } from 'expo-linear-gradient';
import { height, width } from '../../root/ResponsiveSize';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../root/RootStackParams';
import { useNavigation } from '@react-navigation/native';
import AddImageButtonComponent from '../ImagePicker/AddImageButtonComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserInterFace } from '../../models/ObjectInterface';
import api from '../../api/AxiosApiConfig';
import Toast from 'react-native-toast-message';
import UpgradeRoleDialogComponent from './UpgradeRoleDialogComponent';
import LoadingComponent from '../Common/Loading/LoadingComponent';


type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;

const dropdownData = {

    fashionStyles: [
        { label: 'CYBERPUNK', value: 'CYBERPUNK', imgUrl: 'https://i.pinimg.com/564x/be/6e/92/be6e928031d63b318a3e40838d1a521e.jpg' },
        { label: 'CLASSIC', value: 'CLASSIC', imgUrl: 'https://i.pinimg.com/564x/d6/69/b0/d669b095aa8b030c97593d40c8994b34.jpg' },
        { label: 'VINTAGE', value: 'VINTAGE', imgUrl: 'https://i.pinimg.com/564x/c3/8f/47/c38f47fc4cf06e4d17c819514774fa73.jpg' },
        { label: 'INDIE', value: 'INDIE', imgUrl: 'https://i.pinimg.com/564x/80/5b/ae/805baeac4224f42620c2bc9e9f52e5a6.jpg' },
        { label: 'E-GIRL', value: 'E_GIRL', imgUrl: 'https://i.pinimg.com/564x/17/0f/0d/170f0d0758e164f07057e9c834c791f0.jpg' },
        { label: 'BASIC', value: 'BASIC', imgUrl: 'https://i.pinimg.com/564x/2d/58/2a/2d582a49179cdb48d1d211dd491cbd2b.jpg' },
        { label: 'SPORTY', value: 'SPORTY', imgUrl: 'https://i.pinimg.com/564x/77/8d/ba/778dba980001dc562591a0becd05fe72.jpg' },
        { label: 'PREPPY', value: 'PREPPY', imgUrl: 'https://i.pinimg.com/564x/a9/07/77/a907778666f533fa2a9455b3456fcded.jpg' },
        { label: 'NORMCORE', value: 'NORMCORE', imgUrl: 'https://i.pinimg.com/564x/11/d7/0b/11d70b5f83ab1bd452dc13309191c770.jpg' },
        { label: 'MINIMALISM', value: 'MINIMALISM', imgUrl: 'https://i.pinimg.com/564x/36/98/8c/36988c3ceee413259404a8483a49d062.jpg' },
        { label: 'ROCK', value: 'ROCK', imgUrl: 'https://i.pinimg.com/564x/c7/55/d1/c755d189d35933d71de13d8f9f08d6d0.jpg' },
        { label: 'PARISIAN', value: 'PARISIAN', imgUrl: 'https://i.pinimg.com/564x/16/72/44/167244265a52d1593d0eb4ba3565c9e7.jpg' },
        { label: 'GOTHIC', value: 'GOTHIC', imgUrl: 'https://i.pinimg.com/564x/e5/2b/c7/e52bc7563942dda4f1ebfc4a693c884f.jpg' },
        { label: 'BOHEMIAN', value: 'BOHEMIAN', imgUrl: 'https://i.pinimg.com/564x/77/48/72/7748721dc1e1bde0cb4bf455ab08a18d.jpg' },
        { label: 'Y2K', value: 'Y2K', imgUrl: 'https://i.pinimg.com/564x/39/9e/ab/399eabdaa3a2623c3c510b54b246992a.jpg' },
        { label: 'OLD_MONEY', value: 'OLD_MONEY', imgUrl: 'https://i.pinimg.com/564x/5a/07/f1/5a07f1cd4d31432eeadbdb52c1920927.jpg' },
        { label: 'HIPPIE', value: 'HIPPIE', imgUrl: 'https://i.pinimg.com/564x/af/d9/4f/afd94f56dbe3bfe3913000483f1eba5e.jpg' },

    ],




};

const CreateCollectionDialogComponents = () => {
    /*-----------------UseState variable-----------------*/
    const [isOpen, setIsOpen] = React.useState(false);
    const [isAccepted, setIsAccepted] = React.useState(false);
    const navigation = useNavigation<SignInScreenNavigationProp>();
    const [nameOfCollection, setNameOfCollection] = React.useState('');
    const [openStyle, setOpenStyle] = React.useState(false);
    const [selectedStyle, setSelectedStyle] = React.useState<string>();
    const [collectionImageUrl, setCollectionImageUrl] = React.useState<string>();
    const [isLoadingImage, setIsLoadingImage] = React.useState(false);
    const [user, setUser] = React.useState<UserInterFace>();
    const [subrole, setSubRole] = React.useState('');
    const [token, setToken] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [messageAdded, setMessageAdded] = React.useState('');









    /*-----------------Usable variable-----------------*/
    const openDialog = useSelector((state: any) => state.store.isOpenCreateCollectionDialog);
    // const isAcceptedPolicy = useSelector((state: any) => state.auth.isAcceptedPolicy);
    const imageUrlState = useSelector((state: any) => state.store.imageCollectionUrl);
    const isUploadedImage = useSelector((state: any) => state.store.isUploadedImageToFireBase);
    const dispatch = useDispatch();
    const translateY = React.useRef(new Animated.Value(600)).current; // Adjust the initial position



    /*-----------------UseEffect-----------------*/
    React.useEffect(() => {
        setIsLoadingImage(false);
        const fetchData = async () => {
            const tokenStorage = await AsyncStorage.getItem('access_token');
            const userString = await AsyncStorage.getItem('userData');
            const subrole = await AsyncStorage.getItem('subrole');

            if (tokenStorage && userString && subrole) {
                const tokenString = JSON.parse(tokenStorage);
                const user = JSON.parse(userString);
                setUser(user);
                setSubRole(subrole);
                setToken(tokenString);
                const userID = user.userID;
                console.log('tokenString: ', tokenString);
            }
        }
        fetchData();
    }, []);

    React.useEffect(() => {
        if (openDialog) {
            showAnimation()
            setIsOpen(openDialog);
        } else {
            hideAnimation()
        }
    }, [openDialog]);

    React.useEffect(() => {
        console.log('isUploadedImage: ', isUploadedImage);
        setIsLoadingImage(false);
        if (!isUploadedImage) {
            setCollectionImageUrl(imageUrlState);

        } else {
            setIsLoadingImage(true);
        }
    }, [imageUrlState]);

    React.useEffect(()=> {
        setIsLoadingImage(false);
    }, [collectionImageUrl])

    /*-----------------Function handler-----------------*/
    const hideDialog = () => {
        dispatch(setCreateCollectionDialog(false));
        // setIsOpen((prevIsOpen: any) => !prevIsOpen);
        setIsOpen(false);
        // hideAnimation();
    };


    const showAnimation = () => {

        Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    const hideAnimation = () => {
        Animated.timing(translateY, {
            toValue: 200,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
        });
    };


    const handleOpenStyle = () => {
        setOpenStyle(!openStyle);
        console.log(!openStyle);
    };

    const handleStyleonChange = (style: any) => {
        setSelectedStyle((prevSelectedType) => (prevSelectedType === style ? null : style));
    };

    const handleCreateCollection = async () => {
        try {
            const bodyRequest = {
                userID: user?.userID,
                nameOfCollection: nameOfCollection,
                typeOfCollection: selectedStyle,
                numberOfClothes: 0,
                collectionStatus: 'PRIVATE',
                imgUrl: imageUrlState

            }

            console.log('bodyRequest: ', bodyRequest);

            setIsLoading(true);
            const response = await api.post('/api/v1/collection/create-collection', bodyRequest, token);
            if (response.success === 200) {
                setMessage(response.message);
                setMessageAdded('Collection created.');
                Toast.show({
                    type: 'success',
                    text1: JSON.stringify(response.message),
                    position: 'top'
                });
                console.log(response.data);
                setIsLoading(false);
                setTimeout(() => {
                }, 1000)
            } else {
                dispatch(setOpenUpgradeRolesDialog(true));
                setIsOpen(false);
                setIsLoading(false);

            }
        } catch (error: any) {
            console.error('Error posting data:', error);
            Toast.show({
                type: 'error',
                text1: JSON.stringify(error.message),
                position: 'top'
            });
            setIsLoading(false);
        }
    }


    return (
        <View
            style={{ justifyContent: 'center', alignItems: 'center' }}
        >

            <Portal>

                <Dialog
                    visible={isOpen}
                    dismissable={false}
                    style={{ width: '80%', alignSelf: 'center', alignItems: 'center', borderWidth: 0, shadowColor: 'transparent', backgroundColor: backgroundColor }}
                >
                    <IconButton
                        icon="close"
                        size={20}
                        onPress={hideDialog}
                        style={{ top: 0, right: 0, position: 'absolute' }}
                        iconColor='white'
                    />
                    {/* <Image source={}></Image> */}

                    <View style={{ backgroundColor: purpleColor, width: '100%', alignContent: 'center', alignItems: 'center', borderTopStartRadius: 10, borderTopEndRadius: 10 }}>
                        <Dialog.Title style={{ justifyContent: 'center', alignItems: 'center', fontSize: 18, fontWeight: 'bold' }}>
                            Create Collection
                        </Dialog.Title>
                        <IconButton
                            icon="close"
                            size={20}
                            onPress={hideDialog}
                            style={{ top: 0, right: 0, position: 'absolute' }}
                        />

                        <View style={{ marginTop: 0 }}>
                            <Text style={[DialogStylesComponent.lableDropDown, {}]}>Name of Collecion</Text>
                            <TextInput
                                value={nameOfCollection}
                                onChangeText={text => setNameOfCollection(text)}
                                style={[DialogStylesComponent.buttondropDownStyle, { width: width * 0.5, backgroundColor: backgroundColor }]}
                                mode='outlined'
                                outlineStyle={{ display: 'none' }}
                                contentStyle={{ fontSize: 13 }}

                            />
                        </View>
                        <View style={{ marginTop: 10, marginBottom: 20 }}>
                            <Text style={DialogStylesComponent.lableDropDown}>Style</Text>
                            <TouchableOpacity onPress={handleOpenStyle}>
                                <View
                                    style={[
                                        DialogStylesComponent.buttondropDownStyle,
                                        {
                                            alignItems: 'center',
                                            alignContent: 'center',
                                            padding: '3%',
                                            width: width * 0.5,
                                            backgroundColor: backgroundColor

                                        },
                                    ]}
                                >
                                    <Text style={[{ paddingTop: 0, fontSize: 12, color: 'black' }]}>{selectedStyle ? selectedStyle : 'Choose a style'}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <Dialog.Content style={{ height: 'auto' }}>
                        <View style={DialogStylesComponent.pictureAreaCollection} >
                            <Image source={{ uri: imageUrlState }} style={DialogStylesComponent.picture}></Image>
                            <View style={DialogStylesComponent.iconUploadPicture}>
                                <AddImageButtonComponent width={9} height={9} isCollectionImage={true} iconColor={primaryColor}></AddImageButtonComponent>
                            </View>
                        </View>
                        
                    </Dialog.Content>

                    <View style={{ backgroundColor: backgroundColor, width: '100%', justifyContent: 'center', alignItems: 'center', borderBottomStartRadius: 10, borderBottomEndRadius: 10, marginTop: 20 }} >
                        <Button
                            mode='outlined'
                            contentStyle={Platform.OS === 'ios' ? { height: height * 0.045 } : { height: height * 0.04 }}
                            style={[DialogStylesComponent.buttonGroup_button, { backgroundColor: primaryColor, marginBottom: 20 }]}
                            labelStyle={[DialogStylesComponent.buttonGroup_button_lable,]}
                            onPress={handleCreateCollection}
                        >
                            <Text style={{ fontWeight: 'bold', fontSize: 13, color: 'black' }}>Create</Text>
                        </Button>
                        {messageAdded && (
                            <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', paddingBottom: 10 }}>
                                <Text style={{ fontSize: 17, fontWeight: 'bold', color: primaryColor }}>{messageAdded}</Text>
                            </View>
                        )}
                    </View>

                </Dialog>
                {/* Style */}
                <Dialog visible={openStyle} onDismiss={() => setOpenStyle(false)} style={{ backgroundColor: backgroundColor, width: width * 0.85, zIndex: 999 }}>
                    <Dialog.Title style={{ fontSize: 15 }}>Style</Dialog.Title>
                    <ScrollView style={{ height: 400 }}>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center', alignItems: 'center', marginLeft: 10, marginBottom: 20 }}>
                            {dropdownData.fashionStyles.map((style, key1) => (
                                <View key={style.value} style={{ flexDirection: 'row', marginBottom: 50, alignItems: 'center' }}>
                                    <View key={style.value} style={{ width: width * 0.40, height: 150, alignItems: 'center' }}>
                                        <View style={{ width: width * 0.3, height: 150, borderRadius: 20 }} >
                                            <Image source={{ uri: style.imgUrl }} style={{ width: width * 0.3, height: 150, borderRadius: 20 }} />
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, alignContent: 'flex-start' }}>
                                            {Platform.OS === 'ios' ? (
                                                <RadioButton.IOS
                                                    key={style.value}
                                                    value={style.label}
                                                    color={primaryColor}
                                                    status={selectedStyle === style.value ? 'checked' : 'unchecked'}
                                                    onPress={() => handleStyleonChange(style.value)}
                                                />
                                            ) : (
                                                <RadioButton.Android
                                                    key={style.value}
                                                    value={style.label}
                                                    color={primaryColor}
                                                    status={selectedStyle === style.value ? 'checked' : 'unchecked'}
                                                    onPress={() => handleStyleonChange(style.value)}

                                                />
                                            )}

                                            <Text style={{ fontSize: 13 }}>{style.label}</Text>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                    <Dialog.Actions>
                        <TouchableOpacity onPress={() => setOpenStyle(false)}>
                            <Text>Done</Text>
                        </TouchableOpacity>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <LoadingComponent spinner={isLoadingImage}></LoadingComponent>

        </View>

    );
};

export default CreateCollectionDialogComponents;
