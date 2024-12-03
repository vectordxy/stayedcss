import { getClientStyles } from "../../styles/getClientStyles";
import { Config, MainInput } from "../../types";

export function stayedClientStyle(input: MainInput, config?: Config) {
  return getClientStyles(input, "default", config);
}

// export function stayedClientDarkStyle(
//   input: MainInputType,
//   config?: ConfigType
// ) {
//   return generateStyles(input, "dark", "client", config);
// }
