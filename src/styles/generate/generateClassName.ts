import { MainInput } from "../../client";
import { BasicStyle } from "../../types";
import { formatComponentId } from "./utils/common/handleComponentId";

export const generateClassName = (input: MainInput) => {
  const { componentId, ...styles } = input;
  const id = componentId as string;

  if (!componentId) {
    throw new Error("componentId is required in the input object.");
  }

  const transformedStyles: BasicStyle = {};

  Object.keys(styles).forEach((key) => {
    transformedStyles[key] = `${key}-${formatComponentId(id)}`;
  });

  return transformedStyles;
};
