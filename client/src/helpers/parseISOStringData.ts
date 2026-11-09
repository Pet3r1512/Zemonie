export default function ParseISOStringDate({ date }: { date: string }) {
  const dateObj = new Date(date);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (dateObj.toDateString() === today.toDateString()) return "Today";
  if (dateObj.toDateString() === yesterday.toDateString()) return "Yesterday";

  return dateObj.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
