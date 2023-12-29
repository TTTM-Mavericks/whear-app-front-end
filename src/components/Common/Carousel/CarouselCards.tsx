import React, { ReactNode, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem';
import data from './Data';
import { width } from '../../../root/ResponsiveSize';


interface CarouselCardsProps {
    child?: ReactNode
}

const CarouselCards: React.FC<CarouselCardsProps> = ({ child }) => {
    const [index, setIndex] = useState<number>(0);
    const isCarousel = useRef<Carousel<any>>(null);

    return (
        <View style={styles.containerStyle}>
            <Carousel
                layout="tinder"
                layoutCardOffset={9}
                ref={isCarousel}
                data={data}
                renderItem={({ item, index }) => <CarouselCardItem item={item} index={index} />}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                onSnapToItem={(index) => setIndex(index)}
                useScrollView={true}
            />
            <Pagination
                dotsLength={data.length}
                activeDotIndex={index}
                carouselRef={isCarousel as any}
                dotStyle={styles.dotStyle}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                dotContainerStyle={styles.dotContainerStyle}
                tappableDots={false}
            />
            {child}

        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        marginTop: width*0.1,
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
        marginHorizontal: 5,
    }
})


export default CarouselCards;
