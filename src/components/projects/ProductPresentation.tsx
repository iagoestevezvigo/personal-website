import { Project, Locale } from "@/types/content";

export function ProductPresentation({
  project,
  locale,
  className = "",
}: {
  project: Project;
  locale: Locale;
  className?: string;
}) {
  const presentation = project.presentation;
  if (!presentation) return null;
  return (
    <div className={`project-visual product-presentation ${className}`}>
      <div className="product-presentation-grid" aria-hidden="true" />
      <div className="product-presentation-brand">
        {project.logo && (
          <img
            src={project.logo}
            alt=""
            width="34"
            height="34"
            loading="lazy"
          />
        )}
        <span>
          {project.name}
          <i>.</i>
        </span>
      </div>
      <div className="product-presentation-copy">
        <p className="mono">{presentation.label[locale]}</p>
        <h3>{presentation.title[locale]}</h3>
      </div>
      <div className="product-phones">
        {presentation.screens.slice(0, 3).map((screen, i) => (
          <div className={`product-phone phone-${i + 1}`} key={screen.src}>
            <img
              src={screen.src}
              alt={screen.alt[locale]}
              loading="lazy"
              width="600"
              height="1300"
            />
          </div>
        ))}
      </div>
      <span className="product-presentation-note mono">
        {presentation.note[locale]}
      </span>
      <span className="product-presentation-cross" aria-hidden="true">
        +
      </span>
    </div>
  );
}
