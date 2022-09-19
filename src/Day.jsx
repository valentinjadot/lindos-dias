import { Card, Text } from '@mantine/core';
import HalfDay from "./HalfDay";


function Day(props) {
  const { date, morning, afternoon } = props;
  const formattedDate = date.locale('es').format('dddd, MMMM D YYYY');

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder >
      <Text weight={500} size="lg">{formattedDate}</Text>
      <HalfDay data={morning} />
      <HalfDay data={afternoon} />
    </Card>
  );
}

export default Day;
