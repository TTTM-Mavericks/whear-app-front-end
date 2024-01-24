import { Dimensions, StyleSheet } from 'react-native';
import { backgroundColor } from '../../root/Colors';
import { ITEM_HEIGHT, ITEM_WIDTH } from '../../components/Common/AppBarHeader/AppBarHeaderStyleComponent';
const { width } = Dimensions.get('window');
const containerPadding = 16;
const RowFlatListPadding = 10;

const HotStoreStyleScreen = StyleSheet.create({
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
  scrollView: {
    width: width,
    flex: 1,
    backgroundColor: backgroundColor,
  },
  flatListColumn: {
    flex: 1,
  },
  flatListRow: {
    marginTop: RowFlatListPadding,
    marginBottom: RowFlatListPadding,
    position: 'relative',
  },
  brandAvatar: {
    position: 'absolute',
    bottom: containerPadding + RowFlatListPadding,
    left: containerPadding + 10,
    zIndex: 1,
  },
  star : {
    position: 'absolute',
    bottom: containerPadding ,
    right: containerPadding + 10,
    zIndex: 1,
  },
  numberOfStar:{
    fontSize: 12,
    fontWeight: 'bold',
  },
  card: {
    borderRadius: 20,
  },
  cardImage: {
    borderRadius: 20,
  },
  divider: {
    width: width,
  },
});
export default HotStoreStyleScreen;
