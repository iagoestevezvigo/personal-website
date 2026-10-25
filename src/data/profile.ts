import { text } from "@/types/content";
export const profile = {
  name: "Iago Estévez",
  fullName: "Iago Estévez Núñez",
  initials: "ie",
  email: "iagoestevez1025@gmail.com",
  linkedin: "https://www.linkedin.com/in/iago-estevez-nunez",
  portrait: null as string | null,
  location: text(
    "Spain · Working globally",
    "España · Trabajando para el mundo",
  ),
  biography: [
    text(
      "Engineer by education. Product builder by nature. Entrepreneur by ambition.",
      "Ingeniero de formación. Creador de productos por naturaleza. Emprendedor por ambición.",
    ),
    text(
      "I’m a Telecommunications Engineer from the University of Vigo. My work lives at the intersection of software, product strategy and business — turning complex challenges into things people actually use.",
      "Soy ingeniero de Telecomunicaciones por la Universidad de Vigo. Trabajo en la intersección del software, la estrategia de producto y el negocio: transformo retos complejos en soluciones que las personas utilizan.",
    ),
    text(
      "From automotive technology in international teams to co-founding a sports startup, I’m most at home in 0-to-1 environments: asking the right questions, taking ownership and building what comes next.",
      "Desde la tecnología de automoción en equipos internacionales hasta cofundar una startup deportiva, me siento en mi elemento creando desde cero: haciendo las preguntas adecuadas, asumiendo la responsabilidad y construyendo el siguiente paso.",
    ),
  ],
  metrics: [
    {
      value: "0 → 1",
      label: text("Ideas into real products", "De ideas a productos reales"),
    },
    {
      value: "€100K+",
      label: text("Annual revenue milestone¹", "Hito de ingresos anuales¹"),
    },
    {
      value: "10,000+",
      label: text(
        "Early gaming project users",
        "Usuarios en proyectos de gaming",
      ),
    },
    {
      value: "8",
      label: text(
        "People in a cross-functional team",
        "Personas en un equipo multidisciplinar",
      ),
    },
  ],
  revenueNote: text(
    "¹ Milestone reached by a product I helped lead; not attributed to tuFoot.",
    "¹ Hito alcanzado por un producto que ayudé a liderar; no se atribuye a tuFoot.",
  ),
};
