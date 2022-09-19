import { useState, useEffect } from 'react';
import WeatherApiService from './utils/WeatherApiService';
import { Loader } from '@mantine/core';
import Day from './Day';
import './App.css';

function App() {
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const weatherService = new WeatherApiService();
    setDays(await weatherService.loadDays());
    setLoading(false);
  }

  return (
    <>
      <h1>🚣‍♂️</h1>

      <h1>Lindos dias en Puerto Natales</h1>

      {loading && <Loader />}

      {!loading && days.map(day => (
        <Day
          key={day.date}
          date={day.date}
          morning={day.morning}
          afternoon={day.afternoon}
        />
      ))}
    </>
  )

}

export default App
