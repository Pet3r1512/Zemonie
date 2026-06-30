export default function getNextRecurrenceDate(baseDate: Date, monthsToAdd = 1) {
  const day = baseDate.getDate();
  const targetYear = baseDate.getFullYear();
  const targetMonth = baseDate.getMonth() + monthsToAdd;

  const lastDayOfTargetMonth = new Date(targetYear, targetMonth + 1, 0).getDate();

  const clampedDay = Math.min(day, lastDayOfTargetMonth);

  return new Date(targetYear, targetMonth, clampedDay, 0, 0, 0, 0);
}
