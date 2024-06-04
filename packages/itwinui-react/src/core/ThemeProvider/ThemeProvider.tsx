/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import cx from 'classnames';
import {
  useMediaQuery,
  useMergedRefs,
  Box,
  useLayoutEffect,
  useLatestRef,
  importCss,
  isUnitTest,
  HydrationProvider,
  useHydration,
  ScopeProvider,
  portalContainerAtom,
  useScopedAtom,
  useScopedSetAtom,
} from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { ThemeContext } from './ThemeContext.js';
import { ToastProvider, Toaster } from '../Toast/Toaster.js';
import { atom } from 'jotai';

// ----------------------------------------------------------------------------

const ownerDocumentAtom = atom<Document | undefined>(undefined);

// ----------------------------------------------------------------------------

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
   * of iTwinUI while respecting the theme set by the consuming app. It will fall back to 'light'
   * if no parent theme is found. Additionally, it will attempt to inherit `themeOptions.highContrast`
   * and `portalContainer` (if possible).
   *
   * @default 'inherit'
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
  /**
   * This prop will be used to determine if `styles.css` should be automatically imported at runtime (if not already found).
   *
   * By default, this is enabled when using `theme='inherit'`.
   * This default behavior is useful for packages that want to support incremental adoption of latest iTwinUI,
   * without requiring consuming applications (that might still be using an older version) to manually import the CSS.
   *
   * If true or false is passed, it will override the default behavior.
   */
  includeCss?: boolean;
};

// ----------------------------------------------------------------------------

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
    themeOptions = {},
    portalContainer: portalContainerProp,
    includeCss = themeProp === 'inherit',
    ...rest
  } = props;

  const [rootElement, setRootElement] = React.useState<HTMLElement | null>(
    null,
  );
  const parent = useParentThemeAndContext(rootElement);
  const theme = themeProp === 'inherit' ? parent.theme || 'light' : themeProp;

  // default apply background only for topmost ThemeProvider
  themeOptions.applyBackground ??= !parent.theme;

  // default inherit highContrast option from parent if also inheriting base theme
  themeOptions.highContrast ??=
    themeProp === 'inherit' ? parent.highContrast : undefined;

  const [portalContainerFromParent] = useScopedAtom(portalContainerAtom);

  const contextValue = React.useMemo(
    () => ({ theme, themeOptions }),
    // we do include all dependencies below, but we want to stringify the objects as they could be different on each render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme, JSON.stringify(themeOptions)],
  );

  return (
    <ScopeProvider>
      <HydrationProvider>
        <ThemeContext.Provider value={contextValue}>
          <ToastProvider>
            {includeCss && rootElement ? (
              <FallbackStyles root={rootElement} />
            ) : null}

            <Root
              theme={theme}
              themeOptions={themeOptions}
              ref={useMergedRefs(forwardedRef, setRootElement)}
              {...rest}
            >
              {children}

              <PortalContainer
                portalContainerProp={portalContainerProp}
                portalContainerFromParent={portalContainerFromParent}
                isInheritingTheme={themeProp === 'inherit'}
              />
            </Root>
          </ToastProvider>
        </ThemeContext.Provider>
      </HydrationProvider>
    </ScopeProvider>
  );
}) as PolymorphicForwardRefComponent<'div', ThemeProviderOwnProps>;
ThemeProvider.displayName = 'ThemeProvider';

// ----------------------------------------------------------------------------

