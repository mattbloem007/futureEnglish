import i18n from 'i18next';
import translations from './translations';

i18n.init({
  resources: translations,
  fallbackLng: 'US',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
