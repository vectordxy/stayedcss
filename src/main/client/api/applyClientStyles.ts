import { MainInput } from "../../../client";
import { transformStyles } from "../../../utils/common/transformStyles";
import { postDarkData, postData } from "../../../utils/request/postData";

export const stayedcssClient = (input: MainInput) => {
  if (typeof window !== "undefined") {
    postData(input, "default");
  }
  return transformStyles(input);
};

export const stayedcssClientDark = (input: MainInput) => {
  if (typeof window !== "undefined") {
    postDarkData(input, "dark");
  }
};
