import React from "react";
import { config } from "./nativebase.config";
import merge from "lodash.merge";
import { Platform, StyleSheet } from "react-native";

function cloneObj(obj: Object) {
  return Object.assign({}, obj);
}

function resolveAliasesFromConfig(config: any, props: any) {
  let aliasResolvedProps: any = {};
  Object.keys(props).map((key) => {
    if (config.aliases[key]) {
      aliasResolvedProps[config.aliases[key]] = props[key];
    } else {
      aliasResolvedProps[key] = props[key];
    }
  });
  return aliasResolvedProps;
}

function resolveStyledUtilityProps(config: any, props: any) {
  let styledUtilityProps: any = {};
  let restNonUtilityProps: any = {};
  Object.keys(props).map((key) => {
    if (config?.aliases?.[key]) {
      styledUtilityProps[key] = props[key];
    } else {
      restNonUtilityProps[key] = props[key];
    }
  });
  return [styledUtilityProps, restNonUtilityProps];
}

function resolveSize(size: any, props: any, componentTheme: any) {
  let resolvedSize: any = { ...props };

  if (typeof size === "string") {
    resolvedSize = { ...resolvedSize, ...componentTheme?.size?.[size] };
  }
  delete resolvedSize["size"];
  return resolvedSize;
}

function resolveColorscheme(props: any) {
  if (props.colorScheme) {
    let colorScheme = props.colorScheme;
    delete props.colorScheme;
    Object.keys(props).map((key) => {
      if (typeof props[key] === "string") {
        props[key] = props[key].replace("$colorscheme", `$${colorScheme}`);
      }
    });

    return { ...props };
  }
  return props;
}

function resolveTokensFromConfig(config: any, props: any) {
  const newProps: any = {};
  Object.keys(props).map((prop: any) => {
    let value = props[prop];

    if (typeof value === "string" && value.startsWith("$")) {
      const tempValue = value.substring(1);
      if (tempValue.includes(".")) {
        const [token, variant] = tempValue.split(".");
        newProps[prop] = config[token]?.[variant];
      } else {
        newProps[prop] = config[tempValue];
      }
    } else {
      // TODO: Add support for prop value that are not string/number.. From NB core uSSPR
      newProps[prop] = typeof value === "number" ? value : parseInt(value);
    }
  });

  return newProps;
}
function variantStateResolver(theme: any, states?: any) {
  const { variants } = theme;
  const resolvedTheme = merge({}, theme);
  if (variants) {
    Object.keys(variants).map((variant) => {
      let resolvedVariant: any = {};
      resolvedVariant[variant] = {
        ...variants[variant].baseStyle,
      };
      if (states) {
        if (states.hover) {
          resolvedVariant[variant] = {
            ...resolvedVariant[variant],
            ...variants[variant].state?.hover,
          };
        }
        if (states.focus) {
          resolvedVariant[variant] = {
            ...resolvedVariant[variant],
            ...variants[variant].state?.focus,
          };
        }
        if (states.active) {
          resolvedVariant[variant] = {
            ...resolvedVariant[variant],
            ...variants[variant].state?.active,
          };
        }
      }
      resolvedTheme.variants[variant] = resolvedVariant[variant];
    });
  }

  return resolvedTheme;
}

function applyStylesBasedOnSpecificty(specificityMap: any, stylesheetObj: any) {
  return specificityMap.map((key: any) => {
    return stylesheetObj[key];
  });
}

function filterUndefindedProps(props: any) {
  let newProps = {} as any;
  Object.keys(props).map((key) => {
    if (props[key] !== undefined) {
      newProps[key] = props[key];
    }
  });
  return newProps;
}

function resolvedTokenization(props: any, config: any) {
  let aliasedResolvedProps = resolveAliasesFromConfig(config, props);
  let newProps = resolveTokensFromConfig(config, aliasedResolvedProps);

  // console.log(newProps);

  return newProps;
}

// function resolveStateStyle(sxState: any, states: any) {
//   let resolvedStateStyle = [] as any;

//   return resolvedStateStyle;
// }

