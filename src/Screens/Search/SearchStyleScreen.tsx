import { StyleSheet, Dimensions } from 'react-native';
import { backgroundColor, primaryColor } from '../../root/Colors';
import { ITEM_HEIGHT } from '../../components/Common/AppBarHeader/AppBarHeaderStyleComponent';
import { ITEM_WIDTH } from '../../components/ListView/ListViewStyleComponent';

const { width, height } = Dimensions.get('window');
const containerPadding = 16;
const cardTextFontSize = 18;


const SearchStyleScreen = StyleSheet.create({
  container: {
    height: 'auto',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: containerPadding,
    backgroundColor: backgroundColor,
  },
  scrollView: {
    width: width,
    flex: 1,
    backgroundColor: backgroundColor,
    marginTop: 20

  },
  scrollViewContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titlePage: {
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
  input: {
    height: height * 0.05,
    width: width * 0.6,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
  iconCard: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  flatlist: {
    backgroundColor: backgroundColor,
    flex: 1,
    flexDirection: 'row',

  },
  homeSliderHorizotal: {
    width: width,
    height: 200
  },
  homeSliderHorizotalContent: {
    flexDirection: 'row',
    backgroundColor: backgroundColor,
    flex: 1,
    borderRadius: 8,
  },
  filterGroup: {
    width: width * 0.85,
    flexDirection: 'row',
    backgroundColor: backgroundColor,
    textAlign: 'left',
    alignItems: 'flex-start'
  },
  postingInput: {
    width: width * 0.9,
    backgroundColor: backgroundColor,
    height: 30,
    borderTopEndRadius: 20
  },
  mostSearchKeyword: {
    position: 'relative',
    marginTop: 10,
    width: width * 0.9,

  },
  segmentedButtonsNavbar: {
    height: 40,
    position: 'relative',
    borderColor: 'transparent',
    borderWidth: 0,
    fontWeight: 'bold',
    marginTop: 5,
    flexDirection: 'row',
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    zIndex: 1,

  },
  textStyleCardType: {
    position: 'absolute',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: primaryColor,
    fontWeight: 'bold',
    fontSize: 40
  },
  cardTextView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    alignItems: 'center',
    width: ITEM_WIDTH,
    alignContent: 'center',
    backgroundColor : 'rgba(175,170,175, 0.3)',
    borderBottomStartRadius: 8,
    borderBottomEndRadius: 8
  },
  cardText: {
    color: primaryColor,
    fontSize: cardTextFontSize,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10

  },

});

export default SearchStyleScreen;
