import { StyleType } from "./types";
import { updateClassnameAndCSS } from "./utils/updateStyle";

export default function hz(inputStyle: StyleType) {
  return updateClassnameAndCSS(inputStyle);
}
