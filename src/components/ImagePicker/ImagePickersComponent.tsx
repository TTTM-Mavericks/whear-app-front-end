import React, { useState, useEffect } from 'react';
import { Platform, StyleProp, ViewStyle } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MediaTypeOptions } from 'expo-image-picker';
import { IconButton } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { saveImageUrl } from '../../redux/State/Actions';
interface ImagePickerProps {
  style?: StyleProp<ViewStyle>;
  iconButton?: string;
  urlIconButton?: string;
  onPress?: () => void;
  iconSize?: number;
  cutWidth?: number;
  cutHeight?: number;
}

const ImagePickerComponent: React.FC<ImagePickerProps> = ({
  style,
  iconButton,
  urlIconButton,
  onPress,
  iconSize,
  cutWidth,
  cutHeight,
}) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [cutWidth ? cutWidth : 9, cutHeight ? cutHeight : 16],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets![0].uri;
      setImageUrl(uri);
      // dispatch(saveImageUrl(uri));

    }
  };

  return (
    <IconButton
      style={style}
      size={iconSize}
      icon={iconButton ? iconButton : { uri: urlIconButton ? urlIconButton : '#' }}
      onPress={pickImage}
    />
  );
};

export default ImagePickerComponent;
