import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import App from './App';
import { IconButton, ThemeProvider } from '@itwin/itwinui-react';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const AppWithWrapper = () => {
  const [theme, setTheme] = React.useState(
    matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  );

  return (
    <ThemeProvider className='theme-provider' theme={theme}>
      <IconButton
        styleType='borderless'
        aria-label='Toggle theme'
        style={{ position: 'fixed', top: 0, right: 0 }}
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        {theme === 'light' ? '🌞' : '🌙'}
      </IconButton>
      <App />
    </ThemeProvider>
  );
};

root.render(
  <React.StrictMode>
    <AppWithWrapper />
  </React.StrictMode>,
);
