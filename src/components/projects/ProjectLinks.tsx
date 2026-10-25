import { ArrowUpRight, Globe2, Smartphone, Play, Link2 } from "lucide-react";
import { ExternalLink, Locale } from "@/types/content";
import { getMessages } from "@/i18n/messages";

export function ProjectLinks({
  links,
  locale,
  compact = false,
}: {
  links: ExternalLink[];
  locale: Locale;
  compact?: boolean;
}) {
  if (!links.length) return null;
  const m = getMessages(locale).work;
  return (
    <div
      className={`product-links${compact ? " compact" : ""}`}
      role="group"
      aria-label={m.external}
    >
      {links.map((link) => {
        const Icon =
          link.type === "website"
            ? Globe2
            : link.type === "appstore"
              ? Smartphone
              : link.type === "playstore"
                ? Play
                : Link2;
        const title = link.type === "website" ? "Web" : link.label[locale];
        const subtitle =
          link.type === "website"
            ? m.visitWebsite
            : link.type === "appstore" || link.type === "playstore"
              ? m.availableOn
              : m.discover;
        return (
          <a
            key={link.url}
            href={link.url}
            className={`product-link platform-${link.type || "other"}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label[locale]}
          >
            <Icon size={compact ? 16 : 21} strokeWidth={1.6} />
            <span>
              {!compact && <small>{subtitle}</small>}
              <strong>{title}</strong>
            </span>
            <ArrowUpRight size={13} className="product-link-arrow" />
          </a>
        );
      })}
    </div>
  );
}
