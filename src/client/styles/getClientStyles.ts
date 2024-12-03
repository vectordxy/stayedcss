import { writeClientCSS } from "../static/utils/files/handleClientCSSFile";
import { Config, MainInput } from "../types";
import { getSharedStyles } from "./getSharedStyles";

export const getClientStyles = (
  input: MainInput,
  inputScreenMode: "default" | "dark",
  config?: Config
) => {
  const { styleResult, stylesForProxy, cIdHash } = getSharedStyles(
    input,
    inputScreenMode,
    config
  );
  writeClientCSS(styleResult, cIdHash);

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
