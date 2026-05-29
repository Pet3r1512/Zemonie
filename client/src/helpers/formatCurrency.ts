const currencyFormatter = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default function formatCurrency(amount: number): string {
  return currencyFormatter.format(amount);
}
