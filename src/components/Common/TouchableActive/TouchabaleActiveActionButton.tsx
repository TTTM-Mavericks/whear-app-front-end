import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { width } from '../../../root/ResponsiveSize';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AnimatedPosition {
  x: Animated.SharedValue<number>;
  y: Animated.SharedValue<number>;
}

const useFollowAnimatedPosition = ({ x, y }: AnimatedPosition) => {
  const followX = useDerivedValue(() => {
    return withSpring(x.value);
  });

  const followY = useDerivedValue(() => {
    return withSpring(y.value);
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: followX.value }, { translateY: followY.value }],
    };
  });

  return { followX, followY, rStyle };
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SIZE = 50;

export default function TouchabaleActiveActionButton() {
  const [initX, setInitX] = useState(50);
  const [initY, setInitY] = useState(120);
  const translateX = useSharedValue(initX);
  const translateY = useSharedValue(initY);


  useEffect(() => {
    console.log('---------------------');
    const retrievePosition = async () => {
      try {
        const storedPosition = await AsyncStorage.getItem('touchablePosition');
        if (storedPosition !== null) {
          const parsedPosition = JSON.parse(storedPosition);
          console.log('Retrieved position: ', parsedPosition);
          setInitX(parsedPosition.x);
          setInitY(parsedPosition.y);
        }
      } catch (error) {
        console.error('Error retrieving position from AsyncStorage: ', error);
      }
    };

    // Call the function to retrieve the item
    retrievePosition();
  }, []);


  useEffect(() => {
    const func = async () => {
      const position = {
        x: initX,
        y: initY,
      };

      console.log('position: ', position);

      try {
        AsyncStorage.setItem('touchablePosition', JSON.stringify(position));
        console.log('AsyncStorage.setItem success');
      } catch (error) {
        console.error('AsyncStorage.setItem error:', error);
      }
    };

    func();
  }, [initX, initY])



  const context = useSharedValue({ x: 0, y: 0 });

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { x: translateX.value, y: translateY.value };
    })
    .onUpdate((event) => {
      translateX.value = event.translationX + context.value.x - 10;
      translateY.value = event.translationY + context.value.y - 10;
    })
    .onEnd((event) => {

      const position = {
        x: translateX.value,
        y: translateY.value,
      };

      runOnJS(setInitX)(position.x);
      runOnJS(setInitY)(position.y);

    });

  const {
    rStyle: rBlueCircleStyle,
  } = useFollowAnimatedPosition({
    x: translateX,
    y: translateY,
  });



  return (
    <View style={[styles.container, { top: initY, left: initX }]}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.circle, rBlueCircleStyle]} />
      </GestureDetector>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 99

  },
  circle: {
    position: 'absolute',
    height: SIZE,
    aspectRatio: 1,
    backgroundColor: 'blue',
    borderRadius: SIZE / 2,
  },
});
