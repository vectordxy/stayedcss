import { MainInput } from "../../../types";
import { getStaticStyles } from "../../../styles/generate/generateStylesFile";
import { transformStyles } from "../../../utils/common/transformStyles";

export function stayedcss(input: MainInput) {
  getStaticStyles(input, "default");
  return transformStyles(input);
}

export function stayedcssDark(input: MainInput) {
  getStaticStyles(input, "dark");
}
