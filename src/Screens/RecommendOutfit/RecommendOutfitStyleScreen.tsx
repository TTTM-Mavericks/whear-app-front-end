import { StyleSheet, Dimensions, Platform } from 'react-native';
import { backgroundColor, primaryColor } from '../../root/Colors';
import { ITEM_HEIGHT } from '../../components/Common/AppBarHeader/AppBarHeaderStyleComponent';
import { ITEM_WIDTH } from '../../components/ListView/ListViewStyleComponent';

const { width, height } = Dimensions.get('window');
const containerPadding = 16;

const RecommendOutfitStyleScreen = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: containerPadding,
    backgroundColor: backgroundColor
  },
  scrollView: {
    width: width,
    flex: 1,
    backgroundColor: backgroundColor,

  },
  scrollViewContent: {
    // flex: 2,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  title: {
    fontSize: width * 0.1,
    marginBottom: 16,
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
    // backgroundColor: backgroundColor,
    backgroundColor: 'transparent' ,
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
    // flex: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  filterGroup: {
    width: width * 0.85,
    flexDirection: 'row',
    backgroundColor: backgroundColor,
    textAlign: 'left',
    alignItems: 'flex-start'
  },
  buttonGroup: {
    width: width,
    margin: 0,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    position: 'relative'

  },
  buttonGroup_button: {
    width: '45%',
    height: height * 0.04,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
    borderWidth: 0,
    flex: 1,
    position: 'relative'


  },
  buttonGroup_button_lable: {
    height: height * 0.04,
    marginTop: height * 0.04 * 0.75,
    fontSize: 13,
    fontWeight: '400',
    color: 'black',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8

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

  card: {
    marginRight: 8,

  },
  cardContainer: {
    backgroundColor: 'transparent' ,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    alignContent: 'center',
    alignItems: 'center',
    width: (width + 55) * 0.4,
    height: 300
  },
  chipContainer: {
    marginTop: -10,
    marginRight: 30,
    width: '100%'

  },
  segmentedButtons: {
    borderColor: 'transparent',
    borderWidth: 0,
    fontWeight: 'bold',
    marginRight: 50
  },
  outfitTag: {
    backgroundColor: primaryColor,
    width: 100,
    alignContent: 'center',
    alignItems: 'center',
    // flexDirection: 'row',

  },
  hiddenElement: {
    width: (width + 55) * 0.4,
    marginLeft: 10,
    height: 300, top: 0,
    marginTop: 0,
    backgroundColor: 'rgba(216,216,216, 0.93)',
    position: 'absolute',
    zIndex: 999,
    borderRadius: 8,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }

});

export default RecommendOutfitStyleScreen;
