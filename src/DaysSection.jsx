import { Space } from '@mantine/core';
import Day from './Day';
import { useState, useEffect } from 'react';
import './App.css';
import WeatherApiService from './utils/WeatherApiService';
import {
  openLoaderNotification,
  closeLoaderNotification
} from './utils/loaderNotification';


export default function DaysSection({ coords }) {
  const [days, setDays] = useState(null);
  console.log("coords in DaysSection", coords);

  useEffect(() => {
    loadData(coords);
  }, [coords]);

  const loadData = async (coords) => {

    openLoaderNotification({
      id: 'load-days',
      title: 'Calculando...',
      message: 'Calculado posiciones de nubes y de gotitas de agua'
    });
    const weatherService = new WeatherApiService(coords);
    const days = await weatherService.loadDays();
    setDays(days);
    closeLoaderNotification({
      id: 'load-days',
      message: `Tenemos resultado por los próximos 7 días!`
    });
  }

  return (
    <>
      {days && days.map(day => (
        <>
          <Day
            key={day.date}
            date={day.date}
            morning={day.morning}
            afternoon={day.afternoon}
          />
          <Space h="lg" />
        </>
      )
      )}
    </>
  )

}
