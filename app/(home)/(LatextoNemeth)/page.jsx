import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import BrailleKeyboard from "@/components/ui/BrailleKeyboard";
import { Colors } from "../../../constants/Colors";
import LatexKeyboard from "@/components/ui/LatexKeyboard";
import KaTeXView from "@/components/ui/KaTeXView";

const ImageToLatex = () => {
  const [darkMode, setDarkMode] = useState(true);
  const theme = darkMode ? Colors.dark : Colors.light;
  const [brailleText, setBrailleText] = useState("");

  const handleBrailleSelect = (input) => {
    if (input === 'backspace') {
      setBrailleText((prev) => prev.slice(0, -1));
    } else {
      setBrailleText((prev) => prev + input);
    }
  };
  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: theme.background,
    },
    textBox: {
      marginTop: 40,
      width: "60%",
      height: "50%",
      fontSize: 28,
      color: theme.text,
      backgroundColor: theme.card,
      padding: 20,
      textAlignVertical: "top",
      borderRadius: 10,
      fontFamily: "PoppinsRegular",
    },
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1, width: "100%" }}>
        <View style={{ alignItems: "center", flexGrow: 1 }}>
          <KaTeXView
            style={styles.textBox}
            value={brailleText}
            editable={false}
            multiline
          />
        </View>
        <LatexKeyboard onSelect={handleBrailleSelect} />
      </SafeAreaView>
    </View>
  );
};

export default ImageToLatex;
