import { TextInput, View, Text, StyleSheet, Pressable, Image } from 'react-native';
import React, { useState } from 'react';
import { Link } from 'expo-router';
import { Colors } from '../../../constants/Colors'; // Assuming color.ts is in the same directory
import { Feather } from '@expo/vector-icons'; // Library for icons

const Login = () => {
  const [text, setText] = useState('');
  const [selectedOption, setSelectedOption] = useState('email');
  const [darkMode, setDarkMode] = useState(true);

  const options = [
    { id: 'facial', label: 'Facial Recognition' },
    { id: 'voice', label: 'Voice' },
    { id: 'google', label: 'Sign in with Google' },
    { id: 'email', label: 'Sign in with Email' }
  ];

  const theme = darkMode ? Colors.dark : Colors.light;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
      <Pressable style={styles.toggleButton} onPress={() => setDarkMode(!darkMode)}>
        <Feather name={darkMode ? 'sun' : 'moon'} size={40} color={theme.text} />
      </Pressable>
      <View style={styles.optionsContainer}>
  {options.map(option => (
    <Pressable
      key={option.id}
      style={[styles.option, selectedOption === option.id && { backgroundColor: theme.tint }]}s
      onPress={() => setSelectedOption(option.id)}
    >
      <Text style={[styles.optionText, { color: theme.text }]}>{option.label}</Text>
    </Pressable>
  ))}
</View>


      {selectedOption === 'email' && (
        <View>
          <Text style={[styles.label, { color: theme.text }]}>Email:</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.background, color: theme.buttonText, borderColor: theme.tint }]}
            placeholder="Enter your email..."
            placeholderTextColor={theme.icon}
            value={text}
            onChangeText={setText}
          />
          <Text style={[styles.output, { color: theme.text }]}>You entered: {text}</Text>
        </View>
      )}

      <Link href="/(SplashScreen)" asChild>
        <Pressable style={[styles.button, { backgroundColor: theme.tint }]}>
          <Text style={styles.buttonText}>Home</Text>
        </Pressable>
      </Link>
       <Link href="/(auth)/(Register)/page" asChild>
                    <Pressable style={[styles.regbutton, {backgroundColor: theme.background,borderColor: theme.btnBorder}]}>
                      <Text style={[styles.buttonText, { color: darkMode ? "#fff" : "#000" }]}>Register</Text>
                    </Pressable>
                  </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding:30,
    paddingTop: 60,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
    borderRadius: 20,
  },
  toggleButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
    borderRadius: 20,
  },
  
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Enables wrapping to the next line
    justifyContent: 'center', // Centers items horizontally
    alignItems: 'center', // Aligns items vertically
    marginBottom: 20,
    width: '100%',
  },
  
  option: {
    width: '45%', // Adjusted to fit two items per row
    paddingVertical: 45,
  
    borderRadius: 10,
    margin: 5, // Added margin to prevent overlap
    alignItems: 'center', // Centers text inside
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 21,
    color:"#00",
    fontFamily:"PoppinsBlack"
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  output: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    width: 200,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  regbutton: {
    borderWidth: 3,
    padding: 25,
    borderRadius: 10,
    width: "75%",
    alignItems: "center",
    marginVertical: 10,
  },
});

export default Login;
