<template>
  <v-menu open-on-click open-on-hover>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" variant="outlined" class="language-btn">
        <img :src="currentLanguage.flag" alt="Flag" class="language-flag" />
        {{ currentLanguage.label }}
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="language in languages"
        :key="language.code"
        @click="setLanguage(language)">
        <v-list-item-avatar>
          <img :src="language.flag" alt="Flag" />
        </v-list-item-avatar>
        <v-list-item-title>{{ language.label }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
import { ref } from 'vue';

const languages = [
  { code: 'en', label: 'English', flag: '/flags/gb.svg' },
  { code: 'ru', label: 'Russian', flag: '/flags/ru.svg' },
  { code: 'de', label: 'Deutsch', flag: '/flags/de.svg' },
  { code: 'cn', label: '中文', flag: '/flags/cn.svg' },
  { code: 'kr', label: '한국어', flag: '/flags/kr.svg' },
  { code: 'fr', label: 'Français', flag: '/flags/fr.svg' },
  { code: 'jp', label: '日本語', flag: '/flags/jp.svg' },
  { code: 'nl', label: 'Nederlands', flag: '/flags/nl.svg' },
  { code: 'se', label: 'Svenska', flag: '/flags/se.svg' },
  { code: 'es', label: 'Español', flag: '/flags/es.svg' },
  { code: 'it', label: 'Italiano', flag: '/flags/it.svg' },
  { code: 'pl', label: 'Polski', flag: '/flags/pl.svg' },
  { code: 'tr', label: 'Türkçe', flag: '/flags/tr.svg' },
  { code: 'ae', label: 'العربية', flag: '/flags/ae.svg' },
  { code: 'pt', label: 'Português', flag: '/flags/pt.svg' },
];

const currentLanguage = ref(languages[0]);

const setLanguage = (language) => {
  currentLanguage.value = language;
  console.log('Selected language:', language.code);
};
</script>

<style scoped>
.language-btn {
  display: flex;
  align-items: center;
  gap: 8px;
}
.language-flag {
  width: 20px;
  height: 14px;
}

.parent-container {
  overflow: visible !important;
}
</style>
