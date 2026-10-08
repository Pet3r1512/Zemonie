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
