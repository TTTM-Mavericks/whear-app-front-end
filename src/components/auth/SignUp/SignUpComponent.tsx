import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform, Image, ImageBackground } from 'react-native';
import { Input, CheckBox } from '@rneui/base';
import DatePicker from 'react-native-date-picker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../root/RootStackParams';
import { useDispatch, useSelector } from 'react-redux';
import { convertDateFormat, validateEmail, validatePassword, validateString } from '../../Common/Functions/CommonFunctionComponents';
import SignUpStylesComponent from './SignUpStyleComponent';
import { Button, HelperText, IconButton, List, Modal, Portal, TextInput } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import PolicyComponent from '../Policy/PolicyComponent';
import { setOpenPolicy } from '../AuthState/AuthAction';
import { backgroundColor, primaryColor } from '../../../root/Colors';
import api from '../../../api/AxiosApiConfig';
import { UserInterFace } from '../../../models/ObjectInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingComponent from '../../Common/Loading/LoadingComponent';
import Toast from 'react-native-toast-message';
import { height, width } from '../../../root/ResponsiveSize';

type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;

const languages = ['VIETNAM', 'USA', 'UK', 'JAPAN'];

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
    const [language, setLanguage] = useState('VIETNAM');
    const [acceptPolicy, setAcceptPolicy] = useState(false);
    const [isHidePassword, setIsHidePassword] = useState(true);
    const [isHideConfirmPassword, setIsHideConfirmPassword] = useState(true);
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isOpenPolicy, setIsOpenPolicy] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [errorEmailValidate, setEmailErrorValidate] = useState('');
    const [isEmailValidate, setIsEmailValidate] = useState(true);

    const [errorUsernameValidate, setUsernameErrorValidate] = useState('');
    const [isUsernameValidate, setIsUsernameValidate] = useState(true);

    const [errorPasswordValidate, setPasswordErrorValidate] = useState('');
    const [isPasswordValidate, setIsPasswordValidate] = useState(true);

    const [errorConfirmPasswordValidate, setErrorConfirmPasswordValidate] = useState('');
    const [isConfirmPasswordValidate, setIsConfirmPasswordValidate] = useState(true);
    const [isMatchingPassword, setIsMatchingPassword] = useState(false);

    const [userResponse, setUserResponse] = useState<UserInterFace>();



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
    const handleSignUp = async () => {

        try {
            const requestData = {
                username: username,
                password: password,
                dateOfBirth: convertDateFormat(birthday),
                phone: phone,
                email: email,
                gender: JSON.stringify(gender),
                imgUrl: "https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2Flogo.png?alt=media&token=1e7dd6fd-2841-4079-b208-6487b3934a02https://firebasestorage.googleapis.com/v0/b/whear-app-1f70d.appspot.com/o/Stuff%2Flogo.png?alt=media&token=1e7dd6fd-2841-4079-b208-6487b3934a02",
                language: language
            }

            setIsLoading(true);
            const response = await api.post('/api/v1/auth/register', requestData);
            if (response.success === 200) {
                setUserResponse(response.data.user);
                AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
                AsyncStorage.setItem('access_token', JSON.stringify(response.data.access_token));
                AsyncStorage.setItem('refresh_token', JSON.stringify(response.data.refresh_token));
                setIsLoading(true);
                setTimeout(() => {
                    setIsLoading(false);
                    navigation.navigate('OnboardingScreen');

                }, 1000)
            } else {
                Toast.show({
                    type: 'error',
                    text1: JSON.stringify(response.message),
                    position: 'top'
                });
                setIsLoading(false);

            }
        } catch (error: any) {
            console.error('Error posting data:', error);
            Toast.show({
                type: 'error',
                text1: JSON.stringify(error.message),
                position: 'top'
            });
            setIsLoading(false);
        }


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
        <View style={{ backgroundColor: backgroundColor, height: 'auto', flex: 1 }}>
            <ScrollView contentContainerStyle={{ backgroundColor: backgroundColor, height: 'auto' }}>
                <ImageBackground style={{
                    width: width,
                    height: height,
                }} source={require('../../../assets/img/logo/background.png')}>

                    <View style={SignUpStylesComponent.container}>
                        <Text style={SignUpStylesComponent.title}>Sign Up</Text>
                        <TextInput
                            label="Email"
                            activeOutlineColor={primaryColor}
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
                            activeOutlineColor={primaryColor}
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
                            activeOutlineColor={primaryColor}
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
                            activeOutlineColor={primaryColor}
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
                            activeOutlineColor={primaryColor}
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
                            activeOutlineColor={primaryColor}
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
                                activeOutlineColor={primaryColor}
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
                                <Modal visible={isModalVisible} onDismiss={hideCountryPicker} >
                                    <List.Section style={{ backgroundColor: 'white', borderRadius: 8, width: '80%', marginLeft: '10%' }}>
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

                        {/* <ButtonComponent
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
                    /> */}
                        <Button
                            mode='outlined'
                            contentStyle={Platform.OS === 'ios' ? { height: height * 0.045 } : { height: height * 0.04 }}
                            style={[SignUpStylesComponent.buttonGroup_button, { backgroundColor: primaryColor, marginBottom: 100 }]}
                            labelStyle={[SignUpStylesComponent.buttonGroup_button_lable,]}
                            onPress={() => handleSignUp()}
                        >
                            <Text style={{ fontWeight: '500', fontSize: 15 }}>Sign Up</Text>
                        </Button>


                    </View>
                </ImageBackground>
            </ScrollView>
            <LoadingComponent spinner={isLoading}></LoadingComponent>
            <Toast
                position='top'
                bottomOffset={20}

            />
        </View>
    );
};

export default SignUpComponent;
