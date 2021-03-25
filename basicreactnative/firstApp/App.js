import React from "react";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  Image,
  SafeAreaView,
  View,
  Button,
  Alert,
  Platform,
  StatusBar,
} from "react-native";

export default function App() {
  const handleButtonPress = () => {
    Alert.alert(
      "Stop right there!",
      "button tapped bro",
      [
        { text: "Oh no!", onPress: () => console.log("ye") },
        { text: "My Queen!", onPress: () => console.log("nah") },
      ],
      { cancelable: true }
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text onPress={() => console.log("text boi")}>Hello React Native</Text>
      <TouchableNativeFeedback onPress={() => console.log("view boi")}>
        <View style={styles.viewButton}>
          <Text>Android Native Button</Text>
        </View>
      </TouchableNativeFeedback>
      <Button
        color={"gray"}
        title={"Click me bro"}
        onPress={handleButtonPress}
      ></Button>
      <Image source={require("./assets/favicon.png")} />
      <TouchableHighlight onPress={() => console.log("image boi")}>
        <Image
          blurRadius={5}
          fadeDuration={1000}
          resizeMode={"stretch"}
          source={{ uri: "https://picsum.photos/300", width: 200, height: 300 }}
        />
      </TouchableHighlight>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  viewButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 70,
    backgroundColor: "turquoise",
  },
});
