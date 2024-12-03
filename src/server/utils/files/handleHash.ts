import crypto from "crypto";

export const handleComponentIdHash = (componentId: string) => {
  return componentId.replace(/\//g, "-");
};
export const handleHash = (str: string) => {
  let hashString = str || "";
  return crypto.createHash("md5").update(hashString).digest("hex");
};
