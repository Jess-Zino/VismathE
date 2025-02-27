import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const register = () => {
  return (
    <View>
        <Text style={styles.text}> login</Text>
             <Link href="/(SplashScreen)" asChild>
                    <Pressable>
                        <Text style={styles.text}>Home</Text>
                    </Pressable>
                  </Link>
                  <Link href="/(auth)/(login)/page" asChild>
                    <Pressable>
                        <Text style={styles.text}>Login</Text>
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
export default register