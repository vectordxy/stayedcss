export type JsonType = Record<string, string>;

export type BreakPointsType = Record<string, string>;

export interface ItemStyleType {
  [styleKey: string]: string | number | StyleType;
}

export interface StylesForProxyType {
  [key: string]: { className: string; style: string };
}
// export type MainInputType = ComponentType & StyleObjectType;

export interface StyleOutputType {
  [key: string]: {
    className: string;
    style: string;
  };
}

export type KeyframeStyle = {
  [property: string]: string | number;
};

export type KeyframesType = {
  [animationName: string]: {
    [percentage: string]: KeyframeStyle;
  };
};

export type NestedStyle = {
  [property: string]: string | number;
};

export type StyleValueObject = {
  [property: string]: string | number | NestedStyle;
};

// 반응형 스타일 정의
export type MediaQueryStyles = {
  [mediaQuery: string]: Record<string, StyleType>;
};

interface ComponentType {
  componentName: string;
}

export interface StyleType {
  [styleKey: string]: string | number;
}

export interface StyleObjectType {
  [key: string]: StyleType;
}

export type MainInputType = ComponentType & StyleObjectType;
