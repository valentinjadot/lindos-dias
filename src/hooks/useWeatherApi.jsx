import { useEffect, useState } from 'react';

import WeatherApiService from '../libs/WeatherApiService';

export default function useWeatherApi(coords) {
  const [days, setDays] = useState(null);

  const loadData = async () => {
    const weatherService = new WeatherApiService(coords);
    setDays(await weatherService.loadDays());
  };

  useEffect(() => {
    loadData();
  });

  return [days];
}
