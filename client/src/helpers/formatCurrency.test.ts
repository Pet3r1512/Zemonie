import { afterEach, describe, expect, it, vi } from "vitest";
import {
  type CurrencyCode,
  formatCurrency,
  getCurrencyFormatOptions,
  getCurrencyLocale,
  getCurrencySymbol,
} from "./formatCurrency";

describe("Format Currency helper's tests: ", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("getCurrencyLocale", () => {
    it("returns en-AU for AUD", () => {
      expect(getCurrencyLocale("AUD")).toBe("en-AU");
    });

    it("returns en-US for USD", () => {
      expect(getCurrencyLocale("USD")).toBe("en-US");
    });

    it("returns vi-VN for VND", () => {
      expect(getCurrencyLocale("VND")).toBe("vi-VN");
    });

    it("falls back to en-AU for an unmapped currency", () => {
      expect(getCurrencyLocale("EUR" as CurrencyCode)).toBe("en-AU");
    });
  });

  describe("getCurrencyFormatOptions", () => {
    it("uses two fraction digits for AUD", () => {
      expect(getCurrencyFormatOptions("AUD")).toEqual({
        style: "currency",
        currency: "AUD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    });

    it("uses two fraction digits for USD", () => {
      expect(getCurrencyFormatOptions("USD")).toEqual({
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    });

    it("uses no fraction digits for VND", () => {
      expect(getCurrencyFormatOptions("VND")).toEqual({
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    });
  });

  describe("formatCurrency", () => {
    it("formats a positive amount with decimals for AUD", () => {
      expect(formatCurrency(1234.5, "AUD")).toBe("$1,234.50");
    });

    it("formats a positive amount with decimals for USD", () => {
      expect(formatCurrency(1234.5, "USD")).toBe("$1,234.50");
    });

    it("formats zero as a currency value", () => {
      expect(formatCurrency(0, "AUD")).toBe("$0.00");
    });

    it("formats negative amounts with the sign before the symbol", () => {
      expect(formatCurrency(-42.1, "USD")).toBe("-$42.10");
    });

    it("adds thousands separators for large amounts", () => {
      expect(formatCurrency(1000000, "USD")).toBe("$1,000,000.00");
    });

    it("rounds VND to a whole number using Vietnamese grouping", () => {
      expect(formatCurrency(1234.5, "VND")).toBe("1.235\u00A0₫");
    });

    it("formats large VND amounts with dot grouping", () => {
      expect(formatCurrency(1000000, "VND")).toBe("1.000.000\u00A0₫");
    });

    it("returns the same result for repeated calls with the same currency", () => {
      expect(formatCurrency(10, "USD")).toBe("$10.00");
      expect(formatCurrency(20, "USD")).toBe("$20.00");
      expect(formatCurrency(30, "USD")).toBe("$30.00");
    });

    it("reuses a cached formatter instead of creating a new one per call", async () => {
      vi.resetModules();

      const OriginalNumberFormat = Intl.NumberFormat;
      const constructorSpy = vi
        .spyOn(Intl, "NumberFormat")
        .mockImplementation(
          ((locales?: string | string[], options?: Intl.NumberFormatOptions) =>
            new OriginalNumberFormat(locales, options)) as unknown as typeof Intl.NumberFormat,
        );

      const { formatCurrency: freshFormatCurrency } = await import("./formatCurrency");

      expect(freshFormatCurrency(10, "USD")).toBe("$10.00");
      expect(freshFormatCurrency(20, "USD")).toBe("$20.00");
      expect(constructorSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("getCurrencySymbol", () => {
    it("returns the dollar symbol for AUD", () => {
      expect(getCurrencySymbol("AUD")).toBe("$");
    });

    it("returns the dollar symbol for USD", () => {
      expect(getCurrencySymbol("USD")).toBe("$");
    });

    it("returns the dong symbol for VND", () => {
      expect(getCurrencySymbol("VND")).toBe("₫");
    });
  });
});
