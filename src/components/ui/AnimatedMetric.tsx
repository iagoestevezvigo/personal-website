"use client";
import { useEffect, useRef, useState } from "react";
import { Locale, Localized } from "@/types/content";
export function AnimatedMetric({
  value,
  label,
  locale,
}: {
  value: string;
  label: Localized;
  locale: Locale;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const match = value.match(/^([€]?)([\d,]+)([K+]*?)$/);
    if (!match) return;
    const target = Number(match[2].replace(/,/g, ""));
    if (!target) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - start) / 1000, 1);
          const count = Math.round(target * (1 - Math.pow(1 - progress, 3)));
          setDisplay(
            progress === 1
              ? value
              : `${match[1]}${new Intl.NumberFormat(locale).format(count)}${match[3]}`,
          );
          if (progress < 1) frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, locale]);
  return (
    <div className="metric" ref={ref}>
      <strong aria-label={value}>
        <span aria-hidden="true">{display}</span>
      </strong>
      <span>{label[locale]}</span>
    </div>
  );
}
