export default function ShortenUserName(userName: string | null | undefined) {
  const safe = (userName ?? "").trim();
  if (!safe) return "";

  const words = safe.split(/\s+/);

  if (words.length === 1) return words[0][0].toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}
