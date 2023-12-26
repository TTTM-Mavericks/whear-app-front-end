import { StyleSheet, Dimensions } from 'react-native';
import { titleTextSize } from '../../../root/Texts';

const { width, height } = Dimensions.get('window');
const containerPadding = 16;

const SignInStylesComponent = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: containerPadding,
  },
  title: {
    fontSize: width * titleTextSize,
    marginBottom: 16,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  inputGroup: {
    width: 200,
  },
  input: {
    height: height * 0.01,
    width: width,
    padding: 8,
  },
  content: {
    fontSize: 15,
    marginBottom: 20,
    textAlign: 'right',
    marginRight: 10,
  }

});

export default SignInStylesComponent;
