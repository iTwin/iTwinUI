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
  PortalContainerContext,
  useId,
  FutureFlagsProvider,
  useFutureFlag,
} from '../../utils/index.js';
import type {
  FutureOptions,
  PolymorphicForwardRefComponent,
} from '../../utils/index.js';
import { ThemeContext } from './ThemeContext.js';
import { ToastProvider, Toaster } from '../Toast/Toaster.js';
import { meta } from '../../utils/meta.js';
import { styles } from '../../styles.js';

const versionWithoutDots = meta.version.replace(/\./g, '');

// ----------------------------------------------------------------------------

const OwnerDocumentContext = React.createContext<Document | undefined>(
  undefined,
);

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
   * `future.themeBridge` will be inherited regardless of `theme` value. To disable it, explicitly set
   * `future.themeBridge` to false.
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
    /**
     * Whether to synchronize the iTwinUI theme with the document `<body>` element, making the iTwinUI CSS variables
     * available globally. This is useful when iTwinUI is used in third-party portals located outside the main ThemeProvider element.
     *
     * This is enabled by default when the `future` prop (or `future.synchronizeThemeToRoot` flag) is set to `true`.
     */
    synchronizeThemeToRoot?: boolean;
  };
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
  /**
   * Options to help with early adoption of features from future versions.
   *
   * All future options will be automatically inherited across nested ThemeProviders, unless explicitly overridden.
   */
  future?: true | FutureOptions;
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
    future: futureProp = {},
    ...rest
  } = props;

  let future: FutureOptions;
  if (futureProp === true) {
    future = {
      themeBridge: true,
      synchronizeThemeToRoot: true,
      ToggleSwitch: {
        consistentPropsSpread: true,
      },
    };
  } else {
    future = futureProp;
  }

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

  themeOptions.synchronizeThemeToRoot ??= future.synchronizeThemeToRoot;

  const portalContainerFromParent = React.useContext(PortalContainerContext);

  const themeContextValue = React.useMemo(
    () => ({ theme, themeOptions }),
    // we do include all dependencies below, but we want to stringify the objects as they could be different on each render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme, JSON.stringify(themeOptions)],
  );

  const [portalContainer, setPortalContainer] =
    React.useState<HTMLElement | null>(portalContainerProp || null);

  return (
    <FutureFlagsProvider value={future}>
      <PortalContainerContext.Provider value={portalContainer}>
        <HydrationProvider>
          <ThemeContext.Provider value={themeContextValue}>
            <ToastProvider
              inherit={themeProp === 'inherit' && !portalContainerProp}
            >
              {includeCss && rootElement ? (
                <FallbackStyles root={rootElement} />
              ) : null}

              <MainRoot
                theme={theme}
                themeOptions={themeOptions}
                ref={useMergedRefs(
                  forwardedRef,
                  setRootElement,
                  useIuiDebugRef,
                )}
                {...rest}
              >
                <FutureFlagsProvider
                  value={{
                    ...future,
                    synchronizeThemeToRoot: false, // nested ThemeProviders don't need to synchronize.
                  }}
                >
                  {children}
                </FutureFlagsProvider>

                <PortalContainer
                  theme={theme}
                  themeOptions={themeOptions}
                  portalContainerProp={portalContainerProp}
                  portalContainerFromParent={portalContainerFromParent}
                  setPortalContainer={setPortalContainer}
                  isInheritingTheme={themeProp === 'inherit'}
                />
              </MainRoot>
            </ToastProvider>
          </ThemeContext.Provider>
        </HydrationProvider>
      </PortalContainerContext.Provider>
    </FutureFlagsProvider>
  );
}) as PolymorphicForwardRefComponent<'div', ThemeProviderOwnProps>;
if (process.env.NODE_ENV === 'development') {
  ThemeProvider.displayName = 'ThemeProvider';
}

// ----------------------------------------------------------------------------

