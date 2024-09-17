import type { AppProps } from 'next/app.js';
import css from 'styled-jsx/css';
// import { ThemeProvider } from '@itwin/itwinui-react';
import '@itwin/itwinui-react/styles.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <ThemeProvider theme='dark' className='app-wrapper'> */}
      <style jsx>{styles}</style>
      <Component {...pageProps} />
      {/* </ThemeProvider> */}
    </>
  );
}

const styles = css.global`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
  }
  .app-wrapper {
    padding-inline: 1rem;
    padding-block: 2rem;
    block-size: 100dvh;
    overflow: auto;
  }
`;
