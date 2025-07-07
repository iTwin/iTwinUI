import { ThemeProvider, ToggleSwitch } from '@itwin/itwinui-react';
import { useSearchParams } from 'react-router';

export default function Page() {
  const [searchParams] = useSearchParams();

  const withThemeProvider = searchParams.get('withThemeProvider') === 'true';
  const themeProviderConsistentPropsSpread =
    searchParams.get('themeProviderConsistentPropsSpread') != null
      ? searchParams.get('themeProviderConsistentPropsSpread') === 'true'
      : undefined;
  const shouldPassWrapperProps =
    searchParams.get('shouldPassWrapperProps') === 'true';

  if (withThemeProvider) {
    return (
      <WithThemeProviderTest
        shouldPassWrapperProps={shouldPassWrapperProps}
        themeProviderConsistentPropsSpread={themeProviderConsistentPropsSpread}
      />
    );
  }
  return <DefaultTest shouldPassWrapperProps={shouldPassWrapperProps} />;
}

function WithThemeProviderTest(props: {
  shouldPassWrapperProps?: boolean;
  themeProviderConsistentPropsSpread?: boolean;
}) {
  const { shouldPassWrapperProps, themeProviderConsistentPropsSpread } = props;

  return (
    <ThemeProvider
      future={{
        ToggleSwitch: {
          consistentPropsSpread: themeProviderConsistentPropsSpread,
        },
      }}
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

function DefaultTest(props: { shouldPassWrapperProps?: boolean }) {
  const { shouldPassWrapperProps } = props;

  return (
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
  );
}
