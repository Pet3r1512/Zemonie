const CURRENCY_LOCALE: Record<string, string> = {
  AUD: "en-AU",
  USD: "en-US",
  VND: "vi-VN",
};

export type CurrencyCode = "AUD" | "USD" | "VND";

export function getCurrencyLocale(currency: CurrencyCode): string {
  return CURRENCY_LOCALE[currency] ?? "en-AU";
}

export function getCurrencyFormatOptions(currency: CurrencyCode): Intl.NumberFormatOptions {
  return {
    style: "currency",
    currency,
    minimumFractionDigits: currency === "VND" ? 0 : 2,
    maximumFractionDigits: currency === "VND" ? 0 : 2,
  };
}

export function formatCurrency(amount: number, currency: CurrencyCode): string {
  return new Intl.NumberFormat(
    getCurrencyLocale(currency),
    getCurrencyFormatOptions(currency),
  ).format(amount);
}

export function getCurrencySymbol(currency: CurrencyCode): string {
  return (
    new Intl.NumberFormat(getCurrencyLocale(currency), {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .formatToParts(0)
      .find((p) => p.type === "currency")?.value ?? currency
  );
}
