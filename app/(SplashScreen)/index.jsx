import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const app = () => {
  return (
    <View>
      <Text style={styles.text}>index</Text>
      <Link href="/(auth)/(login)/page" asChild>
        <Pressable>
            <Text style={styles.text}>Home</Text>
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
export default app

