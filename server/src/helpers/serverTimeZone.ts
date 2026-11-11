export const DEFAULT_TIME_ZONE = "UTC";

const formatterCache = new Map<string, Intl.DateTimeFormat>();

function getFormatter(timeZone: string): Intl.DateTimeFormat {
  let formatter = formatterCache.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    formatterCache.set(timeZone, formatter);
  }
  return formatter;
}

export function isValidTimeZone(timeZone: string): boolean {
  try {
    getFormatter(timeZone);
    return true;
  } catch {
    return false;
  }
}

function wallClockParts(date: Date, timeZone: string): Record<string, number> {
  const parts: Record<string, number> = {};
  for (const part of getFormatter(timeZone).formatToParts(date)) {
    if (part.type !== "literal") parts[part.type] = Number(part.value);
  }
  return parts;
}

/** Returns the calendar day (YYYY-MM-DD) that `date` falls on in `timeZone`. */
export function getDayKey(date: Date, timeZone: string): string {
  const { year, month, day } = wallClockParts(date, timeZone);
  return formatDayKey(year, month, day);
}

/** Returns the UTC instant at which the wall clock in `timeZone` reads midnight of the given day. */
export function startOfDayInTimeZone(
  year: number,
  monthIndex: number,
  day: number,
  timeZone: string,
): Date {
  const wallClockAsUtc = Date.UTC(year, monthIndex, day);
  let instant = wallClockAsUtc;
  // Two passes converge on the correct offset, including across DST transitions.
  for (let i = 0; i < 2; i++) {
    const p = wallClockParts(new Date(instant), timeZone);
    const shownAsUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
    instant = wallClockAsUtc - (shownAsUtc - instant);
  }
  return new Date(instant);
}

/** Half-open [start, end) range covering a calendar month in `timeZone`. */
export function getMonthRange(
  year: number,
  month: number,
  timeZone: string,
): { start: Date; end: Date } {
  return {
    start: startOfDayInTimeZone(year, month - 1, 1, timeZone),
    end: startOfDayInTimeZone(year, month, 1, timeZone),
  };
}

/** Returns the current year and month (1-12) as seen in `timeZone`. */
export function getYearMonth(now: Date, timeZone: string): { year: number; month: number } {
  const { year, month } = wallClockParts(now, timeZone);
  return { year, month };
}

/** Adds `days` to a YYYY-MM-DD key. */
export function shiftDayKey(dayKey: string, days: number): string {
  const [year, month, day] = dayKey.split("-").map(Number);
  const shifted = new Date(Date.UTC(year, month - 1, day + days));
  return formatDayKey(shifted.getUTCFullYear(), shifted.getUTCMonth() + 1, shifted.getUTCDate());
}

function formatDayKey(year: number, month: number, day: number): string {
  return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}
