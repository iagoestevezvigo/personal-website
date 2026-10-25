"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { skills } from "@/data/skills";
import { Locale } from "@/types/content";
export function SkillsVisualization({ locale }: { locale: Locale }) {
  const t = useTranslations("skills");
  const v = useTranslations("visual");
  const [selected, setSelected] = useState(0);
  const skill = skills[selected];
  return (
    <section id="expertise" className="section skills-section">
      <div className="section-head" data-reveal>
        <div>
          <p className="eyebrow">{t("label")}</p>
          <h2>
            {t("title")}
            <br />
            <span className="muted">{t("accent")}</span>
          </h2>
        </div>
      </div>
      <div className="skills-layout" data-reveal>
        <div className="skill-map">
          <svg viewBox="0 0 500 450" fill="none" aria-hidden="true">
            <circle
              cx="250"
              cy="225"
              r="150"
              stroke="#7c8aa7"
              strokeOpacity=".13"
              strokeDasharray="3 7"
            />
            <circle
              cx="250"
              cy="225"
              r="80"
              stroke="#7c8aa7"
              strokeOpacity=".1"
            />
            {skills.map((_, i) => {
              const a = (i * Math.PI) / 3 - Math.PI / 2;
              return (
                <path
                  key={i}
                  d={`M250 225L${250 + 150 * Math.cos(a)} ${225 + 150 * Math.sin(a)}`}
                  stroke={selected === i ? "#4f8cff" : "#253045"}
                  strokeWidth={selected === i ? 1.5 : 1}
                />
              );
            })}
          </svg>
          <span className="skill-map-center">
            ie<span>.</span>
            <small>{v("build")}</small>
          </span>
          {skills.map((s, i) => {
            const a = (i * Math.PI) / 3 - Math.PI / 2;
            return (
              <button
                key={s.id}
                className={`skill-node ${selected === i ? "selected" : ""}`}
                style={{
                  left: `${50 + 30 * Math.cos(a)}%`,
                  top: `${50 + 33.33 * Math.sin(a)}%`,
                }}
                onClick={() => setSelected(i)}
                onPointerEnter={() => setSelected(i)}
                onFocus={() => setSelected(i)}
                aria-pressed={selected === i}
                aria-controls="skill-panel"
              >
                <span>{s.label}</span>
                <small>{s.title[locale]}</small>
              </button>
            );
          })}
        </div>
        <div className="skills-content">
          <p className="section-intro">{t("description")}</p>
          <div className="skill-tabs" role="group" aria-label={t("all")}>
            {skills.map((s, i) => (
              <button
                key={s.id}
                className={selected === i ? "selected" : ""}
                onClick={() => setSelected(i)}
                aria-pressed={selected === i}
                aria-controls="skill-panel"
              >
                {s.title[locale]}
                <ArrowUpRight size={13} />
              </button>
            ))}
          </div>
          <div className="skill-panel" id="skill-panel" aria-live="polite">
            <p className="mono">
              {skill.label} / {skill.title[locale]}
            </p>
            <h3>{skill.description[locale]}</h3>
            <div className="tech-tags">
              {skill.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <p className="skill-connections mono">
              {t("connected")}
              <span>{skill.connections.join(" · ")}</span>
            </p>
          </div>
        </div>
      </div>
      <details className="skills-accessible">
        <summary>{t("all")}</summary>
        {skills.map((s) => (
          <div key={s.id}>
            <h3>{s.title[locale]}</h3>
            <p>{s.items.join(" · ")}</p>
          </div>
        ))}
      </details>
    </section>
  );
}
