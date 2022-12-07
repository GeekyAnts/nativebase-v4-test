const config = {
  bg: {
    property: "backgroundColor",
    scale: "color",
  },
  color: {
    property: "color",
    scale: "color",
  },
  p: {
    property: "padding",
    scale: "space",
  },
  px: {
    property: "paddingHorizontal",
    scale: "space",
  },
  py: {
    property: "paddingVertical",
    scale: "space",
  },
} as any;

const tokens = {
  color: {
    red: {
      "100": "#00000",
      "200": "#23333",
      "500": "#6ffcvd",
    },
  },
  space: {
    "1": 4,
    "2": 8,
    "3": 12,
    "4": 16,
    "5": 20,
  },
} as any;

module.exports = function (babel: any) {
  const { types: t } = babel;
  return {
    visitor: {
      Program(progPath: any) {
        progPath.traverse({
          CallExpression(callExpPath: any) {
            if (callExpPath.node.callee.name === "styled") {
              callExpPath.traverse({
                StringLiteral(path: any) {
                  if (path.node.value.startsWith("$")) {
                    const parentKey = path.parent.key.name;
                    if (config[parentKey] && config[parentKey]["scale"]) {
                      const scaleValue = config[parentKey]["scale"];
                      const token = path.node.value.substring(1);
                      if (token.includes(".")) {
                        const [a, b] = token.split(".");
                        path.node.value = tokens[scaleValue][a][b];
                      } else {
                        path.node.value = tokens[scaleValue][token];
                      }
                    }
                  }
                  if (
                    config[path.parent.key.name] &&
                    config[path.parent.key.name]["property"]
                  ) {
                    path.parent.key.name =
                      config[path.parent.key.name]["property"];
                  }
                },
              });
            }
          },
        });
      },
    },
  };
};
