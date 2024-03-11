import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ImageSourcePropType } from 'react-native';
import { height } from '../../../root/ResponsiveSize';
import { backgroundColor, fourthColor, grayBackgroundColor, primaryColor, secondaryColor, thirthColor } from '../../../root/Colors';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

interface HorizontalCarouselItem {
  title?: string;
  body?: string;
  imgUrl: any;
}

interface HorizontalCarouselItemProps {
  item: HorizontalCarouselItem;
  index: number;
}

const HorizontalCarouselCardItem: React.FC<HorizontalCarouselItemProps> = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <Image source={{ uri: item.imgUrl }} style={styles.image} />
      {item.body && (
        <View style={{ position: 'absolute', bottom: 0, width: '80%', backgroundColor: 'rgba(169, 169, 169, 0.7)', borderTopEndRadius: 10, borderBottomEndRadius: 10 }}>
          <Text style={styles.title}>{item.title && item.title.substring(0, 60)}</Text>
          <Text style={styles.body}>{item.body.substring(0, 80)}...</Text>
        </View>

      )
      }

    </View >
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
    fontSize: 12,
    paddingLeft: 20,
    paddingRight: 20,
    fontWeight: '500',
    paddingTop: 5,
    paddingBottom: 5
  },
  title: {
    color: backgroundColor,
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,

  }
});

export default HorizontalCarouselCardItem;
