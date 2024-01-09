import * as React from 'react';
import { Appbar } from 'react-native-paper';
import AppBarHeaderStylesComponent from './AppBarHeaderStyleComponent';
import { useNavigation } from '@react-navigation/native';

interface appBarProps {
  backAction?: () => void;
  title?: string;
  icon?: string;
  iconChild?: React.ReactNode;

}

const AppBarHeaderComponent: React.FC<appBarProps> = ({ backAction, title, icon, iconChild }) => {
  const navigation = useNavigation();
  const _goBack = () => {
  };

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');

  return (
    <Appbar.Header style={AppBarHeaderStylesComponent.container}>
      <Appbar.BackAction onPress={backAction} />
      <Appbar.Content title={title} />
      {iconChild}
    </Appbar.Header>
  );
};

export default AppBarHeaderComponent;