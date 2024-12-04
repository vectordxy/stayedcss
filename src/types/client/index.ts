import { BreakPoints } from "../static/file";
import { Keyframes, StyleObjectItem } from "../static/style";

export type MainInput = {
  [key: string]: StyleObjectItem | string;
};

export type Config = {
  breakpoints?: BreakPoints;
  keyframes?: Keyframes;
};
