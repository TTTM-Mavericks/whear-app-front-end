import React, { ReactNode } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import HorizontalCarouselCards from './HorizontalCarouselCards';
import { backgroundColor } from '../../../root/Colors';

interface childrenInterface {
    child?: ReactNode
}
const HorizontalCarouselComponent: React.FC<childrenInterface> = ({ child }) => {
    return (
        <View style={styles.container}>
            <SafeAreaView >
                <HorizontalCarouselCards child={child} />
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
