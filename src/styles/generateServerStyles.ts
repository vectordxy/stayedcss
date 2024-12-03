import {
  writeCSS,
  writeDarkModeCSS,
} from "../server/utils/files/handleServerCSSFile";
import { generateSharedStyles } from "./generateSharedStyles";
import { ConfigType, MainInputType } from "../types";

export const generateStyles = (
  input: MainInputType,
  inputScreenMode: "default" | "dark",
  config?: ConfigType
) => {
  const { styleResult, stylesForProxy, cIdHash } = generateSharedStyles(
    input,
    inputScreenMode,
    config
  );

  if (inputScreenMode === "default") {
    writeCSS(styleResult, cIdHash);
  } else {
    writeDarkModeCSS(styleResult, cIdHash);
  }

  return new Proxy(stylesForProxy, {
    get(target, prop) {
      if (typeof prop === "string" && prop in target) {
        return target[prop];
      } else {
        console.warn(`Property "${String(prop)}" does not exist on styles.`);
        return undefined;
      }
    },
  });
};
