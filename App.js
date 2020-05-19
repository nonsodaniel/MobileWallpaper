import React, { Component } from 'react'
import {
  StyleSheet, Text, View,
  ActivityIndicator, FlatList, Dimensions, Image,
  Animated, TouchableWithoutFeedback, TouchableOpacity, CameraRoll, Share
} from 'react-native'
// import Icon from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome';
import Axios from 'axios'

const { height, width } = Dimensions.get('window')

class App extends Component {
  state = {
    isLoading: true, images: [],
    URL: "https://api.unsplash.com/photos/random?count=30&client_id=Od0sXvqphCVnmXukVaHww8eDgNP-q3mAtyhB-bbUAZ8",
    scale: new Animated.Value(1),
    isImageFocused: false
  }
  scale = {
    transform: [{ scale: this.state.scale }]
  }
  actionBarY = this.state.scale.interpolate({
    inputRange: [0.9, 1],
    outputRange: [0, -80]
  });
  borderRadius = this.state.scale.interpolate({
    inputRange: [0.9, 1],
    outputRange: [30, 0]
  })
  componentDidMount() {
    this.loadWallpapers()
  }

  loadWallpapers = async () => {
    this.setState({ isLoading: true })
    let { URL } = this.state
    Axios.get(URL)
      .then(res => {
        this.setState({ images: res.data, isLoading: false })
      }).catch(err => console.log(err))
  }
  showControls = (item) => {
    this.setState((state) => ({
      isImageFocused: !state.isImageFocused
    }), () => {
      if (this.state.isImageFocused) {
        Animated.spring(this.state.scale, {
          toValue: 0.9
        }).start()
      }
      else {
        Animated.spring(this.state.scale, {
          toValue: 1
        }).start()
      }
    })
  }
  saveToCameraRoll = (item) => {

  }
  shareWallPaper = async (image) => {
    try {
      await Share.share({
        message: `Checkout this wallpaper ${image.urls.full}`
      })
    } catch (error) {
      console.log(error)
    }
  }

  renderItem = ({ item }) => {
    console.log("image", item.urls.regular, height, width)
    return (
      <View style={{ flex: 1 }}>
        <View style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "black", alignItems: "center", justifyContent: "center"
        }}>
          <ActivityIndicator size="large" color="grey" />
        </View>

        <TouchableWithoutFeedback onPress={() => this.showControls(item)}>
          <Animated.View style={[{ height, width }, this.scale]}>
            <Animated.Image
              style={{ flex: 1, height: null, width: null, borderRadius: this.borderRadius }}
              source={{ uri: item.urls.regular }}
            />
          </Animated.View>
        </TouchableWithoutFeedback>

        <Animated.View
          style={{
            position: "absolute", left: 0, right: 0, bottom: this.actionBarY,
            height: 80, backgroundColor: 'black',
            flexDirection: "row", justifyContent: "space-around"
          }}
        >
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.loadWallpapers()}>
              <Icon name="refresh" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.shareWallPaper(item)}>
              <Icon name="share" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => alert("load images")}>
              <Icon name="save" size={30} color="white" />
            </TouchableOpacity>
          </View>

        </Animated.View>

      </View>
    )
  }

  render() {
    return this.state.isLoading ? (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="grey" />
      </View>
    ) : (
        <View style={{ flex: 1, backgroundColor: "black" }}>
          <FlatList
            scrollEnabled={!this.state.isImageFocused} //to avoid scaling on swipe
            horizontal
            pagingEnabled
            data={this.state.images}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      )
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center"
  }
})



export default App

