import { Group, Text, Badge } from '@mantine/core';

function HalfDay(props) {
  const { data } = props;

  const badgeColor = () => {
    const score = data.weatherScore()
    if (score >= 80) return 'green'
    else if (score >= 60) return 'yellow'
    else if (score >= 10) return 'red'
    else if (isNaN(score)) return 'grey'
  }

  return (
    <>
      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{data.type === "morning" ? 'Mañana' : 'Tarde'}</Text>

        <Badge color={badgeColor()} size="lg">
          {data.weatherScore().toFixed(0)}
        </Badge>
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
