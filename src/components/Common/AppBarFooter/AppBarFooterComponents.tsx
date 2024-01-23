import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import { Animated, View } from 'react-native';
import AppBarFooterStyleComponents from './AppBarFooterStyleComponents';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../root/RootStackParams';
import AsyncStorage from '@react-native-async-storage/async-storage';



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
                <IconButton icon={require('../../../assets/icon/home.png')} size={20} style={AppBarFooterStyleComponents.button} onPress={() => navigation.navigate('Home')} />
                <IconButton icon={require('../../../assets/icon/talking.png')} size={20} style={AppBarFooterStyleComponents.button} onPress={() => navigation.navigate('Social')} />
                <IconButton icon={centerIcon ? centerIcon : { uri: urlCenterIcon }} onPress={centerOnPress} style={AppBarFooterStyleComponents.centerButton} />
                <IconButton icon={{ uri: 'null' }} size={20} style={[AppBarFooterStyleComponents.button, { backgroundColor: 'transparent', marginTop: 0 }]} />
                <IconButton icon={require('../../../assets/icon/heart.png')} size={20} style={AppBarFooterStyleComponents.button} onPress={() => navigation.navigate('Collections')} />
                <IconButton icon={require('../../../assets/icon/user.png')} iconColor='#49454F' size={20} style={AppBarFooterStyleComponents.button} onPress={() => handleMoveToUserProfile()} />

            </View>
        </Animated.View>

    )
};


export default AppBarFooterComponents;
