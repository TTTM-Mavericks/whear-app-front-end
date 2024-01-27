import { StyleSheet, Dimensions } from 'react-native';
import { buttonTextSize, titleTextDialogSize } from '../../root/Texts';
import { backgroundColor, grayBackgroundColor, primaryColor } from '../../root/Colors';



const { width, height } = Dimensions.get('window');
const containerPadding = 10;

const DialogStylesComponent = StyleSheet.create({
    dialogContainer: {
        height: height * 0.7,
        borderRadius: 10,
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
        flex: 1,
        height: height,
        width: width,
        margin: 0,
        bottom: 0,
        left: 0,
        right: 0,
        marginLeft: 0,
        marginBottom: 0,
        marginTop: height * 0.1,
        backgroundColor: backgroundColor,
        borderBottomEndRadius: 0,
        borderBottomStartRadius: 0,
        padding: containerPadding
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
    },
    buttonSubmit: {
        width: width * 0.1,
        height: 30,
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: primaryColor,
        marginRight: width * 0
    },
    contentButton: {
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        fontSize: buttonTextSize

    },

    // -----------------------Comments--------------------------

    
    commentDialogContent: {
        marginLeft: -20,
        width: width,
        marginBottom: 20
    },
    container_cardContainer: {
        width: width,
        marginLeft: 0,
        borderRadius: 0,
    },
    container_cardContent: {
        width: width,
        borderRadius: 0,

    },
    container_postingBar: {
        width: width,
        flexDirection: 'row',
        backgroundColor: 'white',

    },
    container_groupIconBar: {
        width: width * 0.8,
        height: height * 0.05,
        paddingTop: height,
        backgroundColor: 'blue',

    },

    commentContent: {
        width: width * 0.8,
        marginLeft: 10,
        marginTop: -5,
        borderRadius: 10,
        backgroundColor: grayBackgroundColor
    },
    clothesAddingArea: {
        width: width,
        flexDirection: 'row',
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',

    },
    pictureArea: {
        position: 'relative',
        width: width * 0.47,
        height: height * 0.4,
        borderWidth: 1,
        borderColor: "black",
        marginLeft: 2,
        marginRight: 1,

    },
    clothesPropsArea: {
        width: width * 0.47,
        height: height * 0.4,
        backgroundColor: 'yellow',
        marginLeft: 1,
        marginRight: 2
    },
    iconUploadPicture: {
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    commentActionContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    commentInput: {
        width: width * 0.75,
        backgroundColor: backgroundColor,
        height: 40,
        borderRadius: 50
    },



});

export default DialogStylesComponent;
