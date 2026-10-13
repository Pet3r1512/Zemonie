export default function getNextRecurrenceDate(baseDate: Date, monthsToAdd = 1) {
  const day = baseDate.getUTCDate();
  const targetYear = baseDate.getUTCFullYear();
  const targetMonth = baseDate.getUTCMonth() + monthsToAdd;

  const lastDayOfTargetMonth = new Date(Date.UTC(targetYear, targetMonth + 1, 0)).getUTCDate();

  const clampedDay = Math.min(day, lastDayOfTargetMonth);

  return new Date(Date.UTC(targetYear, targetMonth, clampedDay));
}
