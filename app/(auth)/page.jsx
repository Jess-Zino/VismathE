import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const index = () => {
  return (
    <View>
      <Text style={styles.text}>Home</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    text:{
        color: 'white',
        fontSize:40,
        paddingTop: 100,
    }})
export default index

