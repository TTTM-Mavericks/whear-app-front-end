import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ImageSourcePropType } from 'react-native';
import { height } from '../../../root/ResponsiveSize';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

interface CarouselItem {
  title?: string;
  body?: string;
  imgUrl: string;
}

interface CarouselCardItemProps {
  item: CarouselItem;
  index: number;

}

const CarouselCardItem: React.FC<CarouselCardItemProps> = ({ item, index, }) => {

  return (
    <View style={styles.container}>

      <View style={{height: height*0.5}} key={index}>
        <Image source={{ uri: item.imgUrl }} style={styles.image} />

        <View>
          <Text style={styles.header}>{item.title}</Text>
          <Text style={styles.body}>{item.body}</Text>
        </View>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    shadowColor: '#000',
    height: height * 0.6,
    // shadowOpacity: 0.29,
    // shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height: height * 0.35,
  },
  header: {
    color: '#222',
    fontSize: 28,
    fontWeight: 'bold',
    paddingLeft: 20,
    },
  body: {
    color: '#222',
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default CarouselCardItem;
