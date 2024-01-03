import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Input, CheckBox, Button } from '@rneui/base';
import DatePicker from 'react-native-date-picker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../root/RootStackParams';
import { useDispatch, useSelector } from 'react-redux';
import { validateEmail, validatePassword, validateString } from '../../Common/Functions/CommonFunctionComponents';
import SignUpStylesComponent from './SignUpStyleComponent';
import { HelperText, IconButton, List, Modal, Portal, TextInput } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Icon } from 'react-native-vector-icons/Icon';
import PolicyComponent from '../Policy/PolicyComponent';
import { RootState } from '../../../root/RootStackParams'
import { setOpenPolicy } from '../AuthState/AuthAction';
import { backgroundColor, primaryColor } from '../../../root/Colors';
import ButtonComponent from '../../Button/ButtonDefaultComponent';
import { buttonHeight, buttonWidth } from '../../Button/ButtonDefaultData';

type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;

const languages = ['Vietnam', 'USA', 'UK', 'Japan'];

const SignUpComponent = () => {

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
        console.log(isAcceptedPolicy);
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

    const handleOpenPolicy = () => {
        dispatch(setOpenPolicy(true));
    }


    return (
        <View style={{ backgroundColor: backgroundColor, height: 'auto' }}>
            <ScrollView contentContainerStyle={{ backgroundColor: backgroundColor, height: 'auto' }}>

                <View style={SignUpStylesComponent.container}>
                    <Text style={SignUpStylesComponent.title}>Sign Up</Text>
                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={SignUpStylesComponent.input}
                        mode='outlined'
                        right={
                            <TextInput.Icon
                                icon="email"
                            />
                        }
                    />
                    {!isEmailValidate && (
                        <Text style={SignUpStylesComponent.errorValidate}>{errorEmailValidate}</Text>
                    )}

                    <TextInput
                        label="Username"
                        value={username}
                        onChangeText={text => setUsername(text)}
                        style={SignUpStylesComponent.input}
                        mode='outlined'
                        right={
                            <TextInput.Icon
                                icon="account"
                            />
                        }
                    />
                    {!isUsernameValidate && (
                        <Text style={SignUpStylesComponent.errorValidate}>{errorUsernameValidate}</Text>
                    )}

                    <TextInput
                        focusable={false}
                        label="Password"
                        value={password}
                        style={SignUpStylesComponent.input}
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
                        <Text style={SignUpStylesComponent.errorValidate}>{errorPasswordValidate}</Text>
                    )}

                    <TextInput
                        label="Confirm Password"
                        value={confirmPassword}
                        style={SignUpStylesComponent.input}
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
                        <Text style={SignUpStylesComponent.errorValidate}>{errorConfirmPasswordValidate}</Text>
                    )}

                    <TextInput
                        label="Phone"
                        value={phone}
                        onChangeText={text => setPhone(text)}
                        style={SignUpStylesComponent.input}
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
                    <View style={SignUpStylesComponent.groupCheckbox} >
                        <CheckBox
                            checked={gender === true}
                            onPress={() => setGender(true)}
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            title={
                                <Text style={SignUpStylesComponent.checkBoxText}>
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
                                <Text style={SignUpStylesComponent.checkBoxText}>
                                    {'Female'}
                                </Text>
                            }
                        />
                    </View>

                    {/* Birthday */}
                    <TextInput
                        label="Birthday"
                        value={birthday.toLocaleDateString()}
                        style={SignUpStylesComponent.input}
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
                            style={SignUpStylesComponent.input}
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
                    <View style={SignUpStylesComponent.groupCheckbox} >
                        <CheckBox
                            checked={acceptPolicy}
                            onPress={() => setAcceptPolicy(!acceptPolicy)}
                            textStyle={SignUpStylesComponent.checkBoxText}
                            title={
                                <>
                                    <Text style={{ fontSize: 15 }}> I accept the policy.
                                    </Text>
                                    <TouchableOpacity onPress={handleOpenPolicy}>
                                        <Text style={SignUpStylesComponent.content}>Read more?</Text>
                                    </TouchableOpacity>
                                </>
                            }
                        />
                        <PolicyComponent></PolicyComponent>
                    </View>

                    <ButtonComponent
                        title="Press me"
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

export default SignUpComponent;
