import { Dimensions, StyleSheet } from 'react-native';
import { backgroundColor, grayText, primaryColor, secondaryColor } from '../../root/Colors';
import { ITEM_HEIGHT, ITEM_WIDTH } from '../../components/ListView/ListViewStyleComponent';
const { width, height } = Dimensions.get('window');
const containerPadding = 16;
const cardTextFontSize = 18;
const ChooseStyleYouLoveStyleScreen = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: containerPadding,
    backgroundColor: backgroundColor,
  },
  scrollView: {
    width: width,
    flex: 1,
    backgroundColor: backgroundColor,
  },
  scrollViewContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleView: {
    width: width - containerPadding * 2,
    paddingRight: 50,
    paddingBottom: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    lineHeight: 35,
  },
  linearBackground: {
    height: 80,
  },
  subTitle: {
    fontSize: 22,
    color: grayText,
    lineHeight: 33,
    marginTop: 10
  },
  iconCard: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  iconButton: {
    borderColor: 'white',
    borderWidth: 1,
  },
  buttonView: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  cardStyleContainer: {
    position: 'relative',
    // textAlign: 'center',
    // color: 'white',
    opacity: 0.7,
  },
  cardTextView: {
    position: 'absolute',
    bottom: ITEM_HEIGHT*0.5 - cardTextFontSize*0.5,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    width: ITEM_WIDTH,
  },
  cardText:{
    color: primaryColor,
    fontSize: cardTextFontSize,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  textDescription: {
    marginTop: 20,
    color: "#D4D4D4",
    width: 306,
    height: 100,
    fontSize: 28,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 33,
    letterSpacing: -1,
  },
});

export default ChooseStyleYouLoveStyleScreen;
