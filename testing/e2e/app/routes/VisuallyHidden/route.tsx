import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { VisuallyHidden, ThemeProvider } from '@itwin/itwinui-react';
import { useSearchParams } from '@remix-run/react';

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

  return (
    <>
      <button onClick={popout.open}>Open popout</button>
      {popout.popout &&
        ReactDOM.createPortal(
          <ThemeProvider>
            <VisuallyHidden>Hello</VisuallyHidden>
          </ThemeProvider>,
          popout.popout.document.body,
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
