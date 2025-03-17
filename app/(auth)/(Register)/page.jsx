import {
  TextInput,
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "../../../constants/Colors";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  const theme = darkMode ? Colors.dark : Colors.light;

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
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password, // Using PIN as password since no password input is present
      pin: pin,
    };
  
    try {
      const response = await fetch("http://localhost:8000/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Registration successful!");
        // Reset form fields
        setFirstName("");
        setLastName("");
        setEmail("");
        setPin("");
        setConfirmPin("");
      } else {
        setError(data.detail); // FastAPI sends error messages in the "detail" field
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };
  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 30,
      backgroundColor: theme.background,
    },
    toggleButton: {
      position: "absolute",
      top: 25,
      right: 30,
      borderRadius: 20,
    },
    label: {
      fontSize: 22,
      marginBottom: 5,
      fontFamily: "PoppinsMedium",
      color: theme.text,
      textAlign: "left",
    },
    input: {
      height: 60,
      borderWidth: 3,
      borderRadius: 10,
      paddingHorizontal: 15,
      fontSize: 20,
      fontFamily: "PoppinsMedium",
      width: "100%",
      backgroundColor: theme.background,
      color: theme.buttonText,
      borderColor: theme.tint,
      marginBottom: 20,
    },
    button: {
      padding: 18,
      borderRadius: 10,
      alignItems: "center",
      width: "100%",
      backgroundColor: theme.tint,
      borderWidth: 3,
      borderColor: theme.btnBorder,
    },
    buttonText: {
      fontSize: 22,
      fontFamily: "PoppinsBold",
      color: theme.btnColor,
    },
    errorText: {
      color: "red",
      fontSize: 16,
      marginBottom: 10,
    },
  });

  return (
    <View style={styles.container}>
      <Pressable style={styles.toggleButton} onPress={() => setDarkMode(!darkMode)}>
        <FontAwesome name={darkMode ? "moon-o" : "sun-o"} size={40} color={theme.text} />
      </Pressable>

      <Text style={styles.label}>First Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your first name"
        placeholderTextColor={theme.placeholder}
        value={firstName}
        onChangeText={setFirstName}
      />

      <Text style={styles.label}>Last Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your last name"
        placeholderTextColor={theme.placeholder}
        value={lastName}
        onChangeText={setLastName}
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor={theme.placeholder}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

<Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor={theme.placeholder}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Text style={styles.label}>Confirm Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirm your password"
        placeholderTextColor={theme.placeholder}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Text style={styles.label}>PIN:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a 4 or 6-digit PIN"
        placeholderTextColor={theme.placeholder}
        keyboardType="numeric"
        maxLength={6}
        secureTextEntry
        value={pin}
        onChangeText={setPin}
      />

      <Text style={styles.label}>Confirm PIN:</Text>
      <TextInput
        style={styles.input}
        placeholder="Re-enter your PIN"
        placeholderTextColor={theme.placeholder}
        keyboardType="numeric"
        maxLength={6}
        secureTextEntry
        value={confirmPin}
        onChangeText={setConfirmPin}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Pressable style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>
    </View>
  );
};

export default Register;
