import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { MantineProvider } from '@mantine/core';
// import { useColorScheme } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';

function LindosDias() {
  // const colorScheme = useColorScheme();
  const colorScheme = 'dark';

  return (
    <React.StrictMode>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <NotificationsProvider position="top-right">
          <App />
        </NotificationsProvider>
      </MantineProvider>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<LindosDias />);
