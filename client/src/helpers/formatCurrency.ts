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

const formattersCache: Partial<Record<CurrencyCode, Intl.NumberFormat>> = {};
const symbolFormattersCache: Partial<Record<CurrencyCode, Intl.NumberFormat>> = {};

function getFormatter(currency: CurrencyCode): Intl.NumberFormat {
  let f = formattersCache[currency];
  if (!f) {
    f = new Intl.NumberFormat(getCurrencyLocale(currency), getCurrencyFormatOptions(currency));
    formattersCache[currency] = f;
  }
  return f;
}

function getSymbolFormatter(currency: CurrencyCode): Intl.NumberFormat {
  let f = symbolFormattersCache[currency];
  if (!f) {
    f = new Intl.NumberFormat(getCurrencyLocale(currency), {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    symbolFormattersCache[currency] = f;
  }
  return f;
}

export function formatCurrency(amount: number, currency: CurrencyCode): string {
  return getFormatter(currency).format(amount);
}

export function getCurrencySymbol(currency: CurrencyCode): string {
  return (
    getSymbolFormatter(currency)
      .formatToParts(0)
      .find((p) => p.type === "currency")?.value ?? currency
  );
}
