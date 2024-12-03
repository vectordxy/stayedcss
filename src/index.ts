import { getStaticStyles } from "./static/styles/getServerStyles";
import { Config, MainInput } from "./types";

export function stayedStyle(input: MainInput, config?: Config) {
  return getStaticStyles(input, "default", config);
}

export function stayedDarkStyle(input: MainInput, config?: Config) {
  return getStaticStyles(input, "dark", config);
}
