import crypto from "crypto";

export function handleHash(str: string) {
  let hashString = str || "";
  return crypto.createHash("md5").update(hashString).digest("hex");
}

export function handleComponentIdHash(componentId: string) {
  return componentId.replace(/\//g, "-");
}
