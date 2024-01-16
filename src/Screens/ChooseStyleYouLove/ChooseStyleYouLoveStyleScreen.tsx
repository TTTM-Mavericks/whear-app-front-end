import { Dimensions, StyleSheet } from "react-native";
import { backgroundColor, grayText } from '../../root/Colors';
const { width, height } = Dimensions.get('window');
const containerPadding = 16;

const ChooseStyleYouLoveStyleScreen = StyleSheet.create({
    container: {
        flex: 1,
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
    
    titleView:{
        width:width - containerPadding*2,
        paddingRight:50,
        paddingBottom: 20,
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        lineHeight: 35
        
    },
    linearBackground:{
        height: 80,
    },
    subTitle:{
        fontSize: 22,
        color: grayText,
        lineHeight: 33
    },
    iconCard: {
        position: 'absolute',
        bottom: 5,
        right: 5,
      },
    iconButton: {
        borderColor: 'white',
        borderWidth: 1,
    },
    buttonView: {
        paddingTop: 20,
        paddingBottom: 20,
    }
    
})

export default ChooseStyleYouLoveStyleScreen;