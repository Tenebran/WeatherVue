import { ref } from 'vue';
import { fetchCurrentWeather, fetchForecast } from '../api/api';

type WeatherData = {
  dt_txt: string;
  main: {
    temp: number;
  };
};

type ApiResponse = {
  list: WeatherData[];
};

type ForecastDay = {
  date: string;
  tempMin: number;
  tempMax: number;
};

export const useCurrentWeather = () => {
  const currentWeather = ref();
  const error = ref();

  const getCurrentWeather = async (city: string, lang: string) => {
    try {
      const response = await fetchCurrentWeather(city, lang);
      currentWeather.value = response.data;
    } catch (err) {
      error.value = err;
    }
  };

  return {
    getCurrentWeather,
    currentWeather,
    error,
  };
};

export function useForecast() {
  const forecast = ref<ForecastDay[]>([]);
  const error = ref<string | null>(null);

  const getForecast = async (city: string, lang: string): Promise<void> => {
    try {
      const response = (await fetchForecast(city, lang)) as { data: ApiResponse };
      const forecastList = response.data.list;

      const groupedData = forecastList.reduce<Record<string, number[]>>((acc, item) => {
        const date = item.dt_txt.split(' ')[0];
        if (!acc[date]) acc[date] = [];
        acc[date].push(item.main.temp);
        return acc;
      }, {});

      forecast.value = Object.entries(groupedData).map(([date, temps]) => ({
        date,
        tempMin: Math.min(...temps),
        tempMax: Math.max(...temps),
      }));
    } catch (err: any) {
      error.value = err.response ? err.response.data.message : 'Ошибка запроса';
    }
  };

  return {
    forecast,
    error,
    getForecast,
  };
}
