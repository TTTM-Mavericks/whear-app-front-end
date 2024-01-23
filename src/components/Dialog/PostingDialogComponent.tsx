import React, { useState, useEffect } from 'react';
import { ScrollView, View, Image, TouchableOpacity, ImageBackground, Animated, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard } from 'react-native';
import { Avatar, Button, Card, Chip, Dialog, IconButton, MD3Colors, Portal, Text, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import DialogStylesComponent from './DialogStyleComponent';
import { backgroundColor, primaryColor } from '../../root/Colors';
import { setOpenAddToCollectionsDialog, setOpenUpPostingDialog } from '../../redux/State/Actions';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../root/RootStackParams';
import { useNavigation } from '@react-navigation/native';
import { iconAvatarSize } from '../../root/Icon';
import { spanTextSize } from '../../root/Texts';


type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;

const MAX_LENGTH = 30;
const MAX_CHARACTERS_PER_LINE = 20;


const PostingDialogComponent = () => {
    /*-----------------UseState variable-----------------*/
    const [isOpen, setIsOpen] = React.useState(false);
    const [isAccepted, setIsAccepted] = React.useState(false);
    const navigation = useNavigation<SignInScreenNavigationProp>();
    const [textInput, setTextInput] = React.useState('');
    const [lengthText, setLengthText] = React.useState(0);



    /*-----------------Usable variable-----------------*/
    const openDialog = useSelector((state: any) => state.store.isOpenPostingDialog);
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
        dispatch(setOpenUpPostingDialog(false));
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
    return (
        <TouchableWithoutFeedback onPress={handleTouchablePress}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <View>
                    <Portal>
                        <Dialog
                            visible={isOpen}
                            style={DialogStylesComponent.postingDialogContainer}
                        >
                            <View
                                style={DialogStylesComponent.postingDialogContainer_title}
                            >
                                {/* <IconButton style={{ flex: 1, paddingLeft: height * 0.03, paddingBottom: width * 0.05 }} icon={'close'}></IconButton> */}
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000000' }}>Create new post</Text>
                            </View>
                            <View style={DialogStylesComponent.postingDialogContainer_header}>
                                <Avatar.Image size={iconAvatarSize} source={{ uri: 'https://scontent.fsgn1-1.fna.fbcdn.net/v/t39.30808-1/411970383_4067132546846769_7576527316672886889_n.jpg?stp=dst-jpg_p160x160&_nc_cat=100&ccb=1-7&_nc_sid=5740b7&_nc_eui2=AeFdH0Zl_x8UG__6xk9JqkvOTkdekksELqhOR16SSwQuqPp3MbXMtwIjMDfbg_FqItxdVm9YuwNtmnQDyMQUjHAn&_nc_ohc=L7I68-6qhyAAX-5tuGQ&_nc_ht=scontent.fsgn1-1.fna&oh=00_AfA1o72hPWbzg8h2O5RgMax4bXfv7tJRC-Y_aJ_gYse9Hw&oe=6599FDA5' }} />
                                <View style={{ marginLeft: 10, marginTop: 5 }}>
                                    <Text style={{ fontSize: spanTextSize, fontWeight: 'bold' }}>Nguyen Minh Tu</Text>
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <Avatar.Image size={20} style={{ backgroundColor: 'white' }} source={{ uri: 'https://cdn.iconscout.com/icon/free/png-512/free-earth-global-globe-international-map-planet-world-2-12510.png?f=webp&w=256' }}></Avatar.Image>
                                        <View style={{ height: 15, borderBlockColor: 'black', marginLeft: 5, marginTop: 3 }}>
                                            <Text style={{ fontSize: 13 }}>Public</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <Dialog.Content>
                                <View >
                                    <TextInput
                                        placeholder={'What are you thinking...'}
                                        mode='outlined'
                                        style={DialogStylesComponent.postingDialogContainer_textInput}
                                        outlineStyle={{ borderColor: backgroundColor }}
                                        onChangeText={handleTextChange}
                                        multiline

                                    />
                                </View>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <View>
                                    <Text>{lengthText} / {MAX_LENGTH}</Text>
                                </View>
                                <Button onPress={hideDialog}>Close</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                </View>
            </KeyboardAvoidingView >
        </TouchableWithoutFeedback>


    );
};

export default PostingDialogComponent;
