import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem';
// import data from './Data';
import { width } from '../../../root/ResponsiveSize';


interface CarouselCardsProps {
    child?: ReactNode,
    dataObj: any,
}

const CarouselCards: React.FC<CarouselCardsProps> = ({ child, dataObj }) => {
    const [index, setIndex] = useState<number>(0);
    const isCarousel = useRef<Carousel<any>>(null);

    const [convertObj, setConvertObj] = useState([]);

    // useEffect(() => {
    //     const isStringArr: boolean = Array.isArray(dataObj);
    //     if (isStringArr) {
    //         const convertedData = dataObj.map((imgUrl: any,) => ({ imgUrl }));
    //         setConvertObj(convertedData)
    //     }
    // }, [])

    return (
        <View style={styles.containerStyle}>
            <Carousel
                layout="tinder"
                layoutCardOffset={9}
                ref={isCarousel}
                data={dataObj}
                renderItem={({ item, index }) => <CarouselCardItem item={item} index={index} />}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                onSnapToItem={(index) => setIndex(index)}
                useScrollView={true}
            />
            <Pagination
                dotsLength={dataObj.length}
                activeDotIndex={index}
                carouselRef={isCarousel as any}
                dotStyle={styles.dotStyle}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.45}
                dotContainerStyle={styles.dotContainerStyle}
                tappableDots={false}
            />
            {child}

        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    dotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.92)',
    },
    dotContainerStyle: {
    }
})


export default CarouselCards;
