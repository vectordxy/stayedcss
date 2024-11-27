type StyleObject = {
  [key: string]: string | number;
};

export type JsonInput = Record<string, string>;

export type StyleInput = {
  component: string;
} & {
  [key: string]: StyleObject;
};

export type StylesOutput = {
  [key: string]: StyleObject & { className: string };
};
