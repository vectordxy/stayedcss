export interface StylesForProxy {
  [key: string]: string;
}

export interface StyleItem {
  [styleKey: string]: string | number;
}

export interface StyleObjectItem {
  [styleKey: string]: string | number | StyleItem;
}

export type KeyframeStyle = {
  [property: string]: string | number;
};

export type Keyframes = {
  [animationName: string]: {
    [percentage: string]: KeyframeStyle;
  };
};

export type BasicStyle = Record<string, string>;
