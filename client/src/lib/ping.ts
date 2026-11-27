import { SERVER_URL } from "@/constant/auth";

let pinged = false;

export function warmupDb() {
  if (pinged) return;
  pinged = true;
  fetch(`${SERVER_URL}/api/ping`).catch(() => {});
}
