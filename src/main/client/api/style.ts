import { Config, MainInput } from "../../../types";
import { getClientStyles } from "../../../styles/generate/getClientStyles";

export function stayedClientStyle(input: MainInput, config?: Config) {
  return getClientStyles(input, "default", config);
}

// export function stayedClientDarkModeStyle(input: MainInput, config?: Config) {
//   return getClientStyles(input, "dark", config);
// }
