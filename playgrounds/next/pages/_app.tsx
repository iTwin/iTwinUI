import type { AppProps } from 'next/app';

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
      <Component {...pageProps} />
    </main>
  );
}
