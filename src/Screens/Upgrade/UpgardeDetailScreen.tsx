import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, Linking, Platform, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../root/RootStackParams';
import AppBarHeaderComponent from '../../components/Common/AppBarHeader/AppBarHeaderComponent';
import MaskedView from '@react-native-masked-view/masked-view';
import UpgradeStyleScreen from './UpgradeStyleScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { fourthColor, grayBackgroundColor, primaryColor, secondaryColor } from '../../root/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { height } from '../../root/ResponsiveSize';
import { ALERT_TYPE, Dialog, AlertNotificationRoot } from 'react-native-alert-notification';
import { setIsLogined } from '../../redux/State/Actions';
import { useDispatch } from 'react-redux';

type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;

const UpgardeDetailScreen = () => {
    const navigation = useNavigation<SignInScreenNavigationProp>();
    const [orderCode, setOrderCode] = useState('');
    const [checkoutUrl, setCheckoutURL] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [currency, setCurrency] = useState('')

    useEffect(() => {

        const fetchOrderCode = async () => {
            try {
                const storedOrderCode = await AsyncStorage.getItem('orderCode');
                const storedCheckOutURL = await AsyncStorage.getItem('checkoutUrl');
                const storedAmount = await AsyncStorage.getItem('amount')
                const storedDescription = await AsyncStorage.getItem('description')
                const storedCurrency = await AsyncStorage.getItem('currency')
                if (storedOrderCode && storedCheckOutURL && storedAmount && storedDescription && storedCurrency) {
                    setOrderCode(storedOrderCode);
                    setCheckoutURL(storedCheckOutURL);
                    setAmount(storedAmount);
                    setCurrency(storedCurrency)
                    setDescription(storedDescription)
                    await fetchAdditionalInfo(storedOrderCode);
                } else {
                    console.warn('Order code not found in AsyncStorage.');
                }
            } catch (error) {
                console.error('Error retrieving order code from AsyncStorage:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchAdditionalInfo = async (orderCode: string) => {
            try {
                // Fetch additional info based on the order code
                // const response = await fetch(YOUR_API_ENDPOINT/${orderCode});
                // const responseData = await response.json();
                // setAdditionalInfo(responseData);
            } catch (error) {
                console.error('Error fetching additional information:', error);
            }
        };

        fetchOrderCode();
    }, []);

    // Handle Function that go back to screen
    function handleGoBack(): void {
        navigation.goBack();
    }

    // Show the Success Box Dialog
    const showDialogSuccess = (link: string) => {
        Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Success',
            textBody: 'Congrats! Your payment have been successs',
            onPressButton() {
                Linking.openURL(JSON.parse(link)).then(() => {
                    // Hide the dialog after navigating to the next screen
                    Dialog.hide();
                }).catch((error) => {
                    console.error('Error opening URL:', error);
                });
            },
            button: 'Payment',
        });
    };


    // Show the Danger Box Dialog
    const showDialogFail = () => {
        Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Fail!',
            textBody: 'You cancel the payment process',
            button: 'Agree',
        })
    }

    // Open Link in Chrome
    const handleLinkPress = async (link: any) => {
        const supported = await Linking.canOpenURL(JSON.parse(link));
        if (supported) {
            // Show Alert When User disagrees or agrees to pay
            Alert.alert(
                'Do you want to finish upgrade',
                'Are you sure that you want to finish process of upgrade premium?',
                [
                    {
                        text: 'Cancel',
                        onPress: () => {
                            showDialogFail()
                        },
                    },
                    {
                        text: 'OK',
                        onPress: () => {
                            showDialogSuccess(link);
                        },
                    },
                ],
                { cancelable: false }
            );

        } else {
            console.error(`Don't know how to open Url`);
        }

        
    }

    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
          await AsyncStorage.removeItem('access_token');
          await AsyncStorage.removeItem('userData');
          // Optional: Perform any other logout-related actions
          console.log('Items cleared successfully');
          console.log('AsyncStorage cleared successfully');
          dispatch(setIsLogined(false));
          AsyncStorage.setItem('logined', 'false');
          setTimeout(() => {
            navigation.navigate('SignIn');
          }, 500)
        } catch (error) {
          console.error('Error clearing AsyncStorage:', error);
        }
      }


    return (
        <View style={{ backgroundColor: "white" }}>
            <AppBarHeaderComponent
                title={
                    <View>
                        <MaskedView
                            maskElement={
                                <Text style={UpgradeStyleScreen.titlePage}>Upgrade Detail</Text>
                            }
                        >
                            <LinearGradient
                                colors={[secondaryColor, primaryColor]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }}
                                style={UpgradeStyleScreen.linearBackground}
                            >
                                <Text style={{ opacity: 0 }}>Upgrade Detail</Text>
                            </LinearGradient>
                        </MaskedView>
                    </View>
                }
                backAction={handleGoBack}
            />
            {isLoading ? (
                <ActivityIndicator size="large" color={primaryColor} />
            ) : (
                <View style={UpgradeStyleScreen.listItems}>
                    <View style={styles.cardContainer}>
                        <View style={styles.card}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                <Text style={styles.orderText}>
                                    Your order has been saved successfully
                                </Text>
                            </View>
                            <Text style={styles.detailText}>Please check the order details below:</Text>

                            <View style={styles.orderDetails}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                    <Text style={[UpgradeStyleScreen.contentText, { fontSize: 15, fontWeight: 'bold' }]}>Description: </Text>
                                    <Text> {(JSON.parse(description))}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                    <Text style={[UpgradeStyleScreen.contentText, { fontSize: 15, fontWeight: 'bold' }]}>
                                        Order Code
                                    </Text>
                                    <View style={{ backgroundColor: primaryColor, marginLeft: 5, marginRight: 5, borderRadius: 10 }}>
                                        <Text style={[UpgradeStyleScreen.contentText, { fontSize: 15, fontWeight: 'bold', padding: 5, }]}>
                                            {orderCode}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                    <Text style={[UpgradeStyleScreen.contentText, { fontSize: 15, fontWeight: 'bold' }]}>Total Price:</Text>
                                    <View style={{ backgroundColor: primaryColor, marginLeft: 5, marginRight: 5, borderRadius: 10 }}>
                                        <Text style={[UpgradeStyleScreen.contentText, { fontSize: 15, fontWeight: 'bold', padding: 5, }]}>
                                            {amount + " " + (JSON.parse(currency))}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <Button
                        mode='outlined'
                        contentStyle={Platform.OS === 'ios' ? { height: height * 0.045 } : { height: height * 0.04 }}
                        style={[UpgradeStyleScreen.buttonGroup_button, { backgroundColor: primaryColor }]}
                        labelStyle={[UpgradeStyleScreen.buttonGroup_button_lable,]}
                        onPress={() => handleLinkPress(checkoutUrl)}
                    >
                        <Text style={{ fontWeight: '500', fontSize: 15 }}>Pay Now</Text>
                    </Button>
                    <View style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 50 }}>
                        <Text style={{ fontSize: 12, color: fourthColor }}>If you paid the transaction, you must logout to update new role!</Text>
                            <Button
                                mode='outlined'
                                contentStyle={Platform.OS === 'ios' ? { height: height * 0.045 } : { height: height * 0.04 }}
                                style={[UpgradeStyleScreen.buttonGroup_button, { backgroundColor: grayBackgroundColor, width: 140 }]}
                                labelStyle={[UpgradeStyleScreen.buttonGroup_button_lable,]}
                                onPress={() => handleLogout()}
                            >
                                <Text style={{ fontWeight: '500', fontSize: 15 }}>Logout</Text>
                            </Button>
                            <Text style={{ margin: 10 }}>Or</Text>
                            <Button
                                mode='outlined'
                                contentStyle={Platform.OS === 'ios' ? { height: height * 0.045 } : { height: height * 0.04 }}
                                style={[UpgradeStyleScreen.buttonGroup_button, { backgroundColor: primaryColor, width: 140, marginBottom: 200 }]}
                                labelStyle={[UpgradeStyleScreen.buttonGroup_button_lable,]}
                                onPress={() => navigation.navigate('Home')}
                            >
                                <Text style={{ fontWeight: '500', fontSize: 15 }}>Home</Text>
                            </Button>

                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        alignItems: 'center',
    },
    cardContainer: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    logo: {
        width: 80,
        height: 40,
        marginBottom: 10,
        resizeMode: 'contain',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    subtext: {
        fontSize: 14,
        color: '#666',
    },
    orderText: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
    },
    detailText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    orderDetails: {
        marginVertical: 10,
        alignItems: 'center',
    },
    button: {
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 15,
    },
    buttonLabel: {
        fontWeight: '500',
        fontSize: 15,
    },
    buttonText: {
        fontWeight: '500',
        fontSize: 15,
    },
});

export default UpgardeDetailScreen;

