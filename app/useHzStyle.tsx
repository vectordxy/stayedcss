import { hz } from "./lib/hz";
import { StyleType } from "./lib/types";

export const getFilePath = () => {
  const module = new URL(import.meta.url);
  const rootPath = module.pathname.split("/app")[1];
  return rootPath;
};

export const useHzStyle = (inputStyle: StyleType) => {
  return hz(inputStyle, getFilePath());
};
