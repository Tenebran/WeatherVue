import { Ref, ref } from 'vue';
import { fetchCurrentWeather, fetchForecast } from '../api/api';
import { getWindDirection } from '../utils/getWindDirection';
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';
import { getWeatherIcon } from '../utils/getWeatherIcon';

export type ForecastDay = {
  day: string;
  icon: string;
  temp: string;
};

export type ApiResponse = {
  list: Array<{
    dt_txt: string;
    main: {
      temp: number;
    };
    weather: Array<{
      icon: string;
    }>;
  }>;
};

export type CurrentWeatherType = {
  description: string;
  temp: string;
  feels_like: string;
  icon: string;
  speed: number;
  cityName: string;
  humidity: string;
  direction: string;
  deg: number;
  pressure: string;
};

export const useCurrentWeather = () => {
  const currentWeather: Ref<CurrentWeatherType> = ref({
    description: '',
    temp: '',
    feels_like: '',
    icon: '',
    speed: 0,
    cityName: '',
    humidity: '',
    direction: '',
    deg: 0,
    pressure: '',
  });
  const error = ref();

  const getCurrentWeather = async (city: string, lang: string) => {
    try {
      const response = await fetchCurrentWeather(city, lang);
      currentWeather.value = {
        description: response.data.weather[0].description,
        temp: `${response.data.main.temp > 0 ? '+' : ''}${Math.floor(response.data.main.temp)}°C`,
        feels_like: `${Math.floor(response.data.main.feels_like)}°C`,
        icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`,
        speed: Math.floor(response.data.wind.speed),
        cityName: response.data.name,
        humidity: `${response.data.main.humidity}%`,
        direction: getWindDirection(response.data.wind.deg),
        deg: response.data.wind.deg,
        pressure: (response.data.main.pressure * 0.75006).toFixed(2),
      };
    } catch (err) {
      error.value = err;
      throw error;
    }
  };

  return {
    getCurrentWeather,
    currentWeather,
    error,
  };
};

export const useForecast = () => {
  const forecast = ref<ForecastDay[]>([]);
  const error = ref<string | null>(null);

  const getForecast = async (city: string, lang: string): Promise<void> => {
    try {
      const response = (await fetchForecast(city, lang)) as { data: ApiResponse };
      const forecastList = response.data.list;

      const groupedData = forecastList.reduce<Record<string, { temps: number[]; icon: string }>>(
        (acc, item) => {
          const date = item.dt_txt.split(' ')[0];
          if (!acc[date]) acc[date] = { temps: [], icon: item.weather[0].icon };
          acc[date].temps.push(item.main.temp);
          return acc;
        },
        {}
      );

      forecast.value = Object.entries(groupedData).map(([date, { temps, icon }]) => {
        const day = new Date(date).toLocaleDateString(lang, { weekday: 'long' });
        const formattedDay = capitalizeFirstLetter(day);
        const tempMin = Math.min(...temps);
        const tempMax = Math.max(...temps);
        return {
          day: formattedDay,
          icon: getWeatherIcon(icon),
          temp: `${tempMax > 0 ? '+' : ''}${Math.floor(tempMax)}°/${Math.floor(tempMin)}°`,
        };
      });
    } catch (err: any) {
      error.value = err.response ? err.response.data.message : 'Ошибка запроса';
      throw error;
    }
  };

  return {
    forecast,
    error,
    getForecast,
  };
};
