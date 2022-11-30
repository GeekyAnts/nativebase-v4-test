// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

// console.log("hello here");
// import { Button } from "ui";
// import { ButtonExpo } from "./button-expo";
import { H1Custom } from "ui";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <H1Custom text="Hello there form expo"></H1Custom>
      {/* <StatusBar style="auto" /> */}
      {/* <Button
        onClick={() => {
          console.log("WORKING");
        }}
      /> */}
      {/* <Button
        onClick={() => {
          console.log("WOORKING BUTTON EXPO");
        }}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
