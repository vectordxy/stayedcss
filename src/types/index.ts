export type JsonInput = Record<string, string>;
export type MediaQueryInput = Record<string, string>;

interface ComponentType {
  componentName: string;
}

export interface StyleInputType {
  [key: string]: { [styleKey: string]: string | number };
}

export type MainInputType = ComponentType & StyleInputType;
export interface StyleOutputType {
  [key: string]: {
    className: string;
    style: string;
  };
}
