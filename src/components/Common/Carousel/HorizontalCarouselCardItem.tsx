import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ImageSourcePropType } from 'react-native';
import { height } from '../../../root/ResponsiveSize';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

interface HorizontalCarouselItem {
  title: string;
  body: string;
  imgUrl: ImageSourcePropType;
}

interface HorizontalCarouselItemProps {
  item: HorizontalCarouselItem;
  index: number;
}

const HorizontalCarouselCardItem: React.FC<HorizontalCarouselItemProps> = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <Image source={item.imgUrl} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    height: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    borderRadius: 8,
    height: 200,

  },
  header: {
    color: '#222',
    fontSize: 28,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 20,
  },
  body: {
    color: '#222',
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default HorizontalCarouselCardItem;
