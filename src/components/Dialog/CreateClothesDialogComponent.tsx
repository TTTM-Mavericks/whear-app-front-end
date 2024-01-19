import React, { useState } from 'react';
import {
    View,
    Image,
    Animated,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
} from 'react-native';
import { Dialog, Portal, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import DialogStylesComponent from './DialogStyleComponent';
import { setOpenCreateClothesDialog } from '../../redux/State/Actions';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../root/RootStackParams';
import { useNavigation } from '@react-navigation/native';
import { width } from '../../root/ResponsiveSize';
import AddImageButtonComponent from '../ImagePicker/AddImageButtonComponent';


type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;


const MAX_LENGTH = 30;
const MAX_CHARACTERS_PER_LINE = 20;


const CreateClothesDialogComponent = () => {

    /*-----------------UseState variable-----------------*/
    const openDialog = useSelector((state: any) => state.store.isOpenCreateClothesDialog);
    const [isOpen, setIsOpen] = React.useState(openDialog);
    const [isAccepted, setIsAccepted] = React.useState(false);
    const navigation = useNavigation<SignInScreenNavigationProp>();
    const [textInput, setTextInput] = React.useState('');
    const [lengthText, setLengthText] = React.useState(0);
    const [countOpening, setCountOpening] = useState(0);
    const [showFullComment, setShowFullComment] = useState(false);
    const [imgUrl, setImgUrl] = useState('#');



    /*-----------------Usable variable-----------------*/

    const dispatch = useDispatch();
    const imageUrlState = useSelector((state: any) => state.store.imageCreatingUrl)
    const translateY = React.useRef(new Animated.Value(600)).current; // Adjust the initial position


    /*-----------------UseEffect-----------------*/
    React.useEffect(() => {
        console.log('dialog: ', openDialog);
        if (openDialog) {
            showAnimation()
            setIsOpen(true);
        } else {
            hideAnimation();
        }
    }, [openDialog]);




    /*-----------------Function handler-----------------*/
    const hideDialog = () => {
        dispatch(setOpenCreateClothesDialog(false));
        setIsOpen(false);
        setCountOpening(0);
        console.log('hide');
    };

    const handleAcceptedPolicy = () => {
        setIsAccepted((prevIsAccepted: any) => !prevIsAccepted);
        hideDialog();
    }


    /**
     * Show animation 
     */
    const showAnimation = () => {

        Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    /**
     * Hide animation
     */
    const hideAnimation = () => {
        Animated.timing(translateY, {
            toValue: 200,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
        });
    };

    /**
     * onChangeText
     */
    const handleTextChange = (text: any) => {
        const lines = text.split('\n');
        const truncatedLines = lines.map((line: any) => line.slice(0, MAX_CHARACTERS_PER_LINE));
        const truncatedText = truncatedLines.join('\n');

        if (lengthText + truncatedLines.length > MAX_LENGTH) {
        }
        else {
            setTextInput(truncatedText);
            setLengthText(lengthText + truncatedLines.length)
        }
    };


    const handleTouchablePress = () => {
        Keyboard.dismiss();
    };

    /**
     * Send comment
     * @param postID 
     */
    const handleSendComment = (postID: any) => {
        //TODO
    }

    const handleToggleComment = () => {
        setShowFullComment(!showFullComment);
    };

    return (
        <TouchableWithoutFeedback onPress={handleTouchablePress}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                aria-disabled
            >
                <View style={{ backgroundColor: 'white' }}>
                    <Portal>
                        <Dialog
                            visible={isOpen}
                            style={DialogStylesComponent.postingDialogContainer}
                            onDismiss={hideDialog}
                        >
                            <Dialog.Title style={{ marginTop: 10 }}>
                                <View style={{ flexDirection: 'row', width: width * 0.8, height: 'auto', marginTop: -20, paddingLeft: 10 }}>
                                    <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}>Create new cloth</Text>
                                </View>
                            </Dialog.Title>
                            <Dialog.Content style={DialogStylesComponent.clothesAddingArea}>
                                <View style={DialogStylesComponent.pictureArea} >
                                    <Image source={{ uri: imageUrlState }} style={DialogStylesComponent.pictureArea}></Image>
                                    <View style={DialogStylesComponent.iconUploadPicture}>
                                        <AddImageButtonComponent></AddImageButtonComponent>
                                    </View>
                                </View>
                                <View style={DialogStylesComponent.clothesPropsArea}>
                                    
                                </View>
                            </Dialog.Content>
                            <Dialog.Actions style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                                <></>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                </View>
            </KeyboardAvoidingView >
        </TouchableWithoutFeedback>


    );
};

export default CreateClothesDialogComponent;
