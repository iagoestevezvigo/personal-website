import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Project, Locale } from "@/types/content";
import { getMessages } from "@/i18n/messages";
import { ProjectVisual } from "./ProjectVisual";
import { ProjectLinks } from "./ProjectLinks";
export function ProjectShowcase({
  projects,
  locale,
}: {
  projects: Project[];
  locale: Locale;
}) {
  const m = getMessages(locale).work;
  return (
    <section id="work" className="section work-section">
      <div className="section-head" data-reveal>
        <div>
          <p className="eyebrow">{m.label}</p>
          <h2>
            {m.title}
            <br />
            <span className="muted">{m.accent}</span>
          </h2>
        </div>
        <p className="section-intro">{m.description}</p>
      </div>
      <div className="project-list">
        {projects
          .filter((p) => p.featured)
          .map((p, index) => (
            <article
              key={p.id}
              className={`project-row project-${p.visual}`}
              style={
                { "--project-accent": p.accentColor } as React.CSSProperties
              }
              data-reveal
            >
              <Link
                href={`/${locale}/projects/${p.slug}/`}
                className="project-art-link"
                aria-label={`${m.view} — ${p.name}`}
              >
                <ProjectVisual project={p} locale={locale} />
                <span className="project-art-arrow">
                  <ArrowUpRight size={25} />
                </span>
              </Link>
              <div className="project-copy">
                <div className="project-meta">
                  <span className="mono">
                    0{index + 1} / {p.category[locale]}
                  </span>
                  <span className={`project-status ${p.status}`}>
                    <i />
                    {m[p.status]}
                  </span>
                </div>
                <h3>
                  <Link href={`/${locale}/projects/${p.slug}/`}>
                    <span className="project-name">
                      {p.logo && (
                        <img
                          src={p.logo}
                          alt=""
                          width="32"
                          height="32"
                          loading="lazy"
                        />
                      )}
                      {p.name}
                    </span>
                    <ArrowUpRight size={22} />
                  </Link>
                </h3>
                <p className="project-headline">{p.headline[locale]}</p>
                <p className="project-description">
                  {p.shortDescription[locale]}
                </p>
                <ProjectLinks links={p.links} locale={locale} compact />
                <div className="tech-tags">
                  {p.technologies.slice(0, 4).map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <Link
                  href={`/${locale}/projects/${p.slug}/`}
                  className="inline-link"
                >
                  {m.view}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
      </div>
      {projects
        .filter((p) => !p.featured)
        .map((p) => (
          <Link
            key={p.id}
            href={`/${locale}/projects/${p.slug}/`}
            className="archive-project"
            data-reveal
          >
            <span className="archive-label mono">
              ↳ {m.archive}
              {p.startDate
                ? ` / ${p.startDate}${p.endDate ? `—${p.endDate}` : ""}`
                : ""}
            </span>
            <span>{p.headline[locale].replace("\n", " ")}</span>
            <span className="archive-metric">
              {p.highlight?.[locale]}
              <ArrowUpRight size={20} />
            </span>
          </Link>
        ))}
    </section>
  );
}
