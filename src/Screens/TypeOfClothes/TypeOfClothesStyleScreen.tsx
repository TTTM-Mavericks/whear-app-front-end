import { StyleSheet, Dimensions } from 'react-native';
import { backgroundColor } from '../../root/Colors';
import { ITEM_HEIGHT } from '../../components/Common/AppBarHeader/AppBarHeaderStyleComponent';
import { ITEM_WIDTH } from '../../components/ListView/ListViewStyleComponent';

const { width, height } = Dimensions.get('window');
const containerPadding = 16;

const TypeOfClothesStyleScreen = StyleSheet.create({
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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

});

export default TypeOfClothesStyleScreen;
