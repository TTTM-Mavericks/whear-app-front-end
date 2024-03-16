import { StyleSheet, Dimensions} from 'react-native';
import { primaryColor, backgroundColor, grayText} from '../../root/Colors'; 
import { ITEM_HEIGHT } from '../../components/Common/AppBarHeader/AppBarHeaderStyleComponent';
import { ITEM_WIDTH } from '../../components/ListView/ListViewStyleComponent';

const containerPadding = 26;
const { width, height } = Dimensions.get('window');
export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ListUserStyleScreen = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: containerPadding,
    backgroundColor: backgroundColor
  },
  title: {
    fontSize: width * 0.1,
    marginBottom: 16,
  },
  titlePage: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingTop: 20,
    height: ITEM_HEIGHT,
  },
  flatListContent: {
    paddingLeft: 20,
    paddingTop: 10 
  },
  separator: {
    height: 10,
    backgroundColor: 'transparent',
  },
  acceptButton: {
    backgroundColor: primaryColor,
    colors:'black',
    borderRadius: 8,
  },
  rejectButton: {
    marginLeft: 10, 
    backgroundColor: grayText,
    colors:'black',
    borderRadius: 8,
  },
  
  linearBackground: {
    height: ITEM_HEIGHT,
    width: ITEM_WIDTH,
  },
});
