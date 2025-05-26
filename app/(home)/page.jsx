import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  FlatList,
  AccessibilityInfo,
} from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import { Colors } from "../../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

const Home = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const { width, height } = useWindowDimensions();

  const options = [
    { id: "convert_image", label: "Convert Image to Braille", icon: "image", description: "Turn images into readable braille.", page: "/(ImageToLatex)" },
    { id: "document_braille", label: "Document to Braille", icon: "file-text", description: "Convert documents into braille format.", page: "/(LatextoNemeth)" },
    { id: "recordings", label: "Recordings", icon: "microphone", description: "Access and manage audio recordings.", page: "/(ImageToLatex)" },
    { id: "text_braille", label: "Text to Braille", icon: "font", description: "Translate written text into braille.", page: "/(ImageToLatex)" },
    { id: "braille_text", label: "Braille to Text", icon: "braille", description: "Convert braille back into readable text.", page: "/(BrailleToLatex)" },
  ];

  const theme = darkMode ? Colors.dark : Colors.light;

  const handleViewableItemsChanged = React.useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const currentItem = viewableItems[0].item;
      AccessibilityInfo.announceForAccessibility(`Selected ${currentItem.label}`);
    }
  });

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop:30,
      backgroundColor: theme.background,
    },
    header: {
      paddingTop: 90,
      paddingHorizontal: 30,
      alignItems: "center",
    },
    pageText: {
      fontSize: 36,
      color: theme.text,
      marginBottom: 10,
      textAlign: "center",
      fontFamily: "PoppinsBold",
      position:"absolute",
      top:20,
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
      marginBottom: 50,
      fontFamily: "PoppinsMedium",
    },
    logo: {
      position: "absolute",
      top: 30,
      left: 20,
      padding: 10,
    },
    toggleButton: {
      position: "absolute",
      top: 30,
      right: 20,
      padding: 10,
    },
    optionContainer: {
      width,
      height,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    optionCard: {
      width: "95%",
      height: "80%",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
      borderWidth: 4,
      padding: 20,
    },
    optionText: {
      fontSize: 36,
      textAlign: "center",
      fontFamily: "PoppinsBold",
      marginTop: 20,
    },
    optionDescription: {
      fontSize: 24,
      textAlign: "center",
      marginTop: 10,
      fontFamily: "PoppinsRegular",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageText}>Home</Text>
        <Text style={styles.welcomeText}>Welcome👋 !</Text>
        <Text style={styles.subText}>
          Swipe to explore. Audio feedback tells you where you are.
        </Text>
      </View>

      <Link href="/(auth)/(login)/page" asChild>
        <Pressable style={styles.logo} onPress={() => setDarkMode(!darkMode)}>
          <FontAwesome name="angle-left" size={50} color={theme.text} />
        </Pressable>
      </Link>

      <Pressable style={styles.toggleButton} onPress={() => setDarkMode(!darkMode)}>
        <FontAwesome name={darkMode ? "moon-o" : "sun-o"} size={36} color={theme.text} />
      </Pressable>

      <FlatList
        data={options}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={handleViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig}
        renderItem={({ item }) => (
          <Link href={item.page} asChild>
            <Pressable
              style={[
                styles.optionContainer,
              ]}
              onPress={() => setSelectedOption(item.id)}
            >
              <View
                style={[
                  styles.optionCard,
                  {
                    backgroundColor: selectedOption === item.id ? theme.tint : "transparent",
                    borderColor: theme.btnBorder,
                  },
                ]}
              >
                <FontAwesome
                  name={item.icon}
                  size={120}
                  color={selectedOption === item.id ? theme.btnColor : theme.icon}
                />
                <Text
                  style={[
                    styles.optionText,
                    {
                      color: selectedOption === item.id ? theme.btnColor : theme.text,
                    },
                  ]}
                >
                  {item.label}
                </Text>
                <Text style={[styles.optionDescription, { color: theme.text }]}>
                  {item.description}
                </Text>
              </View>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
};

export default Home;
