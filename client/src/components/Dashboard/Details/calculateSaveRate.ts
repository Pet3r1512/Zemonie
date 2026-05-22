export default function calculateSaveRate(income: number, expense: number): number {
    if (income === 0) return 0; // avoid division by zero → NaN
    const rate = (expense / income) * 100;
    return Number.isNaN(rate) ? 0 : rate;
}