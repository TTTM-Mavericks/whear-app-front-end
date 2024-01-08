import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { width } from '../../../root/ResponsiveSize';
import { backgroundColor, primaryColor } from '../../../root/Colors';

const ChipGroupComponent = () => {
    const [value, setValue] = React.useState('');

    return (
        <SafeAreaView style={styles.container}>
            <SegmentedButtons
                
                style={[styles.segmentedButtons]}
                theme={{ roundness: 0 }}
                value={value}
                onValueChange={setValue}
                buttons={[
                    {
                        value: 'all',
                        label: 'All',
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
