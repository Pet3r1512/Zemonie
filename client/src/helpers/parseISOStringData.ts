export default function ParseISOStringDate({ date }: { date: string }) {
  const dateObj = new Date(date);

  const formattedDate = dateObj.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return formattedDate;
}
