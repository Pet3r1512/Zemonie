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
  it("should return 2 different result when encrypt the same amount of money", async () => {
    const amount: string = "20.99";
    const firstEncryption: string = await encryptAmount(amount);
    const secondEncryption: string = await encryptAmount(amount);

    expect(firstEncryption).not.toBe(secondEncryption);
  });

  it("should decrypt to the same amount from 2 different encryption results", async () => {
    const amount: string = "20.99";
    const firstEncryption: string = await encryptAmount(amount);
    const secondEncryption: string = await encryptAmount(amount);
    const firstDecryption: string = await decryptAmount(firstEncryption);
    const secondDecryption: string = await decryptAmount(secondEncryption);

    expect(firstDecryption).toBe(secondDecryption);
  });
});
