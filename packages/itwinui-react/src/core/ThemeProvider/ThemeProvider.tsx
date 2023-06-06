/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import {
  useMediaQuery,
  useMergedRefs,
  useIsThemeAlreadySet,
  Box,
} from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import { ThemeContext } from './ThemeContext.js';
import '@itwin/itwinui-css/css/global.css';
import '@itwin/itwinui-variables/index.css';

export type ThemeOptions = {
  /**
   * Whether to apply high-contrast versions of light and dark themes.
   * Will default to user preference if browser supports it.
   */
  highContrast?: boolean;
};

export type ThemeType = 'light' | 'dark' | 'os';

type RootProps = {
  /**
   * Theme to be applied. Can be 'light' or 'dark' or 'os'.
   *
   * Note that 'os' will respect the system preference on client but will fallback to 'light'
   * in SSR environments because it is not possible detect system preference on the server.
   * This can cause a flash of incorrect theme on first render.
   *
   * The 'inherit' option is intended to be used by packages, to enable incremental adoption
   * of iTwinUI v2 in app that might be using v1 in other places.
   *
   * @default 'light'
   */
  theme?: ThemeType | 'inherit';
  themeOptions?: Pick<ThemeOptions, 'highContrast'> & {
    /**
     * Whether or not the element should apply the recommended `background-color` on itself.
     *
     * When not specified, the default behavior is to apply a background-color only
     * if it is the topmost `ThemeProvider` in the tree. Nested `ThemeProvider`s will
     * be detected using React Context and will not apply a background-color.
     *
     * Additionally, if theme is set to `'inherit'`, then this will default to false.
     *
     * When set to true or false, it will override the default behavior.
     */
    applyBackground?: boolean;
  };
  /**
   * Whether theme was set to `'inherit'`.
   * This will be used to determine if applyBackground will default to false.
   */
  isInheritingTheme?: boolean;
};

type ThemeProviderOwnProps = Pick<RootProps, 'theme'> & {
  themeOptions?: RootProps['themeOptions'];
  children: Required<React.ReactNode>;
};

/**
 * This component provides global styles and applies theme to the entire tree
 * that it is wrapping around. The `theme` prop is optional and defaults to the
 * light theme.
 *
 * If you want to theme the entire app, you should use this component at the root. You can also
 * use this component to apply a different theme to only a part of the tree.
 *
 * By default, the topmost `ThemeProvider` in the tree will apply the recommended
 * `background-color`. You can override this behavior using `themeOptions.applyBackground`.
 *
 * @example
 * <ThemeProvider theme='os'>
 *  <App />
 * </ThemeProvider>
 *
 * @example
 * <ThemeProvider as='body'>
 *   <App />
 * </ThemeProvider>
 *
 * @example
 * <ThemeProvider theme='dark' themeOptions={{ applyBackground: false }}>
 *  <App />
 * </ThemeProvider>
 */
export const ThemeProvider = React.forwardRef((props, ref) => {
  const { theme: themeProp, children, themeOptions, ...rest } = props;

  const rootRef = React.useRef<HTMLElement>(null);
  const mergedRefs = useMergedRefs(rootRef, ref);

  const parentContext = React.useContext(ThemeContext);

  const theme =
    themeProp === 'inherit' ? parentContext?.theme ?? 'light' : themeProp;

  const contextValue = React.useMemo(
    () => ({ theme, themeOptions, rootRef }),
    [theme, themeOptions],
  );

  // now that we know there are children, we can render the root and provide the context value
  return (
    <Root
      theme={theme}
      isInheritingTheme={themeProp === 'inherit'}
      themeOptions={themeOptions}
      ref={mergedRefs}
      {...rest}
    >
      <ThemeContext.Provider value={contextValue}>
        {children}
      </ThemeContext.Provider>
    </Root>
  );
}) as PolymorphicForwardRefComponent<'div', ThemeProviderOwnProps>;

export default ThemeProvider;

const Root = React.forwardRef((props, forwardedRef) => {
  const {
    theme,
    children,
    themeOptions,
    className,
    isInheritingTheme,
    ...rest
  } = props;

  const ref = React.useRef<HTMLElement>(null);
  const mergedRefs = useMergedRefs(ref, forwardedRef);
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const prefersHighContrast = useMediaQuery('(prefers-contrast: more)');
  const shouldApplyDark = theme === 'dark' || (theme === 'os' && prefersDark);
  const shouldApplyHC = themeOptions?.highContrast ?? prefersHighContrast;
  const isThemeAlreadySet = useIsThemeAlreadySet(ref.current?.ownerDocument);
  const shouldApplyBackground =
    themeOptions?.applyBackground ??
    (isInheritingTheme ? false : !isThemeAlreadySet.current);

  return (
    <Box
      className={cx(
        'iui-root',
        { 'iui-root-background': shouldApplyBackground },
        className,
      )}
      data-iui-theme={shouldApplyDark ? 'dark' : 'light'}
      data-iui-contrast={shouldApplyHC ? 'high' : 'default'}
      ref={mergedRefs}
      {...rest}
    >
      {children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', RootProps>;
