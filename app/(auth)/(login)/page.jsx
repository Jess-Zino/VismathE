import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const login = () => {
  return (
    <View>
      <Text style={styles.text}> login</Text>
       <Link href="/(SplashScreen)" asChild>
              <Pressable>
                  <Text style={styles.text}>Home</Text>
              </Pressable>
            </Link>
            <Link href="/(auth)/(Register)/page" asChild>
              <Pressable>
                  <Text style={styles.text}>Register</Text>
              </Pressable>
            </Link>
    </View>
  )
}
const styles = StyleSheet.create({
    text:{
        color: 'white',
        fontSize:40,
        paddingTop: 100,
    }})
export default login