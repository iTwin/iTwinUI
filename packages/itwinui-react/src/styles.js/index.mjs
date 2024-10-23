/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { version } from '../../package.json';

// Side-effect import to ensure CSS file is generated even though the classes are not used.
import './styles.css';

// This proxy converts `iui-` to `_iui3-` in class names with very little code.
// This is more efficient than exporting the entire mapping of original-to-transformed classes.
const styles = new Proxy(
  {},
  {
    get(_, prop) {
      if (typeof prop === 'string' && prop.startsWith('iui-')) {
        return prop.replace('iui-', `_iui${version.replace(/\./g, '')}-`);
      }
    },
    has(_, prop) {
      return typeof prop === 'string' && prop.startsWith('iui-');
    },
  },
);

export { styles, version };
