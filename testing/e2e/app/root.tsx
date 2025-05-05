import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import type { LinksFunction } from 'react-router';
import { ThemeProvider } from '@itwin/itwinui-react';
import './root.css';
import '@itwin/itwinui-react/styles.css';

export const links: LinksFunction = () => {
  return [
    { rel: 'icon', href: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width' />
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider theme='dark' className='app-wrapper'>
          {children}
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
