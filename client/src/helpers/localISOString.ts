const pad = (n: number) => String(n).padStart(2, "0");
const now: Date = new Date();
const hour: number = now.getHours();
const minute: number = now.getMinutes();
export default function localISOString(date: Date = new Date()): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${hour}:${minute}:00.000Z`;
}
