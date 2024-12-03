import { Config, MainInput } from "../../types";
import { getStaticStyles } from "../../styles/getServerStyles";

export function stayedStyle(input: MainInput, config?: Config) {
  return getStaticStyles(input, "default", config);
}

export function stayedDarkStyle(input: MainInput, config?: Config) {
  return getStaticStyles(input, "dark", config);
}
