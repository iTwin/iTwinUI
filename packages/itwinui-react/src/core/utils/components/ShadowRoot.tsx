/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useLatestRef, useLayoutEffect } from '../hooks/index.js';

const isBrowser = typeof document !== 'undefined';
const supportsDSD =
  isBrowser && 'shadowRootMode' in HTMLTemplateElement.prototype;
const supportsAdoptedStylesheets =
  isBrowser && 'adoptedStyleSheets' in Document.prototype;

type ShadowRootProps = { children: React.ReactNode; css?: string };

/**
 * Wrapper around `<template>` element that attaches shadow root to its parent
 * and moves its children into the shadow root.
 *
 * @private
 */
export const ShadowRoot = ({ children, css }: ShadowRootProps) => {
  const isFirstRender = useIsFirstRender();

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
  if (supportsDSD && isFirstRender) {
    return null;
  }

  return <ClientShadowRoot css={css}>{children}</ClientShadowRoot>;
};

// ----------------------------------------------------------------------------

const ClientShadowRoot = ({ children, css }: ShadowRootProps) => {
  const templateRef = React.useRef<HTMLTemplateElement>(null);
  const shadowRoot = useShadowRoot(templateRef, { css });

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
  templateRef: React.RefObject<HTMLElement>,
  { css = '' },
) {
  const [shadowRoot, setShadowRoot] = React.useState<ShadowRoot | null>(null);
  const styleSheet = React.useRef<CSSStyleSheet>();
  const latestCss = useLatestRef(css);

  useLayoutEffect(() => {
    const parent = templateRef.current?.parentElement;
    if (!parent) {
      return;
    }

    if (parent.shadowRoot) {
      parent.shadowRoot.replaceChildren(); // Remove previous shadowroot content
    }

    const shadow = parent.shadowRoot || parent.attachShadow({ mode: 'open' });

    if (supportsAdoptedStylesheets) {
      // create an empty stylesheet and add it to the shadowRoot
      const currentWindow = shadow.ownerDocument.defaultView || globalThis;
      styleSheet.current = new currentWindow.CSSStyleSheet();
      shadow.adoptedStyleSheets = [styleSheet.current];

      // add the CSS immediately to avoid FOUC (one-time)
      if (latestCss.current) {
        styleSheet.current.replaceSync(latestCss.current);
      }
    }

    queueMicrotask(() => {
      // Flush the state immediately to ensure layout measurements in parent component are correct
      ReactDOM.flushSync(() => setShadowRoot(shadow));
    });

    return () => void setShadowRoot(null);
  }, [templateRef, latestCss]);

  // Synchronize `css` with contents of the existing stylesheet
  useLayoutEffect(() => {
    if (css && supportsAdoptedStylesheets) {
      styleSheet.current?.replaceSync(css);
    }
  }, [css]);

  return shadowRoot;
}

// ----------------------------------------------------------------------------

function useIsFirstRender() {
  const [isFirstRender, setIsFirstRender] = React.useState(true);
  React.useEffect(() => setIsFirstRender(false), []);
  return isFirstRender;
}