// function resolveDecendantStyles(
//   descendants: any,
//   config: any,
//   states: any,
//   colorMode: any
// ) {
//   let resolvedDecendantStyles = {} as any;
//   if (descendants) {
//     Object.keys(descendants).forEach((key) => {
//       let decendantStyle = [] as any;
//       resolveSxRecursive(
//         descendants[key],
//         config,
//         states,
//         colorMode,
//         decendantStyle,resolveDecendantStyles
//       );
//       resolvedDecendantStyles[key] = decendantStyle;
//     });
//   }
//   return resolvedDecendantStyles;
// }

const resolveSxRecursive = (
  sx: any,
  config: any,
  states: any,
  colorMode: any,
  styleSheetsObj: any,
  resolveDecendantStyles: any,
  parent?: any
) => {
  Object.keys(sx).forEach((key) => {
    if (key === "style") {
      let resolvedStyle = resolvedTokenization(sx?.style, config);

      if (parent && parent != "style") {
        if (styleSheetsObj[parent]) {
          styleSheetsObj[parent].push(resolvedStyle);
        } else {
          styleSheetsObj[parent] = [resolvedStyle];
        }
      } else {
        if (styleSheetsObj?.style) {
          styleSheetsObj.style.push(resolvedStyle);
        } else {
          // console.log(resolvedStyle, "resolvedStyle");
          // console.log(
          //   "resolvedStyle1>>>>> UPPPP",
          //   resolvedStyle,
          //   "",
          //   styleSheetsObj
          // );
          styleSheetsObj.style = [resolvedStyle];
          // console.log("resolvedStyle1>>>>>", resolvedStyle, "", styleSheetsObj);
          // console.log(resolvedStyle, "resolvedStyle", styleSheetsObj);
        }
      }
    } else {
      if (key === "state") {
        Object.keys(states).forEach((state) => {
          if (states[state]) {
            resolveSxRecursive(
              sx[key][state],
              config,
              states,
              colorMode,
              styleSheetsObj,
              resolveDecendantStyles,
              key
            );
          }
        });
      } else if (key === "platform") {
        resolveSxRecursive(
          sx[key][Platform.OS],
          config,
          states,
          colorMode,
          styleSheetsObj,
          resolveDecendantStyles,
          key
        );
      } else if (key === "colorMode") {
        resolveSxRecursive(
          sx[key][colorMode],
          config,
          states,
          colorMode,
          styleSheetsObj,
          resolveDecendantStyles,
          key
        );
      } else if (key === "descendants") {
        Object.keys(sx[key]).forEach((descKey) => {
          let decendantStyle = [] as any;
          resolveSxRecursive(
            sx[key][descKey],
            config,
            states,
            colorMode,
            decendantStyle,
            resolveDecendantStyles,
            parent
          );
          if (!resolveDecendantStyles[descKey]) {
            resolveDecendantStyles[descKey] = {};
          }
          if (resolveDecendantStyles[descKey]) {
            if (parent && parent != "style") {
              if (resolveDecendantStyles[descKey][parent]) {
                resolveDecendantStyles[descKey][parent].push(
                  decendantStyle[parent]
                );
              } else {
                resolveDecendantStyles[descKey][parent] = [
                  decendantStyle[parent],
                ];
              }
            } else {
              if (resolveDecendantStyles[descKey]?.style) {
                resolveDecendantStyles[descKey].style.push(
                  decendantStyle.style
                );
              } else {
                resolveDecendantStyles[descKey].style = [decendantStyle.style];
              }
            }
          }
        });
      }
    }
  });
  return styleSheetsObj;
};

