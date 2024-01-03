/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import './styles.module.css';

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
