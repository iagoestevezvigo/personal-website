import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { Locale } from "@/types/content";
import { getProjects, getProject } from "@/lib/content";
import { getMessages } from "@/i18n/messages";
import { pageMetadata } from "@/lib/seo";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { MediaGallery } from "@/components/projects/MediaGallery";
import { ContactSection } from "@/components/contact/ContactSection";
import { ProjectLinks } from "@/components/projects/ProjectLinks";
import { ProjectCaseStudy } from "@/components/projects/ProjectCaseStudy";
export const dynamicParams = false;
export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return pageMetadata(
    locale,
    p.seoTitle?.[locale] || `${p.name} — Iago Estévez`,
    p.seoDescription?.[locale] || p.shortDescription[locale],
    `projects/${p.slug}/`,
  );
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const m = getMessages(locale).work;
  const all = getProjects();
  const next = all[(all.findIndex((p) => p.slug === slug) + 1) % all.length];
  return (
    <main
      id="main"
      className="project-detail"
      style={{ "--project-accent": project.accentColor } as React.CSSProperties}
    >
      <section className="section detail-hero">
        <Link href={`/${locale}/#work`} className="inline-link back-link">
          <ArrowLeft size={15} />
          {m.back}
        </Link>
        <div className="detail-heading" data-reveal>
          <div>
            <p className="eyebrow">{project.category[locale]}</p>
            <h1>
              {project.logo && (
                <img src={project.logo} width="60" height="60" alt="" />
              )}
              {project.name}
              <span>.</span>
            </h1>
          </div>
          <span className={`project-status ${project.status}`}>
            <i />
            {m[project.status]}
          </span>
        </div>
        <p className="detail-headline" data-reveal>
          {project.headline[locale]}
        </p>
        {project.links.length > 0 && (
          <div className="detail-platforms" data-reveal>
            <p className="eyebrow">{m.availableNow}</p>
            <ProjectLinks links={project.links} locale={locale} />
          </div>
        )}
        <ProjectVisual
          project={project}
          locale={locale}
          className="detail-visual"
        />
        <div className="detail-meta">
          <div>
            <span className="eyebrow">{m.role}</span>
            <p>{project.role[locale]}</p>
          </div>
          <div>
            <span className="eyebrow">{m.status}</span>
            <p>{m[project.status]}</p>
          </div>
          {project.startDate && (
            <div>
              <span className="eyebrow">{m.dates}</span>
              <p>
                {project.startDate}
                {project.endDate ? ` — ${project.endDate}` : ""}
              </p>
            </div>
          )}
        </div>
      </section>
      {project.caseStudy ? (
        <ProjectCaseStudy project={project} locale={locale} />
      ) : (
        <section className="section detail-story">
          <div data-reveal>
            <p className="eyebrow">01 / {m.project}</p>
            <h2>{m.overview}</h2>
          </div>
          <div className="detail-prose" data-reveal>
            {project.fullDescription.map((p, i) => (
              <p key={i}>{p[locale]}</p>
            ))}
          </div>
        </section>
      )}
      <section className="section detail-capabilities" data-reveal>
        <p className="eyebrow">02 / {m.project}</p>
        <h2>{m.capabilities}</h2>
        <div className="capabilities-list">
          {project.capabilities.map((c, i) => (
            <div key={i}>
              <span className="mono">0{i + 1}</span>
              <h3>{c[locale]}</h3>
              <Plus size={16} />
            </div>
          ))}
        </div>
        {project.technologies.length > 0 && (
          <div className="detail-stack">
            <h3 className="eyebrow">{m.stack}</h3>
            <div className="tech-tags">
              {project.technologies.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </div>
        )}
      </section>
      {project.gallery.length > 0 && (
        <section className="section detail-gallery" data-reveal>
          <h2>{m.gallery}</h2>
          {project.presentation && (
            <p className="gallery-note">{project.presentation.note[locale]}</p>
          )}
          <MediaGallery locale={locale} media={project.gallery} />
        </section>
      )}
      <section className="section next-project" data-reveal>
        <Link href={`/${locale}/projects/${next.slug}/`}>
          <span className="eyebrow">{m.next}</span>
          <span>
            {next.name}
            <ArrowRight size={45} />
          </span>
        </Link>
      </section>
      <ContactSection />
    </main>
  );
}
