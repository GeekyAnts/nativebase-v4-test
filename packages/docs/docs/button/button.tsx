import { Link } from "solito/link";
import React from "react";
import { Button, ButtonText } from "@native-base/ui-test";
import { Text } from "react-native";

export function DocsButton2() {
  return (
    <Link href="/">
      <Button disabled sx={{ style: { bg: "$primary.200" } }}>
        <ButtonText sx={{ style: { color: "$red.700" } }}>Button 2!</ButtonText>
      </Button>
      {/* <Text>Hello form button 2</Text> */}
    </Link>
  );
}
