import React, { useEffect, useState } from 'react';
import { View, Text, Platform, StyleProp, ViewStyle, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../root/RootStackParams';
import { useNavigation } from '@react-navigation/native';
import AppBarHeaderComponent from '../../components/Common/AppBarHeader/AppBarHeaderComponent';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import UpgradeStyleScreen from './UpgradeStyleScreen';
import { primaryColor, secondaryColor } from '../../root/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { TextInput } from 'react-native-paper';
import { PaymentInterface } from '../../models/ObjectInterface';
import api from '../../api/AxiosApiConfig';
import { height } from '../../root/ResponsiveSize';
import { Button } from 'react-native-paper';
import { ALERT_TYPE, Dialog, AlertNotificationRoot } from 'react-native-alert-notification';
import HorizontalCarouselComponent from '../../components/Common/Carousel/HorizontalCarouselComponent';
import { dataSlider } from '../../components/Common/Carousel/Data';
type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;

const UpgradeScreen = () => {
    const navigation = useNavigation<SignInScreenNavigationProp>();
    const [paymentStatus, setPaymentStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [accessToken, setAccessToken] = useState('');
    const [description, setDescription] = useState('Upgrade Premium');
    const [buyerName, setBuyerName] = useState('');
    const [buyerEmail, setBuyerEmail] = useState('');
    const [buyerPhone, setBuyerPhone] = useState('');
    const [items, setItems] = useState([{ name: "LV2" }]);
    const [cancelUrl, setCancelUrl] = useState('');
    const [returnUrl, setReturnUrl] = useState('');
    const [customerID, setCustomerID] = useState('1');
    const [cvv, setCvv] = useState('123');
    const [cardNumber, setCardNumber] = useState('12874536978');
    const [paymentResponse, setPaymentResponse] = useState<PaymentInterface>();

    // USEEFFECT
    useEffect(() => {
        // Get UserID From Local Storage
        const getUserID = async () => {
            try {
                const userString = await AsyncStorage.getItem('userData');
                if (userString) {
                    const user = JSON.parse(userString);
                    const userID = user.userID;
                    setCustomerID(userID);
                } else {
                    console.warn('User ID not found in AsyncStorage.');
                }
            } catch (error) {
                console.error('Error retrieving user id from AsyncStorage:', error);
            }
        };
        getUserID();
    }, []);

    // Get User Email from  AsyncStorage and Set it to the buyerEmail Field
    useEffect(() => {
        const getUserEmail = async () => {
            try {
                const userEmailString = await AsyncStorage.getItem('userData');
                if (userEmailString) {
                    const user = JSON.parse(userEmailString);
                    const userEmail = user.email;
                    setBuyerEmail(userEmail);
                } else {
                    console.warn('User ID not found in AsyncStorage.');
                }
            } catch (error) {
                console.error('Error retrieving user id from AsyncStorage:', error);
            }
        };
        getUserEmail();
    }, []);

    // Get UserName from Local Storage 
    useEffect(() => {
        const getUserName = async () => {
            try {
                const userNameString = await AsyncStorage.getItem('userData');
                if (userNameString) {
                    const user = JSON.parse(userNameString);
                    const userName = user.username;
                    setBuyerName(userName);
                } else {
                    console.warn('User ID not found in AsyncStorage.');
                }
            } catch (error) {
                console.error('Error retrieving user id from AsyncStorage:', error);
            }
        };
        getUserName();
    }, []);

    // Get Phone of user from Local Storage
    useEffect(() => {
        const getPhone = async () => {
            try {
                const PhoneString = await AsyncStorage.getItem('userData');
                if (PhoneString) {
                    const user = JSON.parse(PhoneString);
                    const phone = user.phone;
                    setBuyerPhone(phone);
                } else {
                    console.warn('User ID not found in AsyncStorage.');
                }
            } catch (error) {
                console.error('Error retrieving user id from AsyncStorage:', error);
            }
        };
        getPhone();
    }, []);


    // Get Access Token from Async Storage
    useEffect(() => {
        const fetchData = async () => {
            const tokenStorage = await AsyncStorage.getItem('access_token');
            if (tokenStorage) {
                const tokenString = JSON.parse(tokenStorage);
                setAccessToken(tokenString);
            }
        };
        fetchData();
    }, []);

    // Show the Success Box Dialog
    const showDialogSuccess = () => {
        Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Success',
            textBody: 'Congrats! you become a premium for our customer',
            onPressButton() {
                navigation.navigate('UpgardeDetailScreen');
                // Hide the dialog after navigating to the next screen
                Dialog.hide();
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

    //  HANDLE FUNCTIONS
    const handleUpgrade = async () => {
        setIsLoading(true);
        try {
            const paymentRequestBody = {
                description: `Upgrade Premium role`,
                buyerName: buyerName,
                buyerEmail: buyerEmail,
                buyerPhone: buyerPhone,
                items: items,
                cancelUrl: cancelUrl,
                returnUrl: returnUrl,
                customerID: customerID,
                cvv: cvv,
                cardNumber: cardNumber
            };

            const response = await api.post('/api/v1/payment/create-payment', paymentRequestBody);

            if (response.success === 200) {
                Toast.show({
                    type: 'success',
                    text1: 'Payment successful',
                    position: 'top'
                });
                setIsLoading(false);
                if (response.success === 200) {
                    setPaymentResponse(response.data);
                    // Save orderCode and CheckoutURL to Async Storage
                    AsyncStorage.setItem('orderCode', JSON.stringify(response.data.data.orderCode));
                    AsyncStorage.setItem('checkoutUrl', JSON.stringify(response.data.data.checkoutUrl));
                    AsyncStorage.setItem('amount', JSON.stringify(response.data.data.amount));
                    AsyncStorage.setItem('description', JSON.stringify(response.data.data.description));
                    AsyncStorage.setItem('currency', JSON.stringify(response.data.data.currency));

                    // Show Alert When User disagrees or agrees to pay
                    Alert.alert(
                        'Do you want to pay to upgrade',
                        'Are you sure that you want to upgrade premium?',
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
                                    // Show the alert and then navigate after a delay
                                    showDialogSuccess();
                                },
                            },
                        ],
                        { cancelable: false }
                    );
                } else {
                    console.error('Order code not found in response data');
                }
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Payment failed. Please try again.',
                    position: 'top'
                });
                setIsLoading(false);
            }
            setPaymentStatus('Payment successful!');
            console.log(response);
        } catch (error) {
            console.error('Error posting data:', error);
            Toast.show({
                type: 'error',
                text1: 'Payment failed. Please try again.',
                position: 'top'
            });
            setIsLoading(false);
        }
    };

    // GO BACK TO HOME SCREEN
    function handleGoBack(): void {
        navigation.navigate('Home');
    }

    return (
        <AlertNotificationRoot>
            <View style={{ backgroundColor: "white" }}>
                <AppBarHeaderComponent
                    title={
                        <View>
                            <MaskedView
                                maskElement={
                                    <Text style={[UpgradeStyleScreen.titlePage, { color: '#FF6347' }]}>Upgrade</Text>
                                }
                            >
                                <LinearGradient
                                    colors={['#A2DE52', '#5151C6']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={UpgradeStyleScreen.linearBackground}
                                >
                                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Upgrade</Text>
                                </LinearGradient>
                            </MaskedView>
                        </View>
                    }
                    backAction={handleGoBack}
                />
                <View style={UpgradeStyleScreen.listItems}>
                    <Text style={[UpgradeStyleScreen.titlePage, { color: '#568468' }]}>Add Payment Information</Text>
                    <View style={UpgradeStyleScreen.card}>
                        <View style={UpgradeStyleScreen.visaCard}>
                            <LinearGradient
                                colors={['#A2DE52', '#FFC41F']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={UpgradeStyleScreen.visaCardBackground}
                            >
                                <Text style={UpgradeStyleScreen.visaCardTitle}>Card Information</Text>
                                <Text style={UpgradeStyleScreen.visaCardInfo}>Card Holder Name: {buyerName}</Text>
                                <Text style={UpgradeStyleScreen.visaCardInfo}>Card Number: {cardNumber}</Text>
                                <Text style={UpgradeStyleScreen.visaCardInfo}>CVV: {cvv}</Text>
                                <Text style={UpgradeStyleScreen.visaText}>TTTM</Text>
                            </LinearGradient>
                        </View>
                    </View>
                    <TextInput
                        label="Name"
                        activeOutlineColor={primaryColor}
                        value={buyerName}
                        onChangeText={text => setBuyerName(text)}
                        style={UpgradeStyleScreen.input}
                        mode='outlined'
                        right={
                            <TextInput.Icon
                                icon="account"
                            />
                        }
                    />
                    <TextInput
                        label="Email"
                        activeOutlineColor={primaryColor}
                        value={buyerEmail}
                        onChangeText={text => setBuyerEmail(text)}
                        style={UpgradeStyleScreen.input}
                        mode='outlined'
                        right={
                            <TextInput.Icon
                                icon="email"
                            />
                        }
                    />
                    <TextInput
                        label="Phone"
                        value={buyerPhone}
                        activeOutlineColor={primaryColor}
                        onChangeText={text => setBuyerPhone(text)}
                        style={UpgradeStyleScreen.input}
                        mode='outlined'
                        aria-valuemin={12}
                        keyboardType='numeric'
                        right={
                            <TextInput.Icon
                                icon="phone"
                            />
                        }
                    />
                    <TextInput
                        label="CVV"
                        activeOutlineColor={primaryColor}
                        value={cvv}
                        onChangeText={text => {
                            setCvv(text.slice(0, 3));
                        }}
                        mode='outlined'
                        style={UpgradeStyleScreen.input}
                        keyboardType='numeric'
                        maxLength={3}
                        right={
                            <TextInput.Icon
                                icon="earth"
                            />
                        }
                    />
                    <TextInput
                        label="Card Number"
                        activeOutlineColor={primaryColor}
                        value={cardNumber}
                        onChangeText={text => {
                            setCardNumber(text.slice(0, 11));
                        }}
                        style={UpgradeStyleScreen.input}
                        mode='outlined'
                        keyboardType='numeric'
                        maxLength={11}
                        right={
                            <TextInput.Icon
                                icon="card"
                            />
                        }
                    />
                    <View style={UpgradeStyleScreen.paymentText}>
                        <Text style={{ color: "#568468" }}>Your payment detail are stored securely.</Text>
                        <Text style={{ color: "#568468" }}>By adding a card, you won't be charged yet.</Text>
                    </View>
                    <Button
                        mode='outlined'
                        contentStyle={Platform.OS === 'ios' ? { height: height * 0.045 } : { height: height * 0.04 }}
                        style={[UpgradeStyleScreen.buttonGroup_button, { backgroundColor: primaryColor }]}
                        labelStyle={[UpgradeStyleScreen.buttonGroup_button_lable,]}
                        onPress={() => handleUpgrade()}
                    >
                        <Text style={{ fontWeight: '500', fontSize: 15 }}>Save and Continue</Text>
                    </Button>
                </View>
            </View>
        </AlertNotificationRoot>
    );
};

export default UpgradeScreen;