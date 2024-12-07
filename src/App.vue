<script lang="ts">
import { v1 } from 'uuid';
import { defineComponent, Ref, ref, watch } from 'vue';
import User from './components/User.vue';

export type userData = { name: string; email: string; password: string; id: string };

export default defineComponent({
  setup() {
    const city = ref(localStorage.getItem('city') || '');
    let errorMessage: Ref<string, string> = ref('');

    watch(
      city,
      (newValue: string) => {
        localStorage.setItem('city', newValue);
        newValue.length >= 2 ? (errorMessage.value = '') : '';
      },
      { immediate: true }
    );

    const getWeather = () => {
      if (city.value.trim().length < 2) {
        errorMessage.value = 'The name must be at least 2 characters long.';
        console.log('hello', errorMessage);
      }
    };

    const handleSearch = () => {
      console.log(`Searching weather for:`);
    };

    return {
      city,
      errorMessage,
      handleSearch,
      getWeather,
    };
  },
});
</script>

<template>
  <v-container class="fill-height d-flex justify-center align-center no-gutters" fluid>
    <v-card
      class="weather_wrapper"
      prepend-icon="$vuetify"
      prepend-icon-color="primary"
      theme="dark"
      width="100%">
      <template v-slot:title>
        <span class="weather_font">Welcome to WeatherVue</span>
      </template>
      <template v-slot:subtitle>
        <span
          >Discover the current weather in
          <span class="weather_font_subtitle"> {{ city ? city : 'you City' }}</span></span
        >
      </template>

      <v-responsive class="mx-auto weather_textfield" max-width="344">
        <v-text-field
          label="City"
          variant="solo"
          :append-inner-icon="city.length > 0 ? 'mdi-magnify' : ''"
          :error="errorMessage.length > 1"
          :error-messages="errorMessage"
          v-model="city"
          :disabled::append-inner="city.length <= 0"
          @click:append-inner="getWeather"></v-text-field>
      </v-responsive> </v-card
  ></v-container>
</template>

<style lang="scss" scoped>
.weather {
  &_wrapper {
    box-sizing: border-box;
    margin: 0;
    height: 500px;
    min-width: 50vw;
    padding: 20px 0;
    border-radius: 20px;
    background: vars.$vue-blue;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &_font {
    color: vars.$vue-green;
    &_subtitle {
      color: vars.$vue-green;
      font-weight: 900;
      font-size: 18px;
      display: block;
      display: flex;
      width: 100%;
      justify-content: center;
    }
  }
  &_textfield {
    width: 30vw;
  }
  &_body {
    margin: 0 40px;
  }
}

.container {
  height: 100%;
}
</style>
