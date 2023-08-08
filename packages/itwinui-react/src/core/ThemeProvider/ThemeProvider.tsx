/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import {
  useMediaQuery,
  useMergedRefs,
  Box,
  useIsomorphicLayoutEffect,
} from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import { ThemeContext } from './ThemeContext.js';
import { ToastProvider, Toaster } from '../Toast/Toaster.js';

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
   * This will be used to determine if background will be applied.
   */
  shouldApplyBackground?: boolean;
};

type ThemeProviderOwnProps = Pick<RootProps, 'theme'> & {
  themeOptions?: RootProps['themeOptions'];
  children: Required<React.ReactNode>;
  /**
   * The element used as the portal for floating elements (Tooltip, Toast, DropdownMenu, Dialog, etc).
   *
   * Defaults to a `<div>` rendered at the end of the ThemeProvider.
   *
   * When passing an element, it is recommended to use state.
   *
   * @example
   * const [myPortal, setMyPortal] = React.useState(null);
   *
   * <div ref={setMyPortal} />
   * <ThemeProvider
   *   portalContainer={myPortal}
   * >
   *   ...
   * </ThemeProvider>
   */
  portalContainer?: HTMLElement;
};

/**
 * This component provides global state and applies theme to the entire tree
 * that it is wrapping around.
 *
 * The `theme` prop defaults to "inherit", which looks upwards for closest ThemeProvider
 * and falls back to "light" theme if one is not found.
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
export const ThemeProvider = React.forwardRef((props, forwardedRef) => {
  const {
    theme: themeProp = 'inherit',
    children,
    themeOptions,
    portalContainer: portalContainerProp,
    ...rest
  } = props;

  const [portalContainerState, setPortalContainerState] = React.useState(
    portalContainerProp || null,
  );
  const portalContainer = portalContainerProp || portalContainerState;

  const [parentTheme, rootRef] = useParentTheme();
  const theme = themeProp === 'inherit' ? parentTheme || 'light' : themeProp;

  const shouldApplyBackground = themeOptions?.applyBackground ?? !parentTheme;
  console.log({ shouldApplyBackground, parentTheme });

  const contextValue = React.useMemo(
    () => ({ theme, themeOptions, portalContainer }),
    [theme, themeOptions, portalContainer],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <Root
        theme={theme}
        shouldApplyBackground={shouldApplyBackground}
        themeOptions={themeOptions}
        ref={useMergedRefs(forwardedRef, rootRef)}
        {...rest}
      >
        <ToastProvider>
          {children}

          {!portalContainerProp ? (
            <div ref={setPortalContainerState}>
              <Toaster />
            </div>
          ) : null}
        </ToastProvider>
      </Root>
    </ThemeContext.Provider>
  );
}) as PolymorphicForwardRefComponent<'div', ThemeProviderOwnProps>;

export default ThemeProvider;

// ----------------------------------------------------------------------------

const Root = React.forwardRef((props, forwardedRef) => {
  const {
    theme,
    children,
    themeOptions,
    shouldApplyBackground,
    className,
    ...rest
  } = props;

  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const prefersHighContrast = useMediaQuery('(prefers-contrast: more)');
  const shouldApplyDark = theme === 'dark' || (theme === 'os' && prefersDark);
  const shouldApplyHC = themeOptions?.highContrast ?? prefersHighContrast;

  return (
    <Box
      className={cx(
        'iui-root',
        { 'iui-root-background': shouldApplyBackground },
        className,
      )}
      data-iui-theme={shouldApplyDark ? 'dark' : 'light'}
      data-iui-contrast={shouldApplyHC ? 'high' : 'default'}
      ref={forwardedRef}
      {...rest}
    >
      {children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', RootProps>;

// ----------------------------------------------------------------------------

/**
 * Returns theme from either parent context or by reading the closest
 * data-iui-theme attribute if context is not found.
 */
const useParentTheme = () => {
  const parentContext = React.useContext(ThemeContext);
  const rootRef = React.useRef<HTMLElement>(null);
  const [parentThemeState, setParentTheme] = React.useState(
    parentContext?.theme,
  );

  useIsomorphicLayoutEffect(() => {
    setParentTheme(
      (old) =>
        old ||
        (rootRef.current?.parentElement
          ?.closest('[data-iui-theme]')
          ?.getAttribute('data-iui-theme') as ThemeType),
    );
  }, []);

  return [parentContext?.theme || parentThemeState, rootRef] as const;
};
