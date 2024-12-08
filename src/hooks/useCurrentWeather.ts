import { ref } from 'vue';
import { fetchCurrentWeather, fetchForecast } from '../api/api';
import { getWindDirection } from '../utils/getWindDirection';

type WeatherData = {
  dt_txt: string;
  main: {
    temp: number;
  };
};

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

export const useCurrentWeather = () => {
  const currentWeather = ref();
  const error = ref();

  const getCurrentWeather = async (city: string, lang: string) => {
    try {
      const response = await fetchCurrentWeather(city, lang);
      currentWeather.value = {
        description: response.data.weather[0].description,
        temp: `${Math.floor(response.data.main.temp)}°C`,
        feels_like: `${Math.floor(response.data.main.feels_like)}°C`,
        icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`,
        speed: `${Math.floor(response.data.wind.speed)}`,
        cityName: response.data.name,
        humidity: `${response.data.main.humidity}%`,
        direction: getWindDirection(response.data.wind.deg),
        deg: response.data.wind.deg,
        pressure: (response.data.main.pressure * 0.75006).toFixed(2),
      };
      console.log(response.data);
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
          temp: `${Math.floor(tempMax)}°/${Math.floor(tempMin)}°`,
        };
      });
    } catch (err: any) {
      error.value = err.response ? err.response.data.message : 'Ошибка запроса';
    }
  };

  return {
    forecast,
    error,
    getForecast,
  };
};

const getWeatherIcon = (icon: string): string => {
  const iconMap: Record<string, string> = {
    '01d': 'mdi-weather-sunny',
    '01n': 'mdi-weather-night',
    '02d': 'mdi-weather-partly-cloudy',
    '02n': 'mdi-weather-night-partly-cloudy',
    '03d': 'mdi-weather-cloudy',
    '03n': 'mdi-weather-cloudy',
    '04d': 'mdi-weather-cloudy',
    '04n': 'mdi-weather-cloudy',
    '09d': 'mdi-weather-pouring',
    '09n': 'mdi-weather-pouring',
    '10d': 'mdi-weather-rainy',
    '10n': 'mdi-weather-rainy',
    '11d': 'mdi-weather-lightning',
    '11n': 'mdi-weather-lightning',
    '13d': 'mdi-weather-snowy',
    '13n': 'mdi-weather-snowy',
    '50d': 'mdi-weather-fog',
    '50n': 'mdi-weather-fog',
  };
  return iconMap[icon] || 'mdi-weather-cloudy';
};

const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
