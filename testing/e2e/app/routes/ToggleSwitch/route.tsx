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
    <ThemeProvider
      future={{ consistentPropsSpread: themeProviderConsistentPropsSpread }}
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
    </ThemeProvider>
  );
}
