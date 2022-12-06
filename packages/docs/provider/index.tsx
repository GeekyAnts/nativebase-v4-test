import React from "react";
import { NavigationProvider } from "./navigation";

export function Provider({ children }: { children: any }) {
  return <NavigationProvider>{children}</NavigationProvider>;
}
