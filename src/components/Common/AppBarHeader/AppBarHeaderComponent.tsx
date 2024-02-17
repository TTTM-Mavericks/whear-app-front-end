import * as React from 'react';
import { Appbar, Badge, Icon } from 'react-native-paper';
import AppBarHeaderStylesComponent from './AppBarHeaderStyleComponent';
import { useNavigation } from '@react-navigation/native';
import { StyleProp, View, ViewStyle } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../root/RootStackParams';
import { primaryColor } from '../../../root/Colors';

interface appBarProps {
  backAction?: () => void;
  title?: string | React.ReactNode;
  icon?: string;
  iconChild?: React.ReactNode;
  styles?: StyleProp<ViewStyle>;
  isHideIcon1?: boolean;
  isHideIcon2?: boolean;
  isLogo?: boolean;

}
type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;
const notificationCount = 3;

const AppBarHeaderComponent: React.FC<appBarProps> = (
  {
    backAction,
    title,
    icon,
    iconChild,
    styles,
    isHideIcon1,
    isHideIcon2,
    isLogo
  }) => {

  const navigation = useNavigation<ScreenNavigationProp>();

  const [numberOfNotification, setNumberOfNotification] = React.useState(3);

  const _goBack = () => {
  };

  const _handleSearch = () => {
    const keyWord: string = 'all'
    navigation.navigate('SearchScreen', { keyWord });
  };

  const _handleNotification = () => {
    navigation.navigate('NotificationScreen');
  };

  return (
    <Appbar.Header style={[AppBarHeaderStylesComponent.container, styles]}>
      {isLogo ? (
        <View>
          <Appbar.BackAction color='transparent' onPress={backAction} style={styles} />
          <Appbar.Action size={45} style={{ position: 'absolute', top: -10 }} color={primaryColor} icon={require('../../../assets/img/logo/logo.png')} />
        </View>
      ) : (

        <Appbar.BackAction onPress={backAction} style={styles} />
      )}
      <Appbar.Action iconColor='transparent' icon={require('../../../assets/icon/bell.png')} />
      <Appbar.Content style={{ alignItems: 'center', alignContent: 'center' }} title={title} />
      {isHideIcon1 ? (
        <Appbar.Action iconColor='transparent' icon={require('../../../assets/icon/bell.png')} />
      ) : (
        <Appbar.Action onPress={_handleSearch} style={isHideIcon1 && { display: 'none' }} icon={require('../../../assets/icon/loupe.png')} />
      )}
      <View style={{ position: 'relative' }}>
        <Appbar.Action onPress={_handleNotification} style={isHideIcon2 && { display: 'none' }} icon={require('../../../assets/icon/bell.png')} />
        {numberOfNotification > 0 && (
          <Badge style={{ position: 'absolute', top: 5, right: 5,  display: isHideIcon2 ? 'none' : 'flex' }}>{numberOfNotification}</Badge>
        )}
      </View>
      {iconChild}
    </Appbar.Header>
  );
};

export default AppBarHeaderComponent;