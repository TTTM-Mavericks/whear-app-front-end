import { StyleSheet } from "react-native";
import { backgroundColor, primaryColor } from "../../root/Colors";
import { ITEM_HEIGHT, ITEM_WIDTH } from "../../components/ListView/ListViewStyleComponent";

const PADDING = 7;

const OnboardingStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: backgroundColor,
    },
    verticalMotion: {
      flex: 3,
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginLeft: -ITEM_WIDTH / 2,
    },
    motionColumn: { paddingHorizontal: 7 },
    logoContainer: {
      position: 'absolute',
      top: 0,
      left: PADDING,
      backgroundColor: backgroundColor,
      zIndex: 1,
      width: '100%',
      height: ITEM_HEIGHT * 0.8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      width: ITEM_WIDTH / 2.2,
      height: ITEM_HEIGHT / 1.5,
    },
    textContainer: {
      backgroundColor: backgroundColor,
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
      alignItems: 'center',
      marginTop: 100
    },
    getStartedBtn: {
      backgroundColor: primaryColor,
      padding: 10,
      borderRadius: 50,
      width: 250,
      marginVertical: 15,
    },
  });
  export { OnboardingStyle, PADDING}