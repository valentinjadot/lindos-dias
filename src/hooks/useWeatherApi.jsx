import WeatherApiService from './utils/WeatherApiService';
import { useState, useEffect } from 'react';

export default function useWeatherApi(coords) {
  const [days, setDays] = useState(null);
  console.log(coords)

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const weatherService = new WeatherApiService(coords);
    setDays(await weatherService.loadDays());
  }

  return [days];
}
