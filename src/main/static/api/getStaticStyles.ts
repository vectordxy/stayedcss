import { Config, MainInput } from "../../../types";
import { getStaticStyles } from "../../../styles/generate/generateStylesFile";
import { transformStyles } from "../../../utils/common/transformStyles";

export function stayedStyle(input: MainInput, config?: Config) {
  getStaticStyles(input, "default", config);
  return transformStyles(input);
}

export function stayedDarkStyle(input: MainInput, config?: Config) {
  getStaticStyles(input, "dark", config);
}
