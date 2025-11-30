import crypto from "crypto";

const ALGO = "aes-256-gcm";

function getKey() {
  const raw = process.env.FIELD_ENC_KEY;
  if (!raw) throw new Error("FIELD_ENC_KEY not set");
  // Expect base64-encoded 32 bytes key
  const key = Buffer.from(raw, "base64");
  if (key.length !== 32) throw new Error("FIELD_ENC_KEY must be 32 bytes (base64-encoded)");
  return key;
}

export function encryptField(plaintext) {
  const key = getKey();
  const iv = crypto.randomBytes(12); // 96-bit recommended for GCM
  const cipher = crypto.createCipheriv(ALGO, key, iv);
  const encrypted = Buffer.concat([cipher.update(String(plaintext), "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  // store as: iv (12) | tag (16) | ciphertext
  const out = Buffer.concat([iv, tag, encrypted]);
  return out.toString("base64");
}

export function decryptField(data) {
  if (!data) return null;
  const key = getKey();
  const buf = Buffer.from(data, "base64");
  const iv = buf.slice(0, 12);
  const tag = buf.slice(12, 28);
  const ciphertext = buf.slice(28);
  const decipher = crypto.createDecipheriv(ALGO, key, iv);
  decipher.setAuthTag(tag);
  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  return decrypted.toString("utf8");
}

// For convenience in debugging only - do NOT expose this in production
export function generateKey() {
  return crypto.randomBytes(32).toString("base64");
}
