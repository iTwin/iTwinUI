import * as React from 'react';
import { useSearchParams } from '@remix-run/react';
import { ThemeProvider, Tooltip } from '@itwin/itwinui-react';

export default function ThemeProviderExample() {
  const [searchParams] = useSearchParams();

  const nested = searchParams.get('nested') === 'true';
  const withPortalContainer =
    searchParams.get('withPortalContainer') === 'true';

  const [portalContainer, setPortalContainer] = React.useState<
    HTMLElement | undefined
  >();

  return (
    <ThemeProvider
      theme='dark'
      data-container='main'
      portalContainer={portalContainer}
    >
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
    </ThemeProvider>
  );
}
