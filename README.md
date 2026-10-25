# Iago Estévez — personal portfolio

Portfolio bilingüe construido con Next.js App Router, React, TypeScript, next-intl, Three.js y Lucide. Diseño editorial oscuro, núcleo 3D original, contenido centralizado y exportación estática. Las fuentes Space Grotesk, Inter y JetBrains Mono se sirven localmente.

El código de la aplicación está directamente en la raíz de este repositorio. Incluye los proyectos tuFoot, Focum (en fase de pruebas), Thirld World Invasion y las primeras comunidades de gaming, con contenido en inglés y español.

## Arranque

Requiere Node.js 22.12 o superior y npm.

```sh
git clone https://github.com/iagoestevezvigo/personal-website.git
cd personal-website
# Para trabajar con esta importación antes de integrarla en master:
git switch feat/import-premium-portfolio
npm ci
npm run dev
```

Abre `http://localhost:3000`. La raíz lleva a `/en/`. El selector cambia entre `/en/` y `/es/`, manteniendo el proyecto abierto. El idioma inicial de cada documento HTML también está localizado.

```sh
npm run build
npm run typecheck
npm test
npm run preview
```

`npm run preview` sirve la exportación en `http://127.0.0.1:3000`; `next start` no se utiliza con `output: export`.

Ejecuta la compilación antes de la comprobación de tipos en un clon nuevo: Next.js genera sus declaraciones en `.next/` y `next-env.d.ts`. `.gitignore` excluye dependencias, compilaciones, cachés, archivos de entorno, secretos locales, informes de pruebas y capturas. `package-lock.json` y `.env.example` sí se versionan.

Para personalizar la configuración local, copia `.env.example` a `.env.local`. `NEXT_PUBLIC_SITE_URL` establece el dominio utilizado en canonical, sitemap y metadatos; `NEXT_PUBLIC_CONTACT_ENDPOINT` activa el backend de correo opcional. Con los valores vacíos, el proyecto utiliza el dominio actual de Sites y el formulario abre el cliente de correo.

## Dónde editar

| Contenido                                                | Archivo                                |
| -------------------------------------------------------- | -------------------------------------- |
| Nombre, correo, LinkedIn, biografía, fotografía y cifras | `src/data/profile.ts`                  |
| Proyectos, estado, enlaces y medios                      | `src/data/projects.ts`                 |
| Empresas y experiencia                                   | `src/data/experience.ts`               |
| Estudios, idiomas y voluntariado                         | `src/data/education.ts`                |
| Categorías y herramientas                                | `src/data/skills.ts`                   |
| Textos de interfaz y metadatos                           | `src/i18n/en.json`, `src/i18n/es.json` |
| Tipos y campos disponibles                               | `src/types/content.ts`                 |
| Funciones de acceso al contenido                         | `src/lib/content.ts`                   |
| Paleta, tamaños, responsive y movimiento                 | `src/app/globals.css`                  |

Las listas usan `order`; los proyectos con `published: false` no aparecen ni generan páginas. `featured: true` los muestra en el escaparate; los demás aparecen como entradas del archivo. Ningún formulario de administración simula persistencia: los archivos son la fuente de verdad y sus cambios requieren una nueva compilación.

## Añadir un proyecto

Añade un objeto a `projects` en `src/data/projects.ts`, con `id` y `slug` únicos. Utiliza `text('English', 'Español')` para los textos. Este ejemplo completo no atribuye datos no confirmados a proyectos existentes:

```ts
{
  id: 'new-project', slug: 'new-project', name: 'New project',
  category: t('SOFTWARE', 'SOFTWARE'),
  headline: t('Your project headline.', 'El titular de tu proyecto.'),
  shortDescription: t('A concise description.', 'Una descripción breve.'),
  fullDescription: [t('The full story.', 'La historia completa.')],
  role: t('Creator & Developer', 'Creador y desarrollador'),
  status: 'development',
  technologies: ['TypeScript'],
  visual: 'editorial', accentColor: '#4f8cff',
  gallery: [], links: [], capabilities: [],
  featured: true, published: true, order: 5,
}
```

La página `/en/projects/new-project/` y su versión española se generan automáticamente. Puedes añadir `startDate`, `endDate`, `highlight`, `logo`, `seoTitle` y `seoDescription`. Las fechas desconocidas se omiten. `status` admite `active`, `development`, `testing` y `completed`. `visual` admite `editorial`, `pitch`, `focus`, `city` y `terminal`; `coverImage` reemplaza cualquier ilustración por tu imagen real.

