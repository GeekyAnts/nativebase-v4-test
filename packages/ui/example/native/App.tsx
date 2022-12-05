// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

// console.log("hello here");
import { Button, ButtonText } from "@native-base/ui-test";
// import { ButtonExpo } from "./button-expo";

export default function App() {
  return (
    <View style={styles.container}>
      <Button
        sx={{
          style: {
            bg: "$secondary.600",
            p: "$3",
          },
          // state: {
          //   hover: {
          //     style: {
          //       bg: "$primary.400",
          //     },
          //   },
          // },
        }}
        onPress={() => console.log("Hellllllllo")}
        variant="blueBox"
      >
        <ButtonText>Click me</ButtonText>
      </Button>
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
