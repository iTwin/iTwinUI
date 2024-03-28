import * as React from 'react';
import * as ReactDOM from 'react-dom';
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

const root = document.getElementById('root')!;

ReactDOM.render(
  <React.StrictMode>
    <Shell />
  </React.StrictMode>,
  root,
);
