import { StyleSheet, Dimensions } from 'react-native';
import { backgroundColor } from '../../root/Colors';
import { ITEM_HEIGHT } from '../../components/Common/AppBarHeader/AppBarHeaderStyleComponent';
import { ITEM_WIDTH } from '../../components/ListView/ListViewStyleComponent';
import { inputTextSize } from '../../root/Texts';

const { width, height } = Dimensions.get('window');
const containerPadding = 16;

const UpgradeStyleScreen = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: containerPadding,
        backgroundColor: backgroundColor
    },
    scrollView: {
        width: width,
        flex: 1,
        backgroundColor: backgroundColor,

    },
    scrollViewContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: width * 0.1,
        marginBottom: 16,
    },
    listItems: {
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    input: {
        width: width * 0.9,
        borderColor: 'gray',
        fontSize: inputTextSize,
        backgroundColor: 'transparent',
        marginBottom: 10
    },
    iconCard: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    flatlist: {
        backgroundColor: backgroundColor,
        flex: 1,
        flexDirection: 'row',

    },
    homeSliderHorizotal: {
        width: width,
        height: 200
    },
    homeSliderHorizotalContent: {
        flexDirection: 'row',
        backgroundColor: backgroundColor,
        flex: 1,
        borderRadius: 8,
    },
    filterGroup: {
        width: width * 0.85,
        flexDirection: 'row',
        backgroundColor: backgroundColor,
        textAlign: 'left',
        alignItems: 'flex-start'
    },
    titlePage: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingTop: 12,
    },
    linearBackground: {
        height: ITEM_HEIGHT,
        width: ITEM_WIDTH,
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
    card: {
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginTop: -10
    },
    paymentText: {
        color: '#568468',
        marginBottom: 10,
    },
    visaCard: {
        borderRadius: 10,
        padding: 20,
        marginTop: 20,
    },
    visaCardBackground: {
        borderRadius: 10,
        textAlign: 'center',
        alignItems: 'center',
        width: width * 0.9,
        paddingTop: 40,
        paddingBottom: 20
    },
    visaCardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
        marginTop: -15
    },
    visaCardInfo: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
    },
    visaText: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
    },
    contentText: {
        fontSize: 13,
        marginBottom: 5,
        marginTop: 5,
        fontWeight: '400'
    }
});

export default UpgradeStyleScreen;