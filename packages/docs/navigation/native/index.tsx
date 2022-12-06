import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DocsButton } from "../../docs/button";
import { DocsButton2 } from "../../docs/button/button";

const Stack = createNativeStackNavigator<{
  button: any;
  button2: any;
}>();

export function NativeNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="button"
        component={DocsButton}
        options={{
          title: "Button",
        }}
      />
      <Stack.Screen
        name="button2"
        component={DocsButton2}
        options={{
          title: "Button2",
        }}
      />
    </Stack.Navigator>
  );
}
