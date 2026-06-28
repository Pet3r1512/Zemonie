const ALG = { name: "AES-GCM", length: 256 } as const;

const toB64 = (buf: ArrayBuffer) => btoa(String.fromCharCode(...new Uint8Array(buf)));
const fromB64 = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

async function getKey(): Promise<CryptoKey> {
  const raw = fromB64(process.env.ENCRYPTION_KEY!);
  return crypto.subtle.importKey("raw", raw, ALG, false, ["encrypt", "decrypt"]);
}

export async function encryptAmount(value: string): Promise<string> {
  const key = await getKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(value);
  const cipher = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoded);
  return `${toB64(iv)}:${toB64(cipher)}`;
}

export async function decryptAmount(stored: string): Promise<string> {
  const key = await getKey();
  const [ivB64, cipherB64] = stored.split(":");
  const plain = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: fromB64(ivB64) },
    key,
    fromB64(cipherB64),
  );
  return new TextDecoder().decode(plain);
}

export async function readAmount(stored: string): Promise<number> {
  return Number(await decryptAmount(stored));
}

export async function writeAmount(value: number): Promise<string> {
  return encryptAmount(String(value));
}
