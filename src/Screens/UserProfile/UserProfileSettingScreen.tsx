import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Input, CheckBox, Button } from '@rneui/base';
import DatePicker from 'react-native-date-picker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useDispatch, useSelector } from 'react-redux';
import { Appbar, HelperText, IconButton, List, Modal, Portal, TextInput } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Icon } from 'react-native-vector-icons/Icon';
import { RootStackParamList } from '../../root/RootStackParams';
import { validateEmail, validatePassword, validateString } from '../../components/Common/Functions/CommonFunctionComponents';
import { setOpenPolicy } from '../../components/auth/AuthState/AuthAction';
import { backgroundColor, primaryColor, secondaryColor } from '../../root/Colors';
import UserProfileSettingStyleScreen from './UserProfileSettingStyleScreen';
import ButtonComponent from '../../components/Button/ButtonDefaultComponent';
import { buttonHeight, buttonWidth } from '../../components/Button/ButtonDefaultData';
import AppBarHeaderComponent from '../../components/Common/AppBarHeader/AppBarHeaderComponent';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';


type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;

const languages = ['Vietnam', 'USA', 'UK', 'Japan'];

const UserProfileSettingScreen = () => {

    /*-----------------UseState variable-----------------*/
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [gender, setGender] = useState(true);
    const [birthday, setBirthday] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [language, setLanguage] = useState('Vietnam');
    const [acceptPolicy, setAcceptPolicy] = useState(false);
    const [isHidePassword, setIsHidePassword] = useState(true);
    const [isHideConfirmPassword, setIsHideConfirmPassword] = useState(true);
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isOpenPolicy, setIsOpenPolicy] = useState(false);

    const [errorEmailValidate, setEmailErrorValidate] = useState('');
    const [isEmailValidate, setIsEmailValidate] = useState(true);

    const [errorUsernameValidate, setUsernameErrorValidate] = useState('');
    const [isUsernameValidate, setIsUsernameValidate] = useState(true);

    const [errorPasswordValidate, setPasswordErrorValidate] = useState('');
    const [isPasswordValidate, setIsPasswordValidate] = useState(true);

    const [errorConfirmPasswordValidate, setErrorConfirmPasswordValidate] = useState('');
    const [isConfirmPasswordValidate, setIsConfirmPasswordValidate] = useState(true);
    const [isMatchingPassword, setIsMatchingPassword] = useState(false);

    /*-----------------Usable variable-----------------*/
    const dispatch = useDispatch();
    const navigation = useNavigation<SignInScreenNavigationProp>();
    const showCountryPicker = () => setModalVisible(true);
    const hideCountryPicker = () => setModalVisible(false);
    const openPolicy = useSelector((state: any) => state.auth.isOpen);
    const isAcceptedPolicy = useSelector((state: any) => state.auth.isAcceptedPolicy);


    /*-----------------UseEffect-----------------*/
    useEffect(() => {
        setAcceptPolicy(isAcceptedPolicy);
    }, [isAcceptedPolicy]);

    /**
     * Validate Email
     */
    useEffect(() => {
        const error = validateEmail(email);
        if (!error.isValid && error.error) {
            setEmailErrorValidate(error.error);
            setIsEmailValidate(false);
        } else {
            setEmail(email);
            setIsEmailValidate(true);
        }
    }, [email]);

    /**
     * Validate Username
     */
    useEffect(() => {
        const error = validateString(username);
        if (!error.isValid && error.error) {
            setUsernameErrorValidate(error.error);
            setIsUsernameValidate(false);
        } else {
            setUsername(username);
            setIsUsernameValidate(true);
        }
    }, [username]);

    /**
     * Validate Password
     */
    useEffect(() => {
        const error = validatePassword(password);
        if (!error.isValid && error.error) {
            setPasswordErrorValidate(error.error);
            setIsPasswordValidate(false);
        } else {
            setPassword(password);
            setIsPasswordValidate(true);
        }
    }, [password]);

    /**
     * Validate Confirm Password
     */
    useEffect(() => {
        const error = validatePassword(password);
        if (!error.isValid && error.error) {
            setErrorConfirmPasswordValidate(error.error);
            setIsConfirmPasswordValidate(false);
        } else
            if (password !== confirmPassword) {
                setErrorConfirmPasswordValidate('Password do not match.');
                setIsConfirmPasswordValidate(false);
            } else {
                setConfirmPassword(confirmPassword);
                setIsConfirmPasswordValidate(true);
            }
    }, [confirmPassword]);


    /*-----------------Function handler-----------------*/

    /**
     * Datepicker handler
     */
    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    const handleConfirm = (date: any) => {
        hideDatePicker();
        setBirthday(date);
    };

    /**
     * Language changing handler
     * @param selectedCountry 
     */
    const handleChangeLaguage = (selectedCountry: string) => {
        setLanguage(selectedCountry);
        hideCountryPicker();
    };

    /**
     * SignUp handler
     */
    const handleSignUp = () => {
        const emailValidation = validateEmail(email);
        const passwordValidation = validatePassword(password);

        // if (emailValidation.isValid && passwordValidation.isValid) {
        // Additional validation for other fields and confirmation logic
        // dispatch(signUpAction({ email, username, password, gender, birthday, country }));
        // dispatch(setEmailSignedInAction({ email }));
        navigation.navigate('SignIn'); // Navigate to Home screen after successful sign-up
        // } else {
        //     setErrorEmail(emailValidation.error || '');
        //     setErrorPassword(passwordValidation.error || '');
        // }
    };


    /**
     * Un/Hide password handler
     */
    const handleHidePassword = () => {
        setIsHidePassword(!isHidePassword);
    }

    /**
     * Un/Hide confirm password handler
     */
    const handleHideConfirmPassword = () => {
        setIsHideConfirmPassword(!isHideConfirmPassword);
    }

    const hanldeGoBack = () => {
    }


    return (
        <View style={{ backgroundColor: backgroundColor }}>
            <AppBarHeaderComponent
                title={
                    <View>
                        <MaskedView
                            maskElement={
                                <Text style={UserProfileSettingStyleScreen.titlePage}>Posting</Text>
                            }
                        >
                            <LinearGradient
                                colors={[secondaryColor, primaryColor]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }}
                                style={UserProfileSettingStyleScreen.linearBackground}
                            >
                                <Text style={{ opacity: 0 }}>HOT STORE</Text>
                            </LinearGradient>
                        </MaskedView>
                    </View>
                }
                backAction={() => hanldeGoBack()}
            >
            </AppBarHeaderComponent>
            <ScrollView contentContainerStyle={{ backgroundColor: backgroundColor }}>

                <View style={UserProfileSettingStyleScreen.container}>

                    <TextInput
                        label="Username"
                        value={username}
                        onChangeText={text => setUsername(text)}
                        style={UserProfileSettingStyleScreen.input}
                        mode='outlined'
                        right={
                            <TextInput.Icon
                                icon="account"
                            />
                        }
                    />
                    {!isUsernameValidate && (
                        <Text style={UserProfileSettingStyleScreen.errorValidate}>{errorUsernameValidate}</Text>
                    )}

                    <TextInput
                        focusable={false}
                        label="Password"
                        value={password}
                        style={UserProfileSettingStyleScreen.input}
                        secureTextEntry={isHidePassword}
                        mode='outlined'
                        onChangeText={(text) => setPassword(text)}
                        right={
                            <TextInput.Icon icon="eye"
                                onPress={handleHidePassword}
                            />
                        }
                    />
                    {!isPasswordValidate && (
                        <Text style={UserProfileSettingStyleScreen.errorValidate}>{errorPasswordValidate}</Text>
                    )}

                    <TextInput
                        label="Confirm Password"
                        value={confirmPassword}
                        style={UserProfileSettingStyleScreen.input}
                        secureTextEntry={isHideConfirmPassword}
                        mode='outlined'
                        onChangeText={(text) => setConfirmPassword(text)}
                        right={
                            <TextInput.Icon icon="eye"
                                onPress={handleHideConfirmPassword}
                            />
                        }
                    />
                    {!isConfirmPasswordValidate && (
                        <Text style={UserProfileSettingStyleScreen.errorValidate}>{errorConfirmPasswordValidate}</Text>
                    )}

                    <TextInput
                        label="Phone"
                        value={phone}
                        onChangeText={text => setPhone(text)}
                        style={UserProfileSettingStyleScreen.input}
                        mode='outlined'
                        aria-valuemin={12}
                        keyboardType='numeric'
                        right={
                            <TextInput.Icon
                                icon="phone"
                            />
                        }
                    />

                    {/* Gender */}
                    <View style={UserProfileSettingStyleScreen.groupCheckbox} >
                        <CheckBox
                            checked={gender === true}
                            onPress={() => setGender(true)}
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            title={
                                <Text style={UserProfileSettingStyleScreen.checkBoxText}>
                                    {'Male'}
                                </Text>
                            }

                        />
                        <CheckBox
                            checked={gender === false}
                            onPress={() => setGender(false)}
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            title={
                                <Text style={UserProfileSettingStyleScreen.checkBoxText}>
                                    {'Female'}
                                </Text>
                            }
                        />
                    </View>

                    {/* Birthday */}
                    <TextInput
                        label="Birthday"
                        value={birthday.toLocaleDateString()}
                        style={UserProfileSettingStyleScreen.input}
                        mode='outlined'
                        onFocus={showDatePicker}
                        right={
                            <TextInput.Icon icon="calendar"
                                onPress={showDatePicker}
                            />
                        }
                    />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={(date) => handleConfirm(date)}
                        onCancel={hideDatePicker}
                        onChange={(text: any) => setBirthday(text)}

                    />

                    {/* Country */}
                    <View>
                        <TextInput
                            label="Country"
                            value={language}
                            style={UserProfileSettingStyleScreen.input}
                            mode='outlined'
                            right={
                                <TextInput.Icon
                                    icon="chevron-down"
                                    onPress={showCountryPicker} />
                            }
                            editable={false}
                        />
                        <Portal>
                            <Modal visible={isModalVisible} onDismiss={hideCountryPicker}>
                                <List.Section style={{ backgroundColor: 'white' }}>
                                    <List.Subheader>Select a language</List.Subheader>
                                    {languages.map((language) => (
                                        <List.Item
                                            style={{ backgroundColor: '#fffff' }}
                                            key={language}
                                            title={language}
                                            onPress={() => handleChangeLaguage(language)}
                                        />
                                    ))}
                                </List.Section>
                            </Modal>
                        </Portal>
                    </View>

                    {/* Accept Policy */}

                    <ButtonComponent
                        title="Save"
                        onPress={() => {
                            handleSignUp();
                        }}
                        width={buttonWidth}
                        height={buttonHeight}
                        backgroundColor={primaryColor}
                        textColor='black'
                        mode="contained"
                        style={{ marginBottom: 0, color: 'black' }}
                    />


                </View>
            </ScrollView>
        </View>
    );
};

export default UserProfileSettingScreen;
