<template>
  <v-container>
    <v-select
      v-model="selectedLanguage"
      :items="languages"
      item-title="label"
      item-value="code"
      label="Select Language"
      variant="solo"
      dense>
      <!-- Слот для отображения выбранного элемента -->
      <template v-slot:selection="{ item }">
        <v-list-item v-if="item">
          <v-list-item-avatar>
            <img :src="item?.flag" alt="Flag" />
          </v-list-item-avatar>
          <v-list-item-title>{{ item?.label }}</v-list-item-title>
        </v-list-item>
      </template>

      <!-- Слот для кастомного отображения элементов списка -->
      <template v-slot:item="{ item }">
        <v-list-item>
          <v-list-item-avatar>
            <img :src="item?.flag" alt="Flag" />
          </v-list-item-avatar>
          <v-list-item-title>{{ item?.label }}</v-list-item-title>
        </v-list-item>
      </template>
    </v-select>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Тип языка
interface Language {
  code: string;
  label: string;
  flag: string;
}

// Список языков
const languages: Language[] = [
  { code: 'en', label: 'English', flag: 'https://flagcdn.com/w40/gb.png' },
  { code: 'ru', label: 'Russian', flag: 'https://flagcdn.com/w40/ru.png' },
  { code: 'fr', label: 'French', flag: 'https://flagcdn.com/w40/fr.png' },
];

// Выбранный язык
const selectedLanguage = ref<string | null>(null);
</script>

<style scoped>
.v-list-item-avatar img {
  width: 24px;
  height: 24px;
  object-fit: cover;
  border-radius: 50%;
}
</style>
