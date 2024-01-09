import { StyleSheet, Dimensions } from 'react-native';
import { backgroundColor, primaryColor } from '../../../root/Colors';


const { width, height } = Dimensions.get('window');
const containerPadding = 16;
export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH);

// export const SLIDER_HEIGHT = Dimensions.get('window').height;
export const ITEM_HEIGHT = Math.round(70);

const AppBarFooterStyleComponents = StyleSheet.create({
    footerContainer: {
        position: 'absolute',
        bottom: 0,

        backgroundColor: backgroundColor,
        borderRadius: 8,
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        // paddingBottom: 40,
        // shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        margin: 4,
        textAlign: 'center',
        alignContent: 'center',
        alignItems: 'center'
        // borderBottomColor: 'black'
    },
    image: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8

    },
    header: {
        color: '#222',
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft: 20,
        // paddingTop: 20,
    },
    body: {
        color: '#222',
        fontSize: 13,
        paddingLeft: 20,
        paddingRight: 20,
    },
    container: {
        flex: 1,
        width: width * 0.1,
        alignItems: 'center',
        marginTop: -10,
        textAlign: 'center',
        alignContent: 'center',
    },
    segmentedButtons: {
        borderColor: 'transparent',
        borderWidth: 0,
        fontWeight: 'bold',
        marginTop: 10,
        flexDirection: 'row',
        textAlign: 'center',
        alignContent: 'center',
        alignItems: 'center'

    },
    button: {
        width: 30,
        height: 30,
        marginLeft: 20,
        marginRight: 20
    },
    centerButton: {
        width: 50,
        height: 50,
        backgroundColor: primaryColor,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 90,
        marginBottom: width * 0.1 * 2,
        position: 'absolute',
        left: '36%',
        top: -width * 0.1 ,
        
    }

});

export default AppBarFooterStyleComponents;
