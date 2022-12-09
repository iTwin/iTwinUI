import React from 'react';
import { createRoot } from 'react-dom/client';
import styled from '@emotion/styled';
import { ThemeProvider } from '@itwin/itwinui-react';
import App from './App';
import { css, Global } from '@emotion/react';
import { SvgMoon, SvgSun } from '@itwin/itwinui-icons-react';

const Shell = () => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>(() =>
    matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  );

  return (
    <>
      <Global
        styles={css`
          * {
            box-sizing: border-box;
            margin: 0;
          }
        `}
      />
      <ThemeProvider theme={theme}>
        <Main>
          <ThemeButton
            aria-label='Toggle theme'
            onClick={() =>
              setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
            }
          >
            {theme === 'dark' ? <SvgMoon /> : <SvgSun />}
          </ThemeButton>
          <App />
        </Main>
      </ThemeProvider>
    </>
  );
};

const Main = styled.main`
  padding: 2rem 1rem;
  height: 100vh;
`;

const ThemeButton = styled.button`
  all: unset;
  display: inline-grid;
  place-items: center;
  position: fixed;
  top: 0;
  right: 0;
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
  border-radius: 50%;

  &:hover {
    background: hsl(0 0% 0% / 0.2);
  }

  & > * {
    width: 1.5rem;
    height: 1.5rem;
    fill: currentColor;
  }
`;

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Shell />
  </React.StrictMode>,
);
