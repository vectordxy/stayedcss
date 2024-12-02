const unitRequiredProps = new Set([
  "width",
  "height",
  "min-width",
  "max-width",
  "min-height",
  "max-height",
  "margin",
  "margin-top",
  "margin-right",
  "margin-bottom",
  "margin-left",
  "padding",
  "padding-top",
  "padding-right",
  "padding-bottom",
  "padding-left",
  "font-size",
  "top",
  "right",
  "bottom",
  "left",
  "inset",
  "inset-block",
  "inset-inline",
  "border-width",
  "border-radius",
  "border-top-width",
  "border-right-width",
  "border-bottom-width",
  "border-left-width",
  "outline-width",
  "grid-gap",
  "grid-row-gap",
  "grid-column-gap",
  "flex-basis",
]);

export const isRequiredUnits = (cssKey: string) => {
  if (unitRequiredProps.has(cssKey)) {
    return true;
  }
  return false;
};
