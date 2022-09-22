import { useState, useEffect } from 'react';
import {
  openLoaderNotification,
  closeLoaderNotification
} from './utils/loaderNotification';

const DEFAULT_POSITION = {
  name: "Puerto Natales",
  coords: {
    latitude: "51.72",
    longitude: "72.51",
  }
}

export default function useCoords() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRealCoords, setIsRealCoords] = useState(false);
  const [coords, setCoords] = useState(null);
  const [forcedReload, setForcedReload] = useState(null);

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
  };

  const reloadCoords = () => setForcedReload(!forcedReload);

  useEffect(() => {
    getCoords();
  }, [forcedReload]);

  const getCoords = () => {
    setIsLoading(true);
    openLoaderNotification({
      id: 'load-coords',
      title: 'Geolocalizando...',
      message: 'Aber aber por donde andas'
    });
    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  function success(pos) {
    const coords = pos.coords;
    setCoords(coords);
    closeLoaderNotification({
      id: 'load-coords',
      message: `Estas en latidud ${coords.latitude.toFixed(2)} y longitud ${coords.longitude.toFixed(2)}!`
    });
    setIsRealCoords(true);
    setIsLoading(false);
  }

  function error(err) {
    let message;
    if (err.code === 1) {
      message = `Tu navigator no me deja geolocalizarte 😪 `
    } else {
      message = `No logré pillar por donde andas..`
    }
    message += ` Digamos ${DEFAULT_POSITION.name} entonces`;

    setCoords(DEFAULT_POSITION.coords);
    closeLoaderNotification({
      id: 'load-coords',
      message
    });
    setIsLoading(false);
  }

  return [coords, isLoading, isRealCoords, reloadCoords];
}
