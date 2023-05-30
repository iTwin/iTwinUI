import type { AppProps } from 'next/app';
import { ThemeProvider } from '@itwin/itwinui-react';
import '@itwin/itwinui-react/styles.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <style jsx global>{`
        * {
          box-sizing: border-box;
          margin: 0;
        }
      `}</style>
      <style jsx>{`
        main {
          padding: 2rem 1rem;
        }
      `}</style>

      <ThemeProvider theme='dark'>
        <Component {...pageProps} />
      </ThemeProvider>
    </main>
  );
}
