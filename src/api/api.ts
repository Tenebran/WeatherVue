import axios from 'axios';

const API_KEY = '552fdd050682d4246694f7af40e8d82';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

export const fetchCurrentWeather = (city: string, lang: string) => {
  return axios.get(`${BASE_URL}weather`, {
    params: {
      q: city,
      units: 'metric',
      lang: lang,
      appid: API_KEY,
    },
  });
};

export const fetchForecast = (city: string, lang: string) => {
  return axios.get(`${BASE_URL}forecast`, {
    params: {
      q: city,
      units: 'metric',
      lang: lang,
      appid: API_KEY,
    },
  });
};
