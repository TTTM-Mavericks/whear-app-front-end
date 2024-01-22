import * as React from 'react';
import { ScrollView, View, Image, TouchableOpacity, ImageBackground, Animated } from 'react-native';
import { Button, Card, Chip, Dialog, Icon, IconButton, MD3Colors, Portal, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import DialogStylesComponent from './DialogStyleComponent';
import { backgroundColor, primaryColor } from '../../root/Colors';
import { setOpenAddToCollectionsDialog } from '../../redux/State/Actions';
import { LinearGradient } from 'expo-linear-gradient';
import { height, width } from '../../root/ResponsiveSize';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../root/RootStackParams';
import { useNavigation } from '@react-navigation/native';

const collections = [
    {
        id: '1',
        name: 'Spring collection',
        imgUrl: 'https://picsum.photos/700'
    },
    {
        id: '2',
        name: 'Summer collection',
        imgUrl: 'https://picsum.photos/700'
    },
    {
        id: '3',
        name: 'Fall collection',
        imgUrl: 'https://picsum.photos/700'
    },
    {
        id: '4',
        name: 'Winter collection',
        imgUrl: 'https://picsum.photos/700'
    },
    {
        id: '5',
        name: 'Winter collection',
        imgUrl: 'https://picsum.photos/700'
    },
    {
        id: '6',
        name: 'Winter collection',
        imgUrl: 'https://picsum.photos/700'
    },
    {
        id: '7',
        name: 'Winter collection',
        imgUrl: 'https://picsum.photos/700'
    },
    {
        id: '8',
        name: 'Winter collection',
        imgUrl: 'https://picsum.photos/700'
    },
    {
        id: '9',
        name: 'Winter collection',
        imgUrl: 'https://picsum.photos/700'
    },
    {
        id: '10',
        name: 'Winter collection',
        imgUrl: 'https://picsum.photos/700'
    },

]

type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;

const AddingToCollectionComponent = () => {
    /*-----------------UseState variable-----------------*/
    const [isOpen, setIsOpen] = React.useState(false);
    const [isAccepted, setIsAccepted] = React.useState(false);
    const navigation = useNavigation<SignInScreenNavigationProp>();



    /*-----------------Usable variable-----------------*/
    const openDialog = useSelector((state: any) => state.store.isOpen);
    // const isAcceptedPolicy = useSelector((state: any) => state.auth.isAcceptedPolicy);
    const dispatch = useDispatch();
    const translateY = React.useRef(new Animated.Value(600)).current; // Adjust the initial position


    /*-----------------UseEffect-----------------*/
    React.useEffect(() => {
        if (openDialog) {
            showAnimation()
            setIsOpen(openDialog);
        } else {
            hideAnimation()
        }
    }, [openDialog]);

    /*-----------------Function handler-----------------*/
    const hideDialog = () => {
        dispatch(setOpenAddToCollectionsDialog(false));
        setIsOpen((prevIsOpen: any) => !prevIsOpen);
        // hideAnimation();
    };

    const handleAcceptedPolicy = () => {
        setIsAccepted((prevIsAccepted: any) => !prevIsAccepted);
        hideDialog();
    }



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
        navigation.navigate('Social')
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
                            style={{ borderColor: 'white' }}
                            containerColor='white'
                            onPress={() => hideDialog()}
                        />
                    </View>

                    <View style={{ width: '100%', display: 'flex', flexDirection: 'row', marginTop: 10, marginBottom: 0 }}>
                        <View style={{ alignItems: 'flex-start' }}>
                            <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'black', paddingLeft: 25 }}>Save to collections</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', marginRight: width * 0.06 }}>
                            <Button
                                mode='outlined'
                                style={{ height: 30, backgroundColor: primaryColor, borderColor: primaryColor }}
                                labelStyle={{ fontSize: 12, flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}
                                onPress={handleAddNewCollection}
                            >
                                <Text style={{ marginTop: 3, marginRight: 15, marginLeft: 15, marginBottom: 3, fontWeight: 'bold', color: 'white' }}>New Collection</Text>

                            </Button>

                        </View>
                    </View>

                    {/* </Dialog.Title> */}
                    <Dialog.Content style={{ height: 400 }}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}>
                            <View style={DialogStylesComponent.groupCard}>
                                {collections.map((item) => (
                                    <Card style={DialogStylesComponent.cardContent} key={item.id}>
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
                                                </View>
                                            </ImageBackground>
                                        </View>
                                    </Card>
                                ))}
                            </View>
                        </ScrollView>
                        
                    </Dialog.Content>
                    
                </Dialog>
            </Portal>
        </View>

    );
};

export default AddingToCollectionComponent;
