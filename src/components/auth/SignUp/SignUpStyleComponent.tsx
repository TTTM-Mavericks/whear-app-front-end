import { StyleSheet, Dimensions } from 'react-native';
import { backgroundColor, primaryColor } from '../../../root/Colors';
import { errorValidate, inputTextSize, titleTextSize } from '../../../root/Texts';

const { width, height } = Dimensions.get('window');
const containerPadding = 16;

const SignUpStylesComponent = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
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
    backgroundColor: 'transparent',
    fontSize: inputTextSize,
    marginBottom: 10
  },
  button: {
    marginTop: 20,
    backgroundColor: primaryColor
  },
  content: {
    fontSize: 15,
    textAlign: 'right',
    marginRight: 10,
    paddingLeft: 10,
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
    width: 40 * 3 + 10 * 2,
    height: 42,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonOption: {
    width: 40,
    height: 40,
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonMargin: {
    marginRight: 10, // Adjust the margin between buttons as needed
  },
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20, // Adjust the margin as needed
  },
  errorValidate: {
    color: errorValidate,
    marginLeft: 20
  },
  groupCheckbox: {
    flexDirection: 'row',
    marginLeft: -15
  },
  checkBoxText: {
    fontSize: inputTextSize,
    fontWeight: 'normal',
  }

});

export default SignUpStylesComponent;
