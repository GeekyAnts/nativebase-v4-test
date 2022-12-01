import { View } from "react-native";
// import { useHover, useFocus, useActive } from "react-native-web-hooks";
import { useFocusRing } from "@react-native-aria/focus";
import StyledButton from "./styled/Button";
import React, { createContext, useState } from "react";

export const ButtonContext = createContext<any>({});

export const useHover = () => {
  const [isHovered, setHovered] = React.useState(false);
  return {
    hoverProps: {
      onHoverIn: () => setHovered(true),
      onHoverOut: () => setHovered(false),
    },
    isHovered,
  };
};

export const useFocus = () => {
  const [isFocused, setFocused] = React.useState(false);
  return {
    focusProps: {
      onFocus: () => setFocused(true),
      onBlur: () => setFocused(false),
    },
    isFocused,
  };
};

export const useIsPressed = () => {
  const [isPressed, setIsPressed] = React.useState(false);
  return {
    pressableProps: {
      onPressIn: () => setIsPressed(true),
      onPressOut: () => setIsPressed(false),
    },
    isPressed,
  };
};

function composeEventHandlers<E>(
  originalEventHandler?: null | ((event: E) => void),
  ourEventHandler?: (event: E) => void
) {
  return function handleEvent(event: E) {
    originalEventHandler?.(event);
    ourEventHandler?.(event);
  };
}

export function Button(
  { children, resolveContextChildrenStyle, ...props }: any,
  ref: any
) {
  const [
    resolveContextChildrenStyleState,
    setResolveContextChildrenStyleState,
  ] = useState({});
  let { isFocusVisible, focusProps: focusRingProps }: any = useFocusRing();
  const { pressableProps, isPressed } = useIsPressed();
  let { isFocused, focusProps } = useFocus();
  const { isHovered, hoverProps }: any = useHover();
  // console.log(">>>>", StyledButton);

  // setResolveContextChildrenStyleState(resolveContextChildrenStyle);

  return (
    <StyledButton
      states={{
        hover: isHovered,
        focus: isFocused,
        active: isPressed,
      }}
      {...props}
      onPressIn={composeEventHandlers(
        props?.onPressIn,
        pressableProps.onPressIn
      )}
      onPressOut={composeEventHandlers(
        props?.onPressOut,
        pressableProps.onPressOut
      )}
      // @ts-ignore - web only
      onHoverIn={composeEventHandlers(props?.onHoverIn, hoverProps.onHoverIn)}
      // @ts-ignore - web only
      onHoverOut={composeEventHandlers(
        props?.onHoverOut,
        hoverProps.onHoverOut
      )}
      // @ts-ignore - web only
      onFocus={composeEventHandlers(
        composeEventHandlers(props?.onFocus, focusProps.onFocus),
        focusRingProps.onFocus
      )}
      // @ts-ignore - web only
      onBlur={composeEventHandlers(
        composeEventHandlers(props?.onBlur, focusProps.onBlur),
        focusRingProps.onBlur
      )}
      // ref={ref}
    >
      {({ resolveContextChildrenStyle }: any) => {
        // setResolveContextChildrenStyleState(resolveContextChildrenStyle);
        return (
          <ButtonContext.Provider
            value={{
              resolveContextChildrenStyle: resolveContextChildrenStyle,
            }}
          >
            {children}
          </ButtonContext.Provider>
        );
      }}
    </StyledButton>
  );
}
