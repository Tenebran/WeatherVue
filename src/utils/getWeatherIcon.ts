export const getWeatherIcon = (icon: string): string => {
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
