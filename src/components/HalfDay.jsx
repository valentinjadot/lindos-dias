import {
  Badge, Group, Space, Text,
} from '@mantine/core';
import React from 'react';

export default function HalfDay(props) {
  const { halfDay } = props;

  const TIERS_DATA = [
    {
      color: 'grey',
      sentence: 'No hay dato',
    },
    {
      color: 'red',
      sentence: 'Nope',
    },
    {
      color: 'yellow',
      sentence: 'Meh',
    },
    {
      color: 'green',
      sentence: 'Hermoso 🤩 Al agua!',
    },
  ];

  const tierData = TIERS_DATA[halfDay.weatherScore().tierIndex()];

  return (
    <>
      <Space h="sm" />
      <Group position="apart" mt="md" mb="xs">
        <Text weight={600}>
          En la
          {' '}
          {halfDay.type === 'morning' ? 'Mañana' : 'Tarde'}
        </Text>

        <Badge color={tierData.color} size="lg">
          {tierData.sentence}
        </Badge>
      </Group>

      <Space h="sm" />

      <Group position="center">
        <Text>
          🎯 Puntaje:
        </Text>

        <Text weight="bold">
          {halfDay.weatherScore().score().toFixed(0)}
          /100
        </Text>
      </Group>

      <Text>
        Detalle:
      </Text>

      <Text size="md" color="dimmed">
        💦
        {' '}
        {halfDay.precipitation().toFixed(0)}
        {' '}
        mm
      </Text>

      <Text size="md" color="dimmed">
        ⛅️
        {' '}
        {halfDay.averageCloudcover().toFixed(0)}
        {' '}
        %
      </Text>

      <Text size="md" color="dimmed">
        🌬
        {' '}
        {halfDay.averageWindspeed().toFixed(0)}
        {' '}
        km/h
      </Text>
    </>
  );
}
