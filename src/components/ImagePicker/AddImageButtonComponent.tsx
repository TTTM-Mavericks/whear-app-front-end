import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image, FlatList, Platform, StyleProp, ViewStyle, ImageSourcePropType } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

import { Video } from "expo-av";
import { db, storage } from "../../../FireBaseConfig";
import { useDispatch } from "react-redux";
import { saveImageCreatingUrl, saveImageUrl, setUploadToFireBase } from "../../redux/State/Actions";
import { IconButton } from "react-native-paper";
// import UploadingAndroid from "../../components/ImagePicker/UploadingAndroid";


interface File {
  url: string;
  fileType: string;
}

interface ImageButtonProps {
  icon?: ImageSourcePropType,
  isUserAvatar?: boolean,
  isAddNewImage?: boolean,
  style?: StyleProp<ViewStyle>,
  onPress?: () => void,
  iconColor?: string,
  width?: number,
  height?: number,
}

const AddImageButtonComponent: React.FC<ImageButtonProps> = (
  {
    icon,
    isUserAvatar,
    isAddNewImage,
    style,
    onPress,
    iconColor,
    width,
    height
  }) => {
  const [image, setImage] = useState<string>("");
  const [video, setVideo] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [files, setFiles] = useState<File[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "files"), (snapshot: any) => {
      snapshot.docChanges().forEach((change: any) => {
        if (change.type === "added") {
          setFiles((prevFiles: any) => [...prevFiles, change.doc.data()]);

        }
      });
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {

  }, [files])

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [width ? width : 9, height ? height : 16],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // if (isAddNewImage) {
      //   dispatch(saveImageCreatingUrl(result.assets[0].uri))
      // }
      // if (isUserAvatar) {
      //   dispatch(saveImageUrl(result.assets[0].uri));
      // }
      await uploadImage(result.assets[0].uri, "image");
    }
  }

  async function pickVideo() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setVideo(result.assets[0].uri);
      await uploadImage(result.assets[0].uri, "video");
    }
  }

  async function uploadImage(uri: string, fileType: string) {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, "Stuff/" + new Date().getTime());
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      "state_changed",
      (snapshot: any) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgress(progress.toFixed() as any);
      },
      (error: any) => {
        console.error("Error uploading:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL: string) => {
          console.log("File available at", downloadURL);
          dispatch(setUploadToFireBase(true));
          if (isAddNewImage) {
            dispatch(saveImageCreatingUrl(downloadURL));
          }
          if (isUserAvatar) {
            dispatch(saveImageUrl(downloadURL));
          }
          await saveRecord(fileType, downloadURL, new Date().toISOString());
          setImage("");
          setVideo("");
        });
      }
    );
  }

  async function saveRecord(fileType: string, url: string, createdAt: string) {
    try {
      const docRef = await addDoc(collection(db, "files"), {
        fileType,
        url,
        createdAt,
      });
      console.log("Document saved correctly:", docRef.id);
    } catch (e) {
      console.error("Error saving document:", e);
    }
  }

  return (
    <View style={[{ flex: 1 }, style]} >
      {/* {image && (Platform.OS === "ios" ? (
        <UploadingAndroid image={image} video={video} progress={progress} />
      ) : (
        <UploadingAndroid image={image} video={video} progress={progress} />
      ))} */}
      <TouchableOpacity
        onPress={pickImage}
        style={{
          width: 44,
          height: 44,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 25,
        }}
      >
        <IconButton icon={icon ? icon : 'image'} size={24} iconColor={iconColor ? iconColor : 'white'} />
      </TouchableOpacity>

    </View>
  );
}
export default AddImageButtonComponent