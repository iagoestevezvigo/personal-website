import { projects } from "@/data/projects";
import { experiences } from "@/data/experience";
// Repository boundary: replace these functions with a CMS adapter when needed.
export const getProjects = () =>
  projects.filter((p) => p.published).sort((a, b) => a.order - b.order);
export const getProject = (slug: string) =>
  getProjects().find((p) => p.slug === slug);
export const getExperiences = () =>
  [...experiences].sort((a, b) => a.order - b.order);
