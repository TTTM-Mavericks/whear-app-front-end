import { StyleSheet, Dimensions } from 'react-native';
import { backgroundColor } from '../../../root/Colors';


const { width, height } = Dimensions.get('window');
const containerPadding = 16;
export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH);

export const ITEM_HEIGHT = Math.round(50);

const UserListHoriziableStyleComponent = StyleSheet.create({
    container: {
        position: 'relative',
        borderRadius: 8,
        width: width * 0.9,
        // height: 100

    },
    avatar: {
        width: 100,
        height: 120,
        borderRadius: 8,
        marginRight: 10,
        marginBottom: 10,
        marginTop: 10
    },
    flatlist: {

    },
    listContainer: {
    },
    friendsTag: {
        position: 'absolute',
        left: 0,
        top: '25%',
        width: 50,
        height: 80,
        zIndex: 900,
        backgroundColor:'rgba(248,248,242, 0.7)',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomEndRadius: 30
    },
    username: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    usernameTxt: {
        fontWeight: '500',
        fontSize: 13
    },
    addBtn: {
        position: 'absolute',
        right: -5,
        top: 5,
        width: 20,
        height: 20,
        zIndex: 900,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    }

});

export default UserListHoriziableStyleComponent;
