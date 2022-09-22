import { Space } from '@mantine/core';
import React, { useEffect, useState } from 'react';

import Day from '../components/Day';
import {
  closeLoaderNotification,
  openLoaderNotification,
} from '../libs/loaderNotification';
import WeatherApiService from '../libs/WeatherApiService';

export default function DaysSection({ coords }) {
  const [days, setDays] = useState(null);

  const loadData = async () => {
    openLoaderNotification({
      id: 'load-days',
      title: 'Calculando...',
      message: 'Calculado posiciones de nubes y de gotitas de agua',
    });
    const weatherService = new WeatherApiService(coords);
    const loadedDays = await weatherService.loadDays();
    setDays(loadedDays);
    closeLoaderNotification({
      id: 'load-days',
      message: 'Tenemos resultado por los próximos 7 días!',
    });
  };

  useEffect(() => {
    loadData();
  }, [coords]);

  return (
    days && days.map((day) => (
      <>
        <Day
          key={day.date}
          date={day.date}
          morning={day.morning}
          afternoon={day.afternoon}
        />
        <Space h="lg" />
      </>
    ))
  );
}
