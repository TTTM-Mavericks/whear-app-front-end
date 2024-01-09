import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { IconButton, SegmentedButtons } from 'react-native-paper';
import HomeScreen from '../../../Screens/Home/HomeScreen';
import SocialScreen from '../../../Screens/Social/SocialScreen';
import CollectionsScreen from '../../../Screens/Collections/CollectionsScreen';
import { Animated, SafeAreaView, View } from 'react-native';
import AppBarFooterStyleComponents from './AppBarFooterStyleComponents';
import { backgroundColor, primaryColor } from '../../../root/Colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../root/RootStackParams';



interface footerProperties {
    isHide?: boolean
    centerOnPress?: ()=> void;
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
                <IconButton icon={'home'} size={20} style={AppBarFooterStyleComponents.button} />
                <IconButton icon={'comment'} size={20} style={AppBarFooterStyleComponents.button} />
                    <IconButton icon={centerIcon ? centerIcon : {uri: urlCenterIcon} } onPress={centerOnPress} style={AppBarFooterStyleComponents.centerButton} />
                <IconButton icon={{ uri: 'null' }} size={20} style={[AppBarFooterStyleComponents.button, { backgroundColor: 'transparent', marginTop: 0 }]} />
                <IconButton icon={'heart'} size={20} style={AppBarFooterStyleComponents.button} />

                <IconButton icon={'menu'} size={20} style={AppBarFooterStyleComponents.button} />

            </View>
        </Animated.View>

    )
};


export default AppBarFooterComponents;
