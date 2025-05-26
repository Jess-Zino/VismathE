import { TextInput, View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState, useEffect, useFocusEffect, useCallback } from "react";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../../constants/Colors";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { Audio } from "expo-av";
import * as Speech from "expo-speech";

import * as SecureStore from "expo-secure-store";
import { Link } from "expo-router"; // Ensure you're using expo-router

const Register = () => {
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
const [sound, setSound] = useState(null);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [selectedOption, setSelectedOption] = useState("password");

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
 
  useEffect(() => {
    loadCredentials();
  }, []);

  const validatePin = (value) => {
    return /^(\d{4}|\d{6})$/.test(value);
  };

  const handleRegister = async () => {
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    if (!validatePin(pin)) {
      setError("PIN must be 4 or 6 digits long.");
      return;
    }
    if (pin !== confirmPin) {
      setError("PINs do not match");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    const payload = {
      name: Name,
      email,
      password,
      pin,
    };

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        setName("");
        setEmail("");
        setPin("");
        setConfirmPin("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setError(data.detail);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-evenly",
      padding: 30,
      paddingTop:90,
      backgroundColor: theme.background,
    },
    toggleButton: {
      position: "absolute",
      top: 50,
      right: 30,
      borderRadius: 20,
    },
    label: {
      fontSize: 25,
      marginBottom: 5,
      fontFamily: "PoppinsMedium",
      color: theme.text,
    },
    input: {
      height: 90,
      borderWidth: 3,
      borderRadius: 10,
      paddingHorizontal: 15,
      fontSize: 26,
      fontFamily: "PoppinsMedium",
      backgroundColor: theme.background,
      color: theme.buttonText,
      borderColor: theme.tint,
      marginBottom: 30,
    },
    button: {
      padding: 20,
      borderRadius: 10,
      alignItems: "center",
      width: "100%",
      paddingVertical: 30,
      backgroundColor: theme.tint,
      borderWidth: 3,
      marginTop: 20,
    },
    buttonText: {
      fontSize: 30,
      fontFamily: "PoppinsBold",
      color: theme.btnColor,
    },
    errorText: {
      color: "red",
      fontSize: 16,
      marginBottom: 10,
    },
    optionsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginBottom: 20,
    },
    option: {
      padding: 15,
      alignItems: "center",
      borderRadius: 10,
      paddingTop:40,
      width: "45%",
    },
    optionText: {
      fontSize: 28,
      fontFamily: "PoppinsBold",
      marginTop: 8,
    },
    logbutton: {
      padding: 20,
      borderRadius: 10,
      alignItems: "center",
      width: "100%",
      paddingVertical: 25,
      backgroundColor: theme.tint,
      borderWidth: 3,
      marginTop: 20,
    },
    logo: {
      position: "absolute",
      top: 30,
      left: 20,
    },
    pageName: {
      position: "absolute",
      top: 40,
      left: "40%",
        fontSize: 35,
      marginBottom: 5,
      fontFamily: "PoppinsBold",
      color: theme.text,
    },
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={handleGesture}>
        <View style={styles.container}>
           <Pressable style={styles.logo} onPress={ ()=>{router.navigate("/(SplashScreen)")}}>
              <FontAwesome name="angle-left" size={70} color={theme.text} />
            </Pressable>
    <Text style={styles.pageName}>Register</Text>
          <Pressable
            style={styles.toggleButton}
            onPress={() => setDarkMode(!darkMode)}
          >
            <FontAwesome
              name={darkMode ? "moon-o" : "sun-o"}
              size={50}
              color={theme.text}
            />
          </Pressable>

          <View style={styles.optionsContainer}>
            {options.map((option) => (
              <Pressable
                key={option.id}
                style={[
                  styles.option,
                  { borderWidth: 3, borderColor: theme.btnBorder },
                  selectedOption === option.id && {
                    backgroundColor: theme.tint,
                    borderColor: theme.tint,
                  },
                ]}
                onPress={() => {setSelectedOption(option.id)
                   Speech.speak(`You selected ${optionId === "pin" ? "PIN" : "Password"}`);
                }}
              >
                <MaterialIcons
                  name={option.icon}
                  size={50}
                  color={theme.btnBorder}
                />
                <Text
                  style={[
                    styles.optionText,
                    {
                      color:
                        selectedOption === option.id
                          ? theme.btnColor
                          : theme.text,
                    },
                  ]}
                >
                  {option.label}
                </Text>
              </Pressable>
            ))}
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <View>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email..."
            placeholderTextColor={theme.placeholder}
            value={email}
            onChangeText={setEmail}
            autoComplete="email"
          />

          {selectedOption === "password" && (
            <View>
              <Text style={styles.label}>Password:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password..."
                placeholderTextColor={theme.placeholder}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="password"
              />

              <Text style={styles.label}>Confirm Password:</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirm your password..."
                placeholderTextColor={theme.placeholder}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>
          )}

          {selectedOption === "pin" && (
            <View>
              <Text style={styles.label}>Pin:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your pin"
                placeholderTextColor={theme.placeholder}
                keyboardType="numeric"
                maxLength={6}
                value={pin}
                onChangeText={setPin}
              />

              <Text style={styles.label}>Confirm Pin:</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirm your pin"
                placeholderTextColor={theme.placeholder}
                keyboardType="numeric"
                maxLength={6}
                value={confirmPin}
                onChangeText={setConfirmPin}
              />
            </View>
          )}
           </View>
  <View>
   
          <Pressable style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>

            <Pressable style={styles.logbutton}  onPress={() => router.navigate("/(auth)/(login)/page")}>
              <Text
                style={[
                  styles.buttonText,
                  { color: darkMode ? "#fff" : "#000" },
                ]}
              >
                Login
              </Text>
              
            </Pressable>
          </View>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default Register;
