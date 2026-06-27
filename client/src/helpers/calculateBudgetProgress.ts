export default function calculateBudgetProgress({
  total,
  spent,
}: {
  total: number;
  spent: number;
}): number {
  if (total <= 0) {
    return 0;
  }

  return Math.round((spent / total) * 100);
}