## Fotografías, capturas, galerías y vídeos

Coloca los archivos en `public/images/` (recomendado WebP o AVIF). Los campos usan rutas públicas, por ejemplo `/images/projects/new-project/cover.webp`, sin el prefijo `public`. Para la fotografía personal, cambia `profile.portrait` de `null` a una ruta real. Hasta entonces se muestra una composición tipográfica, sin retrato ficticio.

```ts
coverImage: '/images/projects/new-project/cover.webp',
logo: '/images/projects/new-project/logo.svg',
gallery: [
  {
    src: '/images/projects/new-project/screen.webp', type: 'image',
    alt: t('Project dashboard', 'Panel del proyecto'),
    caption: t('A real product screenshot.', 'Una captura real del producto.'),
  },
  {
    src: '/videos/new-project/demo.mp4', type: 'video',
    alt: t('Product demonstration', 'Demostración del producto'),
    poster: '/images/projects/new-project/video-cover.webp',
    caption: t('A product walkthrough.', 'Un recorrido por el producto.'),
  },
],
```

Las imágenes abren un modal con cierre por Escape, foco contenido por el navegador y navegación con flechas. Los vídeos incluyen controles y cargan solo metadatos. tuFoot utiliza su icono y capturas reales de la aplicación publicada en App Store, optimizadas en WebP; sus enlaces de App Store, Google Play y web se editan en `links`. Focum utiliza el logo original facilitado por Iago y una presentación de marca con sus colores. El visual del videojuego se identifica como conceptual. Las galerías sin material real se omiten.

Los campos opcionales `presentation` y `caseStudy` permiten añadir una composición de capturas y un caso de estudio (reto, aportación y resultado) desde los datos de cada proyecto. `presentation.screens` usa el mismo tipo `Media` que las galerías. El origen de los medios de tuFoot se documenta en `docs/media-sources.md`.

## Añadir empresas o experiencias

Copia una entrada de `src/data/experience.ts`, asigna un `id` y configura `company`, `role`, `location`, `startDate`, `endDate`, `current`, `summary`, `description`, `responsibilities`, `achievements`, `technologies`, `media`, `links` y `order`. `logo` y `website` son opcionales. Los textos descriptivos usan `t(en, es)`. `media` usa el mismo formato que las galerías; permite tanto imágenes como vídeos. Las responsabilidades, los logros y las tecnologías pueden ser listas vacías.

## Enlaces

Añade enlaces al array `links` de un proyecto o experiencia:

```ts
{ label: t('Source code', 'Código fuente'), url: 'https://your-real-link.example', type: 'github' }
```

Tipos: `website`, `github`, `appstore`, `playstore`, `demo`, `other`. Se muestran solo los enlaces proporcionados. Para una demostración interactiva, utiliza `type: 'demo'` y la URL real. No se inventan perfiles, enlaces de tiendas ni fechas de lanzamiento.

## Contacto

Sin configuración adicional, el formulario valida los datos y abre un `mailto:` con el mensaje preparado. La interfaz indica que debe enviarse desde el cliente de correo y nunca simula una entrega. También puedes escribir mediante el enlace de correo o copiar la dirección.

Se incluye un backend opcional real en `services/contact/worker.ts`, con integración Resend, validación en servidor, honeypot, origen permitido y límite de cinco solicitudes por minuto por IP. Se despliega independientemente del frontend estático:

1. Configura `ALLOWED_ORIGIN` en `services/contact/wrangler.jsonc` con el origen exacto de tu web. Comprueba el destinatario `CONTACT_TO`.
2. Verifica un dominio de envío en Resend. Guarda `RESEND_API_KEY` y `CONTACT_FROM` como secretos del Worker, mediante `npx wrangler secret put RESEND_API_KEY --config services/contact/wrangler.jsonc` y el comando equivalente para `CONTACT_FROM`. No uses variables `NEXT_PUBLIC_` para secretos.
3. Despliega con `npx wrangler deploy --config services/contact/wrangler.jsonc` desde tu cuenta de Cloudflare.
4. Define `NEXT_PUBLIC_CONTACT_ENDPOINT` con la URL HTTPS devuelta y vuelve a compilar el portfolio.

