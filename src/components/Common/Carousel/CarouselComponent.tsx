import React, { ReactNode } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import CarouselCards from './CarouselCards'
import { Button } from 'react-native-paper';

interface childrenInterface {
    child?: ReactNode,
    dataObj: any,


}
const CarouselComponent: React.FC<childrenInterface> = ({ child, dataObj }) => {
    return (
            <View style={{marginBottom: 20}}>
                    <CarouselCards child={child} dataObj={dataObj} />
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
