import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import { Link, useRouter } from "expo-router";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import { Audio } from "expo-av";
import image from "../../assets/images/logo.png";
import { Colors } from "@/constants/Colors";
import { Feather, Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const getFontSize = () => {
  if (width > 500) return 50;
  if (width > 300) return 36;
  return 40;
};

const App = () => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);
  const theme = darkMode ? Colors.dark : Colors.light;
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const loadAndPlayAudio = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/audio/Welcome.mp3")
        );
        setSound(sound);
        await sound.playAsync();
        setIsPlaying(true);

        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            setIsPlaying(false);
          }
        });
      } catch (error) {
        console.error("Error loading or playing audio:", error);
      }
    };

    loadAndPlayAudio();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const replayAudio = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.stopAsync();
      }
      await sound.replayAsync();
      setIsPlaying(true);
    }
  };

  const onGestureEvent = (event) => {
    const { translationY } = event.nativeEvent;

    if (translationY < -100) {
      router.push("/(auth)/(login)/page");
    } else if (translationY > 100) {
      router.push("/(auth)/(Register)/page");
    }
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#1E2931",
      ...StyleSheet.absoluteFillObject,
      flex: 1,
      justifyContent: "space-evenly",
      alignItems: "center",
      paddingBottom: 100,
      overflow: "hidden",
    },
    toggleButton: {
      position: "absolute",
      top: 40,
      right: 20,
      padding: 10,
      borderRadius: 20,
    },
    replayButton: {
      position: "absolute",
      bottom: 30,
      right: 30,
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: "#F6EC1C",
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    text: {
      color: theme.text,
      fontFamily: "PoppinsBlack",
    },
    button: {
      backgroundColor: "#F6EC1C",
      padding: 25,
      borderRadius: 10,
      width: "75%",
      alignItems: "center",
      marginVertical: 10,
    },
    regbutton: {
      backgroundColor: theme.background,
      borderWidth: 3,
      borderColor: theme.btnBorder,
      padding: 25,
      borderRadius: 10,
      width: "75%",
      alignItems: "center",
      marginVertical: 10,
    },
    buttonText: {
      color: theme.btnColor,
      fontSize: 23,
      fontFamily: "PoppinsBold",
    },
  });

  return (
    <GestureHandlerRootView>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <View style={[styles.container, { backgroundColor: theme.background }]}>
          <Image source={image} resizeMode="contain" />
          <Pressable
            style={styles.toggleButton}
            onPress={() => setDarkMode(!darkMode)}
          >
            <Feather
              name={darkMode ? "sun" : "moon"}
              size={40}
              color={theme.text}
            />
          </Pressable>
          <Text
            style={[styles.text, { fontSize: getFontSize(), letterSpacing: 2 }]}
          >
            Welcome to VisMath
          </Text>
          <View style={{ width: "100%", alignItems: "center" }}>
            <Link href="/(auth)/(login)/page" asChild>
              <Pressable style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
              </Pressable>
            </Link>
            <Link href="/(auth)/(Register)/page" asChild>
              <Pressable style={styles.regbutton}>
                <Text
                  style={[
                    styles.buttonText,
                    { color: darkMode ? "#fff" : "#000" },
                  ]}
                >
                  Register
                </Text>
              </Pressable>
            </Link>
          </View>
          {/* Replay Button */}
          <Pressable style={styles.replayButton} onPress={replayAudio}>
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={32}
              color="#000"
            />
          </Pressable>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default App;
