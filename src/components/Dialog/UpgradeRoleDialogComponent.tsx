import * as React from 'react';
import { ScrollView, View, Image, TouchableOpacity, ImageBackground, Animated, Platform } from 'react-native';
import { Button, Card, Chip, Dialog, Icon, IconButton, MD3Colors, Portal, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import DialogStylesComponent from './DialogStyleComponent';
import { backgroundColor, grayBackgroundColor, primaryColor, purpleColor } from '../../root/Colors';
import { setOpenAddToCollectionsDialog, setOpenUpgradeRolesDialog } from '../../redux/State/Actions';
import { LinearGradient } from 'expo-linear-gradient';
import { height, width } from '../../root/ResponsiveSize';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../root/RootStackParams';
import { useNavigation } from '@react-navigation/native';


type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;

const UpgradeRoleDialogComponent = () => {
    /*-----------------UseState variable-----------------*/
    const [isOpen, setIsOpen] = React.useState(false);
    const [isAccepted, setIsAccepted] = React.useState(false);
    const navigation = useNavigation<SignInScreenNavigationProp>();



    /*-----------------Usable variable-----------------*/
    const openDialog = useSelector((state: any) => state.store.isOpenUpgradeRolesDialog);
    // const isAcceptedPolicy = useSelector((state: any) => state.auth.isAcceptedPolicy);
    const dispatch = useDispatch();
    const translateY = React.useRef(new Animated.Value(600)).current; // Adjust the initial position


    /*-----------------UseEffect-----------------*/
    React.useEffect(() => {
        if (openDialog) {
            showAnimation()
            setIsOpen(openDialog);
        } else {
            hideAnimation();
        }
    }, [openDialog]);

    /*-----------------Function handler-----------------*/
    const hideDialog = () => {
        dispatch(setOpenUpgradeRolesDialog(false));
        // setIsOpen((prevIsOpen: any) => !prevIsOpen);
        setIsOpen(false);
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

                    <View style={{ backgroundColor: purpleColor, width: '100%', height: 100, alignContent: 'center', alignItems: 'center', borderTopStartRadius: 10, borderTopEndRadius: 10 }}>
                        <Image source={require('../../assets/img/user_upgrade.png')} style={{ width: 200, height: 200, position: 'absolute', bottom: width * 0.0008 }}></Image>

                        <IconButton
                            icon="close"
                            size={20}
                            onPress={hideDialog}
                            style={{ top: 0, right: 0, position: 'absolute' }}
                        />
                        {/* <View style={{ bottom: width*0.06, right: width*0.15, position: 'absolute' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'black' }}>Premium member</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'black' }}>Only 19$ / month</Text>
                        </View> */}
                        <View style={{}}>

                        </View>
                    </View>
                    <Dialog.Content style={{ height: 270 }}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}>
                            <View style={DialogStylesComponent.groupCard}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                    <Text style={[DialogStylesComponent.contentText, { fontSize: 15, fontWeight: 'bold' }]}>
                                        For only
                                    </Text>
                                    <View style={{ backgroundColor: primaryColor, marginLeft: 5, marginRight: 5, borderRadius: 10 }}>
                                        <Text style={[DialogStylesComponent.contentText, { fontSize: 15, fontWeight: 'bold', padding: 5, }]}>
                                            79,000 VND/month
                                        </Text>
                                    </View>
                                    <Text style={[DialogStylesComponent.contentText, { fontSize: 15, fontWeight: 'bold' }]}>
                                        you can:
                                    </Text>
                                </View>
                                <Text style={DialogStylesComponent.contentText}>
                                    - Have the Premium icon.
                                </Text>
                                <Text style={DialogStylesComponent.contentText}>
                                    - Unlimit the number of days per week for outfit recommendations.
                                </Text>
                                <Text style={DialogStylesComponent.contentText}>
                                    - Extend number of collection from 3 to 5
                                </Text>
                                <Text style={DialogStylesComponent.contentText}>
                                    - Extend the number of clothes in each collection from 10 to 20.
                                </Text>
                                <Text style={DialogStylesComponent.contentText}>
                                    - Unlimited rating.
                                </Text>
                                <Text style={DialogStylesComponent.contentText}>
                                    - Customization options: Personalize your app experience.
                                </Text>

                            </View>
                        </ScrollView>
                    </Dialog.Content>

                    <View style={{ backgroundColor: backgroundColor, width: '100%', height: 70, justifyContent: 'center', alignItems: 'center', borderBottomStartRadius: 10, borderBottomEndRadius: 10 }} >
                        <Button
                            mode='outlined'
                            contentStyle={Platform.OS === 'ios' ? { height: height * 0.045 } : { height: height * 0.04 }}
                            style={[DialogStylesComponent.buttonGroup_button, { backgroundColor: primaryColor, marginBottom: 20 }]}
                            labelStyle={[DialogStylesComponent.buttonGroup_button_lable,]}
                        >
                            <Text style={{ fontWeight: 'bold', fontSize: 13, color: 'black' }}>Upgrade Premium</Text>
                        </Button>
                    </View>

                </Dialog>
            </Portal>
        </View>

    );
};

export default UpgradeRoleDialogComponent;
