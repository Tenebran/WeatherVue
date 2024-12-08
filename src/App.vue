<script lang="ts">
import { defineComponent, Ref, ref, watch } from 'vue';
import axios from 'axios';

export type userData = { name: string; email: string; password: string; id: string };

export default defineComponent({
  setup() {
    const city = ref(localStorage.getItem('city') || '');
    let errorMessage: Ref<string, string> = ref('');
    let weather = ref();

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
      } else {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&units=metric&appid=552fdd050682d4246694f7af40e8d829`
          )
          .then((resp) => {
            weather.value = resp.data;
            console.log('Response:', resp);
            console.log('Response Data:', resp.data);
            console.log('Response Data:', resp.data);
            console.log('weather:', weather.value);
          })
          .catch((erorr) => console.log('erorr', erorr));
      }
    };

    const handleSearch = () => {
      console.log(`Searching weather for:`);
      weather;
    };

    return {
      city,
      errorMessage,
      handleSearch,
      getWeather,
      weather,
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
      </v-responsive>

      <v-card class="mx-auto weather_card" v-if="weather">
        <v-card-item :title="weather.name">
          <template v-slot:subtitle>
            {{ weather.weather[0].description }}
            <div>{{ Math.floor(weather.main.temp) }}&deg;C</div>
            <div>Ощущаеться как: {{ Math.floor(weather.main.feels_like) }}&deg;C</div>
          </template>
        </v-card-item>

        <v-card-text class="py-0">
          <v-row align="center" no-gutters>
            <v-col class="text-right" cols="5"> </v-col>
          </v-row>
          <v-row align="center" no-gutters>
            <v-icon size="88" class="weather_icon">
              <img
                class="me-1 pb-1"
                :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`"
                alt="Weather Icon"
                style="width: 88px; height: 88px"
            /></v-icon>
          </v-row>
        </v-card-text>

        <div class="d-flex py-3 justify-space-between">
          <v-list-item density="compact" prepend-icon="mdi-weather-windy">
            <v-list-item-subtitle>{{ Math.floor(weather.wind.speed) }} м/с</v-list-item-subtitle>
          </v-list-item>

          <v-list-item density="compact" prepend-icon="mdi-weather-pouring">
            <v-list-item-subtitle>{{ weather.main.humidity }}%</v-list-item-subtitle>
          </v-list-item>
        </div>

        <v-expand-transition>
          <div v-if="expand">
            <div class="py-2">
              <v-slider
                v-model="time"
                :max="6"
                :step="1"
                :ticks="labels"
                class="mx-4"
                color="primary"
                density="compact"
                show-ticks="always"
                thumb-size="10"
                hide-details></v-slider>
            </div>

            <v-list class="bg-transparent">
              <v-list-item
                class="weather_card"
                v-for="item in forecast"
                :key="item.day"
                :append-icon="item.icon"
                :subtitle="item.temp"
                :title="item.day">
              </v-list-item>
            </v-list>
          </div>
        </v-expand-transition>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn></v-btn>
        </v-card-actions>
      </v-card> </v-card
  ></v-container>
</template>

<style lang="scss" scoped>
.weather {
  &_wrapper {
    box-sizing: border-box;
    margin: 0;
    min-height: 500px;
    min-width: 40vw;
    padding: 20px 0;
    border-radius: 20px;
    background: vars.$vue-blue;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  &_card {
    background: transparent;
    display: flex;
    flex-wrap: wrap;
  }
  &_font {
    color: vars.$vue-green;
    &_subtitle {
      color: vars.$vue-green;
      font-weight: 900;
      font-size: 18px;
      display: flex;
      width: 100%;
      justify-content: center;
      flex-wrap: wrap;
    }
  }

  &_icon {
    background-color: vars.$vue-green;
    border-radius: 50%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &_textfield {
    width: 30vw;
    min-width: 30vw;
  }
  &_body {
    margin: 0 40px;
  }
}

.container {
  height: 100%;
}
</style>
