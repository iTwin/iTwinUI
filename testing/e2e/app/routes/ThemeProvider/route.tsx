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
      <Tooltip content={<div data-tooltip='main'>main tooltip</div>} visible>
        <button>hello</button>
      </Tooltip>

      {nested && (
        <ThemeProvider data-container='nested'>
          <Tooltip
            content={<div data-tooltip='nested'>nested tooltip</div>}
            visible
          >
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
