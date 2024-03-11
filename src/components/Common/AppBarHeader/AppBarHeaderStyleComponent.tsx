import { StyleSheet, Dimensions } from 'react-native';
import { backgroundColor } from '../../../root/Colors';


const { width, height } = Dimensions.get('window');
const containerPadding = 16;
export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH);

export const ITEM_HEIGHT = Math.round(50);

const AppBarHeaderStylesComponent = StyleSheet.create({
    container: {
        position: 'relative',
        backgroundColor: backgroundColor,
        borderRadius: 8,
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        elevation: 7,
        margin: 4,
        marginTop: -20
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
    },
    body: {
        color: '#222',
        fontSize: 13,
        paddingLeft: 20,
        paddingRight: 20,
    },
});

export default AppBarHeaderStylesComponent;
