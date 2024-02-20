
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Platform, Keyboard, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../root/RootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';
import { Avatar, Button, Icon, IconButton, TextInput } from 'react-native-paper';
import AppBarHeaderComponent from '../../components/Common/AppBarHeader/AppBarHeaderComponent';
import { useDispatch, useSelector } from 'react-redux';
import { iconAvatarSize } from '../../root/Icon';
import AddingPostingsStyleScreen from './AddingPostingsStyleScreen';
import { backgroundColor, fourthColor, primaryColor, secondaryColor, thirthColor } from '../../root/Colors';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { spanTextSize } from '../../root/Texts';
import { PostingInterface, UserInterFace } from '../../models/ObjectInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message'
import { height } from '../../root/ResponsiveSize';
import AddImageButtonComponent from '../../components/ImagePicker/AddImageButtonComponent';
import { convertDateFormat } from '../../components/Common/Functions/CommonFunctionComponents';
import api from '../../api/AxiosApiConfig';

const MAX_LENGTH = 300;
const MAX_CHARACTERS_PER_LINE = 300;
type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;
const AddingPostingsScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const imageUrlState = useSelector((state: any) => state.store.imagePostingUrl);
  const isUploadedImage = useSelector((state: any) => state.store.isUploadedImageToFireBase);


  /*-----------------UseState variable-----------------*/
  const [user, setUser] = useState<UserInterFace>();

  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [isKeyBoardOpen, setIskeyboardOpen] = useState(false);
  const [heightOfKeyBoard, setHeightOfKeyBoard] = useState(0);
  const [textInput, setTextInput] = React.useState('');
  const [lengthText, setLengthText] = React.useState(0);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [clothesImagePostingUrl, setClothesImagePostingUrl] = useState<string[]>([]);
  const [hashtagTxt, setHashtagTxt] = useState('');
  const [hashtagArr, setHashtagArr] = useState<string[]>([]);
  const [openHashtag, setOpenHashtag] = useState(false);
  const [postingRequest, setPostingRequest] = useState<PostingInterface>();



  const [colorCheck, setColorCheck] = useState(false);
  const [colorItemCheck, setColorItemCheck] = useState('');





  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }: any) => setState({ open });

  const { open } = state;




  /*-----------------Usable variable-----------------*/
  const dispatch = useDispatch();
  const openCommentsDialog = useSelector((state: any) => state.store.isOpenCommentsDialog);
  const route = useRoute();
  const clothesID = (route.params as { clothesID?: string })?.clothesID || '';

  /*-----------------UseEffect-----------------*/


  React.useEffect(() => {
    const fetchData = async () => {
      const tokenStorage = await AsyncStorage.getItem('access_token');
      if (tokenStorage) {
        const tokenString = JSON.parse(tokenStorage);
        setAccessToken(tokenString);
      }
    }
    fetchData();
  }, []);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const userString = await AsyncStorage.getItem('userData');

        if (userString) {
          const user = JSON.parse(userString);
          setUser(user);
        } else {
          console.warn('User data not found in AsyncStorage.');
        }
      } catch (error) {
        console.error('Error retrieving user data from AsyncStorage:', error);
      }
    };
    getData();
  }, [])


  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', e => {
      setHeightOfKeyBoard(e.endCoordinates.height)
      setIskeyboardOpen(true);
    }
    );
    const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
      setIskeyboardOpen(false);
      setHeightOfKeyBoard(0);
    }
    );
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    }
  }, [heightOfKeyBoard]);

  React.useEffect(() => {
    setIsLoadingImage(true);
    setClothesImagePostingUrl((prev) => [imageUrlState]);

  }, [imageUrlState]);



  /*-----------------Function handler-----------------*/
  function hanldeGoBack(): void {
    navigation.goBack();
  }

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


  const hanldeCreatePost = async () => {
    setIsLoading(true);
    const hashtagArray = hashtagTxt.split(',');
    const bodyRequest = {
      userID: user?.userID,
      typeOfPosts: "POSTS",
      hashtag: hashtagArray,
      date: convertDateFormat(new Date()),
      status: 'UNACTIVE',
      content: textInput,
      image: clothesImagePostingUrl
    }
    

    try {
      const response = await api.post('/api/v1/post/create-post', bodyRequest);
      if (response.success === 200) {
        setTimeout(() => {
          setIsLoading(false);
          navigation.navigate('PostingDetail', { postID: response.data.postID });
        }, 3000)
      } else {
        Toast.show({
          type: 'error',
          text1: JSON.stringify(response.message),
          position: 'top'
        });
        setIsLoading(false);

      }
    } catch (error) {

    }

  }



  return (
    <View style={[AddingPostingsStyleScreen.container,]}>
      <Toast
        position='top'
        bottomOffset={20}

      />
      <AppBarHeaderComponent
        title={
          <View>
            <MaskedView
              maskElement={
                <Text style={AddingPostingsStyleScreen.titlePage}>Create new post</Text>
              }
            >
              <LinearGradient
                colors={[secondaryColor, primaryColor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={AddingPostingsStyleScreen.linearBackground}
              >
                <Text style={{ opacity: 0 }}>Create new post</Text>
              </LinearGradient>
            </MaskedView>
          </View>
        }
        backAction={() => hanldeGoBack()}
      >
      </AppBarHeaderComponent>

      <ScrollView
        persistentScrollbar={false}
        style={[
          AddingPostingsStyleScreen.scrollView,
          // Platform.OS === 'ios' && isKeyBoardOpen && { position: 'absolute', bottom: heightOfKeyBoard + 20, backgroundColor: backgroundColor }
        ]}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={AddingPostingsStyleScreen.scrollViewContent}>


          <View>
            <View
              style={AddingPostingsStyleScreen.postingDialogContainer}
            >
              <View style={AddingPostingsStyleScreen.postingDialogContainer_header}>
                <Avatar.Image size={iconAvatarSize} source={{ uri: user?.imgUrl }} />
                <View style={{ marginLeft: 10, marginTop: 5 }}>
                  <Text style={{ fontSize: spanTextSize, fontWeight: 'bold' }}>{user?.username}</Text>
                  <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Avatar.Image size={20} style={{ backgroundColor: 'white' }} source={{ uri: 'https://cdn.iconscout.com/icon/free/png-512/free-earth-global-globe-international-map-planet-world-2-12510.png?f=webp&w=256' }}></Avatar.Image>
                    <View style={{ height: 15, borderBlockColor: 'black', marginLeft: 5, marginTop: 3 }}>
                      <Text style={{ fontSize: 13 }}>Public</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View>
                <View >
                  <TextInput
                    placeholder={'What are you thinking...'}
                    mode='outlined'
                    style={AddingPostingsStyleScreen.postingDialogContainer_textInput}
                    outlineStyle={{ borderColor: backgroundColor }}
                    onChangeText={handleTextChange}
                    multiline

                  />
                </View>

              </View>

              <View style={{ alignItems: 'flex-end', alignContent: 'flex-end', marginRight: 10 }}>
                <Text>{lengthText} / {MAX_LENGTH}</Text>
              </View>
              {openHashtag && (
                <View style={[AddingPostingsStyleScreen.multilineTextContainer, Platform.OS === 'android' && { marginTop: 20 }]}>
                  <Text style={AddingPostingsStyleScreen.lableDropDown}>Hashtag</Text>
                  <TextInput
                    value={hashtagTxt}
                    label='#hashtag1, #hashtag2,...'
                    mode='outlined'
                    onChangeText={setHashtagTxt}
                    outlineColor={primaryColor}
                    outlineStyle={{ borderWidth: 1 }}
                    activeOutlineColor={primaryColor}
                    style={[AddingPostingsStyleScreen.multilineText, { height: 30 }]}

                  />

                </View>
              )}
            </View>
            {imageUrlState !== '#' && (
              <View style={AddingPostingsStyleScreen.pictureArea} >
                <Image source={{ uri: imageUrlState }} style={AddingPostingsStyleScreen.picture}></Image>
              </View>
            )}
            {/* <View style={{ alignItems: 'center' }}>
              <Button
                mode='outlined'
                contentStyle={Platform.OS === 'ios' ? { height: height * 0.045 } : { height: height * 0.04 }}
                style={[
                  AddingPostingsStyleScreen.buttonGroup_button,
                  {
                    backgroundColor: primaryColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }
                ]}
                labelStyle={[AddingPostingsStyleScreen.buttonGroup_button_lable, { textAlign: 'center', alignContent: 'center', alignItems: 'center' }]}
              >
                <Text style={{ fontWeight: '500', fontSize: 15, textAlign: 'center', alignContent: 'center', alignItems: 'center' }}>Upload</Text>
              </Button>
            </View> */}

          </View>

        </View>
      </ScrollView >

      <View style={AddingPostingsStyleScreen.toolUploadPosting}>

        <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', }}>
          <AddImageButtonComponent iconSize={30} width={9} height={16} isAddNewImagePosting={true} iconColor={primaryColor}></AddImageButtonComponent>
          <View style={{ flex: 5 }}>
            <Text style={{ fontWeight: '500', fontSize: 15, alignContent: 'flex-start', alignItems: 'flex-start', textAlign: 'left' }}>Images</Text>
          </View>
        </View>


        <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
          <View style={{ flex: 1 }}>
            <IconButton icon={'video'} size={30} iconColor={secondaryColor} ></IconButton>
          </View>
          <View style={{ flex: 5 }}>
            <Text style={{ fontWeight: '500', fontSize: 15, }}>Videos</Text>
          </View>
        </View>


        <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
          <View style={{ flex: 1 }}>
            <IconButton icon={require('../../assets/icon/location.png')} size={28} iconColor={thirthColor} ></IconButton>
          </View>
          <View style={{ flex: 5 }}>
            <Text style={{ fontWeight: '500', fontSize: 15, }}>Location</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
          <View style={{ flex: 1 }}>
            <IconButton onPress={() => setOpenHashtag(!openHashtag)} icon={require('../../assets/icon/hashtag.png')} size={28} iconColor={fourthColor} ></IconButton>
          </View>
          <View style={{ flex: 5 }}>
            <Text style={{ fontWeight: '500', fontSize: 15, }}>Hashtag</Text>
          </View>
        </View>

        <Button
          mode='outlined'
          contentStyle={Platform.OS === 'ios' ? { height: height * 0.045 } : { height: height * 0.04 }}
          onPress={hanldeCreatePost}
          style={[
            AddingPostingsStyleScreen.buttonGroup_button,
            {
              backgroundColor: primaryColor,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20
            }
          ]}
          labelStyle={[AddingPostingsStyleScreen.buttonGroup_button_lable, { textAlign: 'center', alignContent: 'center', alignItems: 'center' }]}
        >
          <Text style={{ fontWeight: '500', fontSize: 15, textAlign: 'center', alignContent: 'center', alignItems: 'center' }}>Upload</Text>
        </Button>
      </View>

    </View >
  );
};

export default AddingPostingsScreen;
