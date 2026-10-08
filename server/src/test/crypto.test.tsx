import { decryptAmount, encryptAmount } from "@/lib/crypto";
import { describe, expect, it } from "vitest";

describe("Amount encryption tests: ", () => {
  describe("AUD and USD currency tests:", () => {
    it("returns correct result when encrypt and decrypt amount of $20.99", async () => {
      const amount: string = "20.99";
      const encryptResult: string = await encryptAmount(amount);
      const decryptResult: string = await decryptAmount(encryptResult);

      expect(decryptResult).toBe("20.99");
    });

    it("returns correct result when encrypt and decrypt amount of $1025.49", async () => {
      const amount: string = "1025.49";
      const encryptResult: string = await encryptAmount(amount);
      const decryptResult: string = await decryptAmount(encryptResult);

      expect(decryptResult).toBe("1025.49");
    });
  });

  describe("VND currency tests: ", () => {
    it("returns correct result when encrypt and decrypt 50.000 VND", async () => {
      const amount: string = "50.000";
      const encryptResult: string = await encryptAmount(amount);
      const decryptResult: string = await decryptAmount(encryptResult);

      expect(decryptResult).toBe("50.000");
    });

    it("returns correct result when encrypt and decrypt 75.000.000 VND", async () => {
      const amount: string = "75.000.000";
      const encryptResult: string = await encryptAmount(amount);
      const decryptResult: string = await decryptAmount(encryptResult);

      expect(decryptResult).toBe("75.000.000");
    });
  });
});
