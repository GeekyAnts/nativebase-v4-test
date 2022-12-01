// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";

import { styled } from "@native-base/styled-test";
// import { Button } from "ui";
// import { ButtonExpo } from "./button-expo";

const Button = styled(
  Pressable,
  {
    baseStyle: {
      style: {
        // bg: "$primary.500",
        px: "$4",
        py: "$3",
        // w: 400,}
      },
      descendants: {
        _text: {
          style: {
            color: "$secondary.500",
          },
        },
      },
    },
    variants: {
      blueBox: {
        style: { bg: "$primary.500" },
        // state: {
        //   hover: { bg: "$primary.600" },
        //   focus: { borderWidth: "1", borderColor: "$primary.300" },
        //   active: { bg: "$primary.800" },
        // },
        // p: "$10",
      },
      greenBox: {
        bg: "$secondary.400",
        // px: "$10",
      },
    },
    sizes: {
      small: {
        style: {
          w: 100,
          h: 100,
        },
      },
      medium: {
        style: {
          w: 200,
          h: 200,
        },
      },
      large: {
        style: {
          w: 300,
          h: 300,
        },
      },
    },
    defaultProps: {
      size: "small",
      variant: "blueBox",
    },

    // _text: {
    //   style: { color: "$primary.100" },
    //   state: {
    //     hover: { color: "$red.600" },
    //     focus: { color: "$primary.300" },
    //     active: { color: "$primary.900" },
    //   },
    // },
  },
  {
    descendentStyle: ["_text"],
    states: ["hover", "focus", "pressed"],
    aliases: {
      bg: "backgroundColor",
    },
  }
);
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      {/* <StatusBar style="auto" /> */}
      {/* <Button
        onClick={() => {
          console.log("WORKING");
        }}
      /> */}
      <Button
        sx={{
          style: {
            bg: "$red.800",
          },
        }}
        onPress={() => {
          console.log("WOORKING BUTTON EXPO");
        }}
      >
        <Text>Hello</Text>
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