const MainRoot = React.forwardRef((props, forwardedRef) => {
  const [ownerDocument, setOwnerDocument] = React.useState<
    Document | undefined
  >(undefined);
  const findOwnerDocumentFromRef = React.useCallback(
    (el: HTMLElement | null): void => {
      if (el && el.ownerDocument !== ownerDocument) {
        setOwnerDocument(el.ownerDocument);
      }
    },
    [ownerDocument, setOwnerDocument],
  );

  return (
    <OwnerDocumentContext.Provider value={ownerDocument}>
      <Root
        {...props}
        ref={useMergedRefs(findOwnerDocumentFromRef, forwardedRef)}
      />
    </OwnerDocumentContext.Provider>
  );
}) as PolymorphicForwardRefComponent<'div', RootProps>;

// ----------------------------------------------------------------------------

const Root = React.forwardRef((props, forwardedRef) => {
  const { theme, children, themeOptions, className, ...rest } = props;

  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const prefersHighContrast = useMediaQuery('(prefers-contrast: more)');
  const shouldApplyDark = theme === 'dark' || (theme === 'os' && prefersDark);
  const shouldApplyHC = themeOptions?.highContrast ?? prefersHighContrast;
  const shouldApplyBackground = themeOptions?.applyBackground;
  const shouldSynchronizeTheme = themeOptions?.synchronizeThemeToRoot;

  const colorScheme = shouldApplyDark ? 'dark' : 'light';
  const contrast = shouldApplyHC ? 'high' : 'default';
  const themeBridge = useFutureFlag('themeBridge');

  return (
    <Box
      className={cx(
        'iui-root',
        { 'iui-root-background': shouldApplyBackground },
        className,
      )}
      data-iui-theme={colorScheme}
      data-iui-contrast={contrast}
      data-iui-bridge={themeBridge ? 'true' : undefined}
      ref={forwardedRef}
      {...rest}
    >
      {shouldSynchronizeTheme && (
        <SynchronizeTheme theme={colorScheme} contrast={contrast} />
      )}
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
    setPortalContainer,
    isInheritingTheme,
    theme,
    themeOptions,
  }: {
    portalContainerProp: HTMLElement | undefined;
    portalContainerFromParent: HTMLElement | null;
    setPortalContainer: (container: HTMLElement | null) => void;
    isInheritingTheme: boolean;
  } & RootProps) => {
    const ownerDocument = React.useContext(OwnerDocumentContext);

    // Create a new portal container only if necessary:
    // - no explicit portalContainer prop
    // - not inheriting theme
    // - no parent portal container to portal into
    // - parent portal container is in a different window (#2006)
    const shouldSetupPortalContainer =
      !portalContainerProp &&
      (!isInheritingTheme ||
        !portalContainerFromParent ||
        (!!ownerDocument &&
          portalContainerFromParent.ownerDocument !== ownerDocument));

    const id = useId();

    // Synchronize atom with the correct portal target.
    React.useEffect(() => {
      if (shouldSetupPortalContainer) {
        return;
      }

      const portalTarget = portalContainerProp || portalContainerFromParent;

      if (portalTarget) {
        setPortalContainer(portalTarget);
      }
    }, [
      portalContainerProp,
      portalContainerFromParent,
      shouldSetupPortalContainer,
      setPortalContainer,
    ]);

    // bail if not hydrated, because portals don't work on server
    const isHydrated = useHydration() === 'hydrated';
    if (!isHydrated) {
      return null;
    }

    if (shouldSetupPortalContainer && ownerDocument) {
      return ReactDOM.createPortal(
        <Root
          theme={theme}
          themeOptions={{
            ...themeOptions,
            applyBackground: false,
            synchronizeThemeToRoot: false,
          }}
          data-iui-portal
          style={{ display: 'contents' }}
          ref={setPortalContainer}
          id={id}
        >
          <Toaster />
        </Root>,
        ownerDocument.body,
      );
    } else if (portalContainerProp) {
      return ReactDOM.createPortal(<Toaster />, portalContainerProp);
    }

    return null;
  },
);

// ----------------------------------------------------------------------------

/**
 * Propagates `data-iui-*` attributes to the `<body>` element, so that CSS variables are available globally.
 */
