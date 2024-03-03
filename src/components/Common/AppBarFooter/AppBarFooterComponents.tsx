import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Drawer, FAB, IconButton, Portal } from 'react-native-paper';
import { Animated, View } from 'react-native';
import AppBarFooterStyleComponents from './AppBarFooterStyleComponents';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../root/RootStackParams';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { primaryColor } from '../../../root/Colors';



interface footerProperties {
    isHide?: boolean
    centerOnPress?: () => void;
    centerIcon?: string;
    urlCenterIcon?: string,
    centerLocalIcon?: string,

}

type RouteNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;

const AppBarFooterComponents: React.FC<footerProperties> = ({ isHide, centerIcon, urlCenterIcon, centerOnPress, centerLocalIcon }) => {

    const navigation = useNavigation<RouteNavigationProp>();

    const [value, setValue] = React.useState('');
    const [isFabGroupVisible, setFabGroupVisible] = React.useState(false);


    const scrollY = new Animated.Value(0);
    const handleNavigate = (dir: string) => {
        // navigation.navigate(dir)
    }
    const translateY = scrollY.interpolate({
        inputRange: [0, 50], // You can adjust the range based on your needs
        outputRange: [0, 50], // You can adjust the output range based on your needs
        extrapolate: 'clamp',
    });

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
    );

    const handleMoveToUserProfile = async () => {
        try {
            const userString = await AsyncStorage.getItem('userData');

            if (userString) {
                const user = JSON.parse(userString);
                const userID = user.userID;
                navigation.replace('UserProfile', { userID });
            } else {
                console.warn('User data not found in AsyncStorage.');
            }
        } catch (error) {
            console.error('Error retrieving user data from AsyncStorage:', error);
        }
    };

    const handleCreateNewCloth = () => {
        navigation.navigate('AddingClothesScreen');
    }


    const renderFabGroup = () => (
        <Portal>
            <FAB.Group
                open={isFabGroupVisible}
                icon={isFabGroupVisible ? 'close' : 'menu'}
                rippleColor={primaryColor}

                visible={false}
                actions={[
                    { icon: require('../../../assets/icon/brand.png'), style: { backgroundColor: primaryColor }, label: 'Hot stores', onPress: () => navigation.replace('HotStoreScreen') },
                    { icon: require('../../../assets/icon/events.png'), style: { backgroundColor: primaryColor }, label: 'Events', onPress: () => navigation.replace('Event') },
                    { icon: require('../../../assets/icon/news.png'), style: { backgroundColor: primaryColor }, label: 'News', onPress: () => navigation.replace('NewsScreen') },
                    { icon: require('../../../assets/icon/talking.png'), style: { backgroundColor: primaryColor }, label: 'Message', onPress: () => navigation.replace('MessageScreen') },
                    { icon: require('../../../assets/icon/heart.png'), style: { backgroundColor: primaryColor }, label: 'Collection', onPress: () => navigation.replace('Collections') },
                    { icon: require('../../../assets/icon/user.png'), style: { backgroundColor: primaryColor }, label: 'Profile', onPress: () => handleMoveToUserProfile() },
                ]}
                onStateChange={({ open }) => setFabGroupVisible(open)}
                onPress={() => {
                    if (isFabGroupVisible) {
                        // Handle FAB Group button press
                        console.log('FAB Group button pressed');
                    }
                }}
            />
        </Portal>
    );



    return (

        <Animated.View
            style={[
                AppBarFooterStyleComponents.footerContainer,
                { display: !isHide ? 'none' : 'flex' },
                ,

            ]}
        >
            <View
                style={[AppBarFooterStyleComponents.segmentedButtons,]}
            >
                <IconButton icon={require('../../../assets/icon/home.png')} size={22} style={AppBarFooterStyleComponents.button} onPress={() => navigation.replace('Home')} />
                <IconButton icon={require('../../../assets/icon/social-network.png')} size={22} style={AppBarFooterStyleComponents.button} onPress={() => navigation.replace('Social')} />
                <View style={AppBarFooterStyleComponents.rhombusContainer}>
                    <IconButton icon={centerIcon ? centerIcon : { uri: urlCenterIcon }} onPress={centerOnPress ? centerOnPress : handleCreateNewCloth} style={[AppBarFooterStyleComponents.button, { transform: [{ rotate: '-45deg' }] }]} />
                </View>
                <IconButton icon={require('../../../assets/icon/tshirt.png')} size={22} style={AppBarFooterStyleComponents.button} onPress={() => navigation.replace('RecommendOutfitScreen')} />
                {/* <IconButton icon={require('../../../assets/icon/heart.png')} size={22} style={AppBarFooterStyleComponents.button} onPress={() => navigation.replace('Collections')} /> */}
                {/* <IconButton icon={require('../../../assets/icon/user.png')} iconColor='#49454F' size={22} style={AppBarFooterStyleComponents.button} onPress={() => handleMoveToUserProfile()} /> */}
                <IconButton icon={require('../../../assets/icon/menu.png')} size={22} style={AppBarFooterStyleComponents.button} onPress={() => setFabGroupVisible(!isFabGroupVisible)} />

            </View>
            {renderFabGroup()}
        </Animated.View>

    )
};


export default AppBarFooterComponents;
