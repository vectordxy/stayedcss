export interface StylesForProxyType {
  [key: string]: string;
}

export interface StyleItemType {
  [styleKey: string]: string | number;
}

export interface StyleObjectItemType {
  [styleKey: string]: string | number | StyleItemType;
}

export type KeyframeStyle = {
  [property: string]: string | number;
};

export type KeyframesType = {
  [animationName: string]: {
    [percentage: string]: KeyframeStyle;
  };
};
export interface ConfigType {
  breakpoints?: { [key: string]: string };
  keyframes?:
    | {
        [keyframesKey: string]: {
          [itemKey: string]: {
            [elementKey: string]: string | number;
          };
        };
      }
    | {};
}
