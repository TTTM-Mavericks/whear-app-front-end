import * as React from 'react';
import { SafeAreaView, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { width } from '../../../root/ResponsiveSize';
import { backgroundColor, primaryColor } from '../../../root/Colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../root/RootStackParams';
import { useNavigation } from '@react-navigation/native';

interface chipGroupInterface {
    buttonsData?: {}[];
    style?: StyleProp<ViewStyle>;
}
type RouteNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;
const ChipGroupComponent: React.FC<chipGroupInterface> = ({style}) => {
    const navigation = useNavigation<RouteNavigationProp>();
    const [value, setValue] = React.useState('');

    return (
        <SafeAreaView style={[styles.container, style]}>
            <SegmentedButtons
                
                style={[styles.segmentedButtons, style]}
                theme={{ roundness: 0 }}
                value={value}
                onValueChange={setValue}
                buttons={[
                    {
                        value: 'all',
                        label: 'Style',
                        style: {
                            borderRadius: 0,
                            borderColor: 'transparent',
                            borderWidth: 0,
                            backgroundColor: backgroundColor,
                        },
                        checkedColor: 'black',
                        uncheckedColor: '#808991',
                    },
                    {
                        value: 'hotStore',
                        label: 'Hot',
                        style: {
                            borderRadius: 0,
                            borderColor: 'transparent',
                            borderWidth: 0,
                            backgroundColor: backgroundColor,

                        },
                        checkedColor: 'black',
                        uncheckedColor: '#808991',
                    },
                    {
                        value: 'events',
                        label: 'Events',
                        onPress: () => {navigation.navigate('Event')},
                        style: {
                            borderRadius: 0,
                            borderColor: 'transparent',
                            borderWidth: 0,
                            backgroundColor: backgroundColor,

                        },
                        checkedColor: 'black',
                        uncheckedColor: '#808991',
                    }, {
                        value: 'news',
                        onPress: () => {navigation.navigate('NewsScreen')},
                        label: 'News', style: {
                            borderRadius: 0,
                            borderColor: 'transparent',
                            borderWidth: 0,
                            backgroundColor: backgroundColor,

                        },
                        checkedColor: 'black',
                        uncheckedColor: '#808991',
                        
                    },
                ]}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width * 0.1,
        alignItems: 'center',
        marginTop: -10
    },
    segmentedButtons: {
        borderColor: 'transparent',
        borderWidth: 0,
        fontWeight: 'bold'
    },
});

export default ChipGroupComponent;
