import * as React from 'react';
import { ScrollView, View, Image, TouchableOpacity, ImageBackground, Animated } from 'react-native';
import { Button, Card, Chip, Dialog, Icon, IconButton, MD3Colors, Portal, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import DialogStylesComponent from './DialogStyleComponent';
import { backgroundColor, fourthColor, primaryColor } from '../../root/Colors';
import { setCreateCollectionDialog, setOpenAddToCollectionsDialog } from '../../redux/State/Actions';
import { LinearGradient } from 'expo-linear-gradient';
import { height, width } from '../../root/ResponsiveSize';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../root/RootStackParams';
import { useNavigation } from '@react-navigation/native';
import CreateCollectionDialogComponents from './CreateCollectionDialogComponents';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CollectionInterface, UserInterFace } from '../../models/ObjectInterface';
import api from '../../api/AxiosApiConfig';
import { ALERT_TYPE, AlertNotificationRoot } from 'react-native-alert-notification';
import { Dialog as DialogNoti } from 'react-native-alert-notification';



type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;

const AddingToCollectionComponent: React.FC<{ clothID?: any }> = ({ clothID }) => {
    /*-----------------UseState variable-----------------*/
    const [isOpen, setIsOpen] = React.useState(false);
    const [isAccepted, setIsAccepted] = React.useState(false);
    const navigation = useNavigation<SignInScreenNavigationProp>();
    const [isLoading, setIsLoading] = React.useState(false);
    const [userCollection, setUserCollection] = React.useState<CollectionInterface[]>([]);
    const [token, setToken] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [messageAdded, setMessageAdded] = React.useState('');
    const [reload, setReload] = React.useState(false);
    const [success, setSuccess] = React.useState(false);




    /*-----------------Usable variable-----------------*/
    const openDialog = useSelector((state: any) => state.store.isOpen);
    const openCreateCollectionDialog = useSelector((state: any) => state.store.isOpenCreateCollectionDialog);
    // const isAcceptedPolicy = useSelector((state: any) => state.auth.isAcceptedPolicy);
    const dispatch = useDispatch();
    const translateY = React.useRef(new Animated.Value(600)).current; // Adjust the initial position


    /*-----------------UseEffect-----------------*/
    React.useEffect(() => {
        if (openDialog) {
            setMessageAdded('')
            showAnimation()
            setIsOpen(openDialog);
        } else {
            hideAnimation()
        }
    }, [openDialog]);

    React.useEffect(() => {
        fetchData();
    }, [openDialog]);

    React.useEffect(() => {
        fetchData();
    }, [reload]);

    /*-----------------Function handler-----------------*/
    const fetchData = async () => {
        const tokenStorage = await AsyncStorage.getItem('access_token');
        const userStorage = await AsyncStorage.getItem('userData');
        setIsLoading(true);
        if (userStorage) {
            const userParse: UserInterFace = JSON.parse(userStorage);
            if (tokenStorage) {
                const tokenString = JSON.parse(tokenStorage);
                setToken(tokenString);
                console.log('userParse: ', tokenString);
                const params = {}
                try {
                    const getData = await api.get(`/api/v1/collection/get-all-by-userid?user_id=${userParse.userID}`, params, tokenString);
                    // const getData = await api.get(`/api/v1/clothes/get-clothes-by-id?clothes_id=1&based_userid=1`, params, tokenString);

                    if (getData.success === 200) {
                        setUserCollection(getData.data)
                        console.log('getData.data: ', getData.data);
                        setTimeout(() => {
                            setIsLoading(false);
                        }, 1000)
                    }
                    else {
                        console.log(getData.data);
                        setTimeout(() => {
                            setIsLoading(false);
                        }, 1000)
                    }
                } catch (error) {
                    console.error("An error occurred during data fetching:", error);
                }
            }
        }
    }
    const hideDialog = () => {
        dispatch(setOpenAddToCollectionsDialog(false));
        setIsOpen((prevIsOpen: any) => !prevIsOpen);
        // hideAnimation();
    };

    const handleAcceptedPolicy = () => {
        setIsAccepted((prevIsAccepted: any) => !prevIsAccepted);
        hideDialog();
    }

    const showDialogSuccess = (message: any, status: any, buttonTitle: any) => {
        if (status === 'Success') {
            DialogNoti.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: message,
                onPressButton() {
                    // navigation.navigate('UpgardeDetailScreen');
                    // DialogNoti.hide();
                },
                button: 'Payment',
            });
        } else {
            DialogNoti.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: message,
                onPressButton() {
                    // navigation.navigate('UpgardeDetailScreen');
                    // DialogNoti.hide();
                },
                button: 'Payment',
            });
        }
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

    const handleAddNewCollection = () => {
        hideDialog();
        dispatch(setCreateCollectionDialog(true));
        setIsOpen(false);
    }

    const handleAddClothToCollection = async (collectionId: any) => {
        try {
            const bodyRequest = {
                collectionID: collectionId,
                clothesID: clothID

            }

            console.log('bodyRequest: ', bodyRequest);

            setIsLoading(true);
            const response = await api.post('/api/v1/clothes/add-clothes-to-collection', bodyRequest, token);
            if (response.success === 200) {
                setMessageAdded('Added to Collection.');
                console.log(response.data);
                setIsLoading(false);
                setSuccess(true);
                setTimeout(() => {
                    setReload(true);
                    showDialogSuccess('Added cloth to collection', 'Success', 'Go Collections');
                }, 1000)
            } else {
                setIsOpen(false);
                setIsLoading(false);
                console.log(response.message);
                showDialogSuccess(response.message, 'DANGER', 'Close');

            }
        } catch (error: any) {
            console.error('Error posting data:', error);
            showDialogSuccess(error, 'DANGER', 'Close');
            setIsLoading(false);
        }

    }
    return (
        <View
        >
            <Portal>
                <Dialog
                    style={[
                        DialogStylesComponent.dialogContainer,
                        {
                            transform: [{ translateY }],
                            height: height * 0.55,
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            marginBottom: -50,
                            marginLeft: 0,
                            marginRight: 0,
                            borderRadius: 10
                        }]}
                    visible={isOpen}
                    dismissable={false}

                >
                    {/* <Dialog.Title > */}
                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: -width * 0.05 }}>
                        <IconButton
                            icon={'close'}
                            iconColor={MD3Colors.error50}
                            size={10}
                            mode='outlined'
                            style={{ borderBottomColor: 'black', borderBottomWidth: 1 }}
                            containerColor='white'
                            onPress={() => hideDialog()}
                        />
                    </View>

                    <View style={{ width: '100%', display: 'flex', flexDirection: 'row', marginTop: 10, marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ alignItems: 'flex-start' }}>
                            <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'black', paddingLeft: 25 }}>Save to collections</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', marginRight: width * 0.06 }}>
                            <Button
                                mode='outlined'
                                style={{ height: 30, backgroundColor: primaryColor, borderColor: primaryColor }}
                                labelStyle={{ fontSize: 12, flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', borderRadius: 8, marginBottom: 20 }}
                                onPress={handleAddNewCollection}
                            >
                                <Text style={{ marginTop: 3, marginRight: 15, marginLeft: 15, marginBottom: 3, fontWeight: 'bold', color: 'white' }}>New Collection</Text>

                            </Button>

                        </View>
                    </View>

                    {/* </Dialog.Title> */}
                    <Dialog.Content style={{ height: 400 }}>
                        {messageAdded && (
                            <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', marginTop: 10, marginBottom: 10 }}>
                                <Text style={{ fontSize: 17, fontWeight: 'bold', color: primaryColor }}>{messageAdded}</Text>
                            </View>
                        )}
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}>
                            <View style={DialogStylesComponent.groupCard}>

                                {userCollection.length > 0 ? userCollection.map((item) => (
                                    <Card style={DialogStylesComponent.cardContent} key={item.collectionID} onPress={() => handleAddClothToCollection(item.collectionID)}>
                                        <View style={DialogStylesComponent.cardCover}>
                                            <ImageBackground
                                                source={{ uri: item.imgUrl }}
                                                style={DialogStylesComponent.imageBackground}
                                            >
                                                <View style={DialogStylesComponent.gradientOverlay}>
                                                    <LinearGradient
                                                        colors={['rgba(255,85,85,0)', 'rgba(186,246,103,0.7)']} // Adjust transparency as needed
                                                        style={DialogStylesComponent.gradient}
                                                        start={{ x: 0, y: 0 }}
                                                        end={{ x: 1, y: 0 }}
                                                    />
                                                    <View style={{position: 'absolute' }}>
                                                        <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'black' }}>{item.nameOfCollection}</Text>
                                                    </View>
                                                </View>
                                            </ImageBackground>
                                        </View>
                                    </Card>
                                ))
                                    : (
                                        <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', marginTop: 10, marginBottom: 10 }}>
                                            <Text style={{ fontSize: 17, fontWeight: 'bold', color: fourthColor, justifyContent: 'center', alignItems: 'center', alignContent: 'center', }}>Do not have any collection!</Text>
                                        </View>
                                    )}
                            </View>
                            <View style={{
                                justifyContent: 'center',
                                alignContent: 'center',
                                alignItems: 'center',
                                marginTop: 50
                            }}>
                                <Button mode='outlined' style={{ width: width * 0.8, margin: 20, borderRadius: 8 }} textColor='black'  >
                                    <Text style={{ fontSize: 12.5, fontWeight: 'bold' }}>
                                        Upgrade Premium to have more
                                    </Text>
                                </Button>
                            </View>
                        </ScrollView>

                    </Dialog.Content>

                </Dialog>
            </Portal>
            <CreateCollectionDialogComponents></CreateCollectionDialogComponents>
        </View>

    );
};

export default AddingToCollectionComponent;