function resolveSx(
  { sx, variant, size, colorMode, states }: any,
  compTheme: any
) {
  let styleSheetsObj = [] as any;
  // console.log(sx);

  let resolvedDecendantStyles = {} as any;
  let resolvedCompThemeStyle = [] as any;
  resolveSxRecursive(
    compTheme.baseStyle,
    config,
    states,
    colorMode,
    resolvedCompThemeStyle,
    resolvedDecendantStyles
  );

  // Resolve variants:
  if (variant) {
    resolveSxRecursive(
      compTheme.variants[variant],
      config,
      states,
      colorMode,
      styleSheetsObj,
      resolvedDecendantStyles
    );
  }
  // console.log(
  //   "style>>",
  //   // styleSheetsObj,
  //   resolvedCompThemeStyle,
  //   resolvedDecendantStyles
  // );
  // Resolve size:
  if (size) {
    resolveSxRecursive(
      compTheme.sizes[size],
      config,
      states,
      colorMode,
      styleSheetsObj,
      resolvedDecendantStyles
    );
  }
  // let resolvedDecendantStyles = resolveDecendantStyles(
  //   descendants,
  //   config,
  //   states,
  //   colorMode
  // );
  let tokenResolvedProps;
  if (sx) {
    const { style, ...remainingSx } = sx;

    resolveSxRecursive(
      remainingSx,
      config,
      states,
      colorMode,
      styleSheetsObj,
      resolvedDecendantStyles
    );
    tokenResolvedProps = resolvedTokenization(style, config);
  }
  // console.log(styleSheetsObj, resolvedDecendantStyles, resolvedCompThemeStyle);
  // console.log(
  //   applyStylesBasedOnSpecificty(
  //     ["style", "colorMode", "state"],
  //     resolvedDecendantStyles["_text"]
  //   )
  // );
  // const states = {
  //   hover: filteredProps.hover,
  //   focus: filteredProps.focus,
  //   active: filteredProps.active,
  // };
  // let stateResolvedTheme = baseStateResolver(compTheme, states);
  // let theme = variantStateResolver(stateResolvedTheme, states);

  // let variantResolvedProps = mergePropsBasedOnSpecificity(
  //   filteredProps,
  //   theme.baseStyle,
  //   theme.variants,
  //   theme.defaultProps,
  //   sx
  // );
  // let resolvedSize = resolveSize(
  //   variantResolvedProps?.["size"],
  //   variantResolvedProps,
  //   theme
  // );
  // let colorSchemeResolvedProps = resolveColorscheme(resolvedSize);

  let mergedDecendantStylesBasedOnSpecificity = {} as any;

  Object.keys(resolvedDecendantStyles).forEach((descendant) => {
    mergedDecendantStylesBasedOnSpecificity[descendant] = {};
    mergedDecendantStylesBasedOnSpecificity[descendant] =
      applyStylesBasedOnSpecificty(
        ["style", "colorMode", "state"],
        resolvedDecendantStyles[descendant]
      );
  });
  return {
    styleSheetsObj: [
      resolvedCompThemeStyle.style,
      applyStylesBasedOnSpecificty(
        ["style", "colorMode", "state"],
        styleSheetsObj
      ),
      styleSheetsObj,
      tokenResolvedProps,
    ],
    resolveContextChildrenStyle: mergedDecendantStylesBasedOnSpecificity,
  };
}

// Wont work in nested resolution of pseudo props
function resolveContextChildrenStyle(config: any, theme: any, props: any) {
  let resolvedStyle = {} as any;

  if (config?.forwardStyle) {
    let forwardStyle = new Array(config?.forwardStyle);
    forwardStyle.map((key) => {
      resolvedStyle[key] = resolveSx(props, theme[key]);
    });
  }
  return resolvedStyle;
}

export function styled(Component: any, theme: any, compConfig: any) {
  let NewComp = (properties: any, ref: any) => {
    let mergedProps = {
      ...theme?.defaultProps,
      ...properties,
    };

    let { children, sx, variant, size, states, colorMode, ...props } =
      mergedProps;
    // console.log(props);

    // let [styledUtilityProps, nonStyledUtilityProps] = resolveStyledUtilityProps(
    //   config,
    //   props
    // );

    // let resolvedContextChildrenStyleValue = resolveContextChildrenStyle(
    //   compConfig,
    //   theme,
    //   {
    //     ...props,
    //     ...theme.defaultProps,
    //     sx,
    //     // variant,
    //     // colorScheme,
    //     // hover,
    //     // focus,
    //     // active,
    //   }
    // );
    // let consumeStyle = fetchConsumerStyle(compConfig);
    // console.log({ ...theme.defaultProps });

    const newStyle = resolveSx(
      {
        sx,
        variant,
        states,
        colorMode: colorMode ?? "light",
        size,
      },
      theme
    );

    const styleSheetObj = StyleSheet.create(newStyle.styleSheetsObj);
    console.log(newStyle, ">>>");

    return (
      <Component style={styleSheetObj} {...props} ref={ref}>
        {typeof children === "function"
          ? children({
              resolveContextChildrenStyle: newStyle.resolveContextChildrenStyle,
            })
          : children}
      </Component>
    );
  };

  let StyledComp = React.forwardRef(NewComp);
  // @ts-ignore
  StyledComp.config = compConfig;
  return StyledComp;
}
