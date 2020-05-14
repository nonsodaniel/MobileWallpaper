import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'


class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open Up in the container</Text>
      </View>
    )
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})



export default App

