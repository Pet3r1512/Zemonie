import { BrevoClient } from "@getbrevo/brevo";

let _apiKey: string | undefined;
let _brevo: BrevoClient | null = null;

export function setBrevoApiKey(apiKey: string | undefined) {
  _apiKey = apiKey;
}

function getBrevo(): BrevoClient {
  if (!_brevo) {
    _brevo = new BrevoClient({
      apiKey: _apiKey ?? "",
      timeoutInSeconds: 30,
      maxRetries: 3,
    });
  }
  return _brevo;
}

const brevo = new Proxy({} as BrevoClient, {
  get(_, prop) {
    return getBrevo()[prop as keyof BrevoClient];
  },
});

export default brevo;
