
import React, { useEffect, useState } from 'react';
import { Animated, View } from 'react-native';
import { Easing } from 'react-native-reanimated';
import {
    ITEM_HEIGHT,
    ITEM_WIDTH,
} from '../../components/ListView/ListViewStyleComponent';
type ImagesProps = {
    imagesProps: string[];
    value: number;
    toValue: number;
    duration?: number;
}
const VerticalMotion = ({imagesProps, value, toValue, duration}: ImagesProps) => {
    const repeat = [0,1, 2, 3]
    const [images] = useState(imagesProps);
  
    const translateY = new Animated.Value(value );

    useEffect(() => {
      const animation = Animated.loop(
        Animated.timing(translateY, {
          toValue: toValue,
          duration: duration,
          useNativeDriver: true,
          easing: Easing.linear,
        }), 

      );

      animation.start();

    }, []);
    return (
      <View >
        {repeat.map((time) => (images.map((image, index) => (
          <View key={time + index}>
          <Animated.Image
            key={index}
            source={{uri: image}}
            style={{
              width: ITEM_WIDTH,
              height: ITEM_HEIGHT,
              transform: [{ translateY: translateY }],
              borderRadius: 10,
              marginVertical: 7,
            }}
          />
          </View>
        ))))}
        </View>
    );
}
export default VerticalMotion