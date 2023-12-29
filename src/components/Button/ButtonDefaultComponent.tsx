import React from 'react';
import { Button as PaperButton } from 'react-native-paper';
import { StyleProp, Text, ViewStyle } from 'react-native';

interface ButtonComponentProps {
  title?: string;
  width?: number;
  height: number;
  backgroundColor?: string;
  textColor?: string;
  mode?: "text" | "outlined" | "contained" | "elevated";
  style?: StyleProp<ViewStyle> | object; 
  onPress: () => void;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({ title, width, height, backgroundColor, textColor, mode, style, onPress }) => {
  const buttonStyle = {
    width,
    height,
    backgroundColor,
    ...(style as object),
  };

  return (
    <PaperButton mode={mode} onPress={onPress} style={buttonStyle}>
        <Text style={{color: textColor}}>{title}</Text>
    </PaperButton>
  );
};

export default ButtonComponent;
