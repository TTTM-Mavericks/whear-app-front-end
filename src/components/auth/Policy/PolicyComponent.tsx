import * as React from 'react';
import { ScrollView } from 'react-native';
import { Dialog, Icon, IconButton, MD3Colors, Portal, Text, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenPolicy } from '../AuthState/AuthAction';

interface PolicyComponentProps {
    isVisible: boolean;
}

const PolicyComponent = () => {
    const openPolicy = useSelector((state: any) => state.auth.isOpen);
    const [isOpen, setIsOpen] = React.useState(true);


    const dispatch = useDispatch();

    React.useEffect(() => {
        console.log(openPolicy);
    })

    const hideDialog = () => {
        dispatch(setOpenPolicy(true));
        setIsOpen(false)

    };

    return (
        <Portal>
            <Dialog visible={isOpen} onDismiss={hideDialog}>
                <Dialog.Title style={{ paddingTop: 20 }}>
                    <Icon source="close" size={20}></Icon>
                    Policy
                </Dialog.Title>
                <Dialog.ScrollArea style={{ height: 400 }}>

                    <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
                        <Dialog.Content>
                            <Text>This is a scrollable area This is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable area</Text>
                            <Text>This is a scrollable area This is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable area</Text>
                            <Text>This is a scrollable area This is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable area</Text>
                            <Text>This is a scrollable area This is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable area</Text>
                            <Text>This is a scrollable area This is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable area</Text>
                            <Text>This is a scrollable area This is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable area</Text>
                            <Text>This is a scrollable area This is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable area</Text>
                            <Text>This is a scrollable area This is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable area</Text>
                            <Text>This is a scrollable area This is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable area</Text>
                            <Text>This is a scrollable area This is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable area</Text>
                            <Text>This is a scrollable area This is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable area</Text>
                            <Text>This is a scrollable area This is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable area</Text>
                            <Text>This is a scrollable area This is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable area</Text>
                            <Text>This is a scrollable area This is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable areaThis is a scrollable area</Text>

                        </Dialog.Content>


                    </ScrollView>
                    <IconButton
                        icon="close"
                        iconColor={MD3Colors.error50}
                        size={20}
                        onPress={hideDialog}
                    />
                </Dialog.ScrollArea>
            </Dialog>
        </Portal>
    );
};

export default PolicyComponent;
