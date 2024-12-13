<template>
  <v-responsive class="weather_textfield" max-width="344">
    <v-text-field
      :label="t('WeatherVue.youcity')"
      variant="solo"
      :append-inner-icon="localCity.length > 0 ? 'mdi-magnify' : ''"
      :error="localCity.length < 2 && errorMessage.length > 1"
      :error-messages="localCity.length > 2 ? '' : errorMessage"
      v-model="localCity"
      @click:append-inner="getWeather"
      @keydown.enter="getWeather"></v-text-field>
    <Select :getWeather="getWeather" :city="city" />
  </v-responsive>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Select from './Select.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
  city: string;
  errorMessage: string;
  getWeather: () => void;
}>();

const emit = defineEmits(['update:city', 'update:errorMessage']);

const localCity = ref(props.city);

watch(localCity, (newValue) => {
  emit('update:city', newValue);
  emit('update:errorMessage', '');
});
</script>

<style scoped lang="scss">
.weather_textfield {
  width: 80vw;
  min-width: 30vw;
}
</style>
