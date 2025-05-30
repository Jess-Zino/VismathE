import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  FlatList,
} from "react-native";
import { Link } from "expo-router";
import { Colors } from "../../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Audio } from "expo-av";

const Home = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const { width, height } = useWindowDimensions();

  // Adjust the slide width (for example, 80% of device width)
  const slideWidth = width * 0.75;

  // Define your options array with an audio property (link to your audio file)
  const options = [
    {
      id: "convert_image",
      label: "Convert Image to Braille",
      icon: "image",
      description: "Turn images into readable braille.",
      page: "/(ImageToLatex)",
      audio: "https://example.com/audio/convert_image.mp3",
    },
    {
      id: "document_braille",
      label: "Document to Braille",
      icon: "file-text",
      description: "Convert documents into braille format.",
      page: "/(LatextoNemeth)",
      audio: "https://example.com/audio/document_braille.mp3",
    },
    {
      id: "recordings",
      label: "Recordings",
      icon: "microphone",
      description: "Access and manage audio recordings.",
      page: "/(SpeechToLatex)",
      audio: "https://example.com/audio/recordings.mp3",
    },
    {
      id: "text_braille",
      label: "Text to Braille",
      icon: "font",
      description: "Translate written text into braille.",
      page: "/(ImageToLatex)",
      audio: "https://example.com/audio/text_braille.mp3",
    },
    {
      id: "braille_text",
      label: "Braille to Text",
      icon: "braille",
      description: "Convert braille back into readable text.",
      page: "/(BrailleToLatex)",
      audio: "https://example.com/audio/braille_text.mp3",
    },
  ];

  const theme = darkMode ? Colors.dark : Colors.light;

  // Ref to store the current sound so we can unload it when a new slide comes into view.
  const currentSound = useRef(null);

  // Function to play audio for the given URL
  const playAudio = async (audioUrl) => {
    try {
      if (currentSound.current !== null) {
        await currentSound.current.unloadAsync();
        currentSound.current = null;
      }
      const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
      currentSound.current = sound;
      await sound.playAsync();
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  // Called when the viewable items change so we can trigger the audio feedback.
  const handleViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const currentItem = viewableItems[0].item;
      if (currentItem.audio) {
        playAudio(currentItem.audio);
      }
    }
  });

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      paddingTop: 90,
      paddingHorizontal: 30,
      alignItems: "center",
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
    },
    toggleButton: {
      position: "absolute",
      top: 30,
      right: 20,
      padding: 10,
    },
    optionContainer: {
      width, // full available width for container (for header/footer spacing to work)
      alignItems: "center",
      justifyContent: "center",
    },
    optionCard: {
      width: slideWidth,
      // Increase the height (if needed) so that it fills at least half of the screen
      height: Math.max(height * 0.7, 300),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
      borderWidth: 4,
      padding: 20,
    },
    optionText: {
      fontSize: 36, // Bigger title
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
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome, Students! 👋</Text>
        <Text style={styles.subText}>
          Swipe to explore. Audio will notify you when a new option is in view.
        </Text>
      </View>

      {/* Navigation Buttons */}
      <Link href="/(auth)/(login)/page" asChild>
        <Pressable style={styles.logo} onPress={() => setDarkMode(!darkMode)}>
          <FontAwesome name="angle-left" size={50} color={theme.text} />
        </Pressable>
      </Link>

      <Pressable style={styles.toggleButton} onPress={() => setDarkMode(!darkMode)}>
        <FontAwesome name={darkMode ? "moon-o" : "sun-o"} size={36} color={theme.text} />
      </Pressable>

      {/* FlatList for the swipeable options */}
      <FlatList
        data={options}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={true}
        onViewableItemsChanged={handleViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig}
        // ListHeaderComponent and ListFooterComponent add spacing so the first and last slides are centered.
        ListHeaderComponent={<View style={{ width: (width - slideWidth) / 2 }} />}
        ListFooterComponent={<View style={{ width: (width - slideWidth) / 2 }} />}
        renderItem={({ item }) => (
          <View style={styles.optionContainer}>
            <Link href={item.page} asChild>
              <Pressable onPress={() => setSelectedOption(item.id)}>
                <View
                  style={[
                    styles.optionCard,
                    {
                      backgroundColor:
                        selectedOption === item.id ? theme.tint : "transparent",
                      borderColor: theme.btnBorder,
                    },
                  ]}
                >
                  <FontAwesome
                    name={item.icon}
                    size={120} // Bigger icon
                    color={selectedOption === item.id ? theme.btnColor : theme.icon}
                  />
                  <Text
                    style={[
                      styles.optionText,
                      { color: selectedOption === item.id ? theme.btnColor : theme.text },
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
          </View>
        )}
      />
    </View>
  );
};

export default Home;