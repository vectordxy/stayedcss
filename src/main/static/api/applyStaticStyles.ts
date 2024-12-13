import { MainInput } from "../../../types";
import { getStaticStyles } from "../../../styles/generate/generateStylesFile";
import { generateStylesClassName } from "../../../styles/generate/generateStylesClassName";

export function stayedcss(input: MainInput) {
  getStaticStyles(input, "default");
  return generateStylesClassName(input);
}

export function stayedcssDark(input: MainInput) {
  getStaticStyles(input, "dark");
}
