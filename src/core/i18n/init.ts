import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import translationEN from "./resources/en.json"
import translationVN from "./resources/vn.json"
import { LOCAL_STORAGE_KEY } from "shared"

const DEFAULT_LANGUAGE = "vn"

const resources = {
  en: {
    translation: translationEN,
  },
  vn: {
    translation: translationVN,
  },
}

export const i18nInstance = i18n.use(initReactI18next)

export const init = () => {
  const defaultLanguage = localStorage.getItem(LOCAL_STORAGE_KEY.LANGUAGE)
  if (!defaultLanguage) {
    localStorage.setItem(LOCAL_STORAGE_KEY.LANGUAGE, DEFAULT_LANGUAGE)
  }

  i18nInstance.init({
    resources,
    lng: defaultLanguage || DEFAULT_LANGUAGE,

    keySeparator: false,

    interpolation: {
      escapeValue: false,
    },
  })
}
