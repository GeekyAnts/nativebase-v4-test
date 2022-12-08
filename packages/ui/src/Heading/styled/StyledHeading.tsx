import { styled } from "@native-base/styled-test";
import { H1 } from "@expo/html-elements";
export default styled(
  H1,
  {
    baseStyle: {
      style: {
        color: "$primary.500",
        // fs: "$10",
      },
    },
  },
  {}
);
