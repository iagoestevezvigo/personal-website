import { validContact } from "../../src/lib/contact";

type Env = {
  ALLOWED_ORIGIN: string;
  RESEND_API_KEY: string;
  CONTACT_FROM: string;
  CONTACT_TO: string;
  CONTACT_RATE_LIMITER: {
    limit: (options: { key: string }) => Promise<{ success: boolean }>;
  };
};

// Optional email service, deployed independently of the static portfolio.
// No delivery is attempted until a verified sender and private API key are configured.
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin");
    const allowed =
      Boolean(env.ALLOWED_ORIGIN) && origin === env.ALLOWED_ORIGIN;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      Vary: "Origin",
    };
    if (allowed) {
      headers["Access-Control-Allow-Origin"] = env.ALLOWED_ORIGIN;
      headers["Access-Control-Allow-Methods"] = "POST, OPTIONS";
      headers["Access-Control-Allow-Headers"] = "Content-Type";
    }
    const reply = (status: number, error?: string) =>
      new Response(JSON.stringify(error ? { error } : { accepted: true }), {
        status,
        headers,
      });
    if (!allowed) return reply(403, "origin_not_allowed");
    if (request.method === "OPTIONS")
      return new Response(null, { status: 204, headers });
    if (request.method !== "POST") return reply(405, "method_not_allowed");
    if (
      !env.RESEND_API_KEY ||
      !env.CONTACT_FROM ||
      !env.CONTACT_TO ||
      !env.CONTACT_RATE_LIMITER
    )
      return reply(503, "email_not_configured");
    if (!request.headers.get("Content-Type")?.includes("application/json"))
      return reply(415, "json_required");
    if (Number(request.headers.get("Content-Length") || 0) > 12000)
      return reply(413, "body_too_large");
    try {
      const { success } = await env.CONTACT_RATE_LIMITER.limit({
        key: request.headers.get("CF-Connecting-IP") || "unknown",
      });
      if (!success) return reply(429, "rate_limited");
      const raw = await request.text();
      if (raw.length > 12000) return reply(413, "body_too_large");
      let payload: unknown;
      try {
        payload = JSON.parse(raw);
      } catch {
        return reply(400, "invalid_json");
      }
      if (!payload || typeof payload !== "object")
        return reply(400, "invalid_input");
      const { name, email, message, company } = payload as Record<
        string,
        unknown
      >;
      if (
        company ||
        typeof name !== "string" ||
        typeof email !== "string" ||
        typeof message !== "string" ||
        !validContact(name, email, message)
      )
        return reply(400, "invalid_input");
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: env.CONTACT_FROM,
          to: [env.CONTACT_TO],
          reply_to: email.trim(),
          subject: `Portfolio — ${name.trim().replace(/[\r\n]+/g, " ")}`,
          text: `${message.trim()}\n\n${name.trim()}\n${email.trim()}`,
        }),
        signal: AbortSignal.timeout(10000),
      });
      if (!response.ok) return reply(502, "email_provider_rejected");
      const result = (await response.json()) as { id?: string };
      if (!result.id) return reply(502, "email_provider_rejected");
      return reply(200);
    } catch {
      return reply(502, "email_unavailable");
    }
  },
};
