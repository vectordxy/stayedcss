import { ConfigType, MainInputType } from "../../types";
import { genenrateStyles } from "../utils/generateStyles";

export function main(input: MainInputType, config?: ConfigType) {
  return genenrateStyles(input, "default", config);
}

export function dark(input: MainInputType, config?: ConfigType) {
  return genenrateStyles(input, "dark", config);
}
