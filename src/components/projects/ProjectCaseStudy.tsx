import { ArrowUpRight, Check } from "lucide-react";
import { Project, Locale } from "@/types/content";
import { getMessages } from "@/i18n/messages";
import { ProjectLinks } from "./ProjectLinks";

export function ProjectCaseStudy({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  const story = project.caseStudy;
  if (!story) return null;
  const m = getMessages(locale).work;
  return (
    <section className="section case-study">
      <div className="case-study-heading" data-reveal>
        <div>
          <p className="eyebrow">01 / {m.ownership}</p>
          <h2>{story.title[locale]}</h2>
        </div>
        <p>{story.introduction[locale]}</p>
      </div>
      <div className="case-challenge" data-reveal>
        <span className="eyebrow">{m.challenge}</span>
        <p>{story.challenge[locale]}</p>
      </div>
      <div className="case-contributions" data-reveal>
        {story.contributions.map((c, i) => (
          <article key={c.title.en}>
            <span className="mono">
              0{i + 1}
              <ArrowUpRight size={17} />
            </span>
            <h3>{c.title[locale]}</h3>
            <p>{c.description[locale]}</p>
          </article>
        ))}
      </div>
      <div className="case-outcome" data-reveal>
        <div>
          <span className="eyebrow">
            <Check size={13} />
            {m.shipped}
          </span>
          <h3>{m.outcomeTitle}</h3>
          <p>{story.outcome[locale]}</p>
        </div>
        <ProjectLinks links={project.links} locale={locale} />
      </div>
    </section>
  );
}
