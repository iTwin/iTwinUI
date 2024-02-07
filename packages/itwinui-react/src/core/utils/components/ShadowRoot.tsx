/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import * as ReactDOM from 'react-dom';

const isBrowser = typeof document !== 'undefined';
const supportsDSD =
  isBrowser && 'shadowRootMode' in HTMLTemplateElement.prototype;

/**
 * Wrapper around `<template>` element that attaches shadow root to its parent
 * and moves its children into the shadow root.
 */
export const ShadowRoot = ({ children }: { children: React.ReactNode }) => {
  const [shadowRoot, setShadowRoot] = React.useState<ShadowRoot>();
  const isFirstRender = useIsFirstRender();

  const attachShadowRef = React.useCallback(
    (template: HTMLTemplateElement | null) => {
      const parent = template?.parentElement;
      if (!template || !parent) {
        return;
      }
      queueMicrotask(() =>
        ReactDOM.flushSync(() =>
          setShadowRoot(
            parent.shadowRoot || parent.attachShadow({ mode: 'open' }),
          ),
        ),
      );
    },
    [],
  );

  if (!isBrowser) {
    return <template {...{ shadowrootmode: 'open' }}>{children}</template>;
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
