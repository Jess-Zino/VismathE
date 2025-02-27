import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { Link } from "expo-router";
import image from "../../assets/images/logo.png";

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

      <Link href="/(auth)/(login)/page" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Proceed</Text>
        </Pressable>
      </Link>
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
    paddingBottom: 100,
  },
  text: {
    color: "white",
    fontFamily: "PoppinsBlack",
  },
  button: {
    backgroundColor: "#1E90FF",
    padding: 25,
    borderRadius: 10,
    width: "75%",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "PoppinsBold",
    fontWeight: "bold",
  },
});

export default App;
