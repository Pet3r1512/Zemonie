import { decryptAmount, encryptAmount, readAmount, writeAmount } from "@/lib/crypto";
import { describe, expect, it } from "vitest";

describe("encryptAmount / decryptAmount (string round-trip)", () => {
  it.each([["20.99"], ["1025.49"], ["50.000"], ["75.000.000"], [""]])(
    "preserves the string %j through encrypt -> decrypt",
    async (value) => {
      const encrypted = await encryptAmount(value);
      const decrypted = await decryptAmount(encrypted);

      expect(decrypted).toBe(value);
    },
  );
});

describe("writeAmount / readAmount (number round-trip)", () => {
  describe("AUD / USD amounts (decimals)", () => {
    it.each([[20.99], [1025.49], [0], [0.01], [1000000.5]])(
      "restores the number %d after write -> read",
      async (amount) => {
        const stored = await writeAmount(amount);
        const restored = await readAmount(stored);

        expect(restored).toBe(amount);
      },
    );
  });

  describe("VND amounts (whole numbers)", () => {
    it.each([[50000], [75000000], [0]])(
      "restores the number %d after write -> read",
      async (amount) => {
        const stored = await writeAmount(amount);
        const restored = await readAmount(stored);

        expect(restored).toBe(amount);
      },
    );
  });
});

describe("IV (Initialisation Vector) uniqueness", () => {
  it("produces different ciphertext but same plaintext for identical input", async () => {
    const amount = "20.99";
    const firstEncryption = await encryptAmount(amount);
    const secondEncryption = await encryptAmount(amount);
    const firstDecryption = await decryptAmount(firstEncryption);
    const secondDecryption = await decryptAmount(secondEncryption);

    expect(firstEncryption).not.toBe(secondEncryption);
    expect(firstDecryption).toBe(amount);
    expect(secondDecryption).toBe(amount);
  });
});

describe("tamper detection (AES-GCM authentication)", () => {
  it("rejects well-formed base64 that is not a real IV/ciphertext", async () => {
    await expect(decryptAmount("AAAA:BBBB")).rejects.toThrow();
  });

  it("rejects input with no IV/ciphertext separator", async () => {
    await expect(decryptAmount("notvalid")).rejects.toThrow();
  });

  it("rejects ciphertext whose bytes have been modified", async () => {
    const encrypted = await encryptAmount("20.99");
    const [ivB64, cipherB64] = encrypted.split(":");

    const cipherBytes = Uint8Array.from(atob(cipherB64), (c) => c.charCodeAt(0));
    cipherBytes[0] ^= 0xff;
    const tamperedCipherB64 = btoa(String.fromCharCode(...cipherBytes));

    await expect(decryptAmount(`${ivB64}:${tamperedCipherB64}`)).rejects.toThrow();
  });

  it("rejects when the IV has been modified", async () => {
    const encrypted = await encryptAmount("20.99");
    const [ivB64, cipherB64] = encrypted.split(":");

    const ivBytes = Uint8Array.from(atob(ivB64), (c) => c.charCodeAt(0));
    ivBytes[0] ^= 0xff;
    const tamperedIvB64 = btoa(String.fromCharCode(...ivBytes));

    await expect(decryptAmount(`${tamperedIvB64}:${cipherB64}`)).rejects.toThrow();
  });
});
