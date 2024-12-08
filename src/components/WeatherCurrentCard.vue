<template>
  <v-card class="mx-auto weather_card" v-if="currentWeather && !isLoading">
    <v-card-item :title="currentWeather.cityName">
      <template v-slot:subtitle>
        {{ currentWeather.description }}
        <div>{{ currentWeather.temp }}</div>
        <div>Ощущаеться как: {{ currentWeather.feels_like }}</div>
      </template>
    </v-card-item>

    <v-card-text class="py-0">
      <v-row align="center" no-gutters>
        <v-col class="text-right" cols="5"> </v-col>
      </v-row>
    </v-card-text>

    <v-row align="center" no-gutters>
      <v-icon size="124" class="weather_icon">
        <img
          class="me-1 pb-1"
          :src="`${currentWeather.icon}`"
          alt="Weather Icon"
          style="width: 124px; height: 124px"
      /></v-icon>
    </v-row>

    <div class="d-flex py-3 justify-space-between">
      <v-list-item density="compact" prepend-icon="mdi-weather-windy">
        <v-list-item-subtitle
          >{{ Math.floor(currentWeather.speed) }} м/с, {{ currentWeather.direction }}
          <v-icon
            icon="mdi-navigation"
            :style="{ transform: `rotate(${currentWeather.deg}deg)` }"
            size="12">
          </v-icon
        ></v-list-item-subtitle>
      </v-list-item>

      <v-list-item density="compact" prepend-icon="mdi-weather-pouring">
        <v-list-item-subtitle>{{ currentWeather.humidity }}</v-list-item-subtitle>
      </v-list-item>

      <v-list-item density="compact" prepend-icon="mdi-gauge">
        <v-list-item-subtitle>{{ currentWeather.pressure }} мм рт. ст.</v-list-item-subtitle>
      </v-list-item>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { CurrentWeatherType } from '../hooks/useCurrentWeather';

defineProps<{
  currentWeather: CurrentWeatherType;
  isLoading: boolean;
}>();
</script>

<style scoped></style>
