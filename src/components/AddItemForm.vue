<template>
  <v-responsive class="weather_textfield" max-width="344">
    <v-text-field
      label="City"
      variant="solo"
      :append-inner-icon="localCity.length > 0 ? 'mdi-magnify' : ''"
      :error="errorMessage.length > 1"
      :error-messages="errorMessage"
      v-model="localCity"
      @click:append-inner="getWeather"
      @keydown.enter="getWeather"></v-text-field>
    <Select />
  </v-responsive>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Select from './Select.vue';

const props = defineProps<{
  city: string;
  errorMessage: string;
  getWeather: () => void;
}>();

const emit = defineEmits(['update:city']);

const localCity = ref(props.city);

watch(localCity, (newValue) => {
  emit('update:city', newValue);
});
</script>

<style scoped lang="scss">
.weather_textfield {
  width: 80vw;
  min-width: 30vw;
}
</style>
