export function formatCurrency(amount: number, currency: "AUD" | "USD" | "VND",) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency,
    minimumFractionDigits: currency === "VND" ? 0 : 2,
    maximumFractionDigits: currency === "VND" ? 0 : 2,
  },).format(amount,);
}
