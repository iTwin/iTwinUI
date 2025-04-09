import * as React from 'react';
import { useSearchParams } from '@remix-run/react';
import { Popover, ThemeProvider, useToaster } from '@itwin/itwinui-react';

export default function Page() {
  const [searchParams] = useSearchParams();
  const shouldPortal = searchParams.get('portal') === 'true';
  const isClient = useIsClient();

  return (
    <>
      <Toast text='Toast (root)' />

      <Popover content={<PopoverContent toastText='Toast (popover)' />}>
        <button>Show popover</button>
      </Popover>

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

function PopoverContent({ toastText = 'Toast' }) {
  const toaster = useToaster();

  return (
    <>
      <button
        onClick={() => {
          toaster.informational(toastText, { type: 'persisting' });
        }}
      >
        Show toast
      </button>
    </>
  );
}

function useIsClient() {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}
