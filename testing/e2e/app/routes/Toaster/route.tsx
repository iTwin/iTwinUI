import * as React from 'react';
import { useSearchParams } from '@remix-run/react';
import { ThemeProvider, useToaster } from '@itwin/itwinui-react';

export default function Page() {
  const [searchParams] = useSearchParams();
  const shouldPortal = searchParams.get('portal') === 'true';
  const isClient = useIsClient();

  return (
    <>
      <Toast text='Toast (root)' />

      <ThemeProvider data-container='nested'>
        <Toast text='Toast (nested)' />
      </ThemeProvider>

      {isClient && shouldPortal && (
        <ThemeProvider portalContainer={document.body}>
          <Toast text='Toast (portal)' />
        </ThemeProvider>
      )}
    </>
  );
}

function Toast({ text = 'Toast' }) {
  const toaster = useToaster();

  React.useEffect(() => {
    toaster.informational(text, { type: 'persisting' });
  }, [toaster]);

  return null;
}

function useIsClient() {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}
