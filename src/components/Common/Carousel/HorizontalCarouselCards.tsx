import React, { ReactNode, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem';
import { width } from '../../../root/ResponsiveSize';
import HorizontalCarouselCardItem from './HorizontalCarouselCardItem';


interface HorizontalCarouselCardProps {
    child?: ReactNode,
    data: any
}

const HorizontalCarouselCards: React.FC<HorizontalCarouselCardProps> = ({ child, data }) => {
    const [index, setIndex] = useState<number>(0);
    const isCarousel = useRef<Carousel<any>>(null);

    return (
        <View style={styles.containerStyle}>
            <Carousel
                layout="default"
                layoutCardOffset={9}
                ref={isCarousel}
                data={data}
                renderItem={({ item, index }) => <HorizontalCarouselCardItem item={item} index={index} />}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                onSnapToItem={(index) => setIndex(index)}
                useScrollView={true}
                loop={true}
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
        width: 7,
        height: 7,
        borderRadius: 90,
        marginHorizontal: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.92)',
    },
    dotContainerStyle: {
        marginHorizontal: 7,
    }
})


export default HorizontalCarouselCards;
