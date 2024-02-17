import { StyleSheet, Dimensions } from 'react-native';
import { grayText } from '../../root/Colors';

const { width, height } = Dimensions.get('window');
const containerPadding = 16;

const IntroduceStylesComponent = StyleSheet.create({
  container: {
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    padding: containerPadding,
    flex: 1
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    zIndex: 0,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    transform: [{ scaleX: 3.5 }, { scaleY: 3 }],
  },
  buttonView: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  titleView: {
    width: width - containerPadding * 2,
    position: 'relative',
    marginLeft: width*0.15,
    marginBottom: 20
  },
  title2: {
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
});

export default IntroduceStylesComponent;
