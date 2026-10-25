"use client";
import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Copy, Check, Linkedin, ArrowRight } from "lucide-react";
import { profile } from "@/data/profile";
import { mailtoUrl, validContact } from "@/lib/contact";
export function ContactSection() {
  const t = useTranslations("contact");
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setStatus("copyError");
    }
  }
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    if (data.get("company")) {
      setStatus("error");
      return;
    }
    if (!validContact(name, email, message)) {
      setStatus("invalid");
      return;
    }
    const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
    if (!endpoint) {
      window.location.href = mailtoUrl(profile.email, name, email, message);
      setStatus("draft");
      return;
    }
    setPending(true);
    setStatus("");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company: "" }),
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error("Contact rejected");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    } finally {
      setPending(false);
    }
  }
  return (
    <section id="contact" className="section contact-section">
      <div className="contact-glow" aria-hidden="true" />
      <p className="eyebrow" data-reveal>
        {t("label")}
      </p>
      <div className="contact-layout">
        <div className="contact-copy" data-reveal>
          <h2>
            {t("title")}
            <br />
            <span>{t("accent")}</span>
          </h2>
          <p>{t("description")}</p>
          <div className="contact-email">
            <a href={`mailto:${profile.email}`}>
              {profile.email}
              <ArrowUpRight size={20} />
            </a>
            <button onClick={copy} aria-label={t(copied ? "copied" : "copy")}>
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
            <span className="sr-only" role="status">
              {copied ? t("copied") : ""}
            </span>
          </div>
          <a
            className="linkedin-link"
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin size={15} />
            LinkedIn
            <ArrowUpRight size={14} />
          </a>
        </div>
        <form className="contact-form" onSubmit={submit} data-reveal>
          <div className="form-row">
            <label htmlFor="contact-name">
              {t("name")}
              <input
                id="contact-name"
                name="name"
                autoComplete="name"
                required
                maxLength={100}
              />
            </label>
            <label htmlFor="contact-email">
              {t("emailField")}
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
              />
            </label>
          </div>
          <label htmlFor="contact-message">
            {t("message")}
            <textarea
              id="contact-message"
              name="message"
              required
              minLength={10}
              maxLength={5000}
              rows={3}
            />
          </label>
          <div className="honeypot" aria-hidden="true">
            <label>
              {t("honeypot")}
              <input name="company" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <button className="button primary" disabled={pending} type="submit">
            {t(pending ? "sending" : "send")}
            <ArrowRight size={16} />
          </button>
          <p className="form-note">
            {process.env.NEXT_PUBLIC_CONTACT_ENDPOINT
              ? t("privacy")
              : t("fallback")}
          </p>
          <p
            className={`form-status ${status === "error" || status === "invalid" ? "error" : ""}`}
            role="status"
            aria-live="polite"
          >
            {status ? t(status) : ""}
          </p>
        </form>
      </div>
    </section>
  );
}
