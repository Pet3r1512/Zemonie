const pad = (n: number) => String(n).padStart(2, "0");
export default function localISOString(date: Date = new Date()): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T00:00:00.000Z`;
}
