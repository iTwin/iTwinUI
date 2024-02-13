/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

// Side-effect import to ensure CSS file is generated even though the classes are not used.
import './styles.module.css';

// This proxy converts `iui-` to `_iui3-` in class names with very little code.
// This is more efficient than exporting the entire mapping of original-to-transformed classes.
export default new Proxy(
  {},
  {
    get(_, prop) {
      if (typeof prop === 'string' && prop.startsWith('iui-')) {
        return prop.replace('iui-', '_iui3-');
      }
    },
    has(_, prop) {
      return typeof prop === 'string' && prop.startsWith('iui-');
    },
  },
);
