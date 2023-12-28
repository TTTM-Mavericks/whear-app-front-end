import { StyleSheet, Dimensions } from 'react-native';
import { backgroundColor, primaryColor } from '../../../root/Colors';
import { errorValidate, titleTextSize } from '../../../root/Texts';

const { width, height } = Dimensions.get('window');
const containerPadding = 16;

const SignInStylesComponent = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: containerPadding,
    backgroundColor: backgroundColor
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
    backgroundColor: 'transparent'
  },
  button: {
    marginTop: 20,
    backgroundColor: primaryColor
  },
  content: {
    fontSize: 15,
    marginBottom: 20,
    textAlign: 'right',
    marginRight: 10,
    textDecorationLine: 'underline',
  },
  optionSignIn: {
    fontSize: 15,
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
    marginRight: 10,
  },
  buttonGroupOption: {
    flexDirection: 'row',
    width: 40 * 3 + 6 * 8,
    height: 42,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', 
    borderColor: 'transparent'
  },
  buttonOption: {
    width: 40,
    height: 40,
    borderWidth: 0, 
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  buttonMargin: {
    marginRight: 20, 
  },
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20, 
    textAlign: 'center',
    justifyContent: 'center',
  },
  errorValidate: {
    color: errorValidate,
    marginLeft: 15,
    marginTop: 5,
    marginBottom: 5

  }

});

export default SignInStylesComponent;
