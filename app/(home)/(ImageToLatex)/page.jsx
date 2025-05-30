import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Image,
  ActivityIndicator,
  useWindowDimensions,
  PanResponder,
} from "react-native";

import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as Speech from "expo-speech";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { Colors } from "../../../constants/Colors";
import KaTeXView from "../../../components/ui/KaTeXView";

export default function InferenceScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraReady, setCameraReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [latexOutput, setLatexOutput] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [showCamera, setShowCamera] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [nemeth, setNemeth] = useState("");
  const cameraRef = useRef(null);
  const wsRef = useRef(null);
  const { width } = useWindowDimensions();

  const theme = darkMode ? Colors.dark : Colors.light;

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      paddingTop: 50,
      alignItems: "center",
      backgroundColor: theme.background,
    },
    header: {
      width: "95%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 30,
    },
    title: {
      fontSize: 32,
      color: theme.text,
      fontFamily: "PoppinsBold",
    },
    button: {
      width: "70%",
      paddingVertical: 30,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 3,
      marginBottom: 20,
    },
    buttonText: {
      color: theme.btnColor,
      fontSize: 24,
      fontFamily: "PoppinsBold",
    },
    image: {
      width: width * 0.8,
      height: width * 0.8,
      borderRadius: 10,
      marginTop: -150,
    },
    mainV: {
      flex: 1,
      alignItems: "center",
      width: "100%",
      justifyContent: "center",
      backgroundColor: theme.background,
    },
    toggleButton: {
      position: "absolute",
      top: 30,
      right: 20,
    },
  });

  // Request permission on mount
  useEffect(() => {
    if (!permission || !permission.granted) {
      requestPermission();
    }
  }, [permission]);

  // WebSocket connection
  useEffect(() => {
    const socket = new WebSocket("ws://192.168.137.1:8000/ws/img/infer");

    socket.onopen = () => {
      console.log("✅ WebSocket connected");
      wsRef.current = socket;
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("📩 Message from server:", data);
      setLatexOutput(data.latex);
      setNemeth(data.nemeth);
      Speech.speak(data.spoken_text, {
        language: "en",
        rate: 0.9,
        pitch: 1.0,
      });
    };

    socket.onerror = (error) => {
      console.error("❌ WebSocket error:", error?.message || error);
    };

    socket.onclose = (e) => {
      console.log("🛑 WebSocket closed", e.code, e.reason);
    };

    return () => {
      socket.close();
    };
  }, []);

  const runModel = async (uri) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ image: base64 }));
        console.log("📤 Sent image to server");
        setLoading(true);
      } else {
        console.warn("⚠️ WebSocket not connected");
        setLatexOutput("WebSocket is not connected");
      }
    } catch (error) {
      console.error("❌ Error processing image:", error);
      setLatexOutput("Failed to process image");
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setShowCamera(false);
      setImageUri(uri);
      await runModel(uri);
    }
  };

  const takePicture = async () => {
    if (cameraRef.current && cameraReady) {
      const photo = await cameraRef.current.takePictureAsync({
        base64: false,
        quality: 1,
      });

      setImageUri(photo.uri);
      setShowCamera(false);
      await runModel(photo.uri);
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx < -50) {
        pickImage();
      } else {
        setShowCamera(true);
      }
    },
  });

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>No access to camera. Please allow permission in settings.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      {...panResponder.panHandlers}
    >
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          accessible={true}
          accessibilityLabel="Toggle Dark Mode"
          accessibilityRole="switch"
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          onPress={() => setDarkMode(!darkMode)}
        >
          <FontAwesome name={darkMode ? "moon-o" : "sun-o"} size={40} />
        </Pressable>

        <Text style={styles.title}>Image to LaTeX</Text>

        <Pressable onPress={() => setDarkMode(!darkMode)}>
          <FontAwesome
            name={darkMode ? "moon-o" : "sun-o"}
            size={40}
            color={theme.text}
          />
        </Pressable>
      </View>

      {/* Main */}
      <View style={styles.mainV}>
        {showCamera ? (
          <CameraView
            ref={cameraRef}
            style={{
              width: "80%",
              height: 600,
              borderRadius: 10,
              marginTop: -100,
              borderWidth: 3,
              borderColor: theme.text,
              marginBottom: 30,
            }}
            onCameraReady={() => setCameraReady(true)}
            facing="back"
            autoFocus="on"
            zoom={0.1}
            focusDepth={0.5}
          />
        ) : (
          <>
            {imageUri && (
              <Image
                source={{ uri: imageUri }}
                style={styles.image}
                resizeMode="contain"
              />
            )}

            {loading && <ActivityIndicator size="large" color={theme.text} />}

            {!loading && latexOutput !== "" && (
              <View>
                <Text
                  style={{
                    fontFamily: "monospace",
                    fontSize: 24,
                    color: theme.text,
                  }}
                >
                  {nemeth}
                </Text>
                <View
                  accessible={true}
                  accessibilityLabel={`Math Output: ${nemeth}`}
                  accessibilityRole="text"
                >
                  <KaTeXView latex={latexOutput} darkMode={theme} />
                </View>
              </View>
            )}
          </>
        )}

        {/* Capture */}
        <Pressable
          onPress={takePicture}
          style={[
            styles.button,
            { backgroundColor: theme.tint, borderColor: theme.tint },
          ]}
        >
          <FontAwesome name="camera" size={30} color={theme.text} />
        </Pressable>

        {/* Pick from gallery */}
        <Pressable
          onPress={pickImage}
          style={[
            styles.button,
            { backgroundColor: theme.tint, borderColor: theme.tint },
          ]}
        >
          <Text style={styles.buttonText}>Pick Image</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
