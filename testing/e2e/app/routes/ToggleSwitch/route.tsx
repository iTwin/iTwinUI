import { ThemeProvider, ToggleSwitch } from '@itwin/itwinui-react';
import { useSearchParams } from 'react-router';

export default function Page() {
  const [searchParams] = useSearchParams();
  const themeProviderConsistentPropsSpread =
    searchParams.get('themeProviderConsistentPropsSpread') != null
      ? searchParams.get('themeProviderConsistentPropsSpread') === 'true'
      : undefined;

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
      />
    </ThemeProvider>
  );
}
