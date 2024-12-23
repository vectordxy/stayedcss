import { MainInput } from "../../../types";
import { getStyles } from "../../../styles/generate/getStyles";
import { generateClassName } from "../../../styles/generate/generateClassName";

export const useStyle = (input: MainInput) => {
  getStyles(input);
  return generateClassName(input);
};
