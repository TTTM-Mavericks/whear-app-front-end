import * as React from 'react';
import { Appbar } from 'react-native-paper';
import AppBarHeaderStylesComponent from './AppBarHeaderStyleComponent';
import { useNavigation } from '@react-navigation/native';
import { StyleProp, ViewStyle } from 'react-native';

interface appBarProps {
  backAction?: () => void;
  title?: string | React.ReactNode;
  icon?: string;
  iconChild?: React.ReactNode;
  styles?: StyleProp<ViewStyle>

}

const AppBarHeaderComponent: React.FC<appBarProps> = ({ backAction, title, icon, iconChild, styles }) => {
  const navigation = useNavigation();
  const _goBack = () => {
  };

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');

  return (
    <Appbar.Header style={[AppBarHeaderStylesComponent.container, styles]}>
      <Appbar.BackAction onPress={backAction} style={styles} />
      <Appbar.Content title={title} />
        <Appbar.Action icon={require('../../../assets/icon/loupe.png')}  />
        <Appbar.Action icon={require('../../../assets/icon/bell.png')} />
      {iconChild}
    </Appbar.Header>
  );
};

export default AppBarHeaderComponent;