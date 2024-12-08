<template>
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
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { ForecastDay } from '../hooks/useCurrentWeather';

defineProps<{
  forecast: ForecastDay[];
  isLoading: boolean;
}>();
</script>

<style scoped lang="scss">
.weather {
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
}
</style>
