import React from "react";
import {
  Image,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import { BlurView, VibrancyView } from "@react-native-community/blur";
import ProgressBar from "./ProgressBar";
import { Video } from "expo-av";

interface UploadingAndroidProps {
  image?: string;
  video?: string;
  progress?: number;
}

const UploadingAndroid: React.FC<UploadingAndroidProps> = ({
  image,
  video,
  progress,
}) => {
  // The component has the same logic. However, the blur effect works differently on Android.
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        },
      ]}
    >
      

      <BlurView
        style={{
          width: "70%",
          // Some styles could work incorrectly on Android.
        }}
        blurType="dark"
      >
        <View
          style={{
            alignItems: "center",
            paddingVertical: 10,
            rowGap: 12,
            borderRadius: 14,
            backgroundColor: "#FFFFFF",
          }}
        >
          {image && (
            <Image
              source={{ uri: image }}
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
                borderRadius: 6,
              }}
            />
          )}
          {video && (
            <Video
              source={{
                uri: video,
              }}
              videoStyle={{}}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              // shouldPlay
              // isLooping
              style={{ width: 200, height: 200 }}
              // useNativeControls
            />
          )}
          <Text style={{ fontSize: 12 }}>Uploading...</Text>
          <ProgressBar progress={progress} />
          <View
            style={{
              height: 1,
              borderWidth: StyleSheet.hairlineWidth,
              width: "100%",
              borderColor: "#00000020",
            }}
          />
          <TouchableOpacity>
            <Text
              style={{ fontWeight: "500", color: "#3478F6", fontSize: 17 }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </View>
  );
};

export default UploadingAndroid;
