import 'react-i18next';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      en: typeof import('./src/translations/en/en.json');
      ru: typeof import('./src/translations/ru/ru.json');
      de: typeof import('./src/translations/de/de.json');
      zh: typeof import('./src/translations/ch/ch.json');
      ko: typeof import('./src/translations/kr/kr.json');
      fr: typeof import('./src/translations/fr/fr.json');
      ja: typeof import('./src/translations/jp/jp.json');
      nl: typeof import('./src/translations/nl/nl.json');
      sv: typeof import('./src/translations/se/se.json');
      es: typeof import('./src/translations/es/es.json');
      it: typeof import('./src/translations/it/it.json');
      pl: typeof import('./src/translations/pl/pl.json');
      tr: typeof import('./src/translations/tr/tr.json');
      ar: typeof import('./src/translations/ae/ae.json');
      pt: typeof import('./src/translations/pt/pt.json');
    };
  }
}
