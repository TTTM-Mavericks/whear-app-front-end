import React, { ReactNode } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import CarouselCards from './CarouselCards'
import { Button } from 'react-native-paper';

interface childrenInterface {
    child?: ReactNode
}
const CarouselComponent: React.FC<childrenInterface> = ({ child }) => {
    return (
        <View style={styles.container}>
            <SafeAreaView >
                <CarouselCards child={child} />
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 50,
    },
});

export default CarouselComponent;
