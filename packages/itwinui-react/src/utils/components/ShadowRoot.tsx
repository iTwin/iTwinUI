/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useLatestRef, useLayoutEffect } from '../hooks/index.js';
import { useHydration } from '../providers/index.js';

const isBrowser = typeof document !== 'undefined';
const supportsDSD =
  isBrowser && 'shadowRootMode' in HTMLTemplateElement.prototype;
const supportsAdoptedStylesheets =
  isBrowser && 'adoptedStyleSheets' in Document.prototype;

type ShadowRootProps = {
  children: React.ReactNode;
  css?: string;
  /**
   * Control whether the children are portaled synchronously into the shadow-root (by using
   * `flushSync` inside `queueMicrotask`).
   *
   * NOTE: This can block the main thread if too many ShadowRoots are rendered at the same time.
   *
   * @default true
   */
  flush?: boolean;
};

/**
 * Wrapper around `<template>` element that attaches shadow root to its parent
 * and portals its children into the shadow root.
 *
 * @private
 */
export const ShadowRoot = ({
  children,
  css,
  flush = true,
}: ShadowRootProps) => {
  const isHydrating = useHydration() === 'hydrating';

  if (!isBrowser) {
    return (
      <template {...{ shadowrootmode: 'open' }}>
        {css && <style>{css}</style>}
        {children}
      </template>
    );
  }

  // In browsers that support DSD, the template will be automatically removed as soon as it's parsed.
  // To pass hydration, the first client render needs to emulate this browser behavior and return null.
  if (supportsDSD && isHydrating) {
    return null;
  }

  return (
    <ClientShadowRoot css={css} flush={flush}>
      {children}
    </ClientShadowRoot>
  );
};

// ----------------------------------------------------------------------------

const ClientShadowRoot = ({ children, css, flush = true }: ShadowRootProps) => {
  const templateRef = React.useRef<HTMLTemplateElement>(null);
  const shadowRoot = useShadowRoot(templateRef, { css, flush });

  // fallback to <style> tag if adoptedStyleSheets is not supported
  const fallbackCss =
    !supportsAdoptedStylesheets && css ? <style>{css}</style> : null;

  return shadowRoot ? (
    ReactDOM.createPortal(
      <>
        {fallbackCss}
        {children}
      </>,
      shadowRoot,
    )
  ) : (
    <template ref={templateRef} />
  );
};

// ----------------------------------------------------------------------------

/**
 * Given a ref, this hook will return a shadowRoot attached to its parent element.
 *
 * The css will be added to the shadowRoot using `adoptedStyleSheets` (if supported).
 */
function useShadowRoot(
  templateRef: React.RefObject<HTMLElement | null>,
  { css = '', flush = true },
) {
  const [shadowRoot, setShadowRoot] = React.useState<ShadowRoot | null>(null);
  const styleSheet = React.useRef<CSSStyleSheet>(undefined);
  const latestCss = useLatestRef(css);
  const latestShadowRoot = useLatestRef(shadowRoot);

  const createStyleSheet = React.useCallback(
    (shadow: ShadowRoot | null) => {
      if (shadow && supportsAdoptedStylesheets) {
        const currentWindow = shadow.ownerDocument.defaultView || globalThis;

        // bail if stylesheet already exists in the current window
        if (styleSheet.current instanceof currentWindow.CSSStyleSheet) {
          return;
        }

        // create an empty stylesheet and add it to the shadowRoot
        styleSheet.current = new currentWindow.CSSStyleSheet();
        shadow.adoptedStyleSheets.push(styleSheet.current);

        // add the CSS immediately to avoid FOUC (one-time)
        if (latestCss.current) {
          styleSheet.current.replaceSync(latestCss.current);
        }
      }
    },
    [latestCss],
  );

  useLayoutEffect(() => {
    const parent = templateRef.current?.parentElement;
    if (!parent) {
      return;
    }

    const setupOrReuseShadowRoot = () => {
      if (parent.shadowRoot && latestShadowRoot.current === null) {
        parent.shadowRoot.replaceChildren(); // Remove previous shadowroot content
      }

      const shadow = parent.shadowRoot || parent.attachShadow({ mode: 'open' });
      createStyleSheet(shadow);

      // Flush the state immediately after shadow-root is attached, to ensure that layout
      // measurements in parent component are correct.
      // Without this, the parent component may end up measuring the layout when the shadow-root
      // is attached in the DOM but React hasn't rendered any slots or content into it yet.
      if (flush) {
        ReactDOM.flushSync(() => setShadowRoot(shadow));
      } else {
        setShadowRoot(shadow);
      }
    };

    if (flush) {
      queueMicrotask(() => setupOrReuseShadowRoot());
    } else {
      setupOrReuseShadowRoot();
    }

    return () => void setShadowRoot(null);
  }, [templateRef, createStyleSheet, latestShadowRoot, flush]);

  // Synchronize `css` with contents of the existing stylesheet
  useLayoutEffect(() => {
    if (css && supportsAdoptedStylesheets) {
      styleSheet.current?.replaceSync(css);
    }
  }, [css]);

  // Re-create stylesheet if the element is moved to a different window (by AppUI)
  React.useEffect(() => {
    const listener = () => createStyleSheet(latestShadowRoot.current);

    // See https://github.com/iTwin/appui/blob/0a4cc7d127b50146e003071320d06064a09a06ae/ui/appui-react/src/appui-react/layout/widget/ContentRenderer.tsx#L74-L80
    window.addEventListener('appui:reparent', listener);
    return () => {
      window.removeEventListener('appui:reparent', listener);
    };
  }, [createStyleSheet, latestShadowRoot]);

  return shadowRoot;
}
