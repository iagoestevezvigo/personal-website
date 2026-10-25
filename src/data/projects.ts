import { Project, text as t } from "@/types/content";
export const projects: Project[] = [
  {
    id: "tufoot",
    slug: "tufoot",
    name: "tuFoot",
    order: 1,
    status: "active",
    featured: true,
    published: true,
    visual: "pitch",
    accentColor: "#b6f580",
    logo: "/images/projects/tufoot/logo.jpg",
    category: t("SPORTS TECHNOLOGY / SAAS", "TECNOLOGÍA DEPORTIVA / SAAS"),
    headline: t(
      "More football.\nLess busywork.",
      "Más fútbol.\nMenos gestión.",
    ),
    shortDescription: t(
      "Co-founded and built a platform that connects club methodology, training and match-day preparation. A real product, available on iOS, Android and web.",
      "Cofundé y desarrollé una plataforma que conecta la metodología del club, los entrenamientos y la preparación de partidos. Un producto real, disponible en iOS, Android y web.",
    ),
    fullDescription: [
      t(
        "tuFoot is a technology startup helping grassroots and amateur football clubs organize, plan and manage their sporting operations through one unified digital platform. I co-founded it with a fellow Telecommunications Engineering graduate from the University of Vigo.",
        "tuFoot es una startup tecnológica que ayuda a los clubes de fútbol base y aficionado a organizar, planificar y gestionar su actividad deportiva en una plataforma unificada. La cofundé con un compañero de Ingeniería de Telecomunicaciones de la Universidad de Vigo.",
      ),
      t(
        "Sporting directors can define objectives and methodologies, while coaches prepare training sessions, manage players and collaborate with their staff. AI-assisted planning and a visual exercise editor support the day-to-day work on the pitch.",
        "Los directores deportivos definen objetivos y metodologías mientras los entrenadores preparan sesiones, gestionan jugadores y colaboran con su cuerpo técnico. La planificación asistida por IA y el editor visual de ejercicios facilitan el trabajo diario.",
      ),
      t(
        "My involvement spans product vision, technical architecture, hands-on development, UX, pricing and commercial acquisition. Customer feedback shapes the roadmap and the next iteration.",
        "Mi participación abarca la visión de producto, la arquitectura técnica, el desarrollo, la experiencia de usuario, los precios y la captación comercial. El feedback de los clientes guía la hoja de ruta y cada iteración.",
      ),
    ],
    role: t(
      "Co-founder · Development · Product & Business",
      "Cofundador · Desarrollo · Producto y negocio",
    ),
    technologies: [
      "Flutter",
      "Dart",
      "Node.js",
      "Express",
      "MongoDB",
      "TypeScript",
      "Angular",
      "React",
      "Next.js",
      "Stripe",
      "Docker",
      "Nginx",
      "Cloudflare",
      "Git",
    ],
    capabilities: [
      t(
        "AI-assisted training planning",
        "Planificación de entrenamientos asistida por IA",
      ),
      t(
        "Visual exercise editor & libraries",
        "Editor visual y bibliotecas de ejercicios",
      ),
      t(
        "Players, attendance & observations",
        "Jugadores, asistencia y observaciones",
      ),
      t(
        "Match preparation & lineups",
        "Preparación de partidos y alineaciones",
      ),
      t(
        "Club methodology & staff collaboration",
        "Metodología del club y colaboración del cuerpo técnico",
      ),
      t("Calendars, events & notes", "Calendarios, eventos y notas"),
    ],
    presentation: {
      label: t("BUILT TO GET ON THE PITCH", "HECHO PARA SALIR AL CAMPO"),
      title: t("One club.\nOne connected team.", "Un club.\nTodo conectado."),
      note: t(
        "REAL SCREENS · PUBLISHED iOS APP",
        "CAPTURAS REALES · APP iOS PUBLICADA",
      ),
      screens: [
        {
          src: "/images/projects/tufoot/dashboard.webp",
          type: "image",
          alt: t(
            "tuFoot team dashboard in the published iOS app",
            "Panel del equipo en la app publicada de tuFoot para iOS",
          ),
        },
        {
          src: "/images/projects/tufoot/exercise-editor.webp",
          type: "image",
          alt: t(
            "tuFoot visual exercise editor with a football pitch",
            "Editor visual de ejercicios de tuFoot sobre un campo de fútbol",
          ),
        },
        {
          src: "/images/projects/tufoot/ai-planning.webp",
          type: "image",
          alt: t(
            "tuFoot AI-assisted training session planning",
            "Planificación de sesiones asistida por IA en tuFoot",
          ),
        },
      ],
    },
    caseStudy: {
      title: t(
        "From the first idea\nto the App Store.",
        "De la primera idea\na las tiendas de apps.",
      ),
      introduction: t(
        "A startup is more than a codebase. tuFoot brings together the product, engineering and commercial responsibilities I enjoy taking on.",
        "Una startup es mucho más que su código. tuFoot reúne las responsabilidades de producto, ingeniería y negocio que me motiva asumir.",
      ),
      challenge: t(
        "A club’s sporting methodology needs to reach the training pitch. Coaches need practical tools to plan sessions, organize their squads and prepare matches, while staying connected to the club’s objectives.",
        "La metodología deportiva de un club tiene que llegar al campo. Los entrenadores necesitan herramientas prácticas para planificar sesiones, organizar la plantilla y preparar partidos, manteniendo la conexión con los objetivos del club.",
      ),
      contributions: [
        {
          title: t("Shape the product", "Definir el producto"),
          description: t(
            "Connect the needs of sporting directors and coaches to a clear roadmap. Work on product vision, UX and priorities, and use customer feedback to guide the next iteration.",
            "Conectar las necesidades de directores deportivos y entrenadores con una hoja de ruta clara. Trabajar la visión, la experiencia de usuario y las prioridades, e incorporar el feedback de clientes en cada iteración.",
          ),
        },
        {
          title: t("Build across the stack", "Construir de principio a fin"),
          description: t(
            "Contribute to the technical architecture and hands-on development across the mobile app, web and backend — connecting the interface to the systems that make the product work.",
            "Participar en la arquitectura técnica y en el desarrollo de la app móvil, la web y el backend, conectando la interfaz con los sistemas que hacen funcionar el producto.",
          ),
        },
        {
          title: t("Build the business too", "Desarrollar también el negocio"),
          description: t(
            "Take part in pricing, monetization, commercial acquisition and strategic planning. Bring product decisions and business development into the same conversation.",
            "Participar en precios, monetización, captación comercial y planificación estratégica. Hacer que las decisiones de producto y el desarrollo de negocio avancen juntos.",
          ),
        },
      ],
      outcome: t(
        "Built from the ground up and available on the App Store, Google Play and web. A product I co-founded and continue developing across technology, product and business.",
        "Creado desde cero y disponible en App Store, Google Play y web. Un producto que cofundé y que sigo desarrollando desde la tecnología, el producto y el negocio.",
      ),
    },
    gallery: [
      {
        src: "/images/projects/tufoot/exercise-editor.webp",
        type: "image",
        alt: t(
          "Visual exercise editor in tuFoot",
          "Editor visual de ejercicios en tuFoot",
        ),
        caption: t(
          "Design exercises on the pitch.",
          "Diseñar ejercicios sobre el campo.",
        ),
      },
      {
        src: "/images/projects/tufoot/ai-planning.webp",
        type: "image",
        alt: t(
          "AI training planner in tuFoot",
          "Planificador de entrenamientos con IA en tuFoot",
        ),
        caption: t(
          "Turn a training objective into a session.",
          "Del objetivo de entrenamiento a la sesión.",
        ),
      },
      {
        src: "/images/projects/tufoot/training-session.webp",
        type: "image",
        alt: t(
          "Generated training session in tuFoot",
          "Sesión de entrenamiento generada en tuFoot",
        ),
        caption: t(
          "Keep the whole session in one place.",
          "Toda la sesión en un mismo lugar.",
        ),
      },
      {
        src: "/images/projects/tufoot/lineup.webp",
        type: "image",
        alt: t(
          "Team lineup editor in tuFoot",
          "Editor de alineaciones de tuFoot",
        ),
        caption: t(
          "Prepare the team for match day.",
          "Preparar al equipo para el partido.",
        ),
      },
      {
        src: "/images/projects/tufoot/calendar.webp",
        type: "image",
        alt: t("Club calendar in tuFoot", "Calendario del club en tuFoot"),
        caption: t(
          "Training, matches and events, connected.",
          "Entrenamientos, partidos y eventos conectados.",
        ),
      },
    ],
    links: [
      {
        label: t("Visit tuFoot", "Visitar tuFoot"),
        url: "https://tufoot.com",
        type: "website",
      },
      {
        label: t("App Store", "App Store"),
        url: "https://apps.apple.com/us/app/tufootapp/id6783928340?l=fr-FR",
        type: "appstore",
      },
      {
        label: t("Google Play", "Google Play"),
        url: "https://play.google.com/store/apps/details?id=com.tufoot",
        type: "playstore",
      },
    ],
  },
  {
    id: "focum",
    slug: "focum",
    name: "Focum",
    order: 2,
    status: "testing",
    featured: true,
    published: true,
    visual: "focus",
    accentColor: "#c8493f",
    logo: "/images/projects/focum/logo.png",
    category: t(
      "DIGITAL WELLBEING / NONPROFIT",
      "BIENESTAR DIGITAL / SIN ÁNIMO DE LUCRO",
    ),
    headline: t(
      "Less screen time.\nMore real life.",
      "Menos pantalla.\nMás vida real.",
    ),
    shortDescription: t(
      "A quieter relationship with technology. A nonprofit mobile app that puts intention before distraction.",
      "Una relación más tranquila con la tecnología. Una app sin ánimo de lucro que antepone la intención a la distracción.",
    ),
    fullDescription: [
      t(
        "Focum is a nonprofit mobile application currently in testing, designed to help people recover control over their attention. Technology should support a meaningful life rather than constantly compete for it.",
        "Focum es una aplicación móvil sin ánimo de lucro que actualmente está en fase de pruebas, pensada para ayudar a recuperar el control de nuestra atención. La tecnología debería apoyar una vida plena en lugar de competir constantemente por ella.",
      ),
      t(
        "The concept introduces a moment of reflection when someone reaches for their phone: what do you actually want to do? A deliberately minimal interface, with voice input where supported, aims to make intentional usage feel effortless.",
        "El concepto introduce un momento de reflexión al coger el móvil: ¿qué quieres hacer realmente? Una interfaz deliberadamente mínima, con entrada por voz donde sea compatible, busca facilitar un uso consciente.",
      ),
    ],
    role: t("Creator & Developer", "Creador y desarrollador"),
    technologies: ["Flutter", "Dart", "Mobile platform integrations"],
    capabilities: [
      t("Intentional smartphone use", "Uso consciente del móvil"),
      t(
        "Minimal, distraction-free design",
        "Diseño mínimo y sin distracciones",
      ),
      t(
        "Privacy-conscious product principles",
        "Principios de producto que cuidan la privacidad",
      ),
      t("A nonprofit initiative", "Una iniciativa sin ánimo de lucro"),
    ],
    gallery: [],
    links: [],
  },
  {
    id: "thirld-world-invasion",
    slug: "thirld-world-invasion",
    name: "Thirld World Invasion",
    order: 3,
    status: "development",
    featured: true,
    published: true,
    visual: "city",
    accentColor: "#e8a079",
    category: t(
      "INDIE GAME / INTERACTIVE STORYTELLING",
      "VIDEOJUEGO INDIE / NARRATIVA INTERACTIVA",
    ),
    headline: t(
      "Every decision\nchanges the city.",
      "Cada decisión\ncambia la ciudad.",
    ),
    shortDescription: t(
      "An ordinary checkpoint. An extraordinary crisis. An independent game exploring a city on the edge.",
      "Un control fronterizo cotidiano. Una crisis extraordinaria. Un videojuego independiente en una ciudad al límite.",
    ),
    fullDescription: [
      t(
        "Thirld World Invasion is an independent video game in development, set in a city gradually being invaded. The player works in border control, carrying out everyday responsibilities while the environment becomes increasingly unstable.",
        "Thirld World Invasion es un videojuego independiente en desarrollo ambientado en una ciudad que está siendo invadida gradualmente. El jugador trabaja en el control fronterizo y realiza sus tareas diarias mientras el entorno se vuelve cada vez más inestable.",
      ),
      t(
        "The project brings together border-control work, environmental storytelling and an escalating invasion scenario. The ordinary workplace becomes part of a larger unfolding crisis. Visuals on this site are atmospheric concept illustrations, not gameplay.",
        "El proyecto combina el trabajo en un control fronterizo, la narrativa ambiental y una invasión progresiva. El lugar de trabajo cotidiano se convierte en parte de una crisis mayor. Las imágenes de esta web son ilustraciones de concepto, no capturas del juego.",
      ),
    ],
    role: t("Creator & Developer", "Creador y desarrollador"),
    technologies: [],
    capabilities: [
      t(
        "A city facing a gradual invasion",
        "Una ciudad ante una invasión gradual",
      ),
      t("A border-control workplace", "Un puesto de control fronterizo"),
      t("Environmental storytelling", "Narrativa ambiental"),
      t("An evolving atmosphere", "Una atmósfera en transformación"),
    ],
    gallery: [],
    links: [],
  },
  {
    id: "gaming-servers",
    slug: "gaming-servers",
    name: "Early gaming communities",
    order: 4,
    status: "completed",
    featured: false,
    published: true,
    visual: "terminal",
    accentColor: "#84cabd",
    startDate: "2014",
    endDate: "2016",
    highlight: t("10,000+", "10.000+"),
    category: t(
      "GAMING / COMMUNITY / ENTREPRENEURSHIP",
      "GAMING / COMUNIDAD / EMPRENDIMIENTO",
    ),
    headline: t(
      "Building digital worlds\nsince my teens.",
      "Creando mundos digitales\ndesde adolescente.",
    ),
    shortDescription: t(
      "Where it all started. Building and operating gaming servers that reached more than 10,000 users.",
      "Donde empezó todo. Creación y gestión de servidores de videojuegos que superaron los 10.000 usuarios.",
    ),
    fullDescription: [
      t(
        "At approximately fourteen, I was building, operating and growing online gaming servers. More than 10,000 users joined these projects between 2014 and 2016.",
        "Con unos catorce años ya creaba, gestionaba y hacía crecer servidores de videojuegos online. Más de 10.000 usuarios participaron en estos proyectos entre 2014 y 2016.",
      ),
      t(
        "I handled software development, infrastructure configuration, advertising, user acquisition and community management. It was my first real experience of building a product, finding an audience and keeping it running.",
        "Me encargaba del desarrollo, la configuración de infraestructura, la publicidad, la captación de usuarios y la gestión de la comunidad. Fue mi primera experiencia real construyendo un producto, encontrando su público y manteniéndolo en funcionamiento.",
      ),
    ],
    role: t("Creator & Administrator", "Creador y administrador"),
    technologies: [],
    capabilities: [
      t(
        "Server development & infrastructure",
        "Desarrollo de servidores e infraestructura",
      ),
      t("Community management", "Gestión de comunidades"),
      t("Marketing & user acquisition", "Marketing y captación de usuarios"),
      t("Product operations", "Operaciones de producto"),
    ],
    gallery: [],
    links: [],
  },
];
