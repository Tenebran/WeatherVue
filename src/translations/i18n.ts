import { createI18n } from 'vue-i18n';

import en from './en/en.json';
import ru from './ru/ru.json';
import de from './de/de.json';
import ch from './ch/ch.json';
import kr from './kr/kr.json';
import fr from './fr/fr.json';
import jp from './jp/jp.json';
import nl from './nl/nl.json';
import se from './se/se.json';
import es from './es/es.json';
import it from './it/it.json';
import pl from './pl/pl.json';
import tr from './tr/tr.json';
import ae from './ae/ae.json';
import pt from './pt/pt.json';

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    ru,
    de,
    ch,
    kr,
    fr,
    jp,
    nl,
    se,
    es,
    it,
    pl,
    tr,
    ae,
    pt,
  },
});

export default i18n;
