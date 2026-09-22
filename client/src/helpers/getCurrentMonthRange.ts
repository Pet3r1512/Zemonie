const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });

export function getMonthDateRange() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0);
  return `${monthFormatter.format(start)} to ${monthFormatter.format(end)}`;
}
