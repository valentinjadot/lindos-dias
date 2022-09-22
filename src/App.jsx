import React from 'react';

import GeolocalizationButton from './components/GeolocalizationButton';
import useCoords from './hooks/useCoords';
import DaysSection from './sections/DaysSection';
import MapSection from './sections/MapSection';

export default function App() {
  const [coords, isLoading, isRealCoords, reloadCoords] = useCoords();

  return (
    <>
      <h1>🚣‍♂️</h1>
      <h1>¿Cómo está el día para andar en kayak?</h1>

      {coords && (
        <>
          <GeolocalizationButton
            isLoading={isLoading}
            onClick={reloadCoords}
            desactivated={isRealCoords}
          />
          <MapSection coords={coords} />
          <DaysSection coords={coords} />
        </>
      )}
    </>
  );
}
