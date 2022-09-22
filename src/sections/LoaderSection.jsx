import { Loader, Space } from '@mantine/core';
import React from 'react';

export default function LoaderSection({ isLoading }) {
  return (
    <>
      <Space h="lg" />
      {isLoading && <Loader />}
      <Space h="lg" />
    </>
  );
}
