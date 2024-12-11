import { createI18n } from 'vue-i18n';

import en from './en/en.json';
import ru from './ru/ru.json';
import de from './de/de.json';
import zh from './zh/zh.json';
import ko from './ko/ko.json';
import fr from './fr/fr.json';
import ja from './ja/ja.json';
import nl from './nl/nl.json';
import sv from './sv/sv.json';
import es from './es/es.json';
import it from './it/it.json';
import pl from './pl/pl.json';
import tr from './tr/tr.json';
import ar from './ar/ar.json';
import pt from './pt/pt.json';

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    ru,
    de,
    zh,
    ko,
    fr,
    ja,
    nl,
    sv,
    es,
    it,
    pl,
    tr,
    ar,
    pt,
  },
});

export default i18n;
