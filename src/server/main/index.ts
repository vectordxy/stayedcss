import { ConfigType, MainInputType } from "../../types";
import { generateStyles } from "../utils/styles/generateStyles";

export function stayedStyle(input: MainInputType, config?: ConfigType) {
  return generateStyles(input, "default", config);
}

export function stayedDarkStyle(input: MainInputType, config?: ConfigType) {
  return generateStyles(input, "dark", config);
}
