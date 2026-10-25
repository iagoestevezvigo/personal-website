import { text as t } from "@/types/content";
export const education = [
  {
    institution: "University of Vigo",
    place: t("Vigo, Spain", "Vigo, España"),
    degree: t(
      "BSc in Telecommunications Engineering",
      "Grado en Ingeniería de Telecomunicaciones",
    ),
    description: t(
      "Telematics, network communications, cybersecurity, service design and software engineering.",
      "Telemática, comunicaciones de red, ciberseguridad, diseño de servicios e ingeniería de software.",
    ),
  },
  {
    institution: "KU Leuven",
    place: t("Leuven, Belgium", "Lovaina, Bélgica"),
    degree: t("Erasmus Academic Exchange", "Intercambio académico Erasmus"),
    description: t(
      "An international perspective. Learning and collaborating in a different academic environment.",
      "Una perspectiva internacional. Aprender y colaborar en un entorno académico diferente.",
    ),
  },
];
export const languages = [
  t("Spanish · Native", "Español · Nativo"),
  t("Galician · Native", "Gallego · Nativo"),
  t("English · Advanced", "Inglés · Avanzado"),
  t("Portuguese · Intermediate", "Portugués · Intermedio"),
  t("French · Intermediate", "Francés · Intermedio"),
];
export const volunteering = t(
  "Beyond technology: elderly care volunteering with the Little Sisters of the Poor, and animal shelter volunteering.",
  "Más allá de la tecnología: voluntariado con las Hermanitas de los Pobres en el cuidado de mayores y en una protectora de animales.",
);
