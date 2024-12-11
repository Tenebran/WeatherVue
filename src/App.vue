<script lang="ts" setup>
import { Ref, ref } from 'vue';
import { useCurrentWeather, useForecast } from './hooks/useCurrentWeather';
import AddItemForm from './components/AddItemForm.vue';
import WeatherCurrentDayCard from './components/WeatherCurrentDayCard.vue';
import WeatherForecast from './components/WeatherForecast.vue';
import { useI18n } from 'vue-i18n';
export type userData = { name: string; email: string; password: string; id: string };

const { t } = useI18n();
const city = ref(localStorage.getItem('city') || '');
const errorMessage: Ref<string, string> = ref('');
const networkError = ref();
const { currentWeather, getCurrentWeather } = useCurrentWeather();
const { forecast, getForecast } = useForecast();
const isLoading = ref(false);

const getWeather = () => {
  isLoading.value = true;
  if (city.value.trim().length < 2) {
    errorMessage.value = t('error.long');
    isLoading.value = false;
  } else {
    getCurrentWeather(city.value, localStorage.getItem('lang') ?? 'en')
      .then(() => {
        getForecast(city.value, localStorage.getItem('lang') ?? 'en');
        localStorage.setItem('city', city.value);
      })
      .finally(() => (isLoading.value = false))
      .catch((err) => {
        const axiosError = err._value || err.value || err;

        networkError.value = axiosError.response?.data?.message || t('error.some');
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
        <span class="weather_font">{{ t('WeatherVue.Title') }}</span>
      </template>
      <template v-slot:subtitle>
        <span>{{ t('WeatherVue.Subtitle') }}</span>
      </template>
      <span class="weather_font_subtitle"> {{ city ? city : t('WeatherVue.youcity') }}</span>
      <AddItemForm v-model:city="city" :errorMessage="errorMessage" :getWeather="getWeather" />

      <div v-if="isLoading" class="d-flex justify-center loading-spinner">
        <v-progress-circular indeterminate color="primary" size="48"></v-progress-circular>
      </div>
      <WeatherCurrentDayCard :currentWeather="currentWeather" :isLoading="isLoading" />
      <WeatherForecast :forecast="forecast" :isLoading="isLoading" /> </v-card
  ></v-container>

  <div>
    <v-snackbar color="error" v-model="networkError" v-if="!!networkError" multi-line>
      {{ networkError }}
      <template v-slot:actions>
        <v-btn variant="text" @click="networkError = ''">{{ t('error.button') }}</v-btn>
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
      margin-bottom: 10px;
      margin-top: -10px;
    }
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
