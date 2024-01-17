import { Dimensions, StyleSheet } from "react-native";
import { backgroundColor, grayText } from '../../root/Colors';
const { width, height } = Dimensions.get('window');
const containerPadding = 16;

const HotStoreStyleScreen = StyleSheet.create({
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
})
export default HotStoreStyleScreen;