import { Button } from '@mantine/core';
import { IconMapPin } from '@tabler/icons';
import React from 'react';

export default function GeolocalizationButton({ loading, onClick, desactivated }) {
  if (desactivated) return '';

  return (
    <Button
      leftIcon={<IconMapPin />}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? 'Buscando...' : 'Geolocalizar'}
    </Button>
  );
}
