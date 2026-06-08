export default function calculateSaveRate(income: number, expense: number): number | null {
  if (Number.isNaN(income) || Number.isNaN(expense)) return null;
  if (income === 0) {
    return expense === 0 ? 100 : null;
  }
  return ((income - expense) / income) * 100;
}
