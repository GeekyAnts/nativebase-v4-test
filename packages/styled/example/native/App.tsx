// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";

import { styled } from "@native-base/styled-test";

const TestComponent = styled(
  View,
  {
    baseStyle: {
      style: {
        backgroundColor: "red",
        padding: "$10",
      },
      state: {
        hover: {
          style: {
            backgroundColor: "$primary.600",
          },
        },
      },
    },
    variants: {
      primary: {
        style: {
          backgroundColor: "$primary.500",
        },
        state: {
          hover: {
            style: {
              p: "$20",
              backgroundColor: "$secondary.600",
            },
          },
        },
      },
    },
  },
  {
    // states: ["hover"]
  }
);

export default function App() {
  return (
    <View style={styles.container}>
      <TestComponent
        // variant="primary"
        states={{
          hover: false,
        }}
      >
        Hello world
      </TestComponent>
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
