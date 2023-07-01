import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";

const resources = {
  en: {
    translations: en,
  },
};

i18n.use(initReactI18next).init({
  resources,

  fallbackLng: "en",
  debug: process.env.NODE_ENV === "development",

  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",

  // allow keys to be phrases having `:`, `.`
  nsSeparator: false,

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
