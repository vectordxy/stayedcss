import { getFilePath } from "./getFilePath";
import { StyleType } from "../types";
import { updateClassnameAndCSS } from "./updateStyle";

export default function hz(inputStyle: StyleType) {
  return updateClassnameAndCSS(inputStyle, getFilePath());
}
