import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const containerPadding = 16;

const ButtonDefaultStyleComponent = StyleSheet.create({
    buttonArea: {
        alignContent: 'center',
        alignItems: 'center'
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

export default ButtonDefaultStyleComponent;
