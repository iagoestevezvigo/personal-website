"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight, ArrowDown, ArrowRight } from "lucide-react";
const Core = dynamic(() => import("./CoreScene"), { ssr: false });
export function Hero() {
  const t = useTranslations("hero");
  const v = useTranslations("visual");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    if (!media.matches && navigator.hardwareConcurrency !== 1) setReady(true);
  }, []);
  return (
    <section className="hero" id="hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-topline">
        <span>
          <i className="status-dot" />
          {t("location")}
        </span>
        <span className="hero-edition">{v("edition")}</span>
      </div>
      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow">
          <span className="small-line" />
          {t("eyebrow")}
        </p>
        <h1>
          <span>{t("line1")}</span>
          <span>{t("line2")}</span>
          <span className="hero-accent">{t("line3")}</span>
        </h1>
        <p className="hero-description">{t("description")}</p>
        <div className="hero-buttons">
          <a className="button primary" href="#work">
            {t("explore")}
            <ArrowUpRight size={17} />
          </a>
          <a className="button text-button" href="#contact">
            {t("connect")}
            <ArrowRight size={17} />
          </a>
        </div>
      </div>
      <div className="hero-visual" role="img" aria-label={t("coreLabel")}>
        <div className="orbit-guide orbit-one" />
        <div className="orbit-guide orbit-two" />
        <div className="core-fallback">
          <div />
          <div />
          <div />
          <span />
        </div>
        {ready && <Core />}
        <div className="core-tag tag-engineering">
          <span className="tag-node" />
          {v("engineering")}
          <span className="tag-index">01</span>
        </div>
        <div className="core-tag tag-product">
          <span className="tag-node" />
          {v("product")}
          <span className="tag-index">02</span>
        </div>
        <div className="core-tag tag-business">
          <span className="tag-node" />
          {v("entrepreneurship")}
          <span className="tag-index">03</span>
        </div>
        <span className="core-coordinate">X 42.2406° &nbsp; Y −8.7207°</span>
        <span className="core-caption">{t("core")}</span>
      </div>
      <div className="hero-bottom">
        <a href="#about">
          <span className="scroll-icon">
            <ArrowDown size={13} />
          </span>
          {t("scroll")}
        </a>
        <span>{t("edition")}</span>
        <span className="hero-page">001 — 007</span>
      </div>
    </section>
  );
}
