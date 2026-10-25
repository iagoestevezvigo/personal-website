"use client";
import { useRef, useState } from "react";
import { X, ArrowLeft, ArrowRight, Expand } from "lucide-react";
import { useTranslations } from "next-intl";
import { Locale, Media } from "@/types/content";
export function MediaGallery({
  media,
  locale,
}: {
  media: Media[];
  locale: Locale;
}) {
  const t = useTranslations("work");
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState(0);
  const images = media.filter((m) => m.type === "image");
  if (!media.length) return null;
  function show(m: Media) {
    setSelected(images.indexOf(m));
    dialog.current?.showModal();
  }
  function change(direction: number) {
    setSelected((i) => (i + direction + images.length) % images.length);
  }
  return (
    <>
      <div className="media-gallery">
        {media.map((m, i) => (
          <figure key={`${m.src}-${i}`}>
            {m.type === "video" ? (
              <video
                controls
                preload="metadata"
                poster={m.poster}
                aria-label={m.alt[locale]}
              >
                <source src={m.src} />
                <a href={m.src}>{m.alt[locale]}</a>
              </video>
            ) : (
              <button
                className="gallery-button"
                onClick={() => show(m)}
                aria-label={`${t("zoom")}: ${m.alt[locale]}`}
              >
                <img src={m.src} alt={m.alt[locale]} loading="lazy" />
                <Expand size={18} />
              </button>
            )}
            {m.caption && <figcaption>{m.caption[locale]}</figcaption>}
          </figure>
        ))}
      </div>
      {images.length > 0 && (
        <dialog
          className="lightbox"
          ref={dialog}
          onClick={(e) => {
            if (e.target === dialog.current) dialog.current.close();
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") change(-1);
            if (e.key === "ArrowRight") change(1);
          }}
          aria-label={t("gallery")}
        >
          <button
            className="lightbox-close"
            onClick={() => dialog.current?.close()}
            aria-label={t("close")}
          >
            <X />
          </button>
          <figure>
            <img
              src={images[selected].src}
              alt={images[selected].alt[locale]}
            />
            <figcaption>
              {images[selected].caption?.[locale] ||
                images[selected].alt[locale]}
            </figcaption>
          </figure>
          {images.length > 1 && (
            <div className="lightbox-controls">
              <button onClick={() => change(-1)} aria-label={t("previous")}>
                <ArrowLeft />
              </button>
              <span className="mono">
                {selected + 1} / {images.length}
              </span>
              <button onClick={() => change(1)} aria-label={t("nextImage")}>
                <ArrowRight />
              </button>
            </div>
          )}
        </dialog>
      )}
    </>
  );
}
