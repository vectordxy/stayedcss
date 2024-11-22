import { updateClassnameAndCSS } from "./updateStyle";
import { StyleType } from "./types";

const getFilePath = () => {
  const module = new URL(import.meta.url);
  const rootPath = module.pathname.split("/app")[1];
  return rootPath;
};

const hz = (inputStyle: StyleType) => {
  return updateClassnameAndCSS(inputStyle, getFilePath());
};

export default hz;
