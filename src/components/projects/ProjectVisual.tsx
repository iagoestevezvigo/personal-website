import { Project, Locale } from "@/types/content";
import { getMessages } from "@/i18n/messages";
import { ProductPresentation } from "./ProductPresentation";

export function ProjectVisual({
  project,
  locale,
  className = "",
}: {
  project: Project;
  locale: Locale;
  className?: string;
}) {
  const { work: m, visual: v } = getMessages(locale);
  if (project.coverImage)
    return (
      <div className={`project-visual ${className}`}>
        <img
          src={project.coverImage}
          alt={project.headline[locale]}
          loading="lazy"
        />
      </div>
    );
  if (project.presentation)
    return (
      <ProductPresentation
        project={project}
        locale={locale}
        className={className}
      />
    );
  return (
    <div
      className={`project-visual visual-${project.visual} ${className}`}
      aria-label={project.headline[locale]}
    >
      {project.visual === "pitch" && (
        <>
          <div className="pitch-orb" />
          <svg
            className="pitch-art"
            viewBox="0 0 800 500"
            fill="none"
            aria-hidden="true"
          >
            <g
              transform="translate(115,75) rotate(-9 300 180)"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="0" y="0" width="570" height="355" rx="3" />
              <path d="M285 0V355M0 70H105V285H0M570 70H465V285H570M0 125H40V230H0M570 125H530V230H570" />
              <circle cx="285" cy="177" r="65" />
              <circle cx="285" cy="177" r="3" fill="currentColor" />
              <path d="M105 130Q170 177 105 225M465 130Q400 177 465 225" />
              {[
                [140, 100],
                [230, 70],
                [330, 120],
                [420, 80],
                [185, 250],
                [310, 270],
                [410, 240],
              ].map(([x, y], i) => (
                <g key={i}>
                  <circle cx={x} cy={y} r="13" fill="#173b2d" />
                  <circle cx={x} cy={y} r="4" fill="currentColor" />
                </g>
              ))}
              <path
                d="M140 100L230 70L330 120L420 80M185 250L310 270L410 240M230 70L310 270"
                strokeDasharray="5 7"
                opacity=".55"
              />
            </g>
          </svg>
          <div className="visual-wordmark">{project.name}</div>
          <span className="visual-sub">{v.football}</span>
        </>
      )}
      {project.visual === "focus" && (
        <>
          <div className="focus-orbit" />
          <div className="focus-orbit two" />
          <div className="focus-orbit three" />
          <div className="focus-disc">
            {project.logo ? (
              <img
                src={project.logo}
                alt=""
                width="512"
                height="512"
                loading="lazy"
              />
            ) : (
              <span className="focus-symbol">
                {project.name[0].toLowerCase()}
                <span>.</span>
              </span>
            )}
          </div>
          <div className="focus-title">
            {project.name.toLowerCase()}
            <span>{v.focus}</span>
          </div>
          <span className="visual-sub">{m.nonprofit}</span>
        </>
      )}
      {project.visual === "city" && (
        <>
          <div className="city-moon" />
          <div className="city-buildings">
            {[125, 190, 160, 260, 210, 145, 240, 185, 130, 220, 170, 250].map(
              (h, i) => (
                <div key={i} style={{ height: h }} />
              ),
            )}
          </div>
          <div className="city-fog" />
          <div className="city-crosshair" />
          <div className="checkpoint">
            <span>{v.control}</span>
            <div className="checkpoint-line" />
          </div>
          <span className="city-stamp">{v.restricted}</span>
          <span className="visual-sub">{m.gameConcept}</span>
        </>
      )}
      {project.visual === "terminal" && (
        <div className="terminal-art">
          <span className="terminal-dots">● ● ●</span>
          <p>
            <span>~</span> / {project.slug}
          </p>
          <p>
            <span>$</span> {v.build.toLowerCase()}
          </p>
          {project.startDate && (
            <p className="terminal-muted">
              [{project.startDate}
              {project.endDate ? `–${project.endDate}` : ""}]
            </p>
          )}
          {project.highlight && (
            <p className="terminal-big">{project.highlight[locale]}</p>
          )}
          <p>{v.users}</p>
        </div>
      )}
      {project.visual === "editorial" && (
        <div className="editorial-art">
          <span className="mono">{project.category[locale]}</span>
          <strong>{project.name}</strong>
          <span>{project.headline[locale]}</span>
        </div>
      )}
      {project.visual === "pitch" || project.visual === "focus" ? (
        <span className="concept-caption">
          {project.visual === "focus" && project.logo
            ? m.brandVisual
            : m.concept}
        </span>
      ) : null}
      <span className="visual-corner" aria-hidden="true">
        +
      </span>
    </div>
  );
}
