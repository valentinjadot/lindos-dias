import WeatherApiService from './utils/WeatherApiService';
import { useState, useEffect } from 'react';

export default function useWeatherApi() {
  const [days, setDays] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const weatherService = new WeatherApiService();
    setDays(await weatherService.loadDays());
  }

  return days;
}
