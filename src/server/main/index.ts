import { ConfigType, MainInputType } from "../../types";
import { generateStyles } from "../utils/styles/generateStyles";

export function paint(input: MainInputType, config?: ConfigType) {
  return generateStyles(input, "default", config);
}

export function paintDark(input: MainInputType, config?: ConfigType) {
  return generateStyles(input, "dark", config);
}
