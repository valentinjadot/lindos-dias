import { Space } from '@mantine/core';
import useCoords from './useCoords';
import './App.css';
import MapSection from './MapSection';
import DaysSection from './DaysSection';
import LoaderSection from './LoaderSection';
import { useState } from 'react';
import { Button } from '@mantine/core';
import { IconMapPin } from '@tabler/icons';


export default function App() {
  const [coords, loading, reloadCoords] = useCoords();

  return (
    <>
      <h1>🚣‍♂️</h1>
      <h1>¿Cómo está el día para andar en kayak?</h1>


      {!coords && <LoaderSection />}


      {coords && (
        <>
          <Button leftIcon={<IconMapPin />} onClick={reloadCoords} disabled={loading}>{loading ? 'Buscando...' : 'Geolocalizar'}</Button>
          <MapSection coords={coords} />
          <DaysSection coords={coords} />
        </>
      )}
    </>
  )
}
