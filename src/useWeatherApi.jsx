import WeatherApiService from './utils/WeatherApiService';
import { useState, useEffect } from 'react';

export default function useWeatherApi() {
  const [days, setDays] = useState(null);
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const weatherService = new WeatherApiService();
    setDays(await weatherService.loadDays());
    setCoords(await weatherService.getCoords());
  }

  return [days, coords];
}
