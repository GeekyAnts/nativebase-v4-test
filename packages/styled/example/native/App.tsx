// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";

import { styled } from "@gluestack/styled";

const Box = styled(
  View,
  {
    baseStyle: {
      style: {
        bg: "$red.500",
        p: "$3",
      },
      state: {
        hover: {
          style: {
            bg: "$red.300",
          },
        },
      },
    },
    variants: {
      greenBox: {
        style: {
          bg: "$secondary.500",
        },
        state: {
          hover: {
            style: {
              bg: "$primary.600",
            },
          },
        },
      },
    },
  },
  {}
);

export default function App() {
  return (
    <View style={styles.container}>
      <Box
      // variant="greenBox"
      // states={{
      //   hover: false,
      // }}
      // sx={{
      //   state: {
      //     hover: {
      //       style: {
      //         bg: "$red.500",
      //       },
      //     },
      //   },
      // }}
      >
        Hello Box
      </Box>
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
