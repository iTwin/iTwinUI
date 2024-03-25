/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import {
  useTheme,
  useMediaQuery,
  useMergedRefs,
  useIsThemeAlreadySet,
  useIsomorphicLayoutEffect,
  useLatestRef,
} from '../utils/index.js';
import type {
  PolymorphicComponentProps,
  PolymorphicForwardRefComponent,
  ThemeOptions,
  ThemeType,
} from '../utils/index.js';
import { useStyles } from '../utils/hooks/useStyles.js';

export type ThemeProviderProps<T extends React.ElementType = 'div'> =
  PolymorphicComponentProps<T, ThemeProviderOwnProps>;

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

type IncludeCssProps = {
  /**
   * If false, styles will not be included at runtime, so .css will need to
   * be manually imported. By default, styles are included and wrapped in a layer.
   *
   * @default { withLayer: true }
   */
  includeCss?:
    | boolean
    | {
        /**
         * If true, all styles will be wrapped in a cascade layer named `itwinui`.
         * This helps avoid specificity battles with application styles.
         *
         * @default true
         */
        withLayer: boolean;
      };
};

type ThemeProviderOwnProps = Pick<RootProps, 'theme'> &
  (
    | {
        themeOptions?: RootProps['themeOptions'];
        includeCss?: IncludeCssProps['includeCss'];
        children: Required<React.ReactNode>;
      }
    | {
        themeOptions?: ThemeOptions;
        includeCss?: never;
        children?: undefined;
      }
  );

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
  const {
    theme: themeProp,
    children,
    themeOptions = {},
    includeCss = { withLayer: true },
    ...rest
  } = props;

  const rootRef = React.useRef<HTMLElement>(null);
  const mergedRefs = useMergedRefs(rootRef, ref);

  const hasChildren = React.Children.count(children) > 0;
  const parent = useParentThemeAndContext(rootRef);

  const theme = themeProp === 'inherit' ? parent.theme ?? 'light' : themeProp;

  // default inherit highContrast option from parent if also inheriting base theme
  themeOptions.highContrast ??=
    themeProp === 'inherit' ? parent.highContrast : undefined;

  const newStylesLoaded = React.useRef(false);
  const stylesLoaded = parent.context?.stylesLoaded ?? newStylesLoaded;

  const contextValue = React.useMemo(
    () => ({
      theme,
      themeOptions,
      rootRef,
      includeCss,
      stylesLoaded,
    }),
    // we do include all dependencies below, but we want to stringify the objects as they could be different on each render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      theme,
      JSON.stringify(themeOptions), // eslint-disable-line react-hooks/exhaustive-deps
      JSON.stringify(includeCss), // eslint-disable-line react-hooks/exhaustive-deps
      stylesLoaded,
    ],
  );

  // if no children, then fallback to this wrapper component which calls useTheme
  if (!hasChildren) {
    return (
      <ThemeLogicWrapper
        theme={theme}
        themeOptions={themeOptions ?? parent.context?.themeOptions}
      />
    );
  }

  // now that we know there are children, we can render the root and provide the context value
  return (
    <Root
      theme={theme}
      isInheritingTheme={themeProp === 'inherit'}
      themeOptions={themeOptions}
      ref={mergedRefs}
      {...rest}
    >
      {includeCss ? (
        <Styles
          includeCss={includeCss}
          document={() => rootRef.current?.ownerDocument}
        />
      ) : null}
      <ThemeContext.Provider value={contextValue}>
        {children}
      </ThemeContext.Provider>
    </Root>
  );
}) as PolymorphicForwardRefComponent<'div', ThemeProviderOwnProps>;

export default ThemeProvider;

export const ThemeContext = React.createContext<
  | {
      theme?: ThemeType;
      themeOptions?: ThemeOptions;
      rootRef: React.RefObject<HTMLElement>;
      includeCss?: IncludeCssProps['includeCss'];
      stylesLoaded: React.MutableRefObject<boolean>;
    }
  | undefined
>(undefined);

const Root = React.forwardRef((props, forwardedRef) => {
  const {
    theme,
    children,
    themeOptions,
    as: Element = 'div',
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
    <Element
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
    </Element>
  );
}) as PolymorphicForwardRefComponent<'div', RootProps>;

const ThemeLogicWrapper = (props: {
  theme?: ThemeType;
  themeOptions?: ThemeOptions;
}) => {
  const { theme, themeOptions } = props;
  useTheme(theme, themeOptions);
  return <></>;
};

/**
 * Wrapper around `useStyles` hook.
 *
 * Must be the first thing rendered by `ThemeProvider`, to ensure that its
 * `useStyles` is called before any subsequent `useStyles` calls from child components.
 */
const Styles = (props: {
  includeCss?: IncludeCssProps['includeCss'];
  document: () => Document | undefined;
}) => {
  const { includeCss, document } = props;
  useStyles({ includeCss, document });
  return null;
};

/**
 * Returns theme information from either parent ThemeContext or by reading the closest
 * data-iui-theme attribute if context is not found.
 *
 * Also returns the ThemeContext itself (if found).
 */
const useParentThemeAndContext = (
  rootRef: React.RefObject<HTMLElement | null>,
) => {
  const parentContext = React.useContext(ThemeContext);
  const [parentThemeState, setParentTheme] = React.useState(
    parentContext?.theme,
  );
  const [parentHighContrastState, setParentHighContrastState] = React.useState(
    parentContext?.themeOptions?.highContrast,
  );

  const parentThemeRef = useLatestRef(parentContext?.theme);

  useIsomorphicLayoutEffect(() => {
    // bail if we already have theme from context
    if (parentThemeRef.current) {
      return;
    }

    // find parent theme from closest data-iui-theme attribute
    const closestRoot =
      rootRef.current?.parentElement?.closest('[data-iui-theme]');

    if (!closestRoot) {
      return;
    }

    // helper function that updates state to match data attributes from closest root
    const synchronizeTheme = () => {
      setParentTheme(closestRoot?.getAttribute('data-iui-theme') as ThemeType);
      setParentHighContrastState(
        closestRoot?.getAttribute('data-iui-contrast') === 'high',
      );
    };

    // set theme for initial mount
    synchronizeTheme();

    // use mutation observers to listen to future updates to data attributes
    const observer = new MutationObserver(() => synchronizeTheme());
    observer.observe(closestRoot, {
      attributes: true,
      attributeFilter: ['data-iui-theme', 'data-iui-contrast'],
    });

    return () => {
      observer.disconnect();
    };
  }, [parentThemeRef]);

  return {
    theme: parentContext?.theme ?? parentThemeState,
    highContrast:
      parentContext?.themeOptions?.highContrast ?? parentHighContrastState,
    context: parentContext,
  } as const;
};
