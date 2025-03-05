import {
  TextInput,
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  useWindowDimensions,
  ScrollView,
} from "react-native";

import React, { useState } from "react";
import { Link } from "expo-router";
import { Colors } from "../../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { useFonts } from "expo-font";

const Home = () => {
  const [text, setText] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const { width, height } = useWindowDimensions();



  const options = [
    { id: "convert_image", label: "Convert Image to Braille", icon: "image", description: "Turn images into readable braille." },
    { id: "document_braille", label: "Document to Braille", icon: "file-text", description: "Convert documents into braille format." },
    { id: "recordings", label: "Recordings", icon: "microphone", description: "Access and manage audio recordings." },
    { id: "text_braille", label: "Text to Braille", icon: "font", description: "Translate written text into braille." },
    { id: "braille_text", label: "Braille to Text", icon: "braille", description: "Convert braille back into readable text." },
  ];

  const theme = darkMode ? Colors.dark : Colors.light;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-around",
      alignItems: "center",
      padding: 30,
      paddingTop: 90,
    },
    welcomeText: {
      fontSize: 36,
      color: theme.text,
      marginBottom: 10,
      textAlign: "center",
      fontFamily: "PoppinsBold",
    },
    subText: {
      fontSize: 22,
      color: theme.text,
      textAlign: "center",
      marginBottom: 20,
      fontFamily: "PoppinsMedium",
    },
    logo: {
      position: "absolute",
      top: 30,
      left: 20,
      padding: 10,
      borderRadius: 20,
    },
    toggleButton: {
      position: "absolute",
      top: 30,
      right: 20,
      padding: 10,
      borderRadius: 20,
    },
    optionsContainer: {
      width: "100%",
      alignItems: "center",
    },
    scrollContainer: {
      flex: 1,
      width: "100%",
    },
    option: {
      width: "90%",
      paddingVertical: 50,
      borderRadius: 10,
      marginVertical: 10,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 3,
    },
    optionText: {
      fontSize: 28,
      color: theme.text,
      textAlign: "center",
      fontFamily: "PoppinsBold",
    },
    optionDescription: {
      fontSize: 20,
      color: theme.text,
      textAlign: "center",
      marginTop: 5,
      fontFamily: "PoppinsRegular",
    },
    socialButtonsContainer: {
      flexDirection: "column",
      justifyContent: "center",
      marginTop: 20,
    },
    socialButton: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      marginVertical: 10,
      borderRadius: 5,
    },
    socialButtonText: {
      fontSize: 20,
      marginLeft: 10,
      fontFamily: "PoppinsMedium",
    },
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={styles.welcomeText}>Welcome, Students! 👋</Text>
      <Text style={styles.subText}>Easily convert text, images, and documents into braille. Select an option below to get started.</Text>
      <Link href="/(SplashScreen)" asChild>
        <Pressable style={styles.logo} onPress={() => setDarkMode(!darkMode)}>
          <FontAwesome name="angle-left" size={50} color={theme.text} />
        </Pressable>
      </Link>
      <Pressable style={styles.toggleButton} onPress={() => setDarkMode(!darkMode)}>
        <FontAwesome name={darkMode ? "moon-o" : "sun-o"} size={36} color={theme.text} />
      </Pressable>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.optionsContainer}>
          {options.map((option) => (
            <Pressable
              key={option.id}
              style={[styles.option, { borderColor: theme.btnBorder, backgroundColor: selectedOption === option.id ? theme.tint : "transparent" }]}
              onPress={() => setSelectedOption(option.id)}
            >
              <FontAwesome
                name={option.icon}
                size={80}
                color={selectedOption === option.id ? theme.btnColor : theme.icon}
              />
              <Text
                style={[styles.optionText, { color: selectedOption === option.id ? theme.btnColor : theme.text }]}
              >
                {option.label}
              </Text>
              <Text style={styles.optionDescription}>{option.description}</Text>
            </Pressable>
          ))}
        </View>
      
      </ScrollView>
    </View>
  );
};

export default Home;
