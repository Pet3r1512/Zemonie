function getUserTimeZone(): string {
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
