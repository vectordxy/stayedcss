import { writeClientCSS } from "../server/utils/files/handleClientCSSFile";
import { ConfigType, MainInputType } from "../types";
import { generateSharedStyles } from "./generateSharedStyles";

export const generateClientStyles = (
  input: MainInputType,
  inputScreenMode: "default" | "dark",
  config?: ConfigType
) => {
  const { styleResult, stylesForProxy, cIdHash } = generateSharedStyles(
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
