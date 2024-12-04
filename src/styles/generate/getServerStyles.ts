import { writeStaticCSS, writeStaticDarkModeCSS } from "../../utils";
import { Config, MainInput } from "../../types";
import { getSharedStyles } from "./getSharedStyles";

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
    writeStaticCSS(styleResult, cIdHash);
  } else {
    writeStaticDarkModeCSS(styleResult, cIdHash);
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
