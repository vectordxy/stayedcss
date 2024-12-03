import { Config, MainInput } from "../../types";
import { getClientStyles } from "../styles/getClientStyles";

export function stayedClientStyle(input: MainInput, config?: Config) {
  return getClientStyles(input, "default", config);
}

// export function stayedClientDarkStyle(
//   input: MainInputType,
//   config?: ConfigType
// ) {
//   return generateStyles(input, "dark", "client", config);
// }
