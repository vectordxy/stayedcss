import {
  writeCSS,
  writeDarkModeCSS,
} from "../server/utils/files/handleServerCSSFile";
import { getSharedStyles } from "./getSharedStyles";
import { Config, MainInput } from "../types";

export const getStaticStyles = (
  input: MainInput,
  inputScreenMode: "default" | "dark",
  config?: Config
) => {
  const { styleResult, stylesForProxy, cIdHash } = getSharedStyles(
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
