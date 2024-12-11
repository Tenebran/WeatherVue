<template>
  <v-menu open-on-click>
    <template v-slot:activator="{ props }" v-if="currentLanguage">
      <v-btn v-bind="props" variant="outlined" class="select_btn">
        <img :src="currentLanguage.flag" alt="Flag" class="select_flag" />
        {{ currentLanguage.code }}
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="language in languages"
        :key="language.code"
        @click="changeLanguage(language)">
        <v-list-item-avatar>
          <img class="select_logo" :src="language.flag" alt="Flag" />
        </v-list-item-avatar>
        <v-list-item-title class="select_logo_title">
          {{ language.label }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { ref, computed, Ref } from 'vue';
import RuFlag from '../img/flag/flag-ru.svg';
import EnFlag from '../img/flag/flag-united-kingdom-flag.svg';
import ARFlag from '../img/flag/flag-for-flag-united-arab-emirates.svg';
import DEFlag from '../img/flag/flag-de.svg';
import ESFlag from '../img/flag/flag-for-flag-spain.svg';
import ITFlag from '../img/flag/flag-for-flag-italy.svg';
import FRFlag from '../img/flag/flag-for-flag-france.svg';
import ZHFlag from '../img/flag/flag-for-flag-china.svg';
import KOFlag from '../img/flag/flag-kp.svg';
import PLFlag from '../img/flag/flag-for-flag-poland.svg';
import NLFlag from '../img/flag/flag-for-flag-netherlands.svg';
import SVFlag from '../img/flag/flag-for-flag-sweden.svg';
import TRFlag from '../img/flag/flag-turkey.svg';
import PTFlag from '../img/flag/flag-portugal.svg';
import JAFlag from '../img/flag/flag-for-japan.svg';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  getWeather: () => void;
}>();

type LanguagesType = { code: string; flag: string; label: string };

const { t, locale } = useI18n();

const currentLanguage: Ref<LanguagesType | null> = ref(null);

const languages = computed<LanguagesType[]>(() =>
  [
    { code: 'en', flag: EnFlag },
    { code: 'ru', flag: RuFlag },
    { code: 'de', flag: DEFlag },
    { code: 'zh', flag: ZHFlag },
    { code: 'ko', flag: KOFlag },
    { code: 'fr', flag: FRFlag },
    { code: 'ja', flag: JAFlag },
    { code: 'nl', flag: NLFlag },
    { code: 'sv', flag: SVFlag },
    { code: 'es', flag: ESFlag },
    { code: 'it', flag: ITFlag },
    { code: 'pl', flag: PLFlag },
    { code: 'tr', flag: TRFlag },
    { code: 'ar', flag: ARFlag },
    { code: 'pt', flag: PTFlag },
  ].map((language) => ({
    ...language,
    label: t(`languageSelector.${language.code}`),
  }))
);

currentLanguage.value =
  languages.value.find((lang) => lang.code === localStorage.getItem('lang')) || languages.value[0];
locale.value = currentLanguage.value.code;

const changeLanguage = (lang: LanguagesType) => {
  locale.value = lang.code;
  localStorage.setItem('lang', lang.code);
  currentLanguage.value = lang;
  props.getWeather();
};
</script>

<style scoped lang="scss">
.select {
  &_btn {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  &_flag {
    width: 24px;
    height: 24px;
    margin: 0 10px 0 0;
  }
  &_logo {
    width: 24px;
    height: 24px;
    margin: 0 10px 0 0;
    display: inline;
    &_title {
      display: inline-block;
    }
  }
}

.parent-container {
  overflow: visible !important;
}
</style>