const SynchronizeTheme = ({
  theme,
  contrast,
}: {
  theme: 'light' | 'dark';
  contrast: 'default' | 'high';
}) => {
  const ownerDocument = React.useContext(OwnerDocumentContext);
  const themeBridge = useFutureFlag('themeBridge');

  useLayoutEffect(() => {
    if (!ownerDocument?.body) {
      return;
    }

    const body = ownerDocument.body;
    const previousTheme = body.getAttribute('data-iui-theme');
    const previousContrast = body.getAttribute('data-iui-contrast');
    const previousBridge = body.getAttribute('data-iui-bridge');
    const previouslyHadRootClass = body.classList.contains(styles['iui-root']);

    body.classList.toggle(styles['iui-root'], true);
    synchronizeAttribute(body, 'data-iui-theme', theme);
    synchronizeAttribute(body, 'data-iui-contrast', contrast);
    synchronizeAttribute(body, 'data-iui-bridge', themeBridge ? 'true' : null);

    return () => {
      if (!previouslyHadRootClass) {
        body.classList.remove(styles['iui-root']);
      }

      synchronizeAttribute(body, 'data-iui-theme', previousTheme);
      synchronizeAttribute(body, 'data-iui-contrast', previousContrast);
      synchronizeAttribute(body, 'data-iui-bridge', previousBridge);
    };
  }, [contrast, ownerDocument, theme, themeBridge]);

  return null;
};

const synchronizeAttribute = (
  element: HTMLElement,
  attributeName: string,
  value: string | null,
) => {
  if (value == null) {
    element.removeAttribute(attributeName);
    return;
  }

  element.setAttribute(attributeName, value);
};

// ----------------------------------------------------------------------------

/**
 * When `@itwin/itwinui-react/styles.css` is not imported, we will attempt to
 * dynamically import it (if possible) and fallback to loading it from a CDN.
 */
const FallbackStyles = ({ root }: { root: HTMLElement }) => {
  useLayoutEffect(() => {
    // bail if styles are already loaded
    if (
      getComputedStyle(root).getPropertyValue(
        `--_iui-v${versionWithoutDots}`,
      ) === 'yes'
    ) {
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
          `https://cdn.jsdelivr.net/npm/@itwin/itwinui-react@${meta.version}/styles.css`,
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

// ----------------------------------------------------------------------------

/**
 * This function stores a list of iTwinUI versions in the window object
 * and displays development-only warnings when multiple versions are detected.
 */
const useIuiDebugRef = () => {
  const _globalThis = globalThis as any;
  _globalThis.__iui ||= { versions: new Set() };

  if (process.env.NODE_ENV === 'development' && !isUnitTest) {
    // Override the `add` method to automatically detect multiple versions as they're added
    _globalThis.__iui.versions.add = (version: string) => {
      Set.prototype.add.call(_globalThis.__iui.versions, version);

      if (_globalThis.__iui.versions.size > 1) {
        _globalThis.__iui._shouldWarn = true;

        if (_globalThis.__iui._warnTimeout) {
          clearTimeout(_globalThis.__iui._warnTimeout);
        }

        // Warn after 3 seconds, but only once
        _globalThis.__iui._warnTimeout = setTimeout(() => {
          if (_globalThis.__iui._shouldWarn) {
            console.warn(
              `Multiple versions of iTwinUI were detected on this page. This can lead to unexpected behavior and duplicated code in the bundle. ` +
                `Make sure you're using a single iTwinUI instance across your app. https://github.com/iTwin/iTwinUI/wiki/Version-conflicts`,
            );
            console.groupCollapsed('iTwinUI versions detected:');
            const versionsTable: any[] = [];
            _globalThis.__iui.versions.forEach((version: string) => {
              versionsTable.push(JSON.parse(version));
            });
            console.table(versionsTable);
            console.groupEnd();
            _globalThis.__iui._shouldWarn = false;
          }
        }, 3000);
      }
    };
  }

  _globalThis.__iui.versions.add(JSON.stringify(meta));
};
