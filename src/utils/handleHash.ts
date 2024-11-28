import crypto from "crypto";

export function handleHash(str: string) {
  return crypto.createHash("md5").update(str).digest("hex");
}
