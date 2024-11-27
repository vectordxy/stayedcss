export type JsonInput = Record<string, string>;
export type MediaQueryInput = Record<string, string>;

export type StyleObject = {
  [key: string]: string | number;
};

export type StyleInput = {
  component: string;
} & {
  [key: string]: StyleObject;
};

export type StylesOutput = {
  [key: string]: StyleObject & { className: string };
};

export type ItemStyleType = {
  [key: string]: string | number | ItemStyleType;
};
