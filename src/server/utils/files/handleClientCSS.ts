import { JsonType } from "../../../types";

export const writeClientCSS = (input: JsonType[], componentId: string) => {
  if (typeof window === "undefined") {
    console.warn("writeClientCSS can only run in the browser.");
    return;
  } else if (typeof window !== undefined) {
    const styleSheetName = `styles-${componentId}`;
    let styleElement = document.getElementById(
      styleSheetName
    ) as HTMLStyleElement | null;

    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = styleSheetName;
      document.head.appendChild(styleElement);
    }
    const styleSheet = styleElement.sheet as CSSStyleSheet;

    for (let item of input) {
      if (item.style) {
        try {
          styleSheet.insertRule(item.style, styleSheet.cssRules.length);
        } catch (error) {
          console.warn(`Failed to insert CSS rule: ${item.style}`, error);
        }
      } else {
        console.warn("Invalid style format:", item);
      }
    }
    console.log("Dynamic CSS rules added successfully.");
  }
};
