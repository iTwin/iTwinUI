import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useSearchParams } from '@remix-run/react';
import { ThemeProvider, Tooltip } from '@itwin/itwinui-react';

export default function ThemeProviderExample() {
  const [searchParams] = useSearchParams();

  const nested = searchParams.get('nested') === 'true';
  const popout = searchParams.get('popout') === 'true';
  const withPortalContainer =
    searchParams.get('withPortalContainer') === 'true';
  const portaled = searchParams.get('portaled') === 'true';

  const [portalContainer, setPortalContainer] = React.useState<
    HTMLElement | undefined
  >();

  const [popoutDocumentBody, setPopoutDocumentBody] =
    React.useState<HTMLElement | null>(null);

  const showPopOutWindow = () => {
    const childWindow = window.open(
      '',
      '_blank',
      'width=1280,height=720,menubar=no,resizable=yes,scrollbars=no,status=no,location=no',
    );

    setTimeout(() => {
      if (!childWindow) {
        console.log('childWindow is null??');
        return;
      }
      childWindow.document.title = 'Popout window!';
      childWindow.document.write(`<!DOCTYPE html><body></body>`);
      setPopoutDocumentBody(childWindow.document.body);
    });
  };

  const [portaledTarget, setPortaledTarget] = React.useState<HTMLElement>();
  React.useEffect(() => {
    if (!portaled) return;
    setPortaledTarget(document.querySelector('[data-portaled]') as HTMLElement);
  }, [portaled]);

  return (
    <ThemeProvider
      theme='dark'
      data-container='main'
      portalContainer={portalContainer}
    >
      {popout && <button onClick={showPopOutWindow}>Pop out</button>}

      <Tooltip content='main tooltip' visible>
        <button>hello</button>
      </Tooltip>

      {nested && (
        <ThemeProvider data-container='nested'>
          <Tooltip content='nested tooltip' visible>
            <button>hello</button>
          </Tooltip>
        </ThemeProvider>
      )}

      {withPortalContainer && (
        <div
          data-container='custom'
          ref={(element) => setPortalContainer(element || undefined)}
        />
      )}

      {popoutDocumentBody &&
        ReactDOM.createPortal(
          <ThemeProvider data-container='popout'>
            <Tooltip content='popout tooltip' visible>
              <button>hello</button>
            </Tooltip>
          </ThemeProvider>,
          popoutDocumentBody,
        )}

      {portaled && (
        <>
          <div data-portaled></div>
          {portaledTarget &&
            ReactDOM.createPortal(
              <ThemeProvider>
                <div>hello (portaled)</div>
              </ThemeProvider>,
              portaledTarget,
            )}
        </>
      )}
    </ThemeProvider>
  );
}
