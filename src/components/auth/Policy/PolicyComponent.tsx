import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Dialog, Icon, IconButton, MD3Colors, Portal, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setAcceptedPolicy, setOpenPolicy } from '../AuthState/AuthAction';
import PolicyStylesComponent from './PolicyStyleComponent';
import { backgroundColor } from '../../../root/Colors';

interface PolicyComponentProps {
    isVisible: boolean;
}

const PolicyComponent = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isAccepted, setIsAccepted] = React.useState(false);

    const openPolicy = useSelector((state: any) => state.auth.isOpen);
    const isAcceptedPolicy = useSelector((state: any) => state.auth.isAcceptedPolicy);


    const dispatch = useDispatch();

    React.useEffect(() => {
        setIsOpen(openPolicy);
    }, [openPolicy])

    React.useEffect(() => {
        console.log(isAcceptedPolicy);
        setIsAccepted(isAcceptedPolicy);
    }, [isAcceptedPolicy])

    const hideDialog = () => {
        dispatch(setOpenPolicy(false));
        setIsOpen((prevIsOpen: any) => !prevIsOpen);
    };

    const handleAcceptedPolicy = () => {
        dispatch(setAcceptedPolicy(true));
        setIsAccepted((prevIsAccepted: any) => !prevIsAccepted);
        hideDialog();
    }

    return (
        <Portal>
            <Dialog style={{ backgroundColor: backgroundColor }} visible={isOpen} onDismiss={() => { }} dismissable={false}>
                <Dialog.Title >
                    <Text style={{ fontWeight: 'bold' }}>
                        Policy
                    </Text>
                </Dialog.Title>
                <Dialog.ScrollArea style={{ height: 400 }}>

                    <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
                        <Dialog.Content style={PolicyStylesComponent.dialogContent}>
                            <Text style={PolicyStylesComponent.policySectionHeader}>Privacy Policy</Text>
                            <Text style={PolicyStylesComponent.policyText}>
                                Welcome to our mobile app! This Privacy Policy describes how we collect,
                                use, and share information when you use our app.
                            </Text>
                            <Text style={PolicyStylesComponent.policySectionHeader}>Information We Collect</Text>
                            <Text style={PolicyStylesComponent.policyText}>
                                We collect information you provide directly to us, such as your name, email address,
                                and any other information you choose to provide.
                            </Text>

                            <Text style={PolicyStylesComponent.policySectionHeader}>How We Use Your Information</Text>
                            <Text style={PolicyStylesComponent.policyText}>
                                We use the information we collect to provide, maintain, and improve our app,
                                and to communicate with you.
                            </Text>

                            <Text style={PolicyStylesComponent.policySectionHeader}>Terms of Service</Text>
                            <Text style={PolicyStylesComponent.policyText}>
                                By using our app, you agree to abide by these Terms of Service. Please read them carefully.
                            </Text>

                            <Text style={PolicyStylesComponent.policySectionHeader}>User Conduct</Text>
                            <Text style={PolicyStylesComponent.policyText}>
                                You agree not to engage in any prohibited conduct, including but not limited to
                                violating any applicable laws or regulations.
                            </Text>

                            <Text style={PolicyStylesComponent.policySectionHeader}>Termination</Text>
                            <Text style={PolicyStylesComponent.policyText}>
                                We may terminate or suspend your account immediately, without prior notice or liability,
                                for any reason whatsoever.
                            </Text>
                        </Dialog.Content>


                    </ScrollView>

                </Dialog.ScrollArea>
                <View style={PolicyStylesComponent.buttonGroup}>
                    <Button mode='outlined' style={{ marginRight: 10 }} onPress={handleAcceptedPolicy}>
                        Accept
                    </Button>
                    <Button mode='outlined' onPress={hideDialog} >
                        Close
                    </Button>
                </View>

            </Dialog>
        </Portal >
    );
};

export default PolicyComponent;
