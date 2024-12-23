import { MainInput } from "../../../client";
import { generateClassName } from "../../../styles/generate/generateClassName";
import { postData } from "../../../styles/generate/utils/request/postData";

export const useClientStyle = (input: MainInput) => {
  if (typeof window !== "undefined") {
    postData(input);
  }
  return generateClassName(input);
};
