import Link from "next/link";
import "./fonts";
import "./globals.css";
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <head>
        <title>404 — Iago Estévez</title>
      </head>
      <body>
        <main className="entry">
          <span className="mono">404 / IAGO ESTÉVEZ</span>
          <h1>This page hasn’t been built.</h1>
          <p lang="es">Esta página está por construir.</p>
          <Link className="button primary" href="/en/">
            Back to the portfolio →
          </Link>
          <Link href="/es/" lang="es">
            Volver al portfolio →
          </Link>
        </main>
      </body>
    </html>
  );
}
