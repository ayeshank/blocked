import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './locales/en.json';
import ur from './locales/ur.json';
import tur from './locales/tur.json';
import fr from './locales/fr.json';
import spa from './locales/spa.json';
import chi from './locales/chi.json';
import hin from './locales/hin.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {translation: en},
    ur: {translation: ur},
    tur: {translation: tur},
    fr: {translation: fr},
    spa: {translation: spa},
    chi: {translation: chi},
    hin: {translation: hin},
    // Add more languages and their translation files here
  },
  lng: 'en', // Default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
