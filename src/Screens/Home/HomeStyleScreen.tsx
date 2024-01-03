import { StyleSheet, Dimensions } from 'react-native';
import { backgroundColor } from '../../root/Colors';

const { width, height } = Dimensions.get('window');
const containerPadding = 16;

const HomeStylesComponent = StyleSheet.create({
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
  },
  filterGroup: {
    width: width*0.85,
    flexDirection: 'row',
    backgroundColor: backgroundColor,
    textAlign: 'left',
    alignItems: 'flex-start'
  }
});

export default HomeStylesComponent;
