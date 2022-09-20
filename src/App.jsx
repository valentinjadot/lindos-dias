import { Loader, Space } from '@mantine/core';
import Day from './Day';
import useWeatherApi from './useWeatherApi';
import './App.css';


function App() {
  const days = useWeatherApi();

  return (
    <>
      <h1>🚣‍♂️</h1>

      <h1>Lindos dias en Puerto Natales</h1>

      {!days && <Loader />}

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
      ))}
    </>
  )

}

export default App
