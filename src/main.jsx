import './index.css';

import { MantineProvider } from '@mantine/core';
// import { useColorScheme } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

function LindosDias() {
  // const colorScheme = useColorScheme();
  const colorScheme = 'dark';

  return (
    <React.StrictMode>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <NotificationsProvider position="bottom-right">
          <App />
        </NotificationsProvider>
      </MantineProvider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<LindosDias />);
