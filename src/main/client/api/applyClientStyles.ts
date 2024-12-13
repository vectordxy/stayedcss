import { MainInput } from "../../../client";
import { generateStylesClassName } from "../../../styles/generate/generateStylesClassName";
import {
  postDarkData,
  postData,
} from "../../../styles/generate/utils/request/postData";

export const stayedcssClient = (input: MainInput) => {
  if (typeof window !== "undefined") {
    postData(input, "default");
  }
  return generateStylesClassName(input);
};

export const stayedcssClientDark = (input: MainInput) => {
  if (typeof window !== "undefined") {
    postDarkData(input, "dark");
  }
};
