import React, { useState, useEffect, ReactNode } from 'react';
import { ScrollView, View, Image, TouchableOpacity, ImageBackground, Animated, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard } from 'react-native';
import { Avatar, Button, Card, Chip, Dialog, IconButton, MD3Colors, Portal, Text, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import DialogStylesComponent from './DialogStyleComponent';
import { backgroundColor, grayBorderColor, primaryColor } from '../../root/Colors';
import { setOpenAddToCollectionsDialog, setOpenCommentsDialog, setOpenUpPostingDialog } from '../../redux/State/Actions';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../root/RootStackParams';
import { useNavigation } from '@react-navigation/native';
import { iconAvatarPostingSize, iconAvatarSize } from '../../root/Icon';
import { spanTextSize } from '../../root/Texts';
import { height, width } from '../../root/ResponsiveSize';


type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;

interface CommentsDataProperties {
    comments: Object[];
    postId: string;
    commentsChild?: ReactNode;

}

const MAX_LENGTH = 30;
const MAX_CHARACTERS_PER_LINE = 20;


const CommentsDetailDialogComponent: React.FC<CommentsDataProperties> = ({ comments, postId, commentsChild }) => {

    /*-----------------UseState variable-----------------*/
    const openDialog = useSelector((state: any) => state.store.isOpenCommentsDialog);
    const [isOpen, setIsOpen] = React.useState(openDialog);
    const [isAccepted, setIsAccepted] = React.useState(false);
    const navigation = useNavigation<SignInScreenNavigationProp>();
    const [textInput, setTextInput] = React.useState('');
    const [lengthText, setLengthText] = React.useState(0);
    const [openCommentsDialogItemId, setOpenCommentsDialogItemId] = useState<{ [key: string]: boolean }>({});
    const [commentPosting, setCommentPosting] = useState('');
    const [countOpening, setCountOpening] = useState(0);
    const [showFullComment, setShowFullComment] = useState(false);



    /*-----------------Usable variable-----------------*/

    const dispatch = useDispatch();
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

    // React.useEffect(() => {
    //     if (openDialog) {
    //         dispatch(setOpenCommentsDialog(false));
    //     }
    // }, [])



    /*-----------------Function handler-----------------*/
    const hideDialog = () => {
        dispatch(setOpenCommentsDialog(false));
        setIsOpen(false);
        setCountOpening(0);
        console.log('hide');
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

    function handleSendComment(postID: any): void {
        throw new Error('Function not implemented.');
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
                <View style={{ height: height * 2, backgroundColor: 'white' }}>
                    <Portal>

                        <Dialog
                            visible={isOpen}
                            style={DialogStylesComponent.postingDialogContainer}
                            onDismiss={hideDialog}
                        >
                            <Dialog.Title style={{ marginTop: 10 }}>
                                <View style={{ flexDirection: 'row', width: width * 0.8, height: 'auto', marginTop: -20, paddingLeft: 10 }}>
                                    <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}>Comments</Text>
                                </View>
                            </Dialog.Title>
                            <Dialog.Content style={{ marginTop: -10 }}>
                                <ScrollView
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                    style={DialogStylesComponent.commentDialogContent} >
                                    {/* {commentsChild} */}

                                    <View style={[DialogStylesComponent.container_postingBar, { flexDirection: 'column' }]}>

                                        {comments.map((comment: any, key) => (
                                            <View key={comment.commentID} style={[DialogStylesComponent.container_postingBar, { marginTop: 20 }]}>
                                                <View key={comment.commentID} style={{ flexDirection: 'row', width: width * 0.8, height: 'auto' }}>
                                                    {/* <Avatar.Image
                                                        size={iconAvatarPostingSize * 0.8}
                                                        source={{ uri: comment.user.imgUrl ? comment.user.imgUrl : 'fg' }}
                                                        style={{ marginLeft: 10 }} /> */}
                                                    <View key={comment.commentID} style={DialogStylesComponent.commentContent}
                                                    >
                                                        <View key={comment.commentID} style={{ padding: 10 }}>
                                                            <Text
                                                                style=
                                                                {
                                                                    {
                                                                        fontWeight: 'bold',
                                                                        paddingTop: -iconAvatarPostingSize * 1
                                                                    }
                                                                }
                                                            >
                                                                Nguyen Minh Tu
                                                            </Text>
                                                            <Text style={{ fontSize: spanTextSize * 0.8 }}>{comment.date.toLocaleString()}</Text>
                                                            <Text>

                                                                {showFullComment ? comment.content : comment.content.substring(0, 100) + '...'}
                                                                {comment.content.length > 100 && (
                                                                    <Text
                                                                        onPress={handleToggleComment}
                                                                        style={{ color: 'black', fontSize: 13, textDecorationLine: 'underline', marginLeft: 10 }}
                                                                    >
                                                                        {showFullComment ? 'See less' : 'See more'}
                                                                    </Text>
                                                                )}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        ))}
                                    </View>




                                </ScrollView>
                            </Dialog.Content>
                            <Dialog.Actions style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ width: width * 0.8, height: 'auto', paddingTop: 20, }}>
                                    <TextInput
                                        value={''}
                                        mode='outlined'
                                        style={DialogStylesComponent.commentInput}
                                        onChangeText={(text: string) => handleTextChange(text)}
                                        outlineStyle={{ borderRadius: 30, borderColor: grayBorderColor, borderWidth: 1 }}
                                        placeholder="Comment at here..."
                                        right={
                                            (
                                                <TextInput.Icon
                                                    size={25}
                                                    style={{ paddingTop: 25 * 0 }}
                                                    icon={'send'}
                                                    color={primaryColor}
                                                    onPress={() => handleSendComment(postId)}
                                                >
                                                </TextInput.Icon>
                                            )
                                        }
                                    />


                                </View>
                            </Dialog.Actions>

                        </Dialog>

                    </Portal>

                </View>
            </KeyboardAvoidingView >
        </TouchableWithoutFeedback>


    );
};

export default CommentsDetailDialogComponent;
