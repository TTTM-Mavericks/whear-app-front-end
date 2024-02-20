import { Dimensions, StyleSheet } from 'react-native';
import { backgroundColor } from '../../root/Colors';
import {
  ITEM_HEIGHT,
  ITEM_WIDTH,
} from '../../components/Common/AppBarHeader/AppBarHeaderStyleComponent';
const { width, height } = Dimensions.get('window');
const containerPadding = 16;
const EventStyleScreen = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: containerPadding,
    backgroundColor: backgroundColor,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingTop: 12,
    height: ITEM_HEIGHT,
  },
  linearBackground: {
    height: ITEM_HEIGHT,
    width: ITEM_WIDTH,
  },
  event__view: {
    marginVertical: 10,
    alignItems: 'center',
  },
  envent__card: {
    width: 300,
    height: 300,
    borderRadius: 30,
    resizeMode: 'contain',
  },
  scroll__view: {
    width: width,
    flex: 1,
    backgroundColor: backgroundColor,
    paddingHorizontal: containerPadding,
  },
  chip__filter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width,
    alignItems: 'flex-start',
    marginVertical: 3,
  },
  chip: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
});
export default EventStyleScreen;
