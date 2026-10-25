import type { Metadata } from "next";
import "../fonts";
import "../globals.css";
export const metadata: Metadata = {
  title: "Iago Estévez — Portfolio",
  description: "Engineer. Product builder. Entrepreneur.",
  icons: { icon: "/icon.svg" },
};
export default function EntryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
