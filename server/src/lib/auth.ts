import { betterAuth } from "better-auth/minimal";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { scryptSync, randomBytes, timingSafeEqual } from "node:crypto";
import brevo from "./brevo";

const isProduction = process.env.NODE_ENV !== "development";

const betterAuthUrl = isProduction
  ? process.env.BETTER_AUTH_URL || "https://api.zemonie.site"
  : process.env.BETTER_AUTH_URL || "http://localhost:5173";
const cookieDomain = process.env.COOKIE_DOMAIN || ".zemonie.site";

export const auth = betterAuth({
  baseURL: betterAuthUrl,
  secret: process.env.BETTER_AUTH_SECRET,
  basePath: "/api/auth",

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
    password: {
      hash: async (password: string) => {
        const salt = randomBytes(16).toString("hex");
        const key = scryptSync(password.normalize("NFKC"), salt, 64, {
          N: 16384,
          r: 16,
          p: 1,
          maxmem: 128 * 16384 * 16 * 2,
        });
        return `${salt}:${key.toString("hex")}`;
      },
      verify: async ({ hash, password }: { hash: string; password: string }) => {
        const [salt, key] = hash.split(":");
        if (!salt || !key) return false;
        const derived = scryptSync(password.normalize("NFKC"), salt, 64, {
          N: 16384,
          r: 16,
          p: 1,
          maxmem: 128 * 16384 * 16 * 2,
        });
        return timingSafeEqual(Buffer.from(key, "hex"), derived);
      },
    },
    sendResetPassword: async ({ user, token }) => {
      const apiUrl =
        process.env.NODE_ENV === "development"
          ? "http://localhost:8787"
          : process.env.BASE_URL || "https://api.zemonie.site";
      const resetUrl = `${apiUrl}/api/auth/reset-password/${token}?callbackURL=${encodeURIComponent("/auth/forget-password")}`;
      try {
        await brevo.transactionalEmails.sendTransacEmail({
          sender: {
            name: "Zemonie Team",
            email: "customer.service@zemonie.site",
          },
          subject: "Reset your password",
          to: [
            {
              email: user.email,
            },
          ],
          textContent: `Click the link to reset your password: ${resetUrl}`,
          htmlContent: `
<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:0;background-color:#f6f7f9;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f6f7f9;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background-color:#ffffff;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background:linear-gradient(135deg,#ff7900,#f79d65);padding:32px 40px;text-align:center;">
                <span style="font-family:Arial,Helvetica,sans-serif;font-size:28px;font-weight:800;color:#ffffff;letter-spacing:1px;">ZEMONIE</span>
              </td>
            </tr>
            <tr>
              <td style="padding:40px;text-align:center;">
                <h1 style="margin:0 0 12px;font-family:Arial,Helvetica,sans-serif;font-size:24px;color:#171717;">Reset your password</h1>
                <p style="margin:0 0 24px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#525252;">We received a request to reset the password for your Zemonie account. Click the button below to choose a new password.</p>
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 24px;">
                  <tr>
                    <td style="border-radius:10px;background-color:#ff7900;">
                      <a href="${resetUrl}" style="display:inline-block;padding:14px 32px;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:10px;">Reset Password</a>
                    </td>
                  </tr>
                </table>
                <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;color:#737373;">Or copy and paste this link into your browser:</p>
                <a href="${resetUrl}" style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#ff7900;word-break:break-all;">${resetUrl}</a>
                <div style="height:1px;background-color:#e5e5e5;margin:32px 0 24px;"></div>
                <p style="margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;color:#737373;"><strong style="color:#a3a3a3;">Didn't request this?</strong><br/>If you didn't ask to reset your password, you can safely ignore this email — your account stays secure.</p>
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#a3a3a3;">This link will expire in 1 hour for your security.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 40px;background-color:#fafafa;text-align:center;border-top:1px solid #e5e5e5;">
                <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#737373;">Zemonie — your money, managed.</p>
                <a href="https://www.zemonie.site" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#ff7900;text-decoration:none;">www.zemonie.site</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
        });
      } catch (error) {
        console.error("Failed to send reset password email:", error);
      }
    },
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      console.log("Verification URL:", url);
      try {
        await brevo.transactionalEmails.sendTransacEmail({
          sender: {
            name: "Zemonie Team",
            email: "customer.service@zemonie.site",
          },
          subject: "Verify your email address",
          to: [
            {
              email: user.email,
            },
          ],
          textContent: `Click the link to verify your email: ${url}`,
        });
      } catch (error) {
        console.error("Failed to send verification email:", error);
      }
    },
  },

  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          try {
            await brevo.transactionalEmails.sendTransacEmail({
              sender: {
                name: "Zemonie Team",
                email: "customer.service@zemonie.site",
              },
              to: [
                {
                  email: user.email,
                  name: user.name,
                },
              ],
              templateId: 1,
              params: {
                name: user.name,
              },
            });
          } catch (error) {
            console.error("Failed to send welcome email:", error);
          }
        },
      },
    },
  },

  trustedOrigins: isProduction
    ? process.env.TRUSTED_ORIGINS?.split(",") || [
        "https://www.zemonie.site",
        "https://zemonie.site",
      ]
    : (request) => {
        if (!request) return ["http://localhost:5173"];
        const origin = request.headers.get("origin");
        return origin ? [origin] : ["http://localhost:5173"];
      },

  session: {
    expiresIn: 60 * 60 * 24 * 7,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },

  advanced: {
    ...(isProduction && {
      crossSubDomainCookies: {
        enabled: true,
        domain: cookieDomain,
      },
    }),
    defaultCookieAttributes: {
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      httpOnly: true,
      path: "/",
    },
  },
});

export default auth;
