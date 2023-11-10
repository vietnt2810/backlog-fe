import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import adminEn from "@/i18n/admins/en.json";
import adminJa from "@/i18n/admins/ja.json";
import authEn from "@/i18n/auth/en.json";
import authJa from "@/i18n/auth/ja.json";
import commonEn from "@/i18n/common/en.json";
import commonJa from "@/i18n/common/ja.json";
import headerEn from "@/i18n/header/en.json";
import headerJa from "@/i18n/header/ja.json";

declare module "i18next" {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

i18next.use(initReactI18next).init({
  resources: {
    en: {
      auth: authEn,
      admin: adminEn,
      common: commonEn,
      header: headerEn,
    },
    ja: {
      auth: authJa,
      admin: adminJa,
      common: commonJa,
      header: headerJa,
    },
  },
  ns: [
    "auth",
    "admin",
    "master",
    "message",
    "common",
    "header",
    "company",
    "item",
    "proposal",
  ],
  defaultNS: "common",
  fallbackNS: "common",
  supportedLngs: ["en", "ja"],
  fallbackLng: "ja",
  react: { useSuspense: false },
  returnNull: false,
});

export const useI18next = () => i18next;
