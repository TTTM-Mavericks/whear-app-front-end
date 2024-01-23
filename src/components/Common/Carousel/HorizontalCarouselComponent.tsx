import React, { ReactNode } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import HorizontalCarouselCards from './HorizontalCarouselCards';
import { backgroundColor } from '../../../root/Colors';

interface childrenInterface {
    child?: ReactNode,
    data: any
}
const HorizontalCarouselComponent: React.FC<childrenInterface> = ({ child, data }) => {
    return (
        <View style={styles.container}>
            <SafeAreaView >
                <HorizontalCarouselCards child={child} data={data} />
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 320,
        marginTop: -10,
        marginBottom: -20,
        backgroundColor: backgroundColor
    },
});

export default HorizontalCarouselComponent;
