import { generateStyles } from "../../server/utils/styles/generateStyles";
import { ConfigType, MainInputType } from "../../types";

export function stayedClientStyle(input: MainInputType, config?: ConfigType) {
  return generateStyles(input, "default", "client", config);
}

// export function stayedClientDarkStyle(
//   input: MainInputType,
//   config?: ConfigType
// ) {
//   return generateStyles(input, "dark", "client", config);
// }
