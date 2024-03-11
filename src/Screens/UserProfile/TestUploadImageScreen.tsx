import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image, FlatList, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

import { Video } from "expo-av";
import { db, storage } from "../../../FireBaseConfig";
// import UploadingAndroid from "../../components/ImagePicker/UploadingAndroid";


interface File {
  url: string;
  fileType: string;
}

export default function TestUploadImageScreen() {
  const [image, setImage] = useState<string>("");
  const [video, setVideo] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "files"), (snapshot: any) => {
      snapshot.docChanges().forEach((change: any) => {
        if (change.type === "added") {
          console.log("New file", change.doc.data());
          setFiles((prevFiles: any) => [...prevFiles, change.doc.data()]);
        }
      });
    });
    return () => unsubscribe();
  }, []);

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
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
    <View style={{ flex: 1 }}>
      <FlatList
        data={files}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => {
          if (item.fileType === "image") {
            return (
              <Image
                source={{ uri: item.url }}
                style={{ width: "34%", height: 100 }}
              />
            );
          } else {
            return (
              <Video
                source={{ uri: item.url }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                shouldPlay
                style={{ width: "34%", height: 100 }}
                useNativeControls
              />
            );
          }
        }}
        numColumns={3}
        contentContainerStyle={{ gap: 2 }}
        columnWrapperStyle={{ gap: 2 }}
      />
      {/* {image && (Platform.OS === "ios" ? (
        <UploadingAndroid image={image} video={video} progress={progress} />
      ) : (
        <UploadingAndroid image={image} video={video} progress={progress} />
      ))} */}
      <TouchableOpacity
        onPress={pickImage}
        style={{
          position: "absolute",
          bottom: 90,
          right: 30,
          width: 44,
          height: 44,
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 25,
        }}
      >
        <Ionicons name="image" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={pickVideo}
        style={{
          position: "absolute",
          bottom: 150,
          right: 30,
          width: 44,
          height: 44,
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 25,
        }}
      >
        <Ionicons name="videocam" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
