import { StyleSheet, Dimensions } from 'react-native';
import { backgroundColor } from '../../root/Colors';

const { width, height } = Dimensions.get('window');
const containerPadding = 16;

const SocailStyleScreen = StyleSheet.create({
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
  flatlist: {
    backgroundColor: backgroundColor,
    flex: 1,
    flexDirection: 'row',

  },
  postingEditorContainer:{
    width: width,
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  postingInput:{
    width: width*0.9,
    backgroundColor: backgroundColor,
    height: 30,
    borderRadius: 8
  },
});

export default SocailStyleScreen;
