import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";
const en = JSON.parse(await readFile("src/i18n/en.json", "utf8"));
const es = JSON.parse(await readFile("src/i18n/es.json", "utf8"));
const keys = (obj, prefix = "") =>
  Object.entries(obj).flatMap(([key, value]) =>
    typeof value === "object"
      ? keys(value, `${prefix}${key}.`)
      : [`${prefix}${key}`],
  );
test("Both languages have identical, nonempty translation keys", () => {
  assert.deepEqual(keys(en).sort(), keys(es).sort());
  for (const messages of [en, es]) {
    const check = (obj) =>
      Object.values(obj).forEach((value) =>
        typeof value === "object" ? check(value) : assert.ok(value.trim()),
      );
    check(messages);
  }
});
const source = await readFile("src/lib/contact.ts", "utf8");
const js = ts.transpile(source, {
  module: ts.ModuleKind.ESNext,
  target: ts.ScriptTarget.ES2022,
});
const contactModule = `data:text/javascript;base64,${Buffer.from(js).toString("base64")}`;
const { validContact, mailtoUrl } = await import(contactModule);
test("Contact validation rejects malformed and oversized input", () => {
  assert.ok(
    validContact("Iago", "hello@example.com", "A meaningful conversation."),
  );
  assert.equal(
    validContact("", "hello@example.com", "A meaningful conversation."),
    false,
  );
  assert.equal(
    validContact("Iago", "broken", "A meaningful conversation."),
    false,
  );
  assert.equal(validContact("Iago", "hello@example.com", "short"), false);
  assert.equal(
    validContact("Iago", "hello@example.com", "x".repeat(5001)),
    false,
  );
});
test("Mail fallback preserves Unicode and safely encodes headers and message", () => {
  const url = mailtoUrl(
    "iagoestevez1025@gmail.com",
    "María & Co",
    "maria@example.com",
    "Ideas & questions?\nSí, hablemos.",
  );
  const parsed = new URL(url);
  assert.equal(parsed.protocol, "mailto:");
  assert.equal(parsed.searchParams.get("subject"), "Portfolio — María & Co");
  assert.equal(
    parsed.searchParams.get("body"),
    "Ideas & questions?\nSí, hablemos.\n\nMaría & Co\nmaria@example.com",
  );
});
test("Production export includes both locales and every published project with correct language and canonicals", async () => {
  for (const locale of ["en", "es"]) {
    for (const route of [
      "",
      ...["tufoot", "focum", "thirld-world-invasion", "gaming-servers"].map(
        (slug) => `projects/${slug}/`,
      ),
    ]) {
      const html = await readFile(`out/${locale}/${route}index.html`, "utf8");
      assert.ok(html.includes(`<html lang="${locale}"`));
      assert.ok(html.includes('rel="canonical"'));
      assert.ok(
        html.includes(`hrefLang="${locale}"`) ||
          html.includes(`hreflang="${locale}"`),
      );
      assert.ok(!html.includes(">undefined<"));
    }
  }
  assert.ok(
    (await readFile("out/sitemap.xml", "utf8")).includes("/es/projects/focum/"),
  );
});

const workerSource = await readFile("services/contact/worker.ts", "utf8");
const workerJs = ts
  .transpile(workerSource, {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  })
  .replace("../../src/lib/contact", contactModule);
const { default: worker } = await import(
  `data:text/javascript;base64,${Buffer.from(workerJs).toString("base64")}`
);
const workerEnv = {
  ALLOWED_ORIGIN: "https://portfolio.example",
  CONTACT_FROM: "Portfolio <hello@example.com>",
  CONTACT_TO: "owner@example.com",
  RESEND_API_KEY: "test-only-placeholder",
  CONTACT_RATE_LIMITER: { limit: async () => ({ success: true }) },
};
const request = (body = {}, origin = workerEnv.ALLOWED_ORIGIN) =>
  new Request("https://contact.example", {
    method: "POST",
    headers: { Origin: origin, "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "María",
      email: "maria@example.com",
      message: "A thoughtful product idea.",
      ...body,
    }),
  });
test("Contact service rejects other origins, missing configuration, honeypots and excess requests", async () => {
  assert.equal(
    (await worker.fetch(request({}, "https://other.example"), workerEnv))
      .status,
    403,
  );
  assert.equal(
    (await worker.fetch(request(), { ...workerEnv, RESEND_API_KEY: "" }))
      .status,
    503,
  );
  assert.equal(
    (await worker.fetch(request({ company: "spam" }), workerEnv)).status,
    400,
  );
  assert.equal(
    (await worker.fetch(request({ message: "short" }), workerEnv)).status,
    400,
  );
  assert.equal(
    (
      await worker.fetch(request(), {
        ...workerEnv,
        CONTACT_RATE_LIMITER: { limit: async () => ({ success: false }) },
      })
    ).status,
    429,
  );
});
test("Contact service reports acceptance only after the email provider accepts the message", async () => {
  const original = globalThis.fetch;
  let sent;
  try {
    globalThis.fetch = async (url, options) => {
      assert.equal(url, "https://api.resend.com/emails");
      sent = JSON.parse(options.body);
      return new Response(JSON.stringify({ id: "mock-message-id" }), {
        status: 200,
      });
    };
    const result = await worker.fetch(request(), workerEnv);
    assert.equal(result.status, 200);
    assert.equal(sent.reply_to, "maria@example.com");
    assert.deepEqual(sent.to, ["owner@example.com"]);
    assert.equal(
      result.headers.get("Access-Control-Allow-Origin"),
      workerEnv.ALLOWED_ORIGIN,
    );
    globalThis.fetch = async () => new Response("{}", { status: 422 });
    assert.equal((await worker.fetch(request(), workerEnv)).status, 502);
    globalThis.fetch = async () => new Response("{}", { status: 200 });
    assert.equal((await worker.fetch(request(), workerEnv)).status, 502);
  } finally {
    globalThis.fetch = original;
  }
});
