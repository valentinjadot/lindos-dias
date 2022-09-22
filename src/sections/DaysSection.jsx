import { Space } from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react';

import Day from '../components/Day';
import Summary from '../components/Summary';
import {
  closeLoaderNotification,
  openLoaderNotification,
} from '../libs/loaderNotification';
import WeatherApiService from '../libs/WeatherApiService';

export default function DaysSection({ coords }) {
  const [days, setDays] = useState(null);
  const [goodHalfDays, setGoodHalfDays] = useState(null);

  const loadData = async () => {
    openLoaderNotification({
      id: 'load-days',
      title: 'Calculando...',
      message: 'Calculado posiciones de nubes y de gotitas de agua',
    });
    const weatherService = new WeatherApiService(coords);
    const loadedDays = await weatherService.loadDays();
    setDays(loadedDays.days);
    setGoodHalfDays(loadedDays.goodHalfDays);
    closeLoaderNotification({
      id: 'load-days',
      message: 'Tenemos resultado por los próximos 7 días!',
    });
  };

  useEffect(() => {
    loadData();
  }, [coords]);

  return (
    <>
      {goodHalfDays && <Summary goodHalfDays={goodHalfDays} />}
      {days && days.map((day) => (
        <>
          <Day
            key={useRef}
            date={day.date}
            morning={day.morning}
            afternoon={day.afternoon}
          />
          <Space h="lg" />
        </>
      ))}
    </>
  );
}
