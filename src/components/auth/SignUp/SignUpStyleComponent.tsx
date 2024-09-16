import { StyleSheet, Dimensions } from 'react-native';
import { backgroundColor, primaryColor } from '../../../root/Colors';
import { errorValidate, inputTextSize, titleTextSize } from '../../../root/Texts';

const { width, height } = Dimensions.get('window');
const containerPadding = 16;

const SignUpStylesComponent = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    padding: containerPadding,
    backgroundColor: 'transparent'
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
  },
  buttonGroup_button: {
    width: width * 0.9,
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

export default SignUpStylesComponent;
