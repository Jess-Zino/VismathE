import React from "react";
import { TouchableOpacity, Text, StyleSheet, useColorScheme } from "react-native";

const Buttons = ({ title, onPress }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <TouchableOpacity
      style={[styles.button, isDarkMode ? styles.darkButton : styles.lightButton]}
      onPress={onPress}
      accessibilityLabel={title}
    >
      <Text style={[styles.buttonText, isDarkMode ? styles.darkButtonText : styles.lightButtonText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 25,
    fontFamily:"PoppinsMedium",
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 20,
    fontFamily:"PoppinsBold",
    fontWeight: "bold",
  },
  darkButton: {
    backgroundColor: "#1E90FF",
  },
  darkButtonText: {
    color: "#FFFFFF",
  },
  lightButton: {
    backgroundColor: "#FFD700",
  },
  lightButtonText: {
    color: "#000000",
  },
});

export default Buttons;
