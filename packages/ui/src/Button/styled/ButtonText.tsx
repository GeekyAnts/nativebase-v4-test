import { Text } from "react-native";
import { styled } from "@native-base/styled-test";

export default styled(
  Text,
  {
    baseStyle: { style: { color: "$primary.100" } },
  },
  { ancestorStyle: ["_text"] }
);
