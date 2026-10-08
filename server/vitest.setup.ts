if (!process.env.ENCRYPTION_KEY) {
  const raw = new Uint8Array(32);
  crypto.getRandomValues(raw);
  process.env.ENCRYPTION_KEY = Buffer.from(raw).toString("base64");
}
