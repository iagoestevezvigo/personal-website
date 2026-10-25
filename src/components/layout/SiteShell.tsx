"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { ArrowUpRight, ArrowUp, Menu, X, Globe2 } from "lucide-react";
import { Locale } from "@/types/content";
import { profile } from "@/data/profile";
export function SiteShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const t = useTranslations();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const other = locale === "en" ? "es" : "en";
  const home = `/${locale}/`;
  useEffect(() => {
    document.documentElement.lang = locale;
    setOpen(false);
    setActive(path.includes("/projects/") ? "work" : "");
  }, [locale, path]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      document.documentElement.style.setProperty(
        "--progress",
        `${max > 0 ? (scrollY / max) * 100 : 0}%`,
      );
    };
    const scroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", scroll, { passive: true });
    update();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        });
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((el) => observer.observe(el));
    const sections = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-20% 0px -55% 0px" },
    );
    document
      .querySelectorAll("section[id]")
      .forEach((s) => sections.observe(s));
    return () => {
      window.removeEventListener("scroll", scroll);
      cancelAnimationFrame(frame);
      observer.disconnect();
      sections.disconnect();
    };
  }, [path]);
  return (
    <>
      <a className="skip-link" href="#main">
        {t("nav.skip")}
      </a>
      <div className="reading-progress" aria-hidden="true" />
      <header className="header">
        <div className="nav-inner">
          <Link
            className="brand"
            href={home}
            aria-label={`${profile.name} — ${t("nav.home")}`}
          >
            <span className="wordmark">
              ie<span>.</span>
            </span>
            <span className="brand-name">
              iago estévez<span className="brand-dot">.</span>
            </span>
          </Link>
          <nav
            aria-label={
              locale === "en" ? "Main navigation" : "Navegación principal"
            }
            className={open ? "navigation is-open" : "navigation"}
          >
            {[
              ["about", "about"],
              ["work", "work"],
              ["experience", "experience"],
            ].map(([id, key]) => (
              <Link
                key={id}
                href={`${home}#${id}`}
                className={active === id ? "nav-link active" : "nav-link"}
                onClick={() => setOpen(false)}
                aria-current={active === id ? "location" : undefined}
              >
                {t(`nav.${key}`)}
              </Link>
            ))}
            <Link
              className="mobile-contact nav-link"
              href={`${home}#contact`}
              onClick={() => setOpen(false)}
            >
              {t("nav.contact")}
            </Link>
          </nav>
          <div className="nav-actions">
            <Link
              href={path.replace(/^\/(en|es)/, `/${other}`)}
              className="language"
              aria-label={t("nav.language")}
              hrefLang={other}
            >
              <Globe2 size={13} />
              <span>{locale.toUpperCase()}</span>
              <span className="language-other">/ {other.toUpperCase()}</span>
            </Link>
            <Link className="nav-cta" href={`${home}#contact`}>
              {t("nav.contact")}
              <ArrowUpRight size={15} />
            </Link>
            <button
              className="menu-toggle"
              aria-expanded={open}
              aria-label={t(open ? "nav.close" : "nav.menu")}
              onClick={() => setOpen(!open)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      {children}
      <footer className="footer">
        <div className="footer-main">
          <Link className="brand" href={home}>
            <span className="wordmark">
              ie<span>.</span>
            </span>
            <span className="brand-name">iago estévez.</span>
          </Link>
          <span>{t("footer.tagline")}</span>
          <a href="#main" className="back-top">
            {t("footer.top")}
            <ArrowUp size={14} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {t("footer.rights")}
          </span>
          <span className="mono">
            {t("visual.spain")} <span className="tiny-cross">+</span>{" "}
            {t("visual.everywhere")}
          </span>
        </div>
      </footer>
    </>
  );
}
