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
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
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
    justifyContent: 'center',
    alignItems: 'center',
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

  },
  buttonGroup_button: {
    width: width * 0.925,
    height: height * 0.05,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
    borderWidth: 0,


  },
  buttonGroup_button_lable: {
    height: height * 0.035,
    marginTop: height * 0.04 * 0.75,
    fontSize: 20,
    fontWeight: '400',
    color: 'black',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8

  },

});

export default SignInStylesComponent;
