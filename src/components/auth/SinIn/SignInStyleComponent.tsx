import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const containerPadding = 16;

const SignInStylesComponent = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: containerPadding,
  },
  title: {
    fontSize: width * 0.1,
    marginBottom: 16,
  },
  inputGroup: {
    width: 200,
  },
  input: {
    height: height * 0.05,
    width: width ,
    padding: 8,
  },
});

export default SignInStylesComponent;
