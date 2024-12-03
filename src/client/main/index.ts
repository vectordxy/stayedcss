import { generateClientStyles } from "../../styles/generateClientStyles";
import { generateStyles } from "../../styles/generateServerStyles";
import { ConfigType, MainInputType } from "../../types";

export function stayedClientStyle(input: MainInputType, config?: ConfigType) {
  return generateClientStyles(input, "default", config);
}

// export function stayedClientDarkStyle(
//   input: MainInputType,
//   config?: ConfigType
// ) {
//   return generateStyles(input, "dark", "client", config);
// }
