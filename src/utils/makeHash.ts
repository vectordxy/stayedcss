import crypto from "crypto";

export function makeHash(str: string) {
  return crypto.createHash("md5").update(str).digest("hex");
}
