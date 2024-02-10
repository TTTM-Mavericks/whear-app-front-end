import * as React from 'react';
import { ScrollView, View, Image, TouchableOpacity, ImageBackground, Animated } from 'react-native';
import { Button, Card, Chip, Dialog, Icon, IconButton, MD3Colors, Portal, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import DialogStylesComponent from './DialogStyleComponent';
import { backgroundColor, primaryColor } from '../../root/Colors';
import { setOpenAddToCollectionsDialog } from '../../redux/State/Actions';
import { LinearGradient } from 'expo-linear-gradient';
import { height, width } from '../../root/ResponsiveSize';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../root/RootStackParams';
import { useNavigation } from '@react-navigation/native';


type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;

const UpgradeRoleDialogComponent = () => {
    /*-----------------UseState variable-----------------*/
    const [isOpen, setIsOpen] = React.useState(false);
    const [isAccepted, setIsAccepted] = React.useState(false);
    const navigation = useNavigation<SignInScreenNavigationProp>();



    /*-----------------Usable variable-----------------*/
    const openDialog = useSelector((state: any) => state.store.isOpen);
    // const isAcceptedPolicy = useSelector((state: any) => state.auth.isAcceptedPolicy);
    const dispatch = useDispatch();
    const translateY = React.useRef(new Animated.Value(600)).current; // Adjust the initial position


    /*-----------------UseEffect-----------------*/
    React.useEffect(() => {
        if (openDialog) {
            showAnimation()
            setIsOpen(openDialog);
        } else {
            hideAnimation()
        }
    }, [openDialog]);

    /*-----------------Function handler-----------------*/
    const hideDialog = () => {
        dispatch(setOpenAddToCollectionsDialog(false));
        setIsOpen((prevIsOpen: any) => !prevIsOpen);
        // hideAnimation();
    };

    const handleAcceptedPolicy = () => {
        setIsAccepted((prevIsAccepted: any) => !prevIsAccepted);
        hideDialog();
    }



    const showAnimation = () => {

        Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    const hideAnimation = () => {
        Animated.timing(translateY, {
            toValue: 200,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
        });
    };

    const handleAddNewCollection = () => {
        hideDialog();
        navigation.navigate('Social')
    }
    return (
        <View
        >
            <Portal>
                <Dialog
                    visible={isOpen}
                    dismissable={false}
                >
                    {/* </Dialog.Title> */}
                    <Dialog.Content style={{ height: 400 }}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}>
                            <View style={DialogStylesComponent.groupCard}>
                                
                            </View>
                        </ScrollView>
                        
                    </Dialog.Content>
                    
                </Dialog>
            </Portal>
        </View>

    );
};

export default UpgradeRoleDialogComponent;
