import { JsonType } from "../../../types";

export const writeClientCSS = (input: JsonType[]): void => {
  const ensureStyleTag = (): CSSStyleSheet => {
    if (typeof window !== "undefined") {
      let styleElement = document.getElementById(
        "dynamic-styles"
      ) as HTMLStyleElement | null;

      if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = "dynamic-styles";
        document.head.appendChild(styleElement);
      }

      return styleElement.sheet!;
    }

    throw new Error("This function must be executed in a browser environment.");
  };

  const styleSheet = ensureStyleTag();

  const cssContent = input.map(({ style }) => style).join("\n");
  const rules = cssContent.split("\n");

  rules.forEach((rule) => {
    if (styleSheet && rule.trim()) {
      try {
        styleSheet.insertRule(rule, styleSheet.cssRules.length);
      } catch (error) {
        console.warn(`Failed to insert CSS rule: ${rule}`, error);
      }
    }
  });

  console.log("Dynamic CSS rules added successfully.");
};
