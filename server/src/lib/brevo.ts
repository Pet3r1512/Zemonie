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

const isProduction = process.env.NODE_ENV !== "development";

const sendIntervalMs = (Number(process.env.EMAIL_SEND_INTERVAL_SECONDS) || 60) * 1000;
const recipientDailyLimit = Number(process.env.EMAIL_RECIPIENT_DAILY_LIMIT) || 5;
const dailyLimit = Number(process.env.EMAIL_DAILY_LIMIT) || 250;

const lastSentAt = new Map<string, number>();
const recipientDaily = new Map<string, number>();
let sentBucket = new Date().toISOString().slice(0, 10);
let sentCount = 0;

function rollover() {
  const today = new Date().toISOString().slice(0, 10);
  if (today === sentBucket) return;
  sentBucket = today;
  sentCount = 0;
  recipientDaily.clear();
}

export type SendTransacEmailParams = Parameters<
  BrevoClient["transactionalEmails"]["sendTransacEmail"]
>[0];

export async function sendTransacEmail(
  params: SendTransacEmailParams,
): Promise<boolean> {
  const recipient = params?.to?.[0]?.email?.toLowerCase();
  rollover();

  if (isProduction) {
    if (sentCount >= dailyLimit) {
      console.warn(
        `[brevo] skipped transactional email (global daily limit of ${dailyLimit} reached)`,
      );
      return false;
    }
    if (recipient) {
      const used = recipientDaily.get(recipient) ?? 0;
      if (used >= recipientDailyLimit) {
        console.warn(
          `[brevo] skipped transactional email to ${recipient} (daily recipient limit of ${recipientDailyLimit} reached)`,
        );
        return false;
      }
    }
  }

  if (recipient) {
    const last = lastSentAt.get(recipient) ?? 0;
    if (Date.now() - last < sendIntervalMs) {
      console.warn(
        `[brevo] skipped transactional email to ${recipient} (cooldown of ${sendIntervalMs / 1000}s)`,
      );
      return false;
    }
  }

  try {
    await getBrevo().transactionalEmails.sendTransacEmail(params);
  } catch (error) {
    console.error("[brevo] failed to send transactional email:", error);
    throw error;
  }

  const now = Date.now();
  if (recipient) {
    lastSentAt.set(recipient, now);
    recipientDaily.set(recipient, (recipientDaily.get(recipient) ?? 0) + 1);
  }
  sentCount += 1;
  return true;
}

const brevo = new Proxy({} as BrevoClient, {
  get(_, prop) {
    return getBrevo()[prop as keyof BrevoClient];
  },
});

export default brevo;