import { useState, useEffect } from 'react';
import {
  openLoaderNotification,
  closeLoaderNotification
} from './utils/loaderNotification';

const DEFAULT_POSITION = {
  name: "Puerto Natales",
  coords: {
    latitude: "51.72",
    longitude: "72.51"
  }
}

export default function useCoords() {
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    openLoaderNotification({
      id: 'load-coords',
      title: 'Geolocalizando...',
      message: 'Sapeando donde estas (si lo autorizas obvio)'
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
    setLoading(false);
  }

  function error(err) {
    setCoords(DEFAULT_POSITION.coords);
    closeLoaderNotification({
      id: 'load-coords',
      message: `No logré pillar por donde andas.. Digamos ${DEFAULT_POSITION.name} entonces`
    });
    setLoading(false);
  }

  return [coords, loading, reloadCoords];
}
