import { StyleType } from "./types";
import { updateClassnameAndCSS } from "./updateStyle";

const getFilePath = () => {
  const module = new URL(import.meta.url);
  const rootPath = module.pathname.split("/app")[1];
  return rootPath;
};

export default function hz(inputStyle: StyleType) {
  return updateClassnameAndCSS(inputStyle, getFilePath());
}
