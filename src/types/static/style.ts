export interface StylesForProxy {
  [key: string]: string;
}

export interface StyleItem {
  [styleKey: string]: any;
}

export interface StyleObjectItem {
  [styleKey: string]: any | StyleItem;
}

export type KeyframeStyle = {
  [property: string]: any;
};

export type Keyframes = {
  [animationName: string]: {
    [percentage: string]: KeyframeStyle;
  };
};

export type BasicStyle = Record<string, string>;
