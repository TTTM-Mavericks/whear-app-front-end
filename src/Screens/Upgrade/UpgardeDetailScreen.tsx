import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../root/RootStackParams';
import AppBarHeaderComponent from '../../components/Common/AppBarHeader/AppBarHeaderComponent';
import MaskedView from '@react-native-masked-view/masked-view';
import UpgradeStyleScreen from './UpgradeStyleScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { primaryColor, secondaryColor } from '../../root/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;

const UpgardeDetailScreen = () => {
    const navigation = useNavigation<SignInScreenNavigationProp>();
    const [orderCode, setOrderCode] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    // USEEFFECT
    useEffect(() => {
        const fetchOrderCode = async () => {
            try {
                // Retrieve the order code from AsyncStorage
                const storedOrderCode = await AsyncStorage.getItem('orderCode');
                if (storedOrderCode) {
                    setOrderCode(storedOrderCode);
                    await fetchAdditionalInfo(storedOrderCode);
                }
                else {
                    console.warn('Order code not found in AsyncStorage.');
                }
            } catch (error) {
                console.error('Error retrieving order code from AsyncStorage:', error);
            } finally {
                // Set loading state to false after fetching data
                setIsLoading(false);
            }
        };

        const fetchAdditionalInfo = async (orderCode: string) => {
            try {
                // Fetch additional info based on the order code
                // Example fetch code
                // const response = await fetch(`YOUR_API_ENDPOINT/${orderCode}`);
                // const responseData = await response.json();
                // setAdditionalInfo(responseData);
            } catch (error) {
                console.error('Error fetching additional information:', error);
            }
        };

        fetchOrderCode();
    }, []);

    /*-----------------Function handler-----------------*/
    function handleGoBack(): void {
        navigation.goBack();
    }

    return (
        <View>
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
                                <Text style={{ opacity: 0 }}>Bebe</Text>
                            </LinearGradient>
                        </MaskedView>
                    </View>
                }
                backAction={handleGoBack}
            >
            </AppBarHeaderComponent>

            {isLoading ? (
                <ActivityIndicator size="large" color={primaryColor} />
            ) : (
                <View>
                    <Text >Payment Successful!</Text>
                    <Text>Order Code: {orderCode}</Text>
                    {/* Display additional information if available */}
                    {/* Example:
                    {additionalInfo && (
                        <View>
                            <Text>Additional Information:</Text>
                            <Text>{additionalInfo.someData}</Text>
                        </View>
                    )}
                    */}
                </View>
            )}
        </View>
    );
}

export default UpgardeDetailScreen;
