import { styled } from "@native-base/styled-test";
import { Pressable } from "react-native";

export default styled(
  Pressable,
  {
    baseStyle: {
      style: {
        bg: "$red.500",
        px: "$4",
        py: "$3",
      },
    },
  },
  {}
);
