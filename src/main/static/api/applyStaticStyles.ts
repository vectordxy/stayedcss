import { MainInput } from "../../../types";
import { getStaticStyles } from "../../../styles/generate/generateStylesFile";
import { generateStylesClassName } from "../../../styles/generate/generateStylesClassName";

export function st(input: MainInput) {
  getStaticStyles(input, "default");
  return generateStylesClassName(input);
}

export function stDark(input: MainInput) {
  getStaticStyles(input, "dark");
}
