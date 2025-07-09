/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
if (!('anchorName' in document.documentElement.style)) {
  const { default: polyfill } = await import('@oddbird/css-anchor-positioning/fn');

  // Setting `elements` to an empty array ensures that only inline styles are processed.
  // This means the anchor positioning styles must be defined directly on the elements
  // that are using them, instead of in an external stylesheet.
  polyfill({ elements: [] });
}
