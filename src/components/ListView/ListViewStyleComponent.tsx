import { StyleSheet, Dimensions } from 'react-native';
import { backgroundColor } from '../../root/Colors';


const { width, height } = Dimensions.get('window');
const containerPadding = 16;
export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.37);

export const SLIDER_HEIGHT = Dimensions.get('window').height;
export const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT * 0.35);

const ListViewStylesComponent = StyleSheet.create({
    cardRow: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // marginBottom: 8,
    },
    card: {
        flex: 1,
        marginRight: 8,
    },
    container: {
        backgroundColor: backgroundColor,
        borderRadius: 8,
        position: 'relative',
        width: ITEM_WIDTH,
        // height: ITEM_HEIGHT,
        // paddingBottom: 40,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        margin: 8
    },
    image: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        borderRadius: 8,

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
    extendImage: {
        width: ITEM_WIDTH,
        height: 'auto',
    }
});

export default ListViewStylesComponent;
