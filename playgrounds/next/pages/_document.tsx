import { ThemeProvider } from '@itwin/itwinui-react';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head />
      <ThemeProvider theme='dark' as='body'>
        <Main />
        <NextScript />
      </ThemeProvider>
    </Html>
  );
}
