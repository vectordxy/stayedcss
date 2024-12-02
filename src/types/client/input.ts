import { BreakPointsType } from "../server/file";
import { KeyframesType, StyleObjectItemType } from "../server/style";

export type MainInputType = {
  [key: string]: StyleObjectItemType | string;
};

export type ConfigType = {
  breakpoints?: BreakPointsType;
  keyframes?: KeyframesType;
};
