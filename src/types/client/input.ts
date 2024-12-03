import { BreakPoints } from "../server/file";
import { Keyframes, StyleObjectItem } from "../server/style";

export type MainInput = {
  [key: string]: StyleObjectItem | string;
};

export type Config = {
  breakpoints?: BreakPoints;
  keyframes?: Keyframes;
};
