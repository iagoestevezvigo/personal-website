import Link from "next/link";
export default function Root() {
  return (
    <main className="entry">
      <meta httpEquiv="refresh" content="0;url=/en/" />
      <span className="wordmark">
        ie<span>.</span>
      </span>
      <h1>Iago Estévez</h1>
      <Link href="/en/">Enter portfolio →</Link>
      <Link href="/es/" lang="es">
        Ver en español →
      </Link>
    </main>
  );
}
