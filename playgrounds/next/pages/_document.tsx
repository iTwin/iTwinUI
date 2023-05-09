import { ThemeProvider } from '@itwin/itwinui-react';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <title>iTwinUI-react + nextjs</title>
      </Head>
      <ThemeProvider theme='dark' as='body'>
        <Main />
        <NextScript />
      </ThemeProvider>
    </Html>
  );
}
