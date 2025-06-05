import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LiveKaTeXView from "../../../components/ui/LiveKatexVieiw";
import LatexKeyboard from "../../../components/ui/LatexKeyboard";
import { Colors } from "../../../constants/Colors";
import LatexEditor from "../../../components/ui/LatexEditor"; // Now using props!

const ImageToLatex = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [latexText, setLatexText] = useState("");
  const [showLatexKeyboard, setShowLatexKeyboard] = useState(false);

  const theme = darkMode ? Colors.dark : Colors.light;

  const handleInput = (input) => {
    if (input === "backspace") {
      setLatexText((prev) => prev.slice(0, -1));
    } else {
      setLatexText((prev) => prev + input);
    }
  };

  return (
    <GestureHandlerRootView style={styles.flex}>
      <SafeAreaView style={[styles.flex, { backgroundColor: theme.background }]}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scroll}>
          
          {/* Live Rendered Output */}
          <View style={[styles.outputBox, { backgroundColor: theme.card }]}>
            <LiveKaTeXView value={latexText || "\\text{Your LaTeX will show here}"} />
          </View>

          {/* LaTeX Editor */}
          <LatexEditor latexText={latexText} setLatexText={setLatexText} />

          {/* Toggle Math Keyboard */}
          <TouchableOpacity
            style={styles.toggleBtn}
            onPress={() => setShowLatexKeyboard((prev) => !prev)}
          >
            <Text style={{ color: "#fff" }}>
              {showLatexKeyboard ? "Hide Math Keyboard" : "Show Math Keyboard"}
            </Text>
          </TouchableOpacity>

          {showLatexKeyboard && <LatexKeyboard onSelect={handleInput} />}
          
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scroll: {
    paddingBottom: 32,
  },
  outputBox: {
    margin: 16,
    padding: 16,
    borderRadius: 10,
    minHeight: 80,
    justifyContent: "center",
  },
  toggleBtn: {
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
    alignSelf: "flex-end",
  },
});

export default ImageToLatex;
