import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { VisuallyHidden, ThemeProvider } from '@itwin/itwinui-react';
import { useSearchParams } from 'react-router';

export default function Page() {
  const [searchParams] = useSearchParams();

  if (searchParams.get('popout') === 'true') {
    return <PopoutTest />;
  }

  return null;
}

/** https://github.com/iTwin/iTwinUI/pull/2252#discussion_r1766676900 */
function PopoutTest() {
  const popout = usePopout();
  const root = popout.popout?.document.body
    ? createRoot(popout.popout.document.body)
    : null;

  return (
    <>
      <button onClick={popout.open}>Open popout</button>
      {popout.popout &&
        root?.render(
          <ThemeProvider>
            <VisuallyHidden>Hello</VisuallyHidden>
          </ThemeProvider>,
        )}
    </>
  );
}

// ----------------------------------------------------------------------------

function usePopout() {
  const [popout, setPopout] = React.useState<Window | null>(null);

  const open = React.useCallback(() => {
    const popout = window.open('', 'popout', 'width=400,height=400');
    setPopout(popout);
  }, []);

  return React.useMemo(() => ({ open, popout }), [open, popout]);
}
