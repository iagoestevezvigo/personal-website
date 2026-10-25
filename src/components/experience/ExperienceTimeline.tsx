import { Plus, Minus, MapPin, ArrowUpRight } from "lucide-react";
import { Experience, Locale } from "@/types/content";
import { getMessages } from "@/i18n/messages";
import { MediaGallery } from "@/components/projects/MediaGallery";
export function ExperienceTimeline({
  experiences,
  locale,
}: {
  experiences: Experience[];
  locale: Locale;
}) {
  const m = getMessages(locale).experience;
  return (
    <section id="experience" className="section experience-section">
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
      <div className="timeline">
        {experiences.map((exp, i) => (
          <details
            className={`experience-item ${exp.current ? "current" : ""}`}
            key={exp.id}
            name="experience"
            data-reveal
          >
            <summary>
              <span className="timeline-date mono">
                <i />
                {exp.startDate} — {exp.current ? m.present : exp.endDate}
              </span>
              <span className="experience-heading">
                <span className="experience-company">
                  {exp.logo && (
                    <img src={exp.logo} width="30" height="30" alt="" />
                  )}
                  {exp.company}
                  {exp.current && <span className="current-dot" />}
                </span>
                <span className="experience-role">{exp.role[locale]}</span>
              </span>
              <span className="experience-index mono">0{i + 1}</span>
              <span className="expand-icon">
                <Plus className="plus" size={17} />
                <Minus className="minus" size={17} />
              </span>
            </summary>
            <div className="experience-body">
              <p className="experience-summary">{exp.summary[locale]}</p>
              <p className="experience-location mono">
                <MapPin size={13} />
                {exp.location[locale]}
              </p>
              <p>{exp.description[locale]}</p>
              {exp.responsibilities.length > 0 && (
                <>
                  <h4>{m.responsibilities}</h4>
                  <ul>
                    {exp.responsibilities.map((r, i) => (
                      <li key={i}>{r[locale]}</li>
                    ))}
                  </ul>
                </>
              )}
              {exp.achievements.length > 0 && (
                <>
                  <h4>{m.achievements}</h4>
                  <ul>
                    {exp.achievements.map((a, i) => (
                      <li key={i}>{a[locale]}</li>
                    ))}
                  </ul>
                </>
              )}
              <div className="tech-tags">
                {exp.technologies.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              {exp.website && (
                <a
                  className="inline-link"
                  href={exp.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  {exp.company}
                  <ArrowUpRight size={15} />
                </a>
              )}
              {exp.links.map((l) => (
                <a
                  key={l.url}
                  className="inline-link"
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {l.label[locale]}
                  <ArrowUpRight size={15} />
                </a>
              ))}
              <MediaGallery media={exp.media} locale={locale} />
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
