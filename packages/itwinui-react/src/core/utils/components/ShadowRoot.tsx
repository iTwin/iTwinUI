/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import * as ReactDOM from 'react-dom';

const isBrowser = typeof document !== 'undefined';
const supportsDSD =
  isBrowser && 'shadowRootMode' in HTMLTemplateElement.prototype;
const supportsAdoptedStylesheets =
  isBrowser && 'adoptedStyleSheets' in Document.prototype;

/**
 * Wrapper around `<template>` element that attaches shadow root to its parent
 * and moves its children into the shadow root.
 *
 * @private
 */
export const ShadowRoot = ({
  children,
  css,
}: {
  children: React.ReactNode;
  css?: string;
}) => {
  const [shadowRoot, setShadowRoot] = React.useState<ShadowRoot>();
  const isFirstRender = useIsFirstRender();
  const styleSheet = React.useRef<CSSStyleSheet>();

  const attachShadowRef = React.useCallback(
    (template: HTMLTemplateElement | null) => {
      const parent = template?.parentElement;
      if (!template || !parent) {
        return;
      }
      if (parent.shadowRoot) {
        parent.shadowRoot.replaceChildren(); // Remove previous shadowroot content
      }
      queueMicrotask(() => {
        const shadow =
          parent.shadowRoot || parent.attachShadow({ mode: 'open' });

        if (css && supportsAdoptedStylesheets) {
          styleSheet.current ||= new CSSStyleSheet();
          styleSheet.current.replaceSync(css);
          shadow.adoptedStyleSheets = [styleSheet.current];
        }

        ReactDOM.flushSync(() => setShadowRoot(shadow));
      });
    },
    [css],
  );

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

  return (
    <>
      {shadowRoot ? (
        ReactDOM.createPortal(children, shadowRoot)
      ) : (
        <template ref={attachShadowRef} />
      )}
    </>
  );
};

// ----------------------------------------------------------------------------

function useIsFirstRender() {
  const [isFirstRender, setIsFirstRender] = React.useState(true);
  React.useEffect(() => setIsFirstRender(false), []);
  return isFirstRender;
}
