export function getUserTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function parseInput(date: Date | string): Date {
  if (date instanceof Date) return date;
  if (typeof date === "string" && date.includes("T")) return new Date(date);
  // date-only "YYYY-MM-DD" → treat as local (avoid being parsed as UTC midnight)
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function toUserTimezone(date: Date | string): Date {
  const d = parseInput(date);
  return new Date(d.toLocaleString("en-US", { timeZone: getUserTimeZone() }));
}

export function formatUserDate(date: Date | string): string {
  return parseInput(date).toLocaleString("en-US", {
    timeZone: getUserTimeZone(),
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatUserTime(date: Date | string): string {
  return parseInput(date).toLocaleString("en-US", {
    timeZone: getUserTimeZone(),
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatUserDateShort(date: Date | string): string {
  return parseInput(date).toLocaleString("en-US", {
    timeZone: getUserTimeZone(),
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/** Format a calendar date (strip time) in user's timezone. */
export function formatUserCalendarDate(isoOrDate: string): string {
  const dateOnly = String(isoOrDate).split("T")[0];
  return parseInput(dateOnly).toLocaleString("en-US", {
    timeZone: getUserTimeZone(),
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/** Chart x-axis tick: short month/day (e.g. 12/31). */
export function formatChartDate(dateStr: string): string {
  return parseInput(dateStr + "T00:00:00").toLocaleString("en-US", {
    timeZone: getUserTimeZone(),
    month: "numeric",
    day: "numeric",
  });
}

/** Chart tooltip: weekday, month day (e.g. Thu, Dec 31). */
export function formatChartTooltip(dateStr: string): string {
  return parseInput(dateStr + "T00:00:00").toLocaleString("en-US", {
    timeZone: getUserTimeZone(),
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}