El backend devuelve éxito solo después de que Resend acepte el correo y devuelva un identificador; esto no equivale a una garantía de entrega al buzón. Sin credenciales configuradas devuelve error. La clave nunca llega al navegador. El servicio no se ha activado ni se ha enviado correo de prueba, ya que no se han proporcionado credenciales.

Referencias de la integración: [API de envío de Resend](https://resend.com/docs/api-reference/emails/send-email) y [rate limiting de Cloudflare Workers](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/).

## Internacionalización

Los textos están separados de la interfaz. Las rutas se generan por idioma y cada página incluye metadatos, canonical y `hreflang`. Para otro idioma, amplía `Locale`, `locales` y `Localized` en `src/types/content.ts`, registra sus mensajes en `src/i18n/messages.ts`, traduce todos los archivos de datos y amplía el selector y las alternativas SEO. El test de traducciones detecta claves diferentes entre inglés y español.

## Despliegue

Establece `NEXT_PUBLIC_SITE_URL` antes de compilar cuando cambie el dominio. Por defecto se utiliza el dominio reservado de Sites. El proyecto está configurado para generar `out/`:

```sh
npm ci
npm run build
```

En Vercel, utiliza la raíz del repositorio (`.`), framework Next.js y el comando de compilación anterior; la exportación es estática. En otro hosting estático, publica `out/`, conservando los directorios y su `index.html`, los assets de `_next` y la página `404.html`. No conviertas todos los errores en respuestas 200 ni reescribas todo hacia el inicio.

`.openai/hosting.json` conserva la identidad y configuración del Site existente; no contiene credenciales y no es necesario para desplegar en Vercel u otro hosting estático. Los archivos locales de esa integración están excluidos por `.gitignore`. Al utilizar otro dominio, actualiza también `ALLOWED_ORIGIN` en el servicio de contacto si lo activas.

## Validación y accesibilidad

`npm test` comprueba paridad de traducciones, validación de contacto, codificación del correo y rutas/metadatos de la exportación. Ejecútalo después del build. Para las comprobaciones del navegador, ejecuta `npm run preview` y, en otra terminal, `npm run test:browser`; requiere Chromium instalado con Playwright (`npx playwright install chromium`). Si ya tienes uno compatible, define `PLAYWRIGHT_CHROMIUM_EXECUTABLE` con su ruta.

Las pruebas de navegador verifican escritorio y anchuras de 375, 768, 1024 y 1440 px, ausencia de overflow horizontal, idiomas, proyectos, menú móvil, mapa de capacidades, timeline, fallback de correo, 404 y movimiento reducido. Las capturas locales quedan en `qa-output/` y no se publican. Las pruebas del backend usan respuestas simuladas, sin enviar mensajes reales.

La navegación usa enlaces y botones nativos, foco visible y enlace para saltar al contenido. Las animaciones no esconden contenido si JavaScript no está disponible. `prefers-reduced-motion` desactiva entradas, desplazamientos suaves, contadores y WebGL; se conserva un núcleo CSS estático. El núcleo 3D se carga por separado, limita la resolución y evita renderizar cuando está fuera de pantalla o la pestaña está oculta. Lighthouse no se ha puntuado: los resultados reales dependen del hosting y de los medios que añadas.

## Migración futura a CMS

`src/lib/content.ts` es el límite entre datos y presentación. Sustituye sus funciones por un repositorio de Payload, Sanity u otro CMS, manteniendo los tipos `Project` y `Experience`. Si el adaptador es asíncrono, espera sus resultados en las páginas de servidor y en la generación de rutas. En una exportación estática, configura un webhook del CMS que active una nueva compilación; para cambios en vivo, utiliza un despliegue con servidor y caché. Añade autenticación, permisos y almacenamiento real antes de crear una administración. El frontend actual no ofrece una administración pública.

## Criterios de contenido

Los ingresos anuales se atribuyen únicamente a un producto que Iago ayudó a liderar, sin atribuirlos a tuFoot. Focum es una iniciativa sin ánimo de lucro en fase de pruebas; el videojuego está en desarrollo. No se incluyen cifras de usuarios, lanzamientos, testimonios ni funcionalidades adicionales no confirmadas. El nombre `Thirld World Invasion` conserva la grafía facilitada.

## Licencia

Se conserva la licencia MIT del repositorio. Consulta [LICENSE](LICENSE).
