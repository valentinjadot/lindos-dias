import { useRef } from 'react';
import { showNotification, updateNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';

function openLoaderNotification({ id, title, message }) {
  showNotification({
    id,
    title: title,
    message: message,
    loading: true,
    autoClose: false,
    disallowClose: true,
  });
}

function closeLoaderNotification({ id, title = 'Listo!', message = '' } = {}) {
  updateNotification({
    id,
    color: 'teal',
    title,
    message,
    icon: <IconCheck size={16} />,
    autoClose: 4000,
  });
}

export {
  openLoaderNotification,
  closeLoaderNotification
}