const Root = React.forwardRef((props, forwardedRef) => {
  const { theme, children, themeOptions, className, ...rest } = props;

  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const prefersHighContrast = useMediaQuery('(prefers-contrast: more)');
  const shouldApplyDark = theme === 'dark' || (theme === 'os' && prefersDark);
  const shouldApplyHC = themeOptions?.highContrast ?? prefersHighContrast;
  const shouldApplyBackground = themeOptions?.applyBackground;

  const setOwnerDocument = useScopedSetAtom(ownerDocumentAtom);

  return (
    <Box
      className={cx(
        'iui-root',
        { 'iui-root-background': shouldApplyBackground },
        className,
      )}
      data-iui-theme={shouldApplyDark ? 'dark' : 'light'}
      data-iui-contrast={shouldApplyHC ? 'high' : 'default'}
      ref={useMergedRefs(forwardedRef, (el) => {
        setOwnerDocument(el?.ownerDocument);
      })}
      {...rest}
    >
      {children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', RootProps>;

// ----------------------------------------------------------------------------

/**
 * Returns theme information from either parent ThemeContext or by reading the closest
 * data-iui-theme attribute if context is not found.
 *
 * Also returns the ThemeContext itself (if found).
 */
const useParentThemeAndContext = (rootElement: HTMLElement | null) => {
  const parentContext = React.useContext(ThemeContext);
  const [parentThemeState, setParentTheme] = React.useState(
    parentContext?.theme,
  );
  const [parentHighContrastState, setParentHighContrastState] = React.useState(
    parentContext?.themeOptions?.highContrast,
  );

  const parentThemeRef = useLatestRef(parentContext?.theme);

  useLayoutEffect(() => {
    // bail if we already have theme from context
    if (parentThemeRef.current) {
      return;
    }

    // find parent theme from closest data-iui-theme attribute
    const closestRoot = rootElement?.parentElement?.closest('[data-iui-theme]');

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
  }, [rootElement, parentThemeRef]);

  return {
    theme: parentContext?.theme ?? parentThemeState,
    highContrast:
      parentContext?.themeOptions?.highContrast ?? parentHighContrastState,
    context: parentContext,
  } as const;
};

// ----------------------------------------------------------------------------

/**
 * Creates a new portal container if necessary, or reuses the parent portal container.
 *
 * Updates `portalContainerAtom` with the correct portal container.
 */
const PortalContainer = React.memo(
  ({
    portalContainerProp,
    portalContainerFromParent,
    isInheritingTheme,
  }: {
    portalContainerProp: HTMLElement | undefined;
    portalContainerFromParent: HTMLElement | undefined;
    isInheritingTheme: boolean;
  }) => {
    const [ownerDocument] = useScopedAtom(ownerDocumentAtom);
    const setPortalContainer = useScopedSetAtom(portalContainerAtom);

    // bail if not hydrated, because portals don't work on server
    const isHydrated = useHydration() === 'hydrated';
    if (!isHydrated) {
      return null;
    }

    // Create a new portal container only if necessary:
    // - not inheriting theme
    // - no parent portal container to portal into
    // - parent portal container is in a different window (#2006)
    if (
      !portalContainerProp && // bail if portalContainerProp is set, because it takes precedence
      (!isInheritingTheme ||
        !portalContainerFromParent ||
        portalContainerFromParent.ownerDocument !== ownerDocument)
    ) {
      return (
        <div style={{ display: 'contents' }} ref={setPortalContainer}>
          <Toaster />
        </div>
      );
    }

    return (
      <PortaledToaster
        target={portalContainerProp || portalContainerFromParent}
      />
    );
  },
);

// ----------------------------------------------------------------------------

const PortaledToaster = ({ target }: { target?: HTMLElement }) => {
  const [portalContainer, setPortalContainer] =
    useScopedAtom(portalContainerAtom);

  // Synchronize atom with the correct portal target if necessary.
  React.useEffect(() => {
    if (target && target !== portalContainer) {
      setPortalContainer(target);
    }
  }, [portalContainer, target, setPortalContainer]);

  return target ? ReactDOM.createPortal(<Toaster />, target) : null;
};

// ----------------------------------------------------------------------------

/**
 * When `@itwin/itwinui-react/styles.css` is not imported, we will attempt to
 * dynamically import it (if possible) and fallback to loading it from a CDN.
 */
const FallbackStyles = ({ root }: { root: HTMLElement }) => {
  useLayoutEffect(() => {
    // bail if styles are already loaded
    if (getComputedStyle(root).getPropertyValue('--_iui-v3-loaded') === 'yes') {
      return;
    }

    // bail if isUnitTest because unit tests don't care about CSS 🤷
    if (isUnitTest) {
      return;
    }

    (async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await import('../../../styles.css');
      } catch (error) {
        console.log('Error loading styles.css locally', error);
        const css = await importCss(
          'https://cdn.jsdelivr.net/npm/@itwin/itwinui-react@3/styles.css',
        );
        document.adoptedStyleSheets = [
          ...document.adoptedStyleSheets,
          css.default,
        ];
      }
    })();
  }, [root]);

  return <></>;
};
