/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect.js';
import { getDocument } from '../functions/dom.js';
import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment -- only gets created at build-time
// @ts-ignore
import rawCssText from '../../../styles.js';

/** rule that reverts all v1 styles when used inside a v2 boundary */
const revertV1Styles = (() => {
  // using :not(#\#) to artifically inflate the specificity of * selector
  const allSelector = `:where(.iui-body, [class*='iui-theme-']) :where(.iui-root) :not(#\\#)`;
  const revertRule = `${allSelector}, ${allSelector}::before, ${allSelector}::after { all: revert-layer; }`;
  return `@layer itwinui-v1 { ${revertRule} }\n@layer itwinui.v1 { ${revertRule} }`;
})();

// react <18 fallback for useInsertionEffect, with workaround for webpack getting rid of React namespace
const _React = React;
const useIsomorphicInsertionEffect =
  _React.useInsertionEffect ?? useIsomorphicLayoutEffect;

/**
 * Dynamically loads the iTwinUI styles as a constructed stylesheet,
 * falling back to a regular `<style>` tag in `<head>`.
 */
export const useStyles = (options?: {
  withLayer?: boolean;
  document?: () => Document | undefined;
}) => {
  const { withLayer = true, document = () => getDocument() } = options ?? {};
  const loaded = _React.useRef(false);

  useIsomorphicInsertionEffect(() => {
    if (!loaded.current) {
      loadStyles({ withLayer, document });
      loaded.current = true;
    }
  }, [document, loaded, withLayer]);
};

// ----------------------------------------------------------------------------

const layers = `@layer itwinui-v1, itwinui.v1, itwinui.v2, itwinui.v3;`;

const loadStyles = ({ withLayer = true, document = () => getDocument() }) => {
  /* eslint-disable @typescript-eslint/no-explicit-any -- a lot of things inside this function don't have proper types */
  const _document = ((typeof document === 'function' ? document() : document) ??
    getDocument()) as any;

  if (typeof jest !== 'undefined' || typeof _document === 'undefined') {
    return;
  }

  if ((_document?.documentElement).iuiv2Loaded) {
    return;
  }

  const cssText = withLayer
    ? `${layers}${revertV1Styles}@layer itwinui.v2 { ${rawCssText} }`
    : `${revertV1Styles}${rawCssText}`;

  const supportsAdopting =
    'adoptedStyleSheets' in Document.prototype &&
    'replaceSync' in CSSStyleSheet.prototype;

  if (supportsAdopting) {
    const sheet = new CSSStyleSheet();
    (sheet as any).replaceSync(cssText);
    _document.adoptedStyleSheets = [..._document.adoptedStyleSheets, sheet];
  } else {
    const style = _document.createElement('style');
    style.setAttribute('data-iui-styles', '');
    style.textContent = cssText;
    _document.head.appendChild(style);
  }

  _document.documentElement.iuiv2Loaded = true;
  /* eslint-enable @typescript-eslint/no-explicit-any */
};
