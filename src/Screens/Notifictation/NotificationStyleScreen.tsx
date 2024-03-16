import { StyleSheet, Dimensions } from 'react-native';
import { backgroundColor } from '../../root/Colors';
import { ITEM_HEIGHT } from '../../components/Common/AppBarHeader/AppBarHeaderStyleComponent';
import { ITEM_WIDTH } from '../../components/ListView/ListViewStyleComponent';

const { width, height } = Dimensions.get('window');
const containerPadding = 16;

const NotificationStyleScreen = StyleSheet.create({
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
    width: width * 0.9,
    display: 'flex',
    marginTop: 10,
    flex: 1,
    flexDirection: 'column',
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
  notificationItem: {
    height: height * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
    padding:5,
    marginBottom: 10,
    borderWidth:0.2,
  },
  circleImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  image: {
    width: 80,
    height: 50,
  },
  content: {
    marginLeft: 10,
  },
  description: {
    fontSize: 14,
  },
  time: {
    fontSize: 12,
    color: '#888',
  },
});

export default NotificationStyleScreen;
