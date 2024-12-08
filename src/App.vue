<script lang="ts" setup>
import { Ref, ref } from 'vue';
import { useCurrentWeather, useForecast } from './hooks/useCurrentWeather';
import AddItemForm from './components/AddItemForm.vue';
import WeatherCurrentCard from './components/WeatherCurrentCard.vue';
export type userData = { name: string; email: string; password: string; id: string };

const city = ref(localStorage.getItem('city') || '');
const errorMessage: Ref<string, string> = ref('');
const networkError = ref();
const { currentWeather, getCurrentWeather } = useCurrentWeather();
const { forecast, getForecast } = useForecast();
const isLoading = ref(false);

const getWeather = () => {
  isLoading.value = true;
  if (city.value.trim().length < 2) {
    errorMessage.value = 'The name must be at least 2 characters long.';
    isLoading.value = false;
  } else {
    getCurrentWeather(city.value, 'ru')
      .then(() => {
        getForecast(city.value, 'ru');
        localStorage.setItem('city', city.value);
      })
      .finally(() => (isLoading.value = false))
      .catch((err) => {
        const axiosError = err._value || err.value || err;

        networkError.value = axiosError.response?.data?.message || 'An unknown error occurred';
      });
  }
};

city.value && getWeather();
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
      <AddItemForm v-model:city="city" :errorMessage="errorMessage" :getWeather="getWeather" />
      <div v-if="isLoading" class="d-flex justify-center loading-spinner">
        <v-progress-circular indeterminate color="primary" size="48"></v-progress-circular>
      </div>
      <WeatherCurrentCard :currentWeather="currentWeather" :isLoading="isLoading" />
      <v-card class="py-2 mx-auto weather_card_forecast" v-if="!isLoading">
        <div>
          <v-list class="bg-transparent weather_card">
            <v-list-item
              class="weather_card_item"
              v-for="item in forecast"
              :key="item.day"
              :append-icon="item.icon"
              :subtitle="item.temp"
              :title="item.day">
            </v-list-item>
          </v-list>
        </div> </v-card></v-card
  ></v-container>

  <div>
    <v-snackbar color="error" v-model="networkError" v-if="!!networkError" multi-line>
      {{ networkError }}
      <template v-slot:actions>
        <v-btn variant="text" @click="networkError = ''"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<style lang="scss" scoped>
.weather {
  &_wrapper {
    box-sizing: border-box;
    margin: 0;
    min-height: 60vh;
    min-width: 80vw;
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
    box-shadow: none;
    overflow: hidden;

    &_item {
      width: 50%;
    }
    &_forecast {
      background: transparent;
      display: flex;
      flex-direction: column;
      justify-content: center;
      box-shadow: none;
    }
  }
  &_cardFor {
    background: transparent;
    display: flex;
    flex-wrap: wrap;
  }
  &_font {
    color: vars.$vue-green;
    align-items: center;
    display: flex;
    justify-content: center;

    &_subtitle {
      color: vars.$vue-green;
      font-weight: 900;
      font-size: 18px;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      align-items: center;
    }
  }

  &_icon {
    background-color: vars.$vue-green;
    border-radius: 50%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
  }

  &_body {
    margin: 0 40px;
  }
}
.v-card-subtitle {
  align-items: center;
  display: flex;
  justify-content: center;
}
.container {
  height: 100%;
}

.loading-spinner {
  height: 30vh;
}

@media (max-width: 567px) {
  .weather {
    &_wrapper {
      min-height: 70vh;
      display: flex;
      justify-content: flex-end;
    }

    &_card {
      &_item {
        margin: 4px 0;
        width: 100%;
      }
    }
    &_font {
      &_subtitle {
        min-width: 90vw;
      }
    }
  }
}
</style>
