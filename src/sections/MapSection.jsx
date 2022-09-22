import { Space } from '@mantine/core';
import React from 'react';

import Map from '../components/Map';

export default function MapSection({ coords }) {
  return (
    <>
      <Space h="lg" />
      <Map coords={coords} />
      <Space h="lg" />
    </>
  );
}
