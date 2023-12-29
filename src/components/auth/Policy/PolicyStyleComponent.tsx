import { StyleSheet, Dimensions } from 'react-native';
import { backgroundColor, primaryColor } from '../../../root/Colors';
import { errorValidate, inputTextSize, titleTextSize } from '../../../root/Texts';

const { width, height } = Dimensions.get('window');
const containerPadding = 16;

const PolicyStylesComponent = StyleSheet.create({
    policyHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    policySectionHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    policyText: {
        width: width * 0.75,
        fontSize: 15,
        marginBottom: 16,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 20,
        marginRight: 10,
    },
    dialogContent: {
        width: width,
        marginLeft: -30
    }

});

export default PolicyStylesComponent;
