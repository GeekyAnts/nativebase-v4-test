// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

// console.log("hello here");
import { Button, ButtonText, Heading, UIProvider } from "@native-base/ui-test";
import { MyButton } from "./components";

export default function App() {
  return (
    <UIProvider components={{ Button: MyButton }}>
      <View style={styles.container}>
        <Button
          sx={{
            style: {
              bg: "$primary.600",
              p: "$3",
            },
          }}
          onPress={() => console.log("Hellllllllo")}
        >
          <ButtonText>Click me</ButtonText>
        </Button>
        {/* <Heading>Heading</Heading> */}
      </View>
    </UIProvider>
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
