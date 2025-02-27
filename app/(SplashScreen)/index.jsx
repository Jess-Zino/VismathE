import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
  Button,
} from "react-native";
import React from "react";
import { Link } from "expo-router";
import image from "../../assets/images/logo.png";
import Buttons from "@/components/Buttons";

const { width } = Dimensions.get("window"); // Get screen width

const getFontSize = () => {
  if (width > 500) return 50; // Large screens (e.g., tablets)
  if (width > 300) return 36; // Medium screens
  return 40; // Small screens (phones)
};

const App = () => {
  return (
    <View style={styles.container}>
      <Image source={image} resizeMode="contain" />

      <Text style={[styles.text, { fontSize: getFontSize() }]}>
        Welcome to VisMath
      </Text>
      <Pressable style={styles.button}>
        <Buttons title="Proceed" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E2931",
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 40,
  },
  text: {
    color: "white",
    fontFamily: "PoppinsBlack",
  },
  button: {
    padding: 15,
    fontFamily: "PoppinsMedium",
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    marginVertical: 10,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    boxShadow: " 10px 1px 10px rgba(255, 255,255)",
  },
});

export default App;
