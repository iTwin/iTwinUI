import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@itwin/itwinui-react';
import App from './App.tsx';
import { SvgMoon, SvgSun } from '@itwin/itwinui-icons-react';
import styles from './main.module.css';
import '@itwin/itwinui-react/styles.css';

const Shell = () => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>(() =>
    matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <main className={styles.main}>
          <button
            className={styles.themeButton}
            aria-label='Toggle theme'
            onClick={() =>
              setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
            }
          >
            {theme === 'dark' ? <SvgMoon /> : <SvgSun />}
          </button>
          <App />
        </main>
      </ThemeProvider>
    </>
  );
};

createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Shell />,
  // </React.StrictMode>,
);
