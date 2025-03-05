import React, { useState } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { Link } from "expo-router";
import { Colors } from "../../../constants/Colors";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedOption, setSelectedOption] = useState("pin");
  const [darkMode, setDarkMode] = useState(true);

  const theme = darkMode ? Colors.dark : Colors.light;
  const options = [
    { id: "pin", label: "PIN", icon: "dialpad" },
    { id: "password", label: "Password", icon: "lock" },
  ];

  const handleGesture = (event) => {
    if (event.nativeEvent.translationX < -50) {
      setSelectedOption("pin");
    } else if (event.nativeEvent.translationX > 50) {
      setSelectedOption("password");
    }
  };

  const loadCredentials = async () => {
    const savedEmail = await SecureStore.getItemAsync("userEmail");
    const savedPassword = await SecureStore.getItemAsync("userPassword");
    if (savedEmail) setEmail(savedEmail);
    if (savedPassword) setPassword(savedPassword);
  };

  React.useEffect(() => {
    loadCredentials();
  }, []);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-around",
      alignItems: "center",
      padding: 30,
      paddingTop: 30,
    },
    logo: {
      marginBottom: 20,
      position: "absolute",
      top: 5,
      left: 20,
      padding: 10,
      borderRadius: 20,
    },
    toggleButton: {
      position: "absolute",
      top: 25,
      right: 30,
      borderRadius: 20,
    },

    optionsContainer: {
      flexDirection: "row",
      flexWrap: "wrap", // Enables wrapping to the next line
      justifyContent: "center", // Centers items horizontally
      alignItems: "center", // Aligns items vertically
      marginTop: 50,
      width: "100%",
    },

    option: {
      width: "45%", // Adjusted to fit two items per row
      paddingVertical: 45,

      borderRadius: 10,
      margin: 5, // Added margin to prevent overlap
      alignItems: "center", // Centers text inside
      justifyContent: "center",
    },
    optionText: {
      fontSize: 21,
      color: "#00",
      fontFamily: "PoppinsBlack",
    },
    label: {
      fontSize: 25,
      marginBottom: 8,
      fontFamily: "PoppinsMedium",
    },
    input: {
      height: 75,
      borderWidth: 3,
      borderRadius: 10,
      paddingHorizontal: 10,
      marginBottom:30,
      fontSize: 20,
      fontFamily: "PoppinsMedium",
    },

    output: {
      marginTop: 20,
      fontSize: 18,
      fontWeight: "bold",
    },
    button: {
      padding: 15,
      borderRadius: 10,
      marginTop: 20,
      alignItems: "center",
      width: 200,
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 22,
      fontWeight: "600",
      fontFamily: "PoppinsBold",
    },
    logbutton: {
      borderWidth: 3,
      borderColor: theme == "dark" ? theme.btnBorder : theme.tint,

      padding: 25,
      backgroundColor: theme.tint,
      borderRadius: 10,
      width: "90%",
      alignItems: "center",
      marginVertical: 10,
    },
  });
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={handleGesture}>
        <View style={[styles.container, { backgroundColor: theme.background }]}> 
        <Link href="/(SplashScreen)" asChild>
        <Pressable style={styles.logo} onPress={() => setDarkMode(!darkMode)}>
          <FontAwesome
            name="angle-left" // Use FontAwesome icon names
            size={60}
            color={theme.text}
          />
        </Pressable>
      </Link>
          <Pressable style={styles.toggleButton} onPress={() => setDarkMode(!darkMode)}>
            <FontAwesome name={darkMode ? "moon-o" : "sun-o"} size={40} color={theme.text} />
          </Pressable>

          <View style={styles.optionsContainer}>
            {options.map((option) => (
              <Pressable
                key={option.id}
                style={[styles.option,{borderWidth:3, borderColor:theme.btnBorder}, selectedOption === option.id && { backgroundColor: theme.tint , borderColor:theme.tint}]}
                onPress={() => setSelectedOption(option.id)}
              >
                <MaterialIcons name={option.icon} size={50} color={theme.icon} />
                <Text style={[styles.optionText, { color: selectedOption === option.id ? theme.btnColor : theme.text }]}>
                  {option.label}
                </Text>
              </Pressable>
            ))}
          </View>

          <View style={{ width: "90%" }}>
            <Text style={[styles.label, { color: theme.text }]}>Email:</Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.background, color: theme.buttonText, borderColor: theme.tint }]}
              placeholder="Enter your email..."
              placeholderTextColor={theme.placeholder}
              value={email}
              onChangeText={setEmail}
              autoComplete="email"
            />

            {selectedOption === "password" && (
              <>
                <Text style={[styles.label, { color: theme.text }]}>Password:</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: theme.background, color: theme.buttonText, borderColor: theme.tint }]}
                  placeholder="Enter your password..."
                  placeholderTextColor={theme.placeholder}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoComplete="password"
                />
              </>
            )}

            {selectedOption === "pin" && (
              <>
                <Text style={[styles.label, { color: theme.text }]}>Pin:</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: theme.background, color: theme.buttonText, borderColor: theme.tint }]}
                  placeholder="Enter your pin"
                  placeholderTextColor={theme.placeholder}
                  keyboardType="numeric"
                  maxLength={6}
                />
              </>
            )}
          </View>

          <Link href="/(home)/page" asChild>
            <Pressable style={styles.logbutton}>
              <Text style={[styles.buttonText, { color: darkMode ? "#fff" : "#000" }]}>Login</Text>
            </Pressable>
          </Link>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};


export default Login;
