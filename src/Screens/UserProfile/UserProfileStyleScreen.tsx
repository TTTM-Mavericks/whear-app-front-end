import { StyleSheet, Dimensions } from 'react-native';
import { backgroundColor, grayBackgroundColor, primaryColor } from '../../root/Colors';

const { width, height } = Dimensions.get('window');
const containerPadding = 16;

const UserProfileStyleScreen = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    padding: containerPadding,
    backgroundColor: backgroundColor
  },
  header: {
    position: 'absolute',
    top: 540/20,
    left: 0,
    right: 0,
    width: width,
    height: 80,
    backgroundColor: 'transparent',
    flex: 1,
    zIndex: 100
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
  backGroundImg: {
    width: 540,
    height: 540,
    backgroundColor: primaryColor,
    borderRadius: 360,
    marginTop: -width * 1.1,
    marginBottom: 30


  },
  avatarImg: {
    position: 'absolute',
    zIndex: 10,
    flex: 10,
    width: 90,
    height: 90,
    backgroundColor: 'white',
    bottom: -30,
    left: '42%',
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  img: {
    width: 85,
    height: 85,
    borderRadius: 90,


  },
  iconImg: {
    position: 'absolute',
    bottom: -10,
    right: -10,
  },
  information: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  fullname: {
    fontWeight: '500'
  },
  levelUp: {
    fontWeight: '300',
  },
  buttonGroup: {
    width: width * 0.75,
    margin: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10

  },
  buttonGroup_button: {
    width: width * 0.4,
    height: height * 0.045,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
    borderWidth: 0,


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
  segmentedButtons: {
    borderColor: 'transparent',
    borderWidth: 0,
    fontWeight: 'bold',
    marginTop: 10,
    flexDirection: 'row',
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center'

  },
  button: {
    width: 30,
    height: 30,
    marginLeft: 10,
    marginRight: 10
  },

  segmentedButtonsNavbar: {
    height: 40,
    borderColor: 'transparent',
    borderWidth: 0,
    fontWeight: 'bold',
    marginTop: 5,
    flexDirection: 'row',
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',

  },

  navbarButton: {
    width: 30,
    height: 30,
    marginLeft: 30,
    marginRight: 30,
    position: 'absolute',
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
  upgradeBanner: {
    height: 35,
    marginTop: 20,
    borderRadius: 20,
    position: 'absolute',
    right: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  cardContentHistory: {
    width: width*0.9,
    height: 100,
    borderRadius: 8,
    backgroundColor: grayBackgroundColor,
    marginBottom: 10,
    marginTop: 20

  },
  cardContentStatus: {
    width: width*0.8*0.3,
    height: '100%',
    borderRadius: 8,
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardContentDetail: {
    justifyContent: 'center',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 8,
    paddingLeft: 10
  },
  cardContentDetailPost: {
    width: '70%',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 10
  },
  cardContentPost: {
    width: width*0.9,
    borderRadius: 8,
    backgroundColor: grayBackgroundColor,
    marginTop: 5

  },
  cardContentStatusPost: {
    width: width*0.8*0.3,
    height: 150,
    borderRadius: 8,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },



});

export default UserProfileStyleScreen;
