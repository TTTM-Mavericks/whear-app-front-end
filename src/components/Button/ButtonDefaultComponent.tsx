import React from 'react';
import { Button, Button as PaperButton } from 'react-native-paper';
import { Platform, StyleProp, Text, View, ViewStyle } from 'react-native';
import { primaryColor } from '../../root/Colors';
import ButtonDefaultStyleComponent from './ButtonDefaultStyleComponent';
import { height } from '../../root/ResponsiveSize';

interface ButtonComponentProps {
  title?: string;
  width?: number;
  backgroundColor?: string;
  textColor?: string;
  mode?: "text" | "outlined" | "contained" | "elevated";
  style?: StyleProp<ViewStyle> | object; 
  onPress: () => void;
}

const ButtonDefaultComponent: React.FC<ButtonComponentProps> = ({ title, width, backgroundColor, textColor, mode, style, onPress }) => {
  const buttonStyle = {
    width,
    height,
    backgroundColor,
    ...(style as object),
  };

  return (
    <View style={ButtonDefaultStyleComponent.buttonArea}>
        <Button
          mode='outlined'
          contentStyle={Platform.OS === 'ios' ? { height: height * 0.045 } : { height: height * 0.04 }}
          style={[ButtonDefaultStyleComponent.buttonGroup_button, { backgroundColor: primaryColor, marginBottom: 20 }, style]}
          labelStyle={[ButtonDefaultStyleComponent.buttonGroup_button_lable,]}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 13, color: 'black' }}>{title}</Text>
        </Button>
      </View>
  );
};

export default ButtonDefaultComponent;
