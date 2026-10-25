import en from "./en.json";
import es from "./es.json";
import { Locale } from "@/types/content";
export const messages = { en, es };
export const getMessages = (locale: Locale) => messages[locale];
