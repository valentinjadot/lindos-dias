import 'dayjs/locale/es';

import { Alert, Space, Text } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons';
import React from 'react';

import SummaryGenericPhrase from './SummaryGenericPhrase';
import SummaryListOfDays from './SummaryListOfDays';

export default function Summary({ goodHalfDays }) {
  return (
    <>
      <Alert icon={<IconInfoCircle size={16} />} title="Resumen de los próximos 7 días">
        <Text size="md">
          <SummaryGenericPhrase goodHalfDays={goodHalfDays} />
          <SummaryListOfDays goodHalfDays={goodHalfDays} />
        </Text>
      </Alert>
      <Space h="lg" />
    </>
  );
}
