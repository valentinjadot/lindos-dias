import { Card, Text } from '@mantine/core';
import HalfDay from "./HalfDay";
import 'dayjs/locale/es'


export default function Day(props) {
  const { date, morning, afternoon } = props;
  const formattedDate = date.locale('es').format('dddd, MMMM D YYYY');

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder >
      <Text weight={500} size="xl">{formattedDate}</Text>
      <HalfDay halfDay={morning} />
      <HalfDay halfDay={afternoon} />
    </Card>
  );
}
