import { ThemeProvider, ToggleSwitch } from '@itwin/itwinui-react';
import { useSearchParams } from 'react-router';

export default function Page() {
  const [searchParams] = useSearchParams();

  const themeProviderConsistentPropsSpread =
    searchParams.get('themeProviderConsistentPropsSpread') != null
      ? searchParams.get('themeProviderConsistentPropsSpread') === 'true'
      : undefined;
  const shouldPassWrapperProps =
    searchParams.get('shouldPassWrapperProps') === 'true';

  return (
    <ConditionalThemeProvider
      themeProviderConsistentPropsSpread={themeProviderConsistentPropsSpread}
    >
      <ToggleSwitch
        className='my-class'
        style={{
          backgroundColor: 'red',
        }}
        data-dummy-data-attr='dummy-value-root'
        wrapperProps={
          shouldPassWrapperProps
            ? ({
                className: 'wrapper-class',
                style: { backgroundColor: 'blue' },
                'data-dummy-data-attr': 'dummy-value-wrapper-props',
              } as React.ComponentProps<typeof ToggleSwitch>['wrapperProps'])
            : undefined
        }
      />
    </ConditionalThemeProvider>
  );
}

function ConditionalThemeProvider(props: {
  children?: React.ReactNode;
  themeProviderConsistentPropsSpread?: boolean;
}) {
  const { children, themeProviderConsistentPropsSpread } = props;

  return themeProviderConsistentPropsSpread != null ? (
    <ThemeProvider
      future={{
        ToggleSwitch: {
          consistentPropsSpread: themeProviderConsistentPropsSpread,
        },
      }}
    >
      {children}
    </ThemeProvider>
  ) : (
    children
  );
}
