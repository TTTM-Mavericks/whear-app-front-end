import { StyleSheet, Dimensions } from 'react-native';
import { titleTextDialogSize } from '../../root/Texts';
import { backgroundColor } from '../../root/Colors';



const { width, height } = Dimensions.get('window');
const containerPadding = 16;

const DialogStylesComponent = StyleSheet.create({
    dialogContainer: {
        height: height * 0.7,
        borderRadius: 8,
        backgroundColor: backgroundColor,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        borderTopColor: 'black'
    },
    policyHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: -8
    },
    policySectionHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 0,
    },
    policyText: {
        width: width * 0.75,
        fontSize: 15,
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 20,
        marginRight: 10,
    },
    dialogContent: {
        width: '100%',
        backgroundColor: 'red'
    },
    groupCard: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%'
    },
    cardContent: {
        width: '47%',
        height: height * 0.18,
        marginTop: 15,
        backgroundColor: 'rgba(85,255,160,0.7)',
        position: 'relative'
    },

    cardCover: {
        overflow: 'hidden',
        borderRadius: 8,
        height: height * 0.18,

    },
    imageBackground: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    gradientOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradient: {
        flex: 1,
        borderRadius: 8,
        width: '100%',
    },

    // ----------------------------------------//
    postingDialogContainer: {
        height: height,
        width: width,
        margin: 0,
        bottom: 0,
        left: 0,
        right: 0,
        marginLeft: 0,
        marginBottom: 0,
        marginTop: height * 0.1,
        backgroundColor: backgroundColor
    },
    postingDialogContainer_textInput: {
        borderColor: backgroundColor,
        backgroundColor: backgroundColor,
        borderWidth: 0,
        marginRight: 0,
        marginLeft: 0
        // height: 800
    },
    postingDialogContainer_title: {
        width: '100%',
        height: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'

    },
    postingDialogContainer_header: {
        flexDirection: 'row',
        marginLeft: 20,
        marginBottom: 20
    }

});

export default DialogStylesComponent;
