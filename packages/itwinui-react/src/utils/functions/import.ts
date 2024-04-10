/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/**
 * Wrapper around native CSS module scripts (import attributes) for dynamic imports.
 * In unsupported browsers, it gracefully degrades to import assertions, and then `fetch`.
 *
 * Returns a constructable CSSStyleSheet object that can be adopted.
 *
 * @see https://web.dev/articles/css-module-scripts
 * @see https://github.com/tc39/proposal-import-attributes
 */
export const importCss = async (
  url: string,
): Promise<{ default: CSSStyleSheet }> => {
  try {
    return await new Function(
      `return import("${url}", { with: { type: "css" } })`,
    )();
  } catch {
    try {
      return await new Function(
        `return import("${url}", { assert: { type: "css" } })`,
      )();
    } catch {
      return await fetch(url)
        .then((res) => res.text())
        .then((cssText) => {
          const stylesheet = new CSSStyleSheet();
          stylesheet.replaceSync(cssText);
          return { default: stylesheet };
        });
    }
  }
};
