import { BreakPointsType } from "../src/file";
import { KeyframesType, StyleObjectItemType } from "../src/style";

export type MainInputType = {
  [key: string]: StyleObjectItemType | string;
};

export type ConfigType = {
  breakpoints?: BreakPointsType;
  keyframes?: KeyframesType;
};
