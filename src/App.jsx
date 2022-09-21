import { Loader, Space } from '@mantine/core';
import Day from './Day';
import useWeatherApi from './useWeatherApi';
import './App.css';
import Map from './Map';

function App() {
  const [days, coords] = useWeatherApi();

  const LoadSection = () => (
    <>
      <Space h="lg" />
      <Loader />
      <Space h="lg" />
    </>
  )

  const MapSection = () => (
    <>
      <Space h="lg" />
      <Map coords={coords} />
      <Space h="lg" />
    </>
  )

  const DaySection = ({ day }) => (
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

  return (
    <>
      <h1>🚣‍♂️</h1>
      <h1>Lindos dias para andar en kayak</h1>

      {!days && <LoadSection />}

      {coords && <MapSection />}

      {days && days.map(day => (
        <DaySection day={day} />
      ))}
    </>
  )

}

export default App
