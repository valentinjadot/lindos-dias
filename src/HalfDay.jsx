import { Group, Text, Badge } from '@mantine/core';

function HalfDay(props) {
  const { data } = props;

  return (
    <>
      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{data.type === "morning" ? 'Mañana' : 'Tarde'}</Text>

        {data.hasGoodWeather() && (
          <Badge color="green" variant="light">
            Esquisito!
          </Badge>
        )}
      </Group>

      <Text size="md" color="dimmed">
        💦 {data.weather.precipitation.toFixed(0)} mm
      </Text>

      <Text size="md" color="dimmed">
        ⛅️ {data.averageCloudcover().toFixed(0)} %
      </Text>

      <Text size="md" color="dimmed">
        🌬 {data.averageWindspeed().toFixed(0)} km/h
      </Text>
    </>
  );
}

export default HalfDay;
