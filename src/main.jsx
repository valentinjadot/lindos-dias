import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { MantineProvider } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';

function LindosDias() {
  // const colorScheme = useColorScheme();
  const colorScheme = 'dark';

  return (
    <React.StrictMode>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <App />
      </MantineProvider>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<LindosDias />);
