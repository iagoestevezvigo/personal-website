import { ArrowUpRight, ArrowRight, GraduationCap, Globe2 } from "lucide-react";
import { Hero } from "./hero/Hero";
import { ProjectShowcase } from "./projects/ProjectShowcase";
import { ExperienceTimeline } from "./experience/ExperienceTimeline";
import { SkillsVisualization } from "./skills/SkillsVisualization";
import { ContactSection } from "./contact/ContactSection";
import { Locale, Project, Experience } from "@/types/content";
import { getMessages } from "@/i18n/messages";
import { profile } from "@/data/profile";
import { education, languages, volunteering } from "@/data/education";
import { AnimatedMetric } from "./ui/AnimatedMetric";
export function HomePage({
  locale,
  projects,
  experiences,
}: {
  locale: Locale;
  projects: Project[];
  experiences: Experience[];
}) {
  const m = getMessages(locale);
  return (
    <main id="main">
      <Hero />
      <div className="discipline-strip" aria-hidden="true">
        <span>{m.visual.engineering}</span>
        <i>✳</i>
        <span>{m.visual.productThinking}</span>
        <i>✳</i>
        <span>{m.visual.entrepreneurship}</span>
        <i>✳</i>
        <span>{m.visual.impact}</span>
        <i>✳</i>
      </div>
      <section id="about" className="section about-section">
        <p className="eyebrow" data-reveal>
          {m.about.label}
        </p>
        <div className="about-layout">
          <div className="about-title" data-reveal>
            <h2>
              {m.about.title}
              <br />
              <span className="muted">{m.about.accent}</span>
            </h2>
            <div className="identity-panel">
              {profile.portrait ? (
                <img
                  className="portrait"
                  src={profile.portrait}
                  alt={profile.name}
                  loading="lazy"
                />
              ) : (
                <>
                  <span className="identity-coordinate mono">
                    42°14′ N / 8°43′ W
                  </span>
                  <div className="identity-mark">
                    <span>e</span>
                    <span>×</span>
                    <span>b</span>
                  </div>
                  <div className="identity-lines" />
                  <span className="identity-cross">+</span>
                </>
              )}
              <div className="identity-caption">
                <span>{m.about.portrait}</span>
                <small>{m.about.portraitNote}</small>
              </div>
            </div>
          </div>
          <div className="about-copy" data-reveal>
            <h3>{profile.biography[0][locale]}</h3>
            {profile.biography.slice(1).map((p, i) => (
              <p key={i}>{p[locale]}</p>
            ))}
            <a href="#contact" className="inline-link">
              {m.hero.connect}
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <div className="metrics" data-reveal>
          {profile.metrics.map((metric) => (
            <AnimatedMetric
              key={metric.value}
              value={metric.value}
              label={metric.label}
              locale={locale}
            />
          ))}
        </div>
        <p className="metric-footnote">{profile.revenueNote[locale]}</p>
      </section>
      <ProjectShowcase locale={locale} projects={projects} />
      <ExperienceTimeline locale={locale} experiences={experiences} />
      <SkillsVisualization locale={locale} />
      <section id="approach" className="section approach-section">
        <div className="section-head" data-reveal>
          <div>
            <p className="eyebrow">{m.approach.label}</p>
            <h2>
              {m.approach.title}
              <br />
              <span className="muted">{m.approach.accent}</span>
            </h2>
          </div>
          <span className="approach-asterisk" aria-hidden="true">
            ✳
          </span>
        </div>
        <div className="approach-steps" data-reveal>
          {m.approach.steps.map((step, i) => (
            <article key={step.title}>
              <span className="step-number mono">
                0{i + 1}
                <ArrowUpRight size={16} />
              </span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
        <div className="process-flow" data-reveal>
          {m.approach.flow.map((item, i) => (
            <div key={item}>
              <span className={i === 4 ? "process-final" : ""}>
                <i />
                {item}
              </span>
              {i < 4 && <ArrowRight size={16} />}
            </div>
          ))}
        </div>
      </section>
      <section id="education" className="section education-section">
        <div className="section-head" data-reveal>
          <div>
            <p className="eyebrow">{m.education.label}</p>
            <h2>
              {m.education.title}
              <br />
              <span className="muted">{m.education.accent}</span>
            </h2>
          </div>
          <Globe2 className="education-globe" size={90} strokeWidth={0.5} />
        </div>
        <div className="education-layout" data-reveal>
          {education.map((e, i) => (
            <article className="education-item" key={e.institution}>
              <span className="education-icon">
                {i === 0 ? <GraduationCap size={21} /> : <Globe2 size={21} />}
              </span>
              <p className="mono">{e.place[locale]}</p>
              <h3>{e.institution}</h3>
              <h4>{e.degree[locale]}</h4>
              <p>{e.description[locale]}</p>
            </article>
          ))}
        </div>
        <div className="language-row" data-reveal>
          <h3>{m.education.languages}</h3>
          <div>
            {languages.map((l) => (
              <span key={l.en}>{l[locale]}</span>
            ))}
          </div>
        </div>
        <p className="volunteering" data-reveal>
          {volunteering[locale]}
        </p>
      </section>
      <ContactSection />
    </main>
  );
}
