import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './locales/en.json';
import ur from './locales/ur.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {translation: en},
    ur: {translation: ur},
    // Add more languages and their translation files here
  },
  lng: 'en', // Default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
